// Atomic no-replace directory rename for issue #2573.
//
// Node's `fs.rename` cannot rename a directory without replacing an existing
// empty destination directory, and Node exposes none of the OS exclusive
// rename flags. This N-API addon exposes exactly one synchronous function,
// `renameDirectoryNoReplace(source, destination)`, implemented per platform
// with the primitive that fails when the destination name is already taken:
//
// - Linux:   renameat2(2) with RENAME_NOREPLACE (raw syscall fallback, so it
//            builds against old libc headers; needs kernel >= 3.15 at runtime).
// - macOS:   renamex_np(2) with RENAME_EXCL (macOS >= 10.12 SDK).
// - Windows: MoveFileWithProgressW without MOVEFILE_REPLACE_EXISTING.
//
// The binding is deliberately synchronous: a rename commits one name and
// returns immediately, so no async worker is needed. Errors surface as JS
// `Error`s whose `code` is the errno-style name (`EEXIST` when the
// destination already exists, `ENOENT` when the source is missing, `ENOSYS`
// when the platform or filesystem cannot provide the exclusive operation).
// Callers must fail closed on `ENOSYS`: never fall back to check-then-rename,
// which reopens the race this helper exists to close.

#include <node_api.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#if defined(_WIN32)

#ifndef WIN32_LEAN_AND_MEAN
#define WIN32_LEAN_AND_MEAN
#endif
#include <errno.h>
#include <windows.h>

#define RNR_EEXIST_CODE "EEXIST"
#define RNR_ENOENT_CODE "ENOENT"
#define RNR_ENOSYS_CODE "ENOSYS"
#define RNR_EACCES_CODE "EACCES"
#define RNR_EIO_CODE "EIO"

// Map a Win32 error to an errno-style code. Existence collisions map to
// EEXIST so callers can share the POSIX conflict path.
static const char *rnr_code_for_win32(DWORD error) {
  switch (error) {
    case ERROR_ALREADY_EXISTS:
    case ERROR_FILE_EXISTS:
    case ERROR_DIRECTORY:
      return RNR_EEXIST_CODE;
    case ERROR_FILE_NOT_FOUND:
    case ERROR_PATH_NOT_FOUND:
      return RNR_ENOENT_CODE;
    case ERROR_ACCESS_DENIED:
      return RNR_EACCES_CODE;
    case ERROR_NOT_SUPPORTED:
      return RNR_ENOSYS_CODE;
    default:
      return RNR_EIO_CODE;
  }
}

static int rnr_os_rename_dir(const char *from, const char *to, unsigned long *win_error) {
  int from_len = MultiByteToWideChar(CP_UTF8, MB_ERR_INVALID_CHARS, from, -1, NULL, 0);
  int to_len = MultiByteToWideChar(CP_UTF8, MB_ERR_INVALID_CHARS, to, -1, NULL, 0);
  if (from_len <= 0 || to_len <= 0) {
    *win_error = ERROR_INVALID_NAME;
    return EINVAL;
  }
  WCHAR *wfrom = (WCHAR *)malloc((size_t)from_len * sizeof(WCHAR));
  WCHAR *wto = (WCHAR *)malloc((size_t)to_len * sizeof(WCHAR));
  if (wfrom == NULL || wto == NULL) {
    free(wfrom);
    free(wto);
    *win_error = ERROR_OUTOFMEMORY;
    return ENOMEM;
  }
  MultiByteToWideChar(CP_UTF8, MB_ERR_INVALID_CHARS, from, -1, wfrom, from_len);
  MultiByteToWideChar(CP_UTF8, MB_ERR_INVALID_CHARS, to, -1, wto, to_len);
  // No MOVEFILE_REPLACE_EXISTING: an existing destination fails instead of
  // being replaced. MOVEFILE_COPY_ALLOWED keeps cross-volume directory moves
  // working the way fs.rename allows them.
  BOOL ok = MoveFileWithProgressW(wfrom, wto, NULL, NULL, MOVEFILE_COPY_ALLOWED);
  DWORD error = ok ? ERROR_SUCCESS : GetLastError();
  free(wfrom);
  free(wto);
  if (ok) return 0;
  *win_error = error;
  switch (error) {
    case ERROR_ALREADY_EXISTS:
    case ERROR_FILE_EXISTS:
    case ERROR_DIRECTORY:
      return EEXIST;
    case ERROR_FILE_NOT_FOUND:
    case ERROR_PATH_NOT_FOUND:
      return ENOENT;
    case ERROR_ACCESS_DENIED:
      return EACCES;
    case ERROR_NOT_SUPPORTED:
      return ENOSYS;
    default:
      return EIO;
  }
}

#else /* POSIX */

#include <errno.h>
#include <fcntl.h>

#if defined(__linux__)
#include <sys/syscall.h>
#include <unistd.h>
#ifndef RENAME_NOREPLACE
#define RENAME_NOREPLACE (1u << 0)
#endif
#if defined(SYS_renameat2)
#define RNR_SYS_renameat2 SYS_renameat2
#elif defined(__x86_64__)
#define RNR_SYS_renameat2 316
#elif defined(__aarch64__)
#define RNR_SYS_renameat2 382
#elif defined(__i386__)
#define RNR_SYS_renameat2 353
#else
// Unknown architecture: no number to trap with, so fail closed at runtime.
#define RNR_SYS_renameat2 (-1L)
#endif
#endif /* __linux__ */

#if defined(__APPLE__)
#include <stdio.h>
#ifndef RENAME_EXCL
// SDK without renamex_np: fail closed at runtime instead of miscompiling.
#define RNR_NO_RENAMEX 1
#endif
#endif

static int rnr_os_rename_dir(const char *from, const char *to) {
#if defined(__linux__)
#if RNR_SYS_renameat2 < 0
  (void)from;
  (void)to;
  return ENOSYS;
#else
  // renameat2 is absent from old libc headers, so trap directly: the call is
  // stable since kernel 3.15 and returns ENOSYS where the kernel predates it.
  long rc = syscall((long)RNR_SYS_renameat2, AT_FDCWD, from, AT_FDCWD, to,
                    (unsigned int)RENAME_NOREPLACE);
  if (rc == 0) return 0;
  return errno;
#endif
#elif defined(__APPLE__)
#ifdef RNR_NO_RENAMEX
  (void)from;
  (void)to;
  return ENOSYS;
#else
  if (renamex_np(from, to, RENAME_EXCL) == 0) return 0;
  return errno;
#endif
#else
  // Unsupported POSIX platform: fail closed, never plain-rename.
  (void)from;
  (void)to;
  return ENOSYS;
#endif
}

#endif /* _WIN32 */

static const char *rnr_code_for_errno(int err) {
  switch (err) {
    case EEXIST:
      return "EEXIST";
    case ENOENT:
      return "ENOENT";
    case ENOSYS:
      return "ENOSYS";
    case EACCES:
      return "EACCES";
    case EPERM:
      return "EPERM";
    case ENOTEMPTY:
      return "ENOTEMPTY";
    case EINVAL:
      return "EINVAL";
    case ENOMEM:
      return "ENOMEM";
    default:
      return "EIO";
  }
}

static napi_status rnr_read_path(napi_env env, napi_value value, char **out) {
  size_t length = 0;
  napi_status status = napi_get_value_string_utf8(env, value, NULL, 0, &length);
  if (status != napi_ok) return status;
  char *buffer = (char *)malloc(length + 1);
  if (buffer == NULL) return napi_generic_failure;
  status = napi_get_value_string_utf8(env, value, buffer, length + 1, &length);
  if (status != napi_ok) {
    free(buffer);
    return status;
  }
  *out = buffer;
  return napi_ok;
}

static napi_value rnr_rename_directory_no_replace(napi_env env, napi_callback_info info) {
  size_t argc = 2;
  napi_value argv[2];
  napi_status status = napi_get_cb_info(env, info, &argc, argv, NULL, NULL);
  if (status != napi_ok) return NULL;
  if (argc < 2) {
    napi_throw_error(env, "EINVAL", "renameDirectoryNoReplace requires (source, destination)");
    return NULL;
  }
  char *from = NULL;
  char *to = NULL;
  if (rnr_read_path(env, argv[0], &from) != napi_ok || rnr_read_path(env, argv[1], &to) != napi_ok) {
    free(from);
    free(to);
    napi_throw_type_error(env, "EINVAL", "renameDirectoryNoReplace requires string paths");
    return NULL;
  }
#if defined(_WIN32)
  unsigned long win_error = 0;
  int err = rnr_os_rename_dir(from, to, &win_error);
  // Prefer the precise errno the implementation already chose; only consult
  // the Win32 error for failures without a direct errno equivalent.
  const char *code;
  switch (err) {
    case EEXIST:
    case ENOENT:
    case EACCES:
    case EPERM:
    case ENOSYS:
      code = rnr_code_for_errno(err);
      break;
    default:
      code = win_error != 0 ? rnr_code_for_win32((DWORD)win_error) : rnr_code_for_errno(err);
      break;
  }
#else
  int err = rnr_os_rename_dir(from, to);
  const char *code = rnr_code_for_errno(err);
#endif
  free(from);
  free(to);
  if (err != 0) {
    char message[128];
    if (err == ENOSYS) {
      snprintf(message, sizeof(message),
               "atomic no-replace directory rename is not supported on this platform or filesystem");
    } else if (strcmp(code, "EEXIST") == 0) {
      snprintf(message, sizeof(message), "destination path already exists");
    } else {
      snprintf(message, sizeof(message), "no-replace directory rename failed");
    }
    napi_throw_error(env, code, message);
    return NULL;
  }
  napi_value undefined_value;
  if (napi_get_undefined(env, &undefined_value) != napi_ok) return NULL;
  return undefined_value;
}

static napi_value rnr_init(napi_env env, napi_value exports) {
  napi_value fn;
  if (napi_create_function(env, "renameDirectoryNoReplace", NAPI_AUTO_LENGTH,
                           rnr_rename_directory_no_replace, NULL, &fn) != napi_ok) {
    return NULL;
  }
  if (napi_set_named_property(env, exports, "renameDirectoryNoReplace", fn) != napi_ok) {
    return NULL;
  }
  return exports;
}

NAPI_MODULE(rnr_noreplace_rename, rnr_init)
