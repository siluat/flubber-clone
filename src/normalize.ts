import { isFiniteNumber } from "./math";
import { Ring } from "./types";

function validRing(ring: Ring): boolean {
  return ring.every(
    (point) =>
      Array.isArray(point) &&
      point.length >= 2 &&
      isFiniteNumber(point[0]) &&
      isFiniteNumber(point[1])
  );
}
