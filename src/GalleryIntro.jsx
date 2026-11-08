import { FLIGHT_DURATION_MS, FLIGHT_PATHS, INTRO_DURATION_MS, flightDelayAt } from './galleryIntroConfig.js';

export function GalleryIntro({ projects, onFinish }) {
  const filmPreview = new URLSearchParams(window.location.search).get('intro') === 'film';
  return <div
    className={`intro-curtain${filmPreview ? ' intro-curtain-film' : ''}`}
    aria-hidden="true"
    style={{ '--intro-duration': `${INTRO_DURATION_MS}ms` }}
    onPointerDown={onFinish}
    onAnimationEnd={(event) => { if (event.target === event.currentTarget) onFinish(); }}
  >
    {filmPreview ? <div className="intro-film-strip">
      {projects.map((project) => <div className="intro-film-frame" key={project.id}>
        <img src={project.image} alt="" loading="eager" draggable="false" />
      </div>)}
    </div> : projects.map((project, index) => {
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
