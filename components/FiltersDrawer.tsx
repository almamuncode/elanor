"use client";

import { useMemo, useState } from "react";
import { ALL_COLORS, CATEGORIES, countIn, SIZES, type Category, type Size } from "@/lib/products";
import { activeFilterCount, applyShopState, EMPTY_STATE, SORTS, type ShopState } from "@/lib/shop-filters";
import Dialog from "./Dialog";
import { CloseIcon } from "./Icons";

interface FiltersDrawerProps {
  open: boolean;
  state: ShopState;
  onClose: () => void;
  onApply: (next: ShopState) => void;
}

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

/** Filter & sort drawer. Changes are a draft until "Show N looks" is pressed. */
export default function FiltersDrawer({ open, state, onClose, onApply }: FiltersDrawerProps) {
  const [draft, setDraft] = useState<ShopState>(state);
  const count = useMemo(() => applyShopState(draft).length, [draft]);
  const active = activeFilterCount(draft);

  const close = () => {
    setDraft(state);
    onClose();
  };

  return (
    <Dialog open={open} onClose={close} variant="drawer" labelledBy="filters-title">
      <div className="panel__head">
        <h2 className="label" id="filters-title" style={{ margin: 0 }}>
          Filter &amp; sort {active > 0 && <span className="muted">({active})</span>}
        </h2>
        <button type="button" className="close" onClick={close} aria-label="Close filters">
          <CloseIcon />
        </button>
      </div>
      <div className="panel__body">
        <fieldset className="fgroup" style={{ border: 0, margin: 0, borderBottom: "1px solid var(--rule)" }}>
          <legend className="label" style={{ padding: 0, marginBottom: 10 }}>
            Sort by
          </legend>
          {SORTS.map((s) => (
            <label className="check" key={s.value}>
              <input type="radio" name="sort" value={s.value} checked={draft.sort === s.value} onChange={() => setDraft({ ...draft, sort: s.value })} />
              <span className={draft.sort === s.value ? "radio is-on" : "radio"} aria-hidden="true" />
              {s.label}
            </label>
          ))}
        </fieldset>

        <fieldset className="fgroup" style={{ border: 0, margin: 0, borderBottom: "1px solid var(--rule)" }}>
          <legend className="label" style={{ padding: 0, marginBottom: 10 }}>
            Category
          </legend>
          {CATEGORIES.map((c) => {
            const on = draft.categories.includes(c.slug);
            return (
              <label className="check" key={c.slug}>
                <input type="checkbox" checked={on} onChange={() => setDraft({ ...draft, categories: toggle<Category>(draft.categories, c.slug) })} />
                <span className={on ? "box is-on" : "box"} aria-hidden="true" />
                {c.label}
                <span className="count">{countIn(c.slug)}</span>
              </label>
            );
          })}
        </fieldset>

        <fieldset className="fgroup" style={{ border: 0, margin: 0, borderBottom: "1px solid var(--rule)" }}>
          <legend className="label" style={{ padding: 0, marginBottom: 10 }}>
            Size
          </legend>
          <div className="chips">
            {SIZES.map((z) => {
              const on = draft.sizes.includes(z);
              return (
                <button key={z} type="button" className="chip" aria-pressed={on} onClick={() => setDraft({ ...draft, sizes: toggle<Size>(draft.sizes, z) })}>
                  {z}
                </button>
              );
            })}
          </div>
          <p className="hint" style={{ marginTop: 10, marginBottom: 0 }}>
            Sample sizes. Real availability will come from inventory.
          </p>
        </fieldset>

        <fieldset className="fgroup" style={{ border: 0, margin: 0 }}>
          <legend className="label" style={{ padding: 0, marginBottom: 10 }}>
            Colour
          </legend>
          {ALL_COLORS.map((c) => {
            const on = draft.colors.includes(c.label);
            return (
              <label className="check" key={c.label}>
                <input type="checkbox" checked={on} onChange={() => setDraft({ ...draft, colors: toggle(draft.colors, c.label) })} />
                <span className={on ? "box is-on" : "box"} aria-hidden="true" />
                <span className="swatch" style={{ background: c.swatch }} aria-hidden="true" />
                {c.label}
                <span className="count">1</span>
              </label>
            );
          })}
        </fieldset>
      </div>
      <div className="panel__foot">
        <div className="foot-row">
          <button type="button" className="clear" onClick={() => setDraft({ ...EMPTY_STATE })}>
            Clear all
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => {
              onApply(draft);
              onClose();
            }}
          >
            {count === 0 ? "No looks match" : `Show ${count} ${count === 1 ? "look" : "looks"}`}
          </button>
        </div>
      </div>
    </Dialog>
  );
}
