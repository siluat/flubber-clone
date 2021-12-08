import { toPathString } from "../svg";

test("toPathString", () => {
  const actual = toPathString([
    [0, 0],
    [1, 1],
    [2, 2],
  ]);

  expect(actual).toBe("M0,0L1,1L2,2Z");
});
