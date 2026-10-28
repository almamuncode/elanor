"use client";

import { MAX_QTY } from "@/lib/store";
import { MinusIcon, PlusIcon } from "./Icons";

interface QuantityProps {
  value: number;
  onChange: (next: number) => void;
  label: string;
  small?: boolean;
}

export default function Quantity({ value, onChange, label, small }: QuantityProps) {
  return (
    <span className={small ? "qty qty--s" : "qty"} role="group" aria-label={label}>
      <button type="button" onClick={() => onChange(value - 1)} disabled={value <= 1} aria-label="Decrease quantity">
        <MinusIcon />
      </button>
      <span aria-live="polite" aria-atomic="true">
        <span className="sr-only">Quantity </span>
        {value}
      </span>
      <button type="button" onClick={() => onChange(value + 1)} disabled={value >= MAX_QTY} aria-label="Increase quantity">
        <PlusIcon />
      </button>
    </span>
  );
}
