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
  const halfcircle = "M0,0 A50,50,0,0,0,100,0Z";

  test("general", () => {
    const bezier =
      "M636.5,315c-0.4-18.7,1.9-27.9-5.3-35.9c-22.7-25-107.3-2.8-118.3,35.9c-7,24.4,20.6,37.2,16,71c-4,29.6-30.8,60.7-56.5,61.1c-30.8,0.4-32.9-43.8-81.7-70.2c-50.9-27.6-110.1-12.9-125.2-9.2c-66.1,16.4-82.2,56.9-109.2,47.3c-38-13.6-55.9-112.1-19.8-143.5c39-34,121.2,27.7,148.1-3.8c18-21.1,3.1-74.3-25.2-105.3c-31.1-34.1-70.1-32.4-105.3-76.3c-8.2-10.2-16.9-23.8-15.3-39.7c1.2-11.4,7.5-23.3,15.3-29c33.8-25,101.6,62.6,193.1,59.5c40.1-1.3,38.7-18.5,99.2-38.9c126.2-42.6,242.4-4.9,297.7,13c54.7,17.7,105.4,35,129.8,82.4c13,25.3,22.9,67.7,4.6,87c-11.6,12.3-25.1,5.1-46.6,20.6c-2.8,2-28.9,21.4-32.1,49.6c-3.1,27.4,18.7,35,29,70.2c8.8,30.1,8.5,77.8-18.3,99.2c-32.3,25.8-87,0.6-100-5.3c-69.6-32-67.2-88.4-73.3-109.2z";

    expect(
      inDelta(
        pathStringToRing(halfcircle, 50).ring,
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

    expect(
      inDelta(
        pathStringToRing(bezier, 600).ring,
        [
          [636.5, 315],
          [287.3954162597656, 363.1767578125],
          [271.6760559082031, 178.45318603515625],
          [457.7559814453125, 34.372894287109375],
          [866.4840698242188, 227.6297607421875],
        ],
        0.5
      )
    ).toBe(true);
  });

  test("preserve", () => {
    const square1 = "M0,0L100,0L100,100L0,100Z";
    const square2 = "M0,0H100V100H0Z";
    const square3 = "M0,0h100v100h-100Z";

    const original = [
      [0, 0],
      [100, 0],
      [100, 100],
      [0, 100],
    ];

    expect(pathStringToRing(square1, 125).ring).toStrictEqual(original);
    expect(pathStringToRing(square2, 125).ring).toStrictEqual(original);
    expect(pathStringToRing(square3, 125).ring).toStrictEqual(original);

    // Not bisected
    expect(pathStringToRing(square1, 90).ring).toStrictEqual(original);
    expect(pathStringToRing(square2, 90).ring).toStrictEqual(original);
    expect(pathStringToRing(square3, 90).ring).toStrictEqual(original);
  });

  test("pathStringToRing produces at least 3 points", () => {
    const infinite = pathStringToRing(halfcircle, Infinity).ring;
    const tooBig = pathStringToRing(halfcircle, 100000).ring;

    expect(infinite).toStrictEqual(tooBig);
    expect(Array.isArray(infinite)).toBe(true);
    expect(infinite.length).toBe(3);
    expect(infinite.every((d) => Array.isArray(d) && d.length === 2)).toBe(
      true
    );
  });
});
