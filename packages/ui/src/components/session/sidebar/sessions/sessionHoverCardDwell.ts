export const SESSION_HOVER_CARD_DWELL_MS = 800;
const REST_TOLERANCE_PX = 4;

export interface DwellPointer {
  pointerType: string;
  clientX: number;
  clientY: number;
  buttons: number;
  modifier: boolean;
  overNestedControl: boolean;
}

export type ScheduleAfter = (ms: number, run: () => void) => () => void;

export interface HoverCardDwell {
  enter: (pointer: DwellPointer) => void;
  move: (pointer: DwellPointer) => void;
  leave: (towardCard: boolean) => void;
  cardEnter: () => void;
  cardLeave: (toRow: boolean) => void;
  press: () => void;
  show: () => void;
  interrupt: () => void;
  closed: () => void;
  dispose: () => void;
}

export const CARD_REACH_MS = 350;

const isMouseLike = (pointerType: string) => pointerType === 'mouse' || pointerType === 'pen';

export function createHoverCardDwell({
  dwellMs = SESSION_HOVER_CARD_DWELL_MS,
  after,
  onOpen,
  onClose,
}: {
  dwellMs?: number;
  after: ScheduleAfter;
  onOpen: () => boolean;
  onClose: () => void;
}): HoverCardDwell {
  let inside = false;
  let inCard = false;
  let suppressed = false;
  let open = false;
  let cancelTimer: (() => void) | null = null;
  let cancelReachTimer: (() => void) | null = null;
  let rest: { x: number; y: number } | null = null;

  const cancel = () => {
    cancelTimer?.();
    cancelTimer = null;
  };
  const cancelReach = () => {
    cancelReachTimer?.();
    cancelReachTimer = null;
  };
  const close = () => {
    cancel();
    cancelReach();
    rest = null;
    inCard = false;
    if (!open) return;
    open = false;
    onClose();
  };
  const arm = (pointer: DwellPointer) => {
    cancel();
    rest = { x: pointer.clientX, y: pointer.clientY };
    cancelTimer = after(dwellMs, () => {
      cancelTimer = null;
      if (inside && !suppressed && !open) open = onOpen();
    });
  };
  const settles = (pointer: DwellPointer) => pointer.buttons === 0 && !pointer.modifier && !pointer.overNestedControl;

  const move = (pointer: DwellPointer) => {
    if (!isMouseLike(pointer.pointerType)) return;
    inside = true;
    cancelReach();
    if (suppressed || open) return;
    if (!settles(pointer)) {
      cancel();
      rest = null;
      return;
    }
    if (cancelTimer !== null && rest
      && Math.abs(pointer.clientX - rest.x) <= REST_TOLERANCE_PX
      && Math.abs(pointer.clientY - rest.y) <= REST_TOLERANCE_PX) return;
    arm(pointer);
  };

  return {
    enter: (pointer) => {
      suppressed = false;
      move(pointer);
    },
    move,
  leave: (towardCard) => {
      inside = false;
      suppressed = false;
      if (!open || !towardCard) {
        close();
        return;
      }
      cancel();
      cancelReach();
      cancelReachTimer = after(CARD_REACH_MS, () => {
        cancelReachTimer = null;
        if (!inCard && !inside) close();
      });
    },
    cardEnter: () => {
      inCard = true;
      cancelReach();
    },
  cardLeave: (toRow) => {
      inCard = false;
      if (!toRow) close();
    },
    press: () => {
      suppressed = true;
      close();
    },
  show: () => {
      cancel();
      if (!open) open = onOpen();
    },
  interrupt: close,
  closed: () => {
      open = false;
      inCard = false;
      cancel();
      cancelReach();
      rest = null;
    },
    dispose: () => {
      cancel();
      cancelReach();
    },
  };
}
