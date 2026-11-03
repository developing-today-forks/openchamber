{
  description = "OpenChamber web runtime built from source";

  # The fleet's own binary cache (developing-today/nix-cache: Nix on
  # Cloudflare R2 + Workers) as an ADDED substituter — cache.nixos.org
  # stays in place; this only covers fleet-built paths the public cache
  # does not have. Public read; pushes are signed with the nix-cache-1
  # key, which is the key trusted here.
  nixConfig = {
    extra-substituters = [ "https://nix-cache.developing-today-llc-domains-0.workers.dev" ];
    extra-trusted-public-keys = [ "nix-cache-1:x/kKZuzyQI3L0/twmOp3w2U68F2ZgM3WnH3ERYKrwf8=" ];
  };

  inputs = {
    # The fleet repo carries the canonical nixpkgs pin for all fleet
    # repos (dezren39/fleet, flake.nix): one rev, aligned everywhere,
    # pinned to a nixpkgs-unstable channel tip so Hydra has the tree
    # fully built. To move the pin, move it in fleet and re-lock here.
    # The opencode input below already follows this nixpkgs, so its
    # tree lands on the same pin.
    fleet.url = "github:dezren39/fleet";
    nixpkgs.follows = "fleet/nixpkgs";
    opencode = {
      url = "github:developing-today/opencode";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs =
    {
      self,
      nixpkgs,
      opencode,
      ...
    }:
    let
      inherit (nixpkgs) lib;
      # Systems with a node_modules hash in nix/hashes.json.
      systems = builtins.attrNames (lib.importJSON ./nix/hashes.json).nodeModules;
      forAllSystems = f: lib.genAttrs systems (system: f system);

      pkgsFor =
        system:
        import nixpkgs {
          inherit system;
          config = {
            allowUnfree = true;
            android_sdk.accept_license = true;
          };
        };
    in
    {
      packages = forAllSystems (
        system:
        let
          pkgs = pkgsFor system;
          opencodePackage = opencode.packages.${system}.opencode;
          openchamber = pkgs.callPackage ./nix/package.nix {
            src = self;
            opencode = opencodePackage;
          };
          desktopArgs = {
            src = self;
            opencode = opencodePackage;
            inherit (openchamber) node_modules;
            electron = pkgs.electron_43;
          };
          openchamber-desktop =
            if pkgs.stdenv.hostPlatform.isDarwin then
              pkgs.callPackage ./nix/desktop-darwin.nix desktopArgs
            else
              pkgs.callPackage ./nix/desktop.nix desktopArgs;
        in
        {
          inherit openchamber openchamber-desktop;
          default = openchamber;
        }
      );

      # The mcpx daemon modules pass through from the opencode fork,
      # which re-exports the canonical modules originating in
      # developing-today/code (defaulted there to the fork's own mcpx
      # build). This flake adds no default and alters nothing: it
      # exposes the fork's modules as its own outputs so a consumer
      # can take opencode, openchamber, and the mcpx daemon from
      # this one input.
      nixosModules.mcpx = opencode.nixosModules.mcpx;
      homeManagerModules.mcpx = opencode.homeManagerModules.mcpx;
      darwinModules.mcpx = opencode.darwinModules.mcpx;

      # `nix run .#update-hashes` re-bakes the current system's
      # node_modules hash in nix/hashes.json (see nix/update-hashes.sh).
      apps = forAllSystems (system: {
        update-hashes = {
          type = "app";
          program = toString ./nix/update-hashes.sh;
        };
      });

      devShells = forAllSystems (
        system:
        let
          pkgs = pkgsFor system;
          basePackages = [
            pkgs.bun
            pkgs.nodejs_24
            pkgs.git
            pkgs.openssh
            pkgs.unzip
            pkgs.curl
          ];
          androidSdk = pkgs.androidenv.composeAndroidPackages {
            cmdLineToolsVersion = "latest";
            buildToolsVersions = [ "35.0.0" ];
            platformVersions = [ "35" ];
            includeEmulator = false;
            includeSources = false;
            includeSystemImages = false;
          };
          androidHome = "${androidSdk.androidsdk}/libexec/android-sdk";
          javaHome = "${pkgs.jdk21.home}";
        in
        {
          default =
            if pkgs.stdenv.hostPlatform.isLinux then
              pkgs.mkShell {
                packages = basePackages ++ [
                  pkgs.jdk21
                  androidSdk.androidsdk
                  pkgs.android-tools
                ];

                ANDROID_HOME = androidHome;
                ANDROID_SDK_ROOT = androidHome;
                JAVA_HOME = javaHome;

                shellHook = ''
                  export PATH="$JAVA_HOME/bin:$ANDROID_HOME/platform-tools:$PATH"
                  echo "OpenChamber Android dev shell"
                  echo "  JAVA_HOME=$JAVA_HOME"
                  echo "  ANDROID_HOME=$ANDROID_HOME"
                '';
              }
            else
              pkgs.mkShell { packages = basePackages; };

          # Lean shell for the fleet build container / CI warming: the
          # base packages only, without the Android SDK + JDK closure
          # the default shell pulls in for Android work.
          fleet = pkgs.mkShell { packages = basePackages; };
        }
      );
    };
}
