const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export function positiveModulo(value, modulus) {
  return ((value % modulus) + modulus) % modulus;
}

// Keep the camera within one repeated three-column/three-row tile. Because
// artwork repeats every three cells, the wrap is visually indistinguishable.
export function normalizeOffset(value, period) {
  if (!Number.isFinite(value) || !Number.isFinite(period) || period <= 0) return 0;
  return positiveModulo(value + period / 2, period) - period / 2;
}

export function projectIndexAt(row, column, mobile = false) {
  const columnOffset = mobile ? 0 : 1;
  return positiveModulo(row, 3) * 3 + positiveModulo(column + columnOffset, 3);
}

export function getGalleryLayout(viewportWidth) {
  const width = Math.max(320, viewportWidth || 1440);
  const mobile = width <= 600;
  let cardWidth;
  let gapX;
  let gapY;
  let top;

  if (mobile) {
    cardWidth = width - 36;
    gapX = 28;
    gapY = 24;
    top = 82;
  } else if (width <= 900) {
    cardWidth = clamp(width * 0.42, 315, 390);
    gapX = 65;
    gapY = 70;
    top = 50;
  } else {
    cardWidth = clamp(width * 0.32, 374, 655);
    gapX = clamp(width * 0.0755, 75, 158);
    gapY = clamp(width * 0.05, 65, 103);
    top = clamp(width * 0.0285, 38, 59);
  }

  const cardHeight = cardWidth / (mobile ? 1.45 : 1.493);
  return {
    width, mobile, cardWidth, cardHeight, gapX, gapY, top,
    stepX: cardWidth + gapX,
    stepY: cardHeight + gapY,
    originX: width / 2 - cardWidth / 2,
  };
}
