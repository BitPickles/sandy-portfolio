import { useState } from 'react';

// These are presentation groups, not claims that each entry is an independent company.
const SECTIONS = [
  { id: 'business', number: '01', name: '核心业务', english: 'OPERATING', note: '持续经营', ids: ['channel', 'members'] },
  { id: 'research', number: '02', name: '研究与策略', english: 'RESEARCH', note: '长期追踪', ids: ['research', 'mining', 'strategy'] },
  { id: 'future', number: '03', name: '未来与新项目', english: 'EXPLORING', note: '正在生长', ids: ['future', 'agi', 'podcast'] },
  { id: 'personal', number: '04', name: '关于我', english: 'PERSONAL', note: '一个入口', ids: ['about'] },
];

export function BusinessOverview({ projects, onOpen, onExplore, visible }) {
  const [focusId, setFocusId] = useState('channel');
  const projectById = Object.fromEntries(projects.map((project) => [project.id, project]));
  const focusProject = projectById[focusId] || projects[0];
  const businessCount = SECTIONS[0].ids.length;
  const projectCount = SECTIONS[1].ids.length + SECTIONS[2].ids.length;

  return <section className={`overview-screen ${visible ? 'is-visible' : ''}`} aria-label="业务与作品总览" aria-hidden={!visible} inert={!visible}>
    <div className="overview-halo" aria-hidden="true" />
    <div className="overview-content">
      <header className="overview-header">
        <div className="overview-brand"><span className="overview-monogram">Z.</span><span><strong>郑智 <span className="brand-divider">/</span> Crypto3D</strong><small>PERSONAL INDEX · 2026</small></span></div>
        <span className="overview-header-aside">A COLLECTION OF WHAT I DO</span>
      </header>

      <div className="overview-columns">
        <div className="overview-story">
          <span className="overview-eyebrow"><span className="overview-signal" /> THE WORK, AT A GLANCE</span>
          <h2>我在做的事，<br/><em>都在这里。</em></h2>
          <p className="overview-description">从加密内容与投资研究，到人工智能和未来世界。<br/>有些已经经营多年，有些才刚刚开始。</p>

          <div className="overview-stats" aria-label="项目数量">
            <div className="overview-stat"><strong>{String(businessCount).padStart(2, '0')}</strong><span>核心经营方向</span></div>
            <span className="overview-stat-divider" />
            <div className="overview-stat"><strong>{String(projectCount).padStart(2, '0')}</strong><span>研究与新项目</span></div>
            <span className="overview-stat-divider" />
            <div className="overview-stat"><strong>01</strong><span>个人档案</span></div>
          </div>

          <div className="overview-feature" aria-live="polite">
            <div className={`overview-feature-mat art-${focusProject.id}`} key={focusProject.id}>
              <img src={focusProject.image} alt={`${focusProject.name} 的项目封面`} />
            </div>
            <div className="overview-feature-caption"><span><b>FOCUS</b> / {focusProject.number} — {focusProject.english}</span><span>{focusProject.name}</span></div>
          </div>
          <div className="overview-footnote">移到右侧目录，预览每件作品。</div>
        </div>

        <div className="overview-directory">
          <div className="overview-directory-intro"><span>COMPLETE INDEX</span><span>共 {String(projects.length).padStart(2, '0')} 个条目 <span className="directory-bullet">✳</span></span></div>
          {SECTIONS.map((section) => <div className="overview-group" key={section.id}>
            <div className="overview-group-heading"><span><i>{section.number}</i> {section.name}<em>{section.english}</em></span><span>{section.note} <b>{String(section.ids.length).padStart(2, '0')}</b></span></div>
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
                  <span className="overview-project-type">{project.english}</span>
                  <span className="overview-project-arrow" aria-hidden="true">↗</span>
                </button>;
              })}
            </div>
          </div>)}
          <button className="overview-explore-link" type="button" onClick={onExplore}>
            <span><i>↗</i> 不按目录来，随便逛逛</span><span>ENTER INFINITE CANVAS <b>→</b></span>
          </button>
        </div>
      </div>

      <footer className="overview-footer"><span className="overview-signature">Z.Zhi</span><span>© 2026 郑智 · CRYPTO3D</span><span>MADE TO EXPLORE</span></footer>
    </div>
  </section>;
}
