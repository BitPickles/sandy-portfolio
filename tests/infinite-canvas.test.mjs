import test from 'node:test';
import assert from 'node:assert/strict';
import { getGalleryLayout, normalizeOffset, positiveModulo, projectIndexAt } from '../src/infiniteCanvasMath.js';
import { FLIGHT_DURATION_MS, FLIGHT_PATHS, FLIGHT_STAGGER_MS, INTRO_DURATION_MS, SWEEP_DURATION_MS, SWEEP_FLIGHTS, flightDelayAt } from '../src/galleryIntroConfig.js';

test('a three-by-three region contains all nine projects exactly once', () => {
  const projects = [];
  for (let row = 0; row < 3; row++) {
    for (let col = -1; col <= 1; col++) projects.push(projectIndexAt(row, col));
  }
  assert.deepEqual(projects, [0, 1, 2, 3, 4, 5, 6, 7, 8]);
});

test('seamless repeats on either axis even for negative coordinates', () => {
  for (let row = -10; row <= 10; row++) {
    for (let col = -10; col <= 10; col++) {
      assert.equal(projectIndexAt(row, col), projectIndexAt(row + 3, col));
      assert.equal(projectIndexAt(row, col), projectIndexAt(row, col - 3));
    }
  }
  assert.equal(positiveModulo(-1, 3), 2);
});

test('camera wraps without accumulating offsets, including huge drags', () => {
  const layout = getGalleryLayout(1363);
  const xPeriod = layout.stepX * 3;
  const yPeriod = layout.stepY * 3;
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

test('mobile begins with the first work, yet has all nine works across the field', () => {
  const layout = getGalleryLayout(390);
  assert.equal(layout.mobile, true);
  assert.equal(layout.cardWidth, 354);
  assert.equal(projectIndexAt(0, 0, true), 0);
  const seen = new Set();
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) seen.add(projectIndexAt(r, c, true));
  assert.equal(seen.size, 9);
});

test('cinematic intro ends with the ninth card, without a separate hold', () => {
  assert.equal(FLIGHT_PATHS.length, 9);
  assert.ok(INTRO_DURATION_MS >= 2000 && INTRO_DURATION_MS <= 3000);
  assert.equal(flightDelayAt(0), 0);
  assert.equal(flightDelayAt(8), 8 * FLIGHT_STAGGER_MS);
  assert.equal(flightDelayAt(8) + FLIGHT_DURATION_MS, INTRO_DURATION_MS);
  assert.ok(new Set(FLIGHT_PATHS.map((path) => path.join(','))).size === 9);
});

test('fast sweep overlaps all nine independent flights and ends with the final cover', () => {
  assert.equal(SWEEP_FLIGHTS.length, FLIGHT_PATHS.length);
  assert.ok(SWEEP_DURATION_MS <= 1500);
  for (const [index, [delay, duration, lane]] of SWEEP_FLIGHTS.entries()) {
    const next = SWEEP_FLIGHTS[index + 1];
    if (next) {
      assert.ok(next[0] < delay + duration);
      assert.notEqual(next[2], lane);
    } else {
      assert.equal(delay + duration, SWEEP_DURATION_MS);
    }
  }
});
