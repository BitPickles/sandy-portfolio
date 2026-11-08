import { useCallback, useEffect, useRef, useState } from 'react';
import { InfiniteGallery } from './InfiniteGallery.jsx';
import { BusinessOverview } from './BusinessOverview.jsx';

const projects = [
  {
    id: 'channel', number: '01', name: '3D 加密频道', english: 'CRYPTO3D', category: 'CONTENT / FILM', image: '/gallery/channel.webp',
    title: '把复杂的世界，讲得明白一点。',
    lead: '我用视频记录和解释加密世界。不是追逐每一条新闻，而是理解新闻背后的机制、利益和人。',
    story: '3D 加密频道是我最早开始、也始终在做的一件事。从 DeFi、链上收益到行业周期，我希望把那些看起来很复杂的金融机制，讲成普通人也能听懂、并且能独立判断的故事。',
    detail: '我不太喜欢复述新闻。新闻一天能发生一百件，真正重要的可能只有两三件。我更愿意追问：一项机制为什么存在？谁承担风险？谁获得收益？什么条件下，这个故事就不成立了？',
    steps: ['先把机制拆开，说清楚钱从哪里来。', '在乐观叙事之外，认真讨论成本和风险。', '让观众形成自己的判断，而不是依赖某个答案。'],
    quote: '比知道发生了什么更重要的，是知道为什么会发生。', secondary: '/gallery/mining.webp', link: 'https://crypto3d.pro'
  },
  {
    id: 'research', number: '02', name: 'Crypto3D Research', english: 'RESEARCH', category: 'RESEARCH / DATA', image: '/gallery/research.webp',
    title: '给每一个判断，留下证据。',
    lead: '一个持续生长的个人研究工作台：收集事实、验证假设、更新判断，也允许自己被事实推翻。',
    story: '这里不是每天更新的资讯清单，而是一套关于协议、现金流、估值和市场结构的研究方法。我试着把散落的链上数据，重新整理成有上下文、可追溯、可以复盘的材料。',
    detail: '研究最有意义的时刻，往往不是观点被验证的那一刻，而是它被事实挑战的那一刻。优秀的研究应该保存它为什么出现、建立在哪些假设上，以及后来究竟发生了什么。',
    steps: ['观察真实现金流、代币机制与估值。', '让每项重要数据能够回到原始资料。', '记录支持证据，也记录让自己不舒服的反证。'],
    quote: '观点可以很锋利，证据必须能追溯。', secondary: '/gallery/strategy.webp', link: 'https://crypto3d.pro'
  },
  {
    id: 'mining', number: '03', name: '什么值得挖', english: 'OPPORTUNITY', category: 'DEFI / STRATEGY', image: '/gallery/mining.webp',
    title: '机会的背面，通常写着风险。',
    lead: '从真实利息、代币补贴到退出流动性，把每一个诱人的收益率拆开来看。',
    story: '加密世界从来不缺少高收益故事。真正值得理解的，是收益究竟来自真实需求、代币补贴，还是短暂的预期游戏。什么值得挖，是我对这些机会与风险的持续观察。',
    detail: '一个策略值得不值得参与，不能只看屏幕上的 APR。更要把它放回资金规模、容量、对手方、链上安全和退出路径中。数字很容易被做大，风险却常常藏在脚注里。',
    steps: ['区分真实利息、平台激励和一次性奖励。', '测试容量、流动性与极端情景下的退出条件。', '把收益率放回自己的风险预算，而非只追榜单。'],
    quote: '最好的机会，不一定是数字最大的一项。', secondary: '/gallery/channel.webp'
  },
  {
    id: 'agi', number: '04', name: 'AGI / 通用人工智能', english: 'AGI', category: 'FUTURE / IDEAS', image: '/gallery/agi.webp',
    title: '当机器开始真正理解世界。',
    lead: '关于 AGI 何时到来、它能改变什么，以及我们该如何理解那些相互矛盾的预测。',
    story: 'AGI 是我长期追踪的重要命题之一。人们既兴奋，又焦虑；有人认为突破已经近在眼前，也有人提醒我们，模型的能力与真正通用的智能还有距离。',
    detail: '我希望把各种预测重新放到同一张地图上：谁说过什么，为什么这么说，哪些证据支持，哪些约束没有解决。不是替读者决定未来，而是让每个人自己看清逻辑链。',
    steps: ['搜集研究者、企业领导者和重要实验室的原话。', '区分能力演示、可复制的技术进步与商业落地。', '追踪时间预测的变化，以及变化背后的新证据。'],
    quote: '未来不是一个答案，而是一组等待验证的假设。', secondary: '/gallery/future.webp'
  },
  {
    id: 'podcast', number: '05', name: '翻译播客', english: 'CONVERSATIONS', category: 'AUDIO / WORDS', image: '/gallery/podcast.webp',
    title: '让值得听见的想法，跨过语言。',
    lead: '那些有价值的观点，有时藏在一段两三个小时的英文对话里。',
    story: '我喜欢长对谈里缓慢展开的思考。科技、AI、投资，以及人如何做出艰难的选择，都是我感兴趣的话题。翻译播客想做的事情很简单：找到值得听的交流，让它们跨过语言的边界。',
    detail: '重点不只是把英文换成中文，而是尽可能保留下观点的语境、前提、分歧，以及说话者真正想表达的意思。好的内容应该经得起回听。',
    steps: ['筛选信息密度真正足够的对谈。', '保留说话者的背景、立场与论点边界。', '围绕一个值得思考的问题，继续追查上下文。'],
    quote: '好的对谈，会让你改变提问题的方式。', secondary: '/gallery/agi.webp'
  },
  {
    id: 'future', number: '06', name: 'Future Atlas 未来志', english: 'FUTURE ATLAS', category: 'FUTURE / EDITORIAL', image: '/gallery/future.webp',
    title: '给尚未到来的世界，画一张地图。',
    lead: '一座关于未来的私人展览馆：AGI、太空算力、可控核聚变与具身智能。',
    story: 'Future Atlas 是我正在制作的未来学项目。它连接重要人物对于 AI、能源、太空和机器人技术的观点，并把不同预测放到同一条时间轴上。',
    detail: '比大胆预测更重要的是结构：这个判断建立在什么技术假设上？哪些事件能够验证？哪些现实条件可能阻碍？我希望它成为一张不断更新的未来地图，而不是另一份转瞬即逝的科技新闻。',
    steps: ['以未来议题为入口，连接人物与技术。', '把大胆的观点与一手来源并排展示。', '保留分歧、时间线，以及尚未解决的难题。'],
    quote: '不是预测明天，而是理解明天为什么可能发生。', secondary: '/gallery/agi.webp'
  },
  {
    id: 'strategy', number: '07', name: '链上策略实验室', english: 'THE LAB', category: 'EXPERIMENT / TOOLS', image: '/gallery/strategy.webp',
    title: '把好奇心变成可以运行的东西。',
    lead: '从金融工具到自动化脚本，把一个想法做成可以检验的原型。',
    story: '我对工具有一种几乎本能的兴趣。看见一个重复发生的问题，我就会想：能不能让机器帮我处理？能不能把凭感觉的判断变成可验证的流程？',
    detail: '这些实验并不保证成功。有些会成为长期使用的工具，有些则因为成本、复杂度或者不可靠而被放弃。对我来说，真正的价值是把想法放到现实里接受测试。',
    steps: ['提出清晰、足够小的可验证问题。', '给数据质量、安全边界和失败场景留出位置。', '能停下来、能复盘，才值得继续迭代。'],
    quote: '想法很便宜，真正运行起来才有意思。', secondary: '/gallery/research.webp'
  },
  {
    id: 'members', number: '08', name: '会员社区', english: 'INNER CIRCLE', category: 'COMMUNITY / LIVE', image: '/gallery/members.webp',
    title: '在公开内容之外，聊得更深入。',
    lead: '与一群认真思考市场的人一起讨论、提问、分歧和修正。',
    story: '会员社区是一个围绕加密市场、链上项目和真实投资思考建立的小范围交流空间。这里会有定期直播，也会讨论我正在研究什么、为什么改变想法，以及哪些问题还没有答案。',
    detail: '做内容很容易变成单向输出。但真正深入的讨论往往来自持续追问：一个项目值不值得关注？风险有没有被低估？我们是否在用过去的经验误读新的市场？',
    steps: ['定期直播，分享研究过程与市场观察。', '在小范围里把问题聊得更具体。', '欢迎不同意见，也欢迎改变主意。'],
    quote: '观点不是用来供奉的，是用来碰撞的。', secondary: '/gallery/podcast.webp'
  },
  {
    id: 'about', number: '09', name: '关于 3D', english: 'SANDY', category: 'ABOUT / LIFE', image: '/gallery/about.webp',
    title: '认真玩，尽兴活。',
    lead: '我是 Sandy，也叫 3D。创作者、研究者，以及一个总想折腾点新东西的人。',
    story: '以前主要在加密世界里找机会、做研究、讲故事。现在好奇的东西越来越多：人工智能、未来科技、投资，还有那些值得花很多年去理解的问题。',
    detail: '这个网站是我的个人存档，也是一个小小的游乐场。你可以随便浏览这些作品。它们不一定彼此相关，但每一件背后，都有一段我真正想弄明白的东西。',
    steps: ['保持好奇，持续学习。', '把想明白的事讲清楚。', '认真做事，也别忘了好玩。'],
    quote: '游戏人生。认真玩，尽兴活。', secondary: '/gallery/channel.webp', link: 'https://crypto3d.pro'
  },
];

function CloseIcon() {
  return <svg width="25" height="25" viewBox="0 0 25 25" aria-hidden="true"><path d="M4 4L21 21M21 4L4 21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>;
}

function ContactIcon({ kind }) {
  if (kind === 'arrow') return <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M3 17L17 3M6 3h11v11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>;
  return <svg width="19" height="19" viewBox="0 0 19 19" aria-hidden="true"><path d="M2 3h15v13H2zM2 3l7.5 7L17 3" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round"/></svg>;
}

export function App() {
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState('overview');
  const [introReady, setIntroReady] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const detailRef = useRef(null);
  const active = projects.find((p) => p.id === selected);

  const open = useCallback((id) => {setSelected(id); setShowContact(false);}, []);
  const close = useCallback(() => {setSelected(null); setShowContact(false);}, []);
  const finishIntro = useCallback(() => setIntroReady(true), []);
  useEffect(() => { if (detailRef.current) detailRef.current.scrollTop = 0; }, [selected]);
  useEffect(() => {
    const handler = (event) => {
      if (event.key === 'Escape') { if (showContact) setShowContact(false); else if (selected) close(); else setMode('overview'); }
      if (selected && event.key === 'ArrowRight') { const index = projects.findIndex((p) => p.id === selected); open(projects[(index + 1) % projects.length].id); }
      if (selected && event.key === 'ArrowLeft') { const index = projects.findIndex((p) => p.id === selected); open(projects[(index - 1 + projects.length) % projects.length].id); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selected, close, open, showContact]);

  return <div className="site-shell">
    <h1 className="sr-only">3D · Sandy — 业务与项目总览、无限作品画廊</h1>
    <InfiniteGallery projects={projects} onOpen={open} visible={!active && (!introReady || mode === 'canvas')} dismissed={Boolean(active)} onIntroFinished={finishIntro} />
    <BusinessOverview projects={projects} onOpen={open} onExplore={() => setMode('canvas')} visible={introReady && mode === 'overview' && !active} />

    {introReady && !active && <nav className="view-switch" aria-label="切换浏览模式">
      <button type="button" className={mode === 'overview' ? 'is-selected' : ''} aria-pressed={mode === 'overview'} onClick={() => setMode('overview')}>总览</button>
      <button type="button" className={mode === 'canvas' ? 'is-selected' : ''} aria-pressed={mode === 'canvas'} onClick={() => setMode('canvas')}>自由画布 <span>↗</span></button>
    </nav>}

    {active && <section className="detail-screen" aria-label={`作品详情：${active.name}`}>
      <div className="detail-scroll" ref={detailRef} key={active.id}>
        <article className="case-study">
          <header className="case-heading"><span className="case-index">{active.number} / 09 — {active.category}</span><h2>{active.name}</h2><p className="case-lead">{active.lead}</p></header>
          <div className="case-art"><img src={active.image} alt={`${active.name} 项目作品封面`} /></div>
          <div className="case-copy"><div className="case-section-label">01 / THE STORY</div><div className="case-prose"><h3>{active.title}</h3><p>{active.story}</p><p>{active.detail}</p></div></div>
          <div className="case-art case-art-secondary"><img src={active.secondary} alt={`${active.name} 相关视觉作品`} loading="lazy" /></div>
          <div className="case-copy"><div className="case-section-label">02 / THE APPROACH</div><div className="case-prose"><h3>我是怎么思考这件事的</h3><div className="case-methods">{active.steps.map((line, i) => <div className="method" key={line}><span>0{i + 1}</span><p>{line}</p></div>)}</div></div></div>
          <blockquote className="case-quote">“{active.quote}”<span>— 3D</span></blockquote>
          <nav className="case-bottom" aria-label="作品导航"><div><span className="case-section-label">03 / NEXT STORY</span><h3>还有很多故事，慢慢讲。</h3></div><div className="case-links">{active.link && <a href={active.link} target="_blank" rel="noopener noreferrer" className="solid-link">访问项目 <span>↗</span></a>}<button type="button" className="outline-link" onClick={close}>返回画廊 <span>↗</span></button></div></nav>
        </article>
      </div>
      <div className="detail-top"><button className="wordmark" onClick={close} type="button" aria-label="返回画廊">3D <span> / works</span></button><button className="detail-close" type="button" onClick={close} aria-label="关闭项目详情"><CloseIcon /></button></div>
      <div className="detail-pager" aria-label="切换项目"><span className="pager-label">{active.number} — 09</span><button type="button" onClick={() => { const i = projects.findIndex((p) => p.id === selected); open(projects[(i - 1 + projects.length) % projects.length].id); }} aria-label="上一个项目">←</button><button type="button" onClick={() => {const i = projects.findIndex((p) => p.id === selected); open(projects[(i + 1) % projects.length].id);}} aria-label="下一个项目">→</button></div>
    </section>}

    <footer className="fixed-footer" aria-hidden={Boolean(active) || mode === 'overview'}>
      <div className="footer-signature"><span className="signature">3D</span><span className="dot">·</span><span>© 2026 Crypto3D</span></div>
      <div className="footer-actions"><a href="https://crypto3d.pro" target="_blank" rel="noopener noreferrer" aria-label="访问 Crypto3D.pro" className="footer-icon"><ContactIcon kind="arrow" /></a><button type="button" className="footer-icon" aria-label="联系我" onClick={() => setShowContact(true)}><ContactIcon /></button><button type="button" className="talk-button" onClick={() => setShowContact(true)}>Let's talk</button></div>
    </footer>
    {showContact && !active && <div className="contact-backdrop" onClick={() => setShowContact(false)} role="presentation"><section className="contact-modal" role="dialog" aria-modal="true" aria-label="联系方式" onClick={(event) => event.stopPropagation()}><button type="button" className="contact-close" onClick={() => setShowContact(false)} aria-label="关闭联系方式"><CloseIcon /></button><span className="eyebrow">HELLO THERE</span><h2>聊点有意思的。</h2><p>关于加密、科技、内容创作，或者你正在做的一件有趣的事。</p><a href="https://crypto3d.pro" rel="noopener noreferrer" target="_blank" className="solid-link">访问 Crypto3D.pro <span>↗</span></a><button type="button" className="contact-about" onClick={() => open('about')}>先了解我 →</button></section></div>}
  </div>;
}
