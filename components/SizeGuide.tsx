"use client";

import { useState } from "react";
import { SIZE_GUIDE, type Size } from "@/lib/products";
import Dialog from "./Dialog";
import { CloseIcon } from "./Icons";

const toIn = (cm: number) => (cm / 2.54).toFixed(1);

export default function SizeGuide({ open, onClose, selected }: { open: boolean; onClose: () => void; selected: Size | null }) {
  const [unit, setUnit] = useState<"cm" | "in">("cm");
  return (
    <Dialog open={open} onClose={onClose} variant="sheet" labelledBy="size-guide-title">
      <div className="sheet-grip" aria-hidden="true" />
      <div className="panel__head">
        <h2 className="d-s" id="size-guide-title" style={{ fontSize: 30, paddingTop: 4 }}>
          Size guide
        </h2>
        <button type="button" className="close" onClick={onClose} aria-label="Close size guide">
          <CloseIcon />
        </button>
      </div>
      <div className="panel__body">
        <div className="note" style={{ marginBottom: 18 }}>
          Illustrative measurements for this concept demo only. They are not a real fit specification. Garment measurements will be added before sale.
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span className="label">Body measurements</span>
          <span className="seg" role="group" aria-label="Units">
            <button type="button" aria-pressed={unit === "cm"} onClick={() => setUnit("cm")}>
              cm
            </button>
            <button type="button" aria-pressed={unit === "in"} onClick={() => setUnit("in")}>
              in
            </button>
          </span>
        </div>
        <table className="sz">
          <caption className="sr-only">Illustrative body measurements in {unit === "cm" ? "centimetres" : "inches"}</caption>
          <thead>
            <tr>
              <th scope="col">Size</th>
              <th scope="col">Bust</th>
              <th scope="col">Waist</th>
              <th scope="col">Hip</th>
            </tr>
          </thead>
          <tbody>
            {SIZE_GUIDE.map((r) => (
              <tr key={r.size} className={r.size === selected ? "is-sel" : undefined} aria-current={r.size === selected ? "true" : undefined}>
                <th scope="row" style={{ fontWeight: 400, color: "var(--ink)", font: "inherit" }}>
                  {r.size}
                </th>
                <td>{unit === "cm" ? r.bust : toIn(r.bust)}</td>
                <td>{unit === "cm" ? r.waist : toIn(r.waist)}</td>
                <td>{unit === "cm" ? r.hip : toIn(r.hip)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="body-s muted" style={{ marginTop: 18 }}>
          How to measure: keep the tape level and close to the body without pulling. If you&apos;re between sizes, size up for a relaxed fit.
        </p>
      </div>
    </Dialog>
  );
}
