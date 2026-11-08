import { useState } from 'react';

// These are presentation groups, not claims that each entry is an independent company.
const SECTIONS = [
  { id: 'business', number: '01', name: '业务', ids: ['channel', 'members'] },
  { id: 'research', number: '02', name: '研究', ids: ['research', 'mining'] },
  { id: 'future', number: '03', name: '探索', ids: ['future', 'agi', 'podcast'] },
];

export function BusinessOverview({ projects, onOpen, onContact, xProfile, visible, introPlaying }) {
  const [focusId, setFocusId] = useState('channel');
  const projectById = Object.fromEntries(projects.map((project) => [project.id, project]));
  const focusProject = projectById[focusId] || projects[0];
  const canInteract = visible && !introPlaying;
  return <section className={`overview-screen ${visible ? 'is-visible' : ''}`} aria-label="业务与作品总览" aria-hidden={!canInteract} inert={!canInteract}>
    <div className="overview-halo" aria-hidden="true" />
    <div className="overview-content">
      <header className="overview-header">
        <div className="overview-brand"><span className="overview-monogram">3D</span><span><strong>Sandy</strong><small>CRYPTO3D</small></span></div>
        <div className="overview-header-actions">
          <a className="overview-header-action" href={xProfile} target="_blank" rel="noopener noreferrer" aria-label="X（Twitter）@22333D">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true" focusable="false"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817-5.969 6.817H1.678l7.73-8.835L1.254 2.25h6.826l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            @22333D
          </a>
          <button type="button" className="overview-header-action" onClick={onContact}>联系我 <span aria-hidden="true">↗</span></button>
        </div>
      </header>

      <div className="overview-columns">
        <div className="overview-story">
          <h2>我在做的事，<br/><em>都在这里。</em></h2>
          <p className="overview-description">加密内容、市场研究、AI 与未来技术。</p>

          <div className="overview-feature" aria-live="polite">
            <div className="overview-feature-mat" key={focusProject.id}>
              <img src={focusProject.previewImage} alt={`${focusProject.name} 的项目封面`} />
            </div>
            <div className="overview-feature-caption"><span>{focusProject.number}</span><span>{focusProject.name}</span></div>
          </div>
        </div>

        <div className="overview-directory">
          <div className="overview-directory-intro"><span>目录</span><span className="directory-bullet">✳</span></div>
          {SECTIONS.map((section) => <div className="overview-group" key={section.id}>
            <div className="overview-group-heading"><span><i>{section.number}</i> {section.name}</span></div>
            <div className="overview-list">
              {section.ids.map((id) => {
                const project = projectById[id];
                if (!project) return null;
                return <button
                  className={`overview-project ${focusProject.id === id ? 'is-focused' : ''}`}
                  type="button" key={id}
                  onMouseEnter={() => setFocusId(id)}
                  onFocus={() => setFocusId(id)}
                  onClick={() => onOpen(id)}
                >
                  <span className="overview-project-name">{project.name}</span>
                  <span className="overview-project-arrow" aria-hidden="true">↗</span>
                </button>;
              })}
            </div>
          </div>)}
          <button className="overview-about-link" type="button" onMouseEnter={() => setFocusId('about')} onFocus={() => setFocusId('about')} onClick={() => onOpen('about')}>关于 3D <span aria-hidden="true">↗</span></button>
        </div>
      </div>

      <footer className="overview-footer"><span className="overview-signature">3D</span><span>© 2026</span></footer>
    </div>
  </section>;
}
