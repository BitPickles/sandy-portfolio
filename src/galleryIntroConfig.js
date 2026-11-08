export const FLIGHT_DURATION_MS = 860;
export const FLIGHT_STAGGER_MS = 230;

// The alternating diagonals make a fast editorial flip-through, rather than
// nine cards moving down the same line. Distances are viewport-relative.
export const FLIGHT_PATHS = [
  [-84, -28, -7, -13, 92, 25, -10, 7],
  [86, 23, 9, 9, -91, -27, 9, -8],
  [-79, 31, -5, 15, 88, -23, -8, 9],
  [90, -33, 7, -8, -86, 30, 11, -7],
  [-88, -12, -4, 3, 85, 25, -7, 6],
  [82, 29, 8, 14, -92, -30, 8, -8],
  [-84, 19, -7, -5, 85, -16, -9, 7],
  [88, -30, 6, 8, -87, 24, 10, -8],
  [-79, 25, 1, -2, 91, -25, -7, 9],
];

export function flightDelayAt(index) {
  return index * FLIGHT_STAGGER_MS;
}

export const INTRO_DURATION_MS = flightDelayAt(FLIGHT_PATHS.length - 1) + FLIGHT_DURATION_MS;
