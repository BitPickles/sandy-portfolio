import { useCallback, useEffect, useRef, useState } from 'react';
import { GALLERY_TILE_COLUMNS, GALLERY_TILE_ROWS, getGalleryLayout, normalizeOffset, projectIndexAt } from './infiniteCanvasMath.js';

const COLUMNS = [-4, -3, -2, -1, 0, 1, 2, 3, 4];
const ROWS = [-4, -3, -2, -1, 0, 1, 2, 3, 4];
const DRAG_THRESHOLD = 7;

export function InfiniteGallery({ projects, onOpen, visible, dismissed, introPlaying, ambient = false }) {
  const surfaceRef = useRef(null);
  const fieldRef = useRef(null);
  const panRef = useRef({ x: 0, y: 0 });
  const motionRef = useRef(null);
  const dragRef = useRef(null);
  const suppressClickRef = useRef(false);
  const [layout, setLayout] = useState(() => getGalleryLayout(typeof window === 'undefined' ? 1440 : window.innerWidth));
  const layoutRef = useRef(layout);
  layoutRef.current = layout;

  const draw = useCallback(() => {
    if (!fieldRef.current) return;
    const { x, y } = panRef.current;
    fieldRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }, []);

  const stopMotion = useCallback(() => {
    if (motionRef.current !== null) cancelAnimationFrame(motionRef.current);
    motionRef.current = null;
  }, []);

  const panBy = useCallback((dx, dy) => {
    const { stepX, stepY } = layoutRef.current;
    const pan = panRef.current;
    pan.x = normalizeOffset(pan.x + dx, stepX * GALLERY_TILE_COLUMNS);
    pan.y = normalizeOffset(pan.y + dy, stepY * GALLERY_TILE_ROWS);
    draw();
  }, [draw]);

  // The original seamless canvas also works as an ambient, non-interactive
  // backdrop. Move the existing field rather than animating 81 individual cards.
  useEffect(() => {
    if (!ambient || !visible || introPlaying || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    let frameId;
    let previousTime;
    const drift = (now) => {
      const dt = previousTime === undefined ? 0 : Math.min(now - previousTime, 40);
      previousTime = now;
      panBy(-dt * 0.018, -dt * 0.010);
      frameId = requestAnimationFrame(drift);
    };
    frameId = requestAnimationFrame(drift);
    return () => cancelAnimationFrame(frameId);
  }, [ambient, visible, introPlaying, panBy]);

  const glide = useCallback((velocityX, velocityY) => {
    stopMotion();
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    let vx = Math.max(-2.5, Math.min(2.5, velocityX));
    let vy = Math.max(-2.5, Math.min(2.5, velocityY));
    let previous = performance.now();

    const frame = (now) => {
      const dt = Math.min(now - previous, 40);
      previous = now;
      const decay = Math.pow(0.91, dt / 16.67);
      vx *= decay;
      vy *= decay;
      if (Math.hypot(vx, vy) < 0.012) {
        motionRef.current = null;
        return;
      }
      panBy(vx * dt, vy * dt);
      motionRef.current = requestAnimationFrame(frame);
    };
    if (Math.hypot(vx, vy) > 0.025) motionRef.current = requestAnimationFrame(frame);
  }, [panBy, stopMotion]);

  useEffect(() => {
    const resize = () => {
      const next = getGalleryLayout(window.innerWidth);
      layoutRef.current = next;
      const pan = panRef.current;
      pan.x = normalizeOffset(pan.x, next.stepX * GALLERY_TILE_COLUMNS);
      pan.y = normalizeOffset(pan.y, next.stepY * GALLERY_TILE_ROWS);
      setLayout(next);
      draw();
    };
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [draw]);

  useEffect(() => {
    const surface = surfaceRef.current;
    if (!surface) return undefined;
    const wheel = (event) => {
      if (ambient || !visible || introPlaying || event.ctrlKey) return;
      event.preventDefault();
      stopMotion();
      const scale = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
      const dx = event.shiftKey && !event.deltaX ? event.deltaY : event.deltaX;
      const dy = event.shiftKey && !event.deltaX ? 0 : event.deltaY;
      panBy(-dx * scale, -dy * scale);
    };
    surface.addEventListener('wheel', wheel, { passive: false });
    return () => surface.removeEventListener('wheel', wheel);
  }, [ambient, introPlaying, panBy, stopMotion, visible]);

  useEffect(() => {
    if (!visible) stopMotion();
  }, [visible, stopMotion]);

  useEffect(() => () => stopMotion(), [stopMotion]);

  const pointerDown = (event) => {
    if (ambient || !visible || introPlaying || (event.pointerType === 'mouse' && event.button !== 0)) return;
    stopMotion();
    dragRef.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      lastX: event.clientX,
      lastY: event.clientY,
      lastTime: performance.now(),
      vx: 0,
      vy: 0,
      moved: false,
    };
  };

  const pointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    const totalDistance = Math.hypot(event.clientX - drag.x, event.clientY - drag.y);
    if (!drag.moved && totalDistance >= DRAG_THRESHOLD) {
      drag.moved = true;
      suppressClickRef.current = true;
      surfaceRef.current?.setPointerCapture(event.pointerId);
      surfaceRef.current?.classList.add('is-dragging');
    }
    if (!drag.moved) return;

    const now = performance.now();
    const elapsed = Math.max(8, now - drag.lastTime);
    const dx = event.clientX - drag.lastX;
    const dy = event.clientY - drag.lastY;
    panBy(dx, dy);
    drag.vx = dx / elapsed;
    drag.vy = dy / elapsed;
    drag.lastX = event.clientX;
    drag.lastY = event.clientY;
    drag.lastTime = now;
  };

  const pointerEnd = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    if (drag.moved) {
      surfaceRef.current?.classList.remove('is-dragging');
      if (surfaceRef.current?.hasPointerCapture(event.pointerId)) surfaceRef.current.releasePointerCapture(event.pointerId);
      if (event.type !== 'pointercancel' && visible) glide(drag.vx, drag.vy);
      window.setTimeout(() => { suppressClickRef.current = false; }, 140);
    }
    dragRef.current = null;
  };

  const keyDown = (event) => {
    if (ambient || !visible || introPlaying) return;
    const movement = 110;
    if (event.key === 'ArrowLeft') panBy(movement, 0);
    else if (event.key === 'ArrowRight') panBy(-movement, 0);
    else if (event.key === 'ArrowUp') panBy(0, movement);
    else if (event.key === 'ArrowDown') panBy(0, -movement);
    else return;
    event.preventDefault();
    stopMotion();
  };

  return <section
    ref={surfaceRef}
    className={`gallery-screen ${ambient ? 'gallery-ambient' : ''} ${dismissed ? 'gallery-dismissed' : ''}`}
    aria-hidden={ambient || !visible}
    aria-busy={introPlaying}
    aria-label="可上下左右拖动的无限作品画廊"
    tabIndex={!ambient && visible && !introPlaying ? 0 : -1}
    onPointerDown={pointerDown}
    onPointerMove={pointerMove}
    onPointerUp={pointerEnd}
    onPointerCancel={pointerEnd}
    onKeyDown={keyDown}
  >
    <div className="infinite-stage">
      <div className="infinite-field" ref={fieldRef}>
      {ROWS.flatMap((row) => COLUMNS.map((column) => {
        const index = projectIndexAt(row, column, layout.mobile);
        const project = projects[index];
        const centralTile = row >= 0 && row < GALLERY_TILE_ROWS && column >= -1 && column < GALLERY_TILE_COLUMNS - 1;
        const nearViewport = Math.abs(row) <= 2 && Math.abs(column) <= 2;
        return <button
          type="button"
          className={`art-card art-${project.id}`}
          key={`${row}:${column}`}
          style={{
            left: layout.originX + column * layout.stepX,
            top: layout.top + row * layout.stepY,
            width: layout.cardWidth,
            height: layout.cardHeight,
          }}
          onClick={() => { if (!ambient && !suppressClickRef.current) { stopMotion(); onOpen(project.id); } }}
          tabIndex={!ambient && visible && !introPlaying && centralTile ? 0 : -1}
          aria-hidden={ambient || !centralTile}
          aria-label={`打开作品：${project.name}`}
        >
          <img src={project.previewImage} alt="" loading={nearViewport ? 'eager' : 'lazy'} draggable="false" />
          <span className="art-overlay"><span className="art-name">{project.name}</span><span className="art-category">{project.category}</span></span>
        </button>;
      }))}
      </div>
    </div>
  </section>;
}
