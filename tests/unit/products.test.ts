import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { getProduct, isSize, PRODUCTS, relatedTo, searchProducts } from "../../lib/products";

describe("catalogue", () => {
  it("has eight looks with unique slugs and mapped front/back/detail images", () => {
    assert.equal(PRODUCTS.length, 8);
    assert.equal(new Set(PRODUCTS.map((p) => p.slug)).size, 8);
    for (const p of PRODUCTS) {
      assert.equal(p.front.src, `/images/product-${p.slug}.png`);
      assert.equal(p.back.src, `/images/product-${p.slug}-back.png`);
      assert.equal(p.detail.src, `/images/product-${p.slug}-detail.png`);
    }
  });

  it("looks up products by slug", () => {
    assert.equal(getProduct("olive-dress")?.name, "The Olive Midi Dress");
    assert.equal(getProduct("nope"), undefined);
  });

  it("only accepts the sample sizes", () => {
    assert.ok(isSize("M"));
    assert.ok(!isSize("m"));
    assert.ok(!isSize("XXL"));
    assert.ok(!isSize(3));
  });
});

describe("searchProducts", () => {
  it("matches colour labels case-insensitively", () => {
    const slugs = searchProducts("IVORY").map((p) => p.slug);
    assert.deepEqual(slugs.sort(), ["ivory-cardigan", "rust-tailoring", "striped-shirt"]);
  });

  it("matches categories and requires every term", () => {
    assert.equal(searchProducts("dresses").length, 2);
    assert.deepEqual(
      searchProducts("trench sand").map((p) => p.slug),
      ["sand-trench"],
    );
    assert.equal(searchProducts("trench olive").length, 0);
  });

  it("returns nothing for an empty query", () => {
    assert.deepEqual(searchProducts("   "), []);
  });
});

describe("relatedTo", () => {
  it("puts the same category first and never includes the current look", () => {
    const related = relatedTo("rust-tailoring");
    assert.equal(related.length, 4);
    assert.equal(related[0].slug, "sand-trench");
    assert.ok(related.every((p) => p.slug !== "rust-tailoring"));
  });
});
