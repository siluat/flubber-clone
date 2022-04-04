import * as shapes from "./shapes";
import { bisect } from "../add";

describe("bisect", () => {
  it("Bisect segments", () => {
    const added = shapes.square1();
    const rect = shapes.rect();
    const once = [
      [0, 0],
      [50, 0],
      [100, 0],
      [100, 50],
      [100, 100],
      [50, 100],
      [0, 100],
      [0, 50],
    ];
    const twice = [
      [0, 0],
      [25, 0],
      [50, 0],
      [75, 0],
      [100, 0],
      [100, 25],
      [100, 50],
      [100, 75],
      [100, 100],
      [75, 100],
      [50, 100],
      [25, 100],
      [0, 100],
      [0, 75],
      [0, 50],
      [0, 25],
    ];

    bisect(added, 150);

    expect(added).toStrictEqual(shapes.square1());

    bisect(added, 75);

    expect(added).toStrictEqual(once);

    bisect(added, 50);

    expect(added).toStrictEqual(once);

    bisect(added, 49);

    expect(added).toStrictEqual(twice);

    bisect(added, 25);

    expect(added).toStrictEqual(twice);

    bisect(rect, 30);

    expect(rect).toStrictEqual([
      [0, 0],
      [1, 0],
      [1, 25],
      [1, 50],
      [1, 75],
      [1, 100],
      [0, 100],
      [0, 75],
      [0, 50],
      [0, 25],
    ]);
  });
});
