import { FLIGHT_DURATION_MS, FLIGHT_PATHS, INTRO_DURATION_MS, SWEEP_DURATION_MS, SWEEP_FLIGHTS, flightDelayAt } from './galleryIntroConfig.js';

export function GalleryIntro({ projects, onFinish }) {
  // Keep the existing review URL as the opening evolves.
  const sweepPreview = new URLSearchParams(window.location.search).get('intro') === 'film';
  return <div
    className={`intro-curtain${sweepPreview ? ' intro-curtain-sweep' : ''}`}
    aria-hidden="true"
    style={{ '--intro-duration': `${sweepPreview ? SWEEP_DURATION_MS : INTRO_DURATION_MS}ms` }}
    onPointerDown={onFinish}
    onAnimationEnd={(event) => { if (event.target === event.currentTarget) onFinish(); }}
  >
    {sweepPreview ? projects.map((project, index) => {
      const [delay, duration, lane, drift, scale] = SWEEP_FLIGHTS[index];
      return <div
        key={project.id}
        className="intro-sweep-card"
        style={{
          '--sweep-delay': `${delay}ms`,
          '--sweep-duration': `${duration}ms`,
          '--sweep-lane': `${lane}%`,
          '--sweep-drift': `${drift}vh`,
          '--sweep-scale': scale,
        }}
      >
        <img src={project.image} alt="" loading="eager" fetchPriority={delay < 110 ? 'high' : 'auto'} draggable="false" />
      </div>;
    }) : projects.map((project, index) => {
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
        <img src={project.image} alt="" loading="eager" draggable="false" />
      </div>;
    })}
  </div>;
}
