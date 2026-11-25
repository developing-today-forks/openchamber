import React from 'react';
import { useI18n } from '@/lib/i18n';
import { afterDelay } from '@/lib/timing/afterDelay';
import { createHoverCardDwell, type DwellPointer } from '@/components/session/sidebar/sessions/sessionHoverCardDwell';
import { decideHoverCardPlacement, type HoverCardPlacement } from '@/components/session/sidebar/sessions/sessionHoverCardPlacement';

const NESTED_CONTROL = 'button, a, input, textarea, [data-slot="tooltip-trigger"]:not([data-session-row-main])';

const SESSION_LIST_BOUNDS_ATTRIBUTE = 'data-session-list-bounds';
const SESSION_HOVER_CARD_ATTRIBUTE = 'data-session-hover-card';

const pointerOf = (event: React.PointerEvent<HTMLElement>): DwellPointer => ({
  pointerType: event.pointerType,
  clientX: event.clientX,
  clientY: event.clientY,
  buttons: event.buttons,
  modifier: event.shiftKey || event.ctrlKey || event.altKey || event.metaKey,
  overNestedControl: event.target instanceof Element && event.target.closest(NESTED_CONTROL) !== null,
});

const isFocusVisible = (element: Element) => {
  try {
    return element.matches(':focus-visible');
  } catch {
    return false;
  }
};

export function useSessionHoverCard(enabled: boolean) {
  const { direction } = useI18n();
  const rowRef = React.useRef<HTMLDivElement | null>(null);
  const cardRef = React.useRef<HTMLDivElement | null>(null);
  const [placement, setPlacement] = React.useState<HoverCardPlacement | null>(null);
  const placementRef = React.useRef(placement);
  placementRef.current = placement;
  const measureRef = React.useRef<() => HoverCardPlacement | null>(() => null);
  measureRef.current = () => {
    const row = rowRef.current;
    if (!row) return null;
    const list = row.closest(`[${SESSION_LIST_BOUNDS_ATTRIBUTE}]`) ?? row;
    return decideHoverCardPlacement({
      list: list.getBoundingClientRect(),
      row: row.getBoundingClientRect(),
      viewportWidth: document.documentElement.clientWidth,
      endSide: direction === 'rtl' ? 'left' : 'right',
    });
  };

  const [dwell] = React.useState(() => createHoverCardDwell({
    after: afterDelay,
    onOpen: () => {
      const next = measureRef.current();
      setPlacement(next);
      return next !== null;
    },
    onClose: () => setPlacement(null),
  }));
  const unwatchRef = React.useRef<(() => void) | null>(null);
  const watch = React.useCallback(() => {
    if (unwatchRef.current) return;
    const onScroll = (event: Event) => {
      const row = rowRef.current;
      if (row && event.target instanceof Node && event.target.contains(row)) dwell.interrupt();
    };
    const interrupt = () => dwell.interrupt();
    const onKey = (event: KeyboardEvent) => {
      if (event.target instanceof Element && event.target.closest(`[${SESSION_HOVER_CARD_ATTRIBUTE}]`)) return;
      dwell.interrupt();
    };
    const scrollOptions = { capture: true, passive: true } as const;
    document.addEventListener('scroll', onScroll, scrollOptions);
    document.addEventListener('keydown', onKey, true);
    window.addEventListener('resize', interrupt);
    window.addEventListener('blur', interrupt);
    unwatchRef.current = () => {
      document.removeEventListener('scroll', onScroll, scrollOptions);
      document.removeEventListener('keydown', onKey, true);
      window.removeEventListener('resize', interrupt);
      window.removeEventListener('blur', interrupt);
    };
  }, [dwell]);
  const unwatch = React.useCallback(() => {
    unwatchRef.current?.();
    unwatchRef.current = null;
  }, []);
  const insideRef = React.useRef(false);

  React.useEffect(() => {
    if (placement === null && !insideRef.current) unwatch();
  }, [placement, unwatch]);
  React.useEffect(() => {
    if (enabled) return;
    dwell.interrupt();
    unwatch();
  }, [enabled, dwell, unwatch]);
  React.useEffect(() => () => {
    dwell.dispose();
    unwatch();
  }, [dwell, unwatch]);
  const fromRow = (event: React.SyntheticEvent<HTMLElement>) => event.target instanceof Node && event.currentTarget.contains(event.target);

  const rowHandlers = {
    onPointerEnter: (event: React.PointerEvent<HTMLDivElement>) => {
      if (!enabled || !fromRow(event)) return;
      insideRef.current = true;
      watch();
      dwell.enter(pointerOf(event));
    },
    onPointerMove: (event: React.PointerEvent<HTMLDivElement>) => {
      if (enabled && fromRow(event)) dwell.move(pointerOf(event));
    },
    onPointerLeave: (event: React.PointerEvent<HTMLDivElement>) => {
      insideRef.current = false;
      const open = placementRef.current;
      const rect = event.currentTarget.getBoundingClientRect();
      const card = cardRef.current?.getBoundingClientRect();
      const towardCard = open !== null && card !== undefined
        && (open.side === 'right' ? event.clientX >= rect.right - 2 : event.clientX <= rect.left + 2)
        && event.clientY >= card.top && event.clientY <= card.bottom;
      dwell.leave(towardCard);
      if (!towardCard) unwatch();
    },
    onPointerDown: (event: React.PointerEvent<HTMLDivElement>) => {
      if (fromRow(event)) dwell.press();
    },
  };

  const focusHandlers = {
    onFocus: (event: React.FocusEvent<HTMLElement>) => {
      if (!enabled || event.target !== event.currentTarget || !isFocusVisible(event.currentTarget)) return;
      watch();
      dwell.show();
    },
    onBlur: (event: React.FocusEvent<HTMLElement>) => {
      if (event.target !== event.currentTarget) return;
      if (event.relatedTarget instanceof Element && event.relatedTarget.closest(`[${SESSION_HOVER_CARD_ATTRIBUTE}]`)) return;
      dwell.interrupt();
      if (!insideRef.current) unwatch();
    },
  };
  const keepInCard = (event: React.SyntheticEvent) => event.stopPropagation();
  const cardHandlers = {
    ref: cardRef,
    onPointerDown: keepInCard,
    onMouseDown: keepInCard,
    onClick: keepInCard,
    onDoubleClick: keepInCard,
    onContextMenu: keepInCard,
    onTouchStart: keepInCard,
    onTouchMove: keepInCard,
    onTouchEnd: keepInCard,
    onPointerEnter: () => dwell.cardEnter(),
    onPointerLeave: (event: React.PointerEvent<HTMLElement>) => {
      const row = rowRef.current;
      dwell.cardLeave(Boolean(row && event.relatedTarget instanceof Node && row.contains(event.relatedTarget)));
    },
  };

  const onOpenChange = React.useCallback((open: boolean) => {
    if (open) return;
    dwell.closed();
    setPlacement(null);
  }, [dwell]);

  return { rowRef, placement: enabled ? placement : null, rowHandlers, focusHandlers, cardHandlers, onOpenChange };
}
