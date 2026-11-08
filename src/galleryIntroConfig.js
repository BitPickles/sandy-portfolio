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

// Delay, duration, vertical lane (%), vertical drift (vh), and relative size.
export const SWEEP_FLIGHTS = [
  [0, 480, 50, -5, 1.1],
  [65, 420, 23, 4, .78],
  [105, 440, 76, -6, .85],
  [305, 470, 38, 7, 1],
  [368, 440, 74, 3, .8],
  [475, 440, 21, -4, .72],
  [645, 420, 74, -7, .8],
  [710, 430, 25, 7, .82],
  [795, 505, 50, -3, 1.12],
];

export const SWEEP_DURATION_MS = Math.max(...SWEEP_FLIGHTS.map(([delay, duration]) => delay + duration));
