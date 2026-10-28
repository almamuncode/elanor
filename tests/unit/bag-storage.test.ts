import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { lineKey, MAX_QTY, parseBag, parseSaved, safeParse } from "../../lib/bag-storage";

const line = { slug: "olive-dress", color: "Olive", size: "M", qty: 1 };

describe("parseBag", () => {
  it("keeps valid lines", () => {
    assert.deepEqual(parseBag([line]), [line]);
  });

  it("rejects unknown products, wrong colours, invalid sizes and quantities", () => {
    const bad = [
      { ...line, slug: "ghost" },
      { ...line, color: "Red" },
      { ...line, size: "XXL" },
      { ...line, qty: 0 },
      { ...line, qty: 1.5 },
      { ...line, qty: MAX_QTY + 1 },
      "olive-dress",
      null,
    ];
    assert.deepEqual(parseBag(bad), []);
  });

  it("merges duplicate lines and caps the quantity", () => {
    const merged = parseBag([
      { ...line, qty: 7 },
      { ...line, qty: 6 },
    ]);
    assert.equal(merged.length, 1);
    assert.equal(merged[0].qty, MAX_QTY);
  });

  it("keeps different sizes as separate lines", () => {
    const lines = parseBag([line, { ...line, size: "S" }]);
    assert.equal(lines.length, 2);
    assert.notEqual(lineKey(lines[0]), lineKey(lines[1]));
  });

  it("returns an empty bag for anything that is not an array", () => {
    assert.deepEqual(parseBag({ lines: [line] }), []);
    assert.deepEqual(parseBag(null), []);
  });
});

describe("parseSaved", () => {
  it("keeps known slugs once", () => {
    assert.deepEqual(parseSaved(["olive-dress", "ghost", 5, "olive-dress", "sand-trench"]), ["olive-dress", "sand-trench"]);
  });
});

describe("safeParse", () => {
  it("turns unreadable JSON into null", () => {
    assert.equal(safeParse("{not json"), null);
    assert.equal(safeParse(null), null);
    assert.deepEqual(safeParse("[1]"), [1]);
  });
});
