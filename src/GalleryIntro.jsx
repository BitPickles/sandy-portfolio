import { useEffect, useRef, useState } from 'react';
import { FLIGHT_DURATION_MS, FLIGHT_PATHS, INTRO_DURATION_MS, flightDelayAt } from './galleryIntroConfig.js';

const COVER_WAIT_LIMIT_MS = 1500;

export function GalleryIntro({ projects, onFinish }) {
  const curtainRef = useRef(null);
  const [coversReady, setCoversReady] = useState(false);

  useEffect(() => {
    const covers = Array.from(curtainRef.current.querySelectorAll('img'));
    let cancelled = false;
    const settle = (ready) => {
      if (cancelled) return;
      cancelled = true;
      window.clearTimeout(timeout);
      if (ready) setCoversReady(true);
      else onFinish();
    };
    const timeout = window.setTimeout(() => settle(false), COVER_WAIT_LIMIT_MS);
    Promise.all(covers.map((cover) => cover.decode())).then(() => settle(true), () => settle(false));
    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [onFinish]);

  return <div
    ref={curtainRef}
    className={`intro-curtain${coversReady ? '' : ' is-preloading'}`}
    aria-hidden="true"
    style={{ '--intro-duration': `${INTRO_DURATION_MS}ms` }}
    onPointerDown={onFinish}
    onAnimationEnd={(event) => { if (event.target === event.currentTarget) onFinish(); }}
  >
    {projects.map((project, index) => {
      const [fromX, fromY, midX, midY, exitX, exitY, entryTilt, exitTilt] = FLIGHT_PATHS[index];
      return <div
        key={project.id}
        className={`intro-fly-card art-${project.id}`}
        style={{
          '--fly-delay': `${flightDelayAt(index)}ms`,
          '--fly-duration': `${FLIGHT_DURATION_MS}ms`,
          '--fly-from-x': `${fromX}vw`,
          '--fly-from-y': `${fromY}vh`,
          '--fly-mid-x': `${midX}vw`,
          '--fly-mid-y': `${midY}vh`,
          '--fly-exit-x': `${exitX}vw`,
          '--fly-exit-y': `${exitY}vh`,
          '--fly-entry-tilt': `${entryTilt}deg`,
          '--fly-exit-tilt': `${exitTilt}deg`,
          zIndex: index + 1,
        }}
      >
        <img src={project.previewImage} alt="" loading="eager" fetchPriority={index === 0 ? 'high' : undefined} draggable="false" />
      </div>;
    })}
  </div>;
}
