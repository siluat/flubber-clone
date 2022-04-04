import { Point } from "./types";

export function distance(a: Point, b: Point): number {
  return Math.sqrt(
    (a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1])
  );
}

export function pointAlong(a: Point, b: Point, pct: number): Point {
  return [a[0] + (b[0] - a[0]) * pct, a[1] + (b[1] - a[1]) * pct];
}

/**
 * 두 점이 근사적으로 같은 위치인지 확인
 */
export function samePoint(a: Point, b: Point): boolean {
  return distance(a, b) < 1e-9;
}

export function isFiniteNumber(number: number): boolean {
  return typeof number === "number" && isFinite(number);
}
