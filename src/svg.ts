import SVGPathCommander from "svg-path-commander";

import { Ring } from "./types";

export function toPathString(ring: Ring): string {
  return `M${ring.join("L")}Z`;
}

export function pathStringToRing(str: string, maxSegmentLength: number) {
  const parsed = parse(str);
  return (
    exactRing(parsed) || {
      ring: [],
      skipBisect: true,
    }
  );
}

function parse(str: string) {
  return new SVGPathCommander(str, {}).toAbsolute();
}

function exactRing(parsed: SVGPathCommander) {
  const segments = parsed.segments || [];
  const ring: any[] = [];

  if (!segments.length || segments[0][0] !== "M") {
    return false;
  }

  for (let i = 0; i < segments.length; i++) {
    let [command, x, y] = segments[i];
    if ((command === "M" && i) || command === "Z") {
      break;
    } else if (command === "M" || command === "L") {
      ring.push([x, y]);
    } else if (command === "H") {
      ring.push([x, ring[ring.length - 1][1]]);
    } else if (command === "V") {
      ring.push([ring[ring.length - 1][0], x]);
    } else {
      return false;
    }
  }

  return ring.length ? { ring } : false;
}
