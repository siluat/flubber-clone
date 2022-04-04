import SVGPathCommander from "svg-path-commander";
import { svgPathProperties } from "svg-path-properties";
import { INVALID_INPUT } from "./errors";
import { isFiniteNumber } from "./math";
import { Ring } from "./types";

type PathStringToRingResult = {
  ring: Ring;
  skipBisect?: boolean;
};

export function toPathString(ring: Ring): string {
  return `M${ring.join("L")}Z`;
}

export function pathStringToRing(
  str: string,
  maxSegmentLength?: number
): PathStringToRingResult {
  const parsed = parse(str);
  return exactRing(parsed) || approximateRing(parsed, maxSegmentLength);
}

function parse(str: string) {
  return new SVGPathCommander(str, {}).toAbsolute();
}

function split(parsed: SVGPathCommander) {
  return parsed
    .toString()
    .split("M")
    .map((d, i) => {
      d = d.trim();
      return i && d ? "M" + d : d;
    })
    .filter((d) => d);
}

function exactRing(parsed: SVGPathCommander): PathStringToRingResult | false {
  const segments = parsed.segments || [];
  const ring: Ring = [];

  if (!segments.length || segments[0][0] !== "M") {
    return false;
  }

  for (let i = 0; i < segments.length; i++) {
    const [command, x, y] = segments[i];
    if ((command === "M" && i) || command === "Z") {
      break;
    } else if (command === "M" || command === "L") {
      ring.push([x as number, y as number]);
    } else if (command === "H") {
      ring.push([x as number, ring[ring.length - 1][1]]);
    } else if (command === "V") {
      ring.push([ring[ring.length - 1][0], x as number]);
    } else {
      return false;
    }
  }

  return ring.length ? { ring } : false;
}

function approximateRing(
  parsed: SVGPathCommander,
  maxSegmentLength?: number
): PathStringToRingResult {
  const ringPath = split(parsed)[0];
  const ring: Ring = [];
  let numPoints = 3;

  if (!ringPath) {
    throw new TypeError(INVALID_INPUT);
  }

  const properties = new svgPathProperties(ringPath);
  const length = properties.getTotalLength();

  if (
    maxSegmentLength &&
    isFiniteNumber(maxSegmentLength) &&
    maxSegmentLength > 0
  ) {
    numPoints = Math.max(numPoints, Math.ceil(length / maxSegmentLength));
  }

  for (let i = 0; i < numPoints; i++) {
    let p = properties.getPointAtLength((length * i) / numPoints);
    ring.push([p.x, p.y]);
  }

  return {
    ring,
    skipBisect: true,
  };
}
