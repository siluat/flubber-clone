import { polygonArea } from "d3-polygon";
import { bisect } from "./add";
import { INVALID_INPUT } from "./errors";
import { isFiniteNumber, samePoint } from "./math";
import { pathStringToRing } from "./svg";
import { Ring } from "./types";

export default function normalizeRing(
  ring: string | Ring,
  maxSegmentLength?: number
): Ring {
  let targetRing: Ring;
  let skipBisect: boolean = false;
  if (typeof ring === "string") {
    const converted = pathStringToRing(ring, maxSegmentLength);
    targetRing = converted.ring;
    skipBisect = converted.skipBisect || false;
  } else {
    targetRing = ring;
  }

  const points = targetRing.slice(0);

  if (!validRing(points)) {
    throw new TypeError(INVALID_INPUT);
  }

  if (points.length > 1 && samePoint(points[0], points[points.length - 1])) {
    points.pop();
  }

  const area = polygonArea(points);

  // 링을 시계방향으로
  // WHY?: 시계방량으로 바꾸는 이유는?
  if (area > 0) {
    points.reverse();
  }

  if (
    !skipBisect &&
    maxSegmentLength &&
    isFiniteNumber(maxSegmentLength) &&
    maxSegmentLength > 0
  ) {
    // WHY?: bisect 처리가 필요한 이유는?
    bisect(points, maxSegmentLength);
  }

  return points;
}

function validRing(ring: Ring): boolean {
  return ring.every(
    (point) =>
      Array.isArray(point) &&
      point.length >= 2 &&
      isFiniteNumber(point[0]) &&
      isFiniteNumber(point[1])
  );
}
