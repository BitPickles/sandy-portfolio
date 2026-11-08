export const FLIGHT_DURATION_MS = 860;
export const INTRO_DURATION_MS = 2700;

// Alternating diagonals give the opening its rhythm. Distances are viewport-relative.
export const FLIGHT_PATHS = [
  [-84, -28, -7, -13, 92, 25, -10, 7],
  [86, 23, 9, 9, -91, -27, 9, -8],
  [-79, 31, -5, 15, 88, -23, -8, 9],
  [90, -33, 7, -8, -86, 30, 11, -7],
  [-88, -12, -4, 3, 85, 25, -7, 6],
  [82, 29, 8, 14, -92, -30, 8, -8],
  [-84, 19, -7, -5, 85, -16, -9, 7],
  [88, -30, 6, 8, -87, 24, 10, -8],
];

export function flightDelayAt(index) {
  const lastStart = INTRO_DURATION_MS - FLIGHT_DURATION_MS;
  return Math.round(index * lastStart / (FLIGHT_PATHS.length - 1));
}
