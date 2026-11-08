import test from 'node:test';
import assert from 'node:assert/strict';
import { GALLERY_TILE_COLUMNS, GALLERY_TILE_ROWS, getGalleryLayout, normalizeOffset, positiveModulo, projectIndexAt } from '../src/infiniteCanvasMath.js';
import { FLIGHT_DURATION_MS, FLIGHT_PATHS, INTRO_DURATION_MS, flightDelayAt } from '../src/galleryIntroConfig.js';

test('a four-by-two tile contains all eight covers exactly once', () => {
  const projects = [];
  for (let row = 0; row < GALLERY_TILE_ROWS; row++) {
    for (let col = -1; col < GALLERY_TILE_COLUMNS - 1; col++) projects.push(projectIndexAt(row, col));
  }
  assert.deepEqual(projects, [0, 1, 2, 3, 4, 5, 6, 7]);
});

test('seamless repeats on either axis even for negative coordinates', () => {
  for (let row = -10; row <= 10; row++) {
    for (let col = -10; col <= 10; col++) {
      assert.equal(projectIndexAt(row, col), projectIndexAt(row + GALLERY_TILE_ROWS, col));
      assert.equal(projectIndexAt(row, col), projectIndexAt(row, col - GALLERY_TILE_COLUMNS));
    }
  }
  assert.equal(positiveModulo(-1, 3), 2);
});

test('camera wraps without accumulating offsets, including huge drags', () => {
  const layout = getGalleryLayout(1363);
  const xPeriod = layout.stepX * GALLERY_TILE_COLUMNS;
  const yPeriod = layout.stepY * GALLERY_TILE_ROWS;
  for (const offset of [0, 3, -3, 482, -1290, 100_000, -100_000]) {
    assert.ok(Math.abs(normalizeOffset(offset, xPeriod) - normalizeOffset(offset + xPeriod * 13, xPeriod)) < 0.000001);
    assert.ok(Math.abs(normalizeOffset(offset, yPeriod) - normalizeOffset(offset - yPeriod * 7, yPeriod)) < 0.000001);
  }
  assert.ok(normalizeOffset(1e8, xPeriod) >= -xPeriod / 2);
  assert.ok(normalizeOffset(1e8, xPeriod) < xPeriod / 2);
});

test('desktop composition matches Angelo three-column scale', () => {
  const layout = getGalleryLayout(2048);
  assert.equal(layout.cardWidth, 655);
  assert.ok(Math.abs(layout.top - 58.368) < 0.000001);
  assert.ok(Math.abs(layout.originX - 696.5) < 0.000001);
  assert.ok(layout.stepX > layout.cardWidth);
  assert.ok(layout.stepY > layout.cardHeight);
});

test('mobile begins with the first work and has all eight covers across the field', () => {
  const layout = getGalleryLayout(390);
  assert.equal(layout.mobile, true);
  assert.equal(layout.cardWidth, 354);
  assert.equal(projectIndexAt(0, 0, true), 0);
  const seen = new Set();
  for (let r = 0; r < GALLERY_TILE_ROWS; r++) {
    for (let c = 0; c < GALLERY_TILE_COLUMNS; c++) seen.add(projectIndexAt(r, c, true));
  }
  assert.equal(seen.size, 8);
});

test('cinematic intro ends with the eighth card after 2.7 seconds, without a separate hold', () => {
  assert.equal(FLIGHT_PATHS.length, 8);
  assert.equal(INTRO_DURATION_MS, 2700);
  assert.equal(flightDelayAt(0), 0);
  assert.equal(flightDelayAt(7) + FLIGHT_DURATION_MS, INTRO_DURATION_MS);
  assert.equal(new Set(FLIGHT_PATHS.map((path) => path.join(','))).size, 8);
});
