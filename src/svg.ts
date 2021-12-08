import { Ring } from "./types";

export function toPathString(ring: Ring): string {
  return `M${ring.join("L")}Z`;
}
