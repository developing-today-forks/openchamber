/**
 * Rendered inside a glass popup (menu, select, tooltip): while any is open,
 * <html> carries data-glass-redraw-guard and design-system.css mounts the
 * full-viewport blurred layer that keeps Chromium from repainting glass under
 * the popup from a stale blur. Only open popups pay for that layer.
 */
declare function GlassRedrawGuard(): null;
export { GlassRedrawGuard };
