import { distance, pointAlong } from "./math";
import { Ring } from "./types";

export function bisect(ring: Ring, maxSegmentLength = Infinity) {
  for (let i = 0; i < ring.length; i++) {
    let a = ring[i];
    let b = i === ring.length - 1 ? ring[0] : ring[i + 1];

    while (distance(a, b) > maxSegmentLength) {
      b = pointAlong(a, b, 0.5);
      ring.splice(i + 1, 0, b);
    }
  }
}
