import { inDelta } from "./utils";
import { pathStringToRing, toPathString } from "../svg";

test("toPathString", () => {
  const actual = toPathString([
    [0, 0],
    [1, 1],
    [2, 2],
  ]);

  expect(actual).toBe("M0,0L1,1L2,2Z");
});

describe("pathStringToRing", () => {
  test("general", () => {
    let square = "M0,0L100,0L100,100L0,100Z";
    const halfcircle = "M0,0 A50,50,0,0,0,100,0Z";
    const actual = pathStringToRing(halfcircle, 50).ring;

    expect(
      inDelta(
        actual,
        [
          [0, 0],
          [17.25457763671875, 37.80250930786133],
          [57.125911712646484, 49.49604034423828],
          [92.07535552978516, 27.02345085144043],
          [85.70057678222656, -0.000012940427041030489],
          [42.85029602050781, -0.000006470214884757297],
        ],
        0.5
      )
    ).toBe(true);
  });
});
