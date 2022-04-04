import normalizeRing from "../normalize";
import { Ring } from "../types";
import * as shapes from "./shapes";

describe("normalizeRing", () => {
  test("No closing point", () => {
    const square: Ring = shapes.square1();
    const closed: Ring = [...square, square[0]];
    const fuzzy: Ring = [...square, [0, 1e-12]];
    const normalized: Ring = normalizeRing(square);

    expect(square).not.toBe(normalized);
    expect(square).toEqual(normalized);

    expect(closed).not.toEqual(normalized);
    closed.pop();
    expect(closed).toEqual(normalized);

    expect(fuzzy).not.toEqual(normalized);
    fuzzy.pop();
    expect(fuzzy).toEqual(normalized);
  });

  test("Matching order", () => {
    const square: Ring = shapes.square1();
    const reversed: Ring = shapes.square1().reverse();
    const reversedClosed: Ring = [...reversed, reversed[0]];

    expect(square).toEqual(normalizeRing(square));

    expect(square).toEqual(normalizeRing(reversed));
    expect(square).toEqual(normalizeRing(reversedClosed));
  });

  test("Bisect", () => {
    // No bisecting zero-length segments

    expect(normalizeRing([[0, 0]], 1e-6)).toEqual([[0, 0]]);

    expect(
      normalizeRing(
        [
          [0, 0],
          [0, 0],
          [0, 0],
        ],
        1e-6
      )
    ).toEqual([
      [0, 0],
      [0, 0],
    ]);

    expect(
      normalizeRing(
        [
          [0, 0],
          [0, 0],
          [1, 0],
        ],
        0.6
      )
    ).toEqual([
      [0, 0],
      [0, 0],
      [0.5, 0],
      [1, 0],
      [0.5, 0],
    ]);

    expect(
      normalizeRing(
        [
          [0, 0],
          [1, 0],
        ],
        0.6
      )
    ).toEqual([
      [0, 0],
      [0.5, 0],
      [1, 0],
      [0.5, 0],
    ]);
  });
});
