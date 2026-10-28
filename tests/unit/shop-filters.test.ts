import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { applyShopState, EMPTY_STATE, parseShopState, toQuery } from "../../lib/shop-filters";

const parse = (qs: string) => parseShopState(new URLSearchParams(qs));

describe("parseShopState", () => {
  it("reads categories case-insensitively and drops unknown values", () => {
    const s = parse("category=DRESSES,hats,tailoring&size=m,xxl&sort=bogus");
    assert.deepEqual(s.categories, ["dresses", "tailoring"]);
    assert.deepEqual(s.sizes, ["M"]);
    assert.equal(s.sort, "featured");
  });

  it("maps colour slugs back to colour labels", () => {
    assert.deepEqual(parse("color=rust-and-ivory,unknown").colors, ["Rust and ivory"]);
  });

  it("round-trips through toQuery", () => {
    const qs = "/shop?category=tailoring%2Cdresses&color=olive&q=midi&sort=price-asc";
    const state = parse(qs.split("?")[1]);
    assert.equal(toQuery(state), qs);
    assert.equal(toQuery(EMPTY_STATE), "/shop");
  });
});

describe("applyShopState", () => {
  it("filters by category and colour", () => {
    assert.equal(applyShopState(parse("category=everyday")).length, 4);
    assert.deepEqual(
      applyShopState(parse("category=dresses&color=olive")).map((p) => p.slug),
      ["olive-dress"],
    );
  });

  it("sorts by price and name", () => {
    const asc = applyShopState(parse("sort=price-asc")).map((p) => p.price);
    assert.deepEqual(asc, [...asc].sort((a, b) => a - b));
    const desc = applyShopState(parse("sort=price-desc")).map((p) => p.price);
    assert.deepEqual(desc, [...desc].sort((a, b) => b - a));
    const names = applyShopState(parse("sort=name")).map((p) => p.name);
    assert.deepEqual(names, [...names].sort((a, b) => a.localeCompare(b)));
  });

  it("combines search with filters", () => {
    assert.deepEqual(
      applyShopState(parse("q=ivory&category=tailoring")).map((p) => p.slug),
      ["rust-tailoring"],
    );
    assert.equal(applyShopState(parse("q=zzz")).length, 0);
  });
});
