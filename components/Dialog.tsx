"use client";

import { useEffect, useRef, type ReactNode, type RefObject } from "react";
import { createPortal } from "react-dom";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex]:not([tabindex="-1"])';

export type DialogVariant = "full" | "search" | "drawer" | "sheet" | "viewer";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  /** id of the element that names the dialog */
  labelledBy?: string;
  label?: string;
  variant: DialogVariant;
  /** element to focus on open; defaults to the first focusable element */
  initialFocus?: RefObject<HTMLElement | null>;
  showScrim?: boolean;
  children: ReactNode;
}

/**
 * Modal primitive: portal to <body>, focus trap, Escape and scrim close,
 * focus restore to the opener, background scroll lock and `inert` on the page.
 */
export default function Dialog({ open, onClose, labelledBy, label, variant, initialFocus, showScrim = true, children }: DialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const site = document.getElementById("site");
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    const scrollbar = window.innerWidth - root.clientWidth;
    root.style.overflow = "hidden";
    if (scrollbar > 0) root.style.paddingRight = `${scrollbar}px`;
    site?.setAttribute("inert", "");

    const panel = panelRef.current;
    const focusFirst = () => {
      const target = initialFocus?.current ?? panel?.querySelector<HTMLElement>(FOCUSABLE) ?? panel;
      target?.focus({ preventScroll: true });
    };
    const raf = requestAnimationFrame(focusFirst);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const items = [...panel.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((el) => el.offsetParent !== null || el === document.activeElement);
      if (items.length === 0) {
        e.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && (document.activeElement === first || !panel.contains(document.activeElement))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey, true);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKey, true);
      root.style.overflow = prevOverflow;
      root.style.paddingRight = "";
      site?.removeAttribute("inert");
      if (opener && document.contains(opener)) opener.focus({ preventScroll: true });
    };
  }, [open, initialFocus]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="ovl">
      {showScrim && <div className="ovl__scrim" onClick={onClose} aria-hidden="true" />}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-label={labelledBy ? undefined : label}
        tabIndex={-1}
        className={variant === "viewer" ? "viewer" : `panel panel--${variant}`}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
