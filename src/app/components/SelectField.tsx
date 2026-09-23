"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export type SelectOption = { value: string; label: string };

type SelectFieldProps = {
  id: string;
  /** Submitted under this name via a hidden input, so the control still works
   *  like a native <select> inside a plain form post. */
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder: string;
  invalid?: boolean;
  /** Field surface classes, passed in so this shares one definition with the
   *  text inputs instead of keeping a second copy that can drift. */
  className?: string;
  ariaLabel?: string;
};

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`size-4 shrink-0 text-ink-faint transition-transform duration-200 ${
        open ? "rotate-180" : ""
      }`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-4 shrink-0"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/**
 * A styled dropdown built on the ARIA listbox pattern.
 *
 * A native <select> cannot be restyled past its border — the option list is
 * drawn by the OS. This replaces it with real markup, and therefore has to
 * re-implement what the native control gave away for free: roles and state for
 * assistive tech, full keyboard operation (arrows, Home/End, Enter, Escape,
 * Tab), click-outside dismissal, and scrolling the focused option into view.
 *
 * Focus deliberately stays on the trigger and the active option is tracked with
 * `aria-activedescendant`, rather than moving DOM focus into the list — fewer
 * moving parts, and the trigger never loses its focus ring mid-interaction.
 */
export default function SelectField({
  id,
  name,
  value,
  onChange,
  options,
  placeholder,
  invalid,
  className = "",
  ariaLabel,
}: SelectFieldProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  const listId = `${id}-listbox`;
  const selectedIndex = options.findIndex((o) => o.value === value);
  const selected = selectedIndex >= 0 ? options[selectedIndex] : null;

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // A long list scrolls; the keyboard-focused option must follow.
  useEffect(() => {
    if (!open || activeIndex < 0) return;
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex]);

  function openList() {
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
    setOpen(true);
  }

  function commit(index: number) {
    const option = options[index];
    if (!option) return;
    onChange(option.value);
    setOpen(false);
    triggerRef.current?.focus();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    switch (e.key) {
      case "ArrowDown":
      case "ArrowUp": {
        e.preventDefault();
        if (!open) {
          openList();
          return;
        }
        const step = e.key === "ArrowDown" ? 1 : -1;
        setActiveIndex((i) => (i + step + options.length) % options.length);
        return;
      }
      case "Home":
        if (open) {
          e.preventDefault();
          setActiveIndex(0);
        }
        return;
      case "End":
        if (open) {
          e.preventDefault();
          setActiveIndex(options.length - 1);
        }
        return;
      case "Enter":
      case " ":
        e.preventDefault();
        if (open) commit(activeIndex);
        else openList();
        return;
      case "Escape":
        if (open) {
          e.preventDefault();
          setOpen(false);
        }
        return;
      case "Tab":
        // Let focus leave, but never leave an orphaned list open behind it.
        if (open) setOpen(false);
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        id={id}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-activedescendant={
          open && activeIndex >= 0 ? `${id}-opt-${activeIndex}` : undefined
        }
        aria-label={ariaLabel}
        aria-invalid={invalid || undefined}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className={`flex items-center justify-between gap-3 text-left ${className}`}
      >
        <span className={`truncate ${selected ? "text-ink" : "text-ink-faint"}`}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronIcon open={open} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            ref={listRef}
            id={listId}
            role="listbox"
            aria-label={ariaLabel}
            initial={reduce ? false : { opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-full z-30 mt-2 max-h-64 origin-top overflow-y-auto rounded-[14px] border border-border bg-surface p-1.5 shadow-[0_24px_60px_-16px_rgba(11,17,32,0.3)]"
          >
            {options.map((option, i) => {
              const isSelected = option.value === value;
              const isActive = i === activeIndex;
              return (
                <li
                  key={option.value}
                  id={`${id}-opt-${i}`}
                  data-index={i}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => commit(i)}
                  className={`flex cursor-pointer items-center justify-between gap-3 rounded-[10px] px-3.5 py-2.5 text-[14.5px] transition-colors ${
                    isActive
                      ? "bg-accent text-white"
                      : isSelected
                        ? "bg-accent/[0.08] text-accent"
                        : "text-ink"
                  }`}
                >
                  <span className="truncate">{option.label}</span>
                  {isSelected && <CheckIcon />}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>

      <input type="hidden" name={name} value={value} />
    </div>
  );
}
