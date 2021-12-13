export function isFiniteNumber(number: number) {
  return typeof number === "number" && isFinite(number);
}
