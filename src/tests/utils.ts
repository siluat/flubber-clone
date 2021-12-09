export function inDelta(
  actual: number[][] | number[] | number,
  expected: number[][] | number[] | number,
  delta = 1e-6
) {
  if (Array.isArray(actual) && Array.isArray(expected)) {
    return inDeltaArray(actual, expected, delta);
  }

  if (typeof actual === "number" && typeof expected === "number") {
    return inDeltaNumber(actual, expected, delta);
  }

  return false;
}

function inDeltaArray(
  actual: number[] | number[][],
  expected: number[] | number[][],
  delta: number
) {
  var n = expected.length,
    i = -1;
  if (actual.length !== n) return false;
  while (++i < n) if (!inDelta(actual[i], expected[i], delta)) return false;
  return true;
}

function inDeltaNumber(actual: number, expected: number, delta: number) {
  return actual >= expected - delta && actual <= expected + delta;
}
