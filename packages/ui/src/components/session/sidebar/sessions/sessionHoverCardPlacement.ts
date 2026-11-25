
export const HOVER_CARD_WIDTH_PX = 320;
export const HOVER_CARD_MIN_WIDTH_PX = 220;
const GAP_PX = 8;
const VIEWPORT_MARGIN_PX = 8;

export interface HorizontalBounds {
  left: number;
  right: number;
}

export interface HoverCardPlacement {
  side: 'left' | 'right';
  sideOffset: number;
  maxWidth: number;
}

export function decideHoverCardPlacement({
  list,
  row,
  viewportWidth,
  endSide,
}: {
  list: HorizontalBounds;
  row: HorizontalBounds;
  viewportWidth: number;
  endSide: 'left' | 'right';
}): HoverCardPlacement | null {
  const room = {
    right: viewportWidth - list.right - GAP_PX - VIEWPORT_MARGIN_PX,
    left: list.left - GAP_PX - VIEWPORT_MARGIN_PX,
  };
  const startSide = endSide === 'right' ? 'left' : 'right';
  const side = room[endSide] >= HOVER_CARD_WIDTH_PX
    ? endSide
    : room[startSide] >= HOVER_CARD_WIDTH_PX
      ? startSide
      : (room[endSide] >= room[startSide] ? endSide : startSide);
  const maxWidth = Math.min(HOVER_CARD_WIDTH_PX, Math.floor(room[side]));
  if (maxWidth < HOVER_CARD_MIN_WIDTH_PX) return null;
  const sideOffset = side === 'right'
    ? Math.max(0, list.right - row.right) + GAP_PX
    : Math.max(0, row.left - list.left) + GAP_PX;
  return { side, sideOffset, maxWidth };
}
