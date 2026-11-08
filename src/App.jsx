import { useCallback, useEffect, useRef, useState } from 'react';
import { InfiniteGallery } from './InfiniteGallery.jsx';
import { BusinessOverview } from './BusinessOverview.jsx';
import { GalleryIntro } from './GalleryIntro.jsx';

const galleryImage = (filename) => `${import.meta.env.BASE_URL}gallery/${filename}`;
const reducedMotionQuery = '(prefers-reduced-motion: reduce)';
const xProfile = 'https://x.com/22333D';

const projects = [
  {
    id: 'channel', number: '01', name: '3D 加密频道', english: 'CRYPTO3D', category: 'CONTENT / FILM', image: galleryImage('channel.webp'),
    title: '把复杂的世界，讲得明白一点。',
    lead: '我在 YouTube 用中文分享 DeFi、套利和链上策略，讲清楚机会从哪里来、风险在哪里。',
    story: '频道里有 Pendle 收益策略、JLP 套利和 Uniswap 代币机制等专题，也会做硬件钱包体验和投资研究。',
    detail: '视频结合实际案例拆解协议机制、收益来源和操作风险，帮助观众自己判断一项策略。',
    steps: ['先把机制拆开，说清楚钱从哪里来。', '在乐观叙事之外，认真讨论成本和风险。', '让观众形成自己的判断，而不是依赖某个答案。'],
    quote: '比知道发生了什么更重要的，是知道为什么会发生。', secondary: galleryImage('mining.webp'),
    link: 'https://www.youtube.com/@Crypto36D', linkLabel: '观看 YouTube 频道',
  },
  {
    id: 'research', number: '02', name: 'Crypto3D 数据站', english: 'RESEARCH', category: 'RESEARCH / DATA', image: galleryImage('research.webp'),
    title: '给每一个判断，留下证据。',
    lead: '用数据看 DeFi 协议估值、BTC 市场周期和代币持有人回报。',
    story: '协议估值看板追踪回购、销毁和分红等机制，比较不同协议的 P/E、P/S 和持有人回报率。',
    detail: 'BTC 周期页汇总 AHR999、MVRV 和 BTC 市占率。站内也有存储半导体估值看板，以及加密资产和协议研究文章。',
    steps: ['查协议收入、估值与代币价值分配。', '结合多项指标观察 BTC 所处的周期。', '从研究文章追溯数据和分析思路。'],
    quote: '观点可以很锋利，证据必须能追溯。', secondary: galleryImage('strategy.webp'),
    link: 'https://crypto3d.pro/', linkLabel: '打开数据站',
  },
  {
    id: 'mining', number: '03', name: '什么值得挖', english: 'OPPORTUNITY', category: 'DEFI / STRATEGY', image: galleryImage('mining.webp'),
    title: '机会的背面，通常写着风险。',
    lead: '「什么值得挖」关注链上收益机会，以及策略背后的风险。',
    story: '分析链上收益时，我会先看资金从哪里来、补贴能持续多久，以及退出时有没有足够的流动性。',
    detail: '网站入口是「矿田」会员登录页，符合资格的会员可使用 Google 账号登录。',
    steps: ['区分真实利息、平台激励和一次性奖励。', '测试容量、流动性与极端情景下的退出条件。', '把收益率放回自己的风险预算，而非只追榜单。'],
    quote: '最好的机会，不一定是数字最大的一项。', secondary: galleryImage('channel.webp'),
    link: 'https://shenmezhidewa.com', linkLabel: '前往会员登录',
  },
  {
    id: 'agi', number: '04', name: 'AGI / 通用人工智能', english: 'AGI', category: 'FUTURE / IDEAS', image: galleryImage('agi.webp'),
    title: '当机器开始真正理解世界。',
    lead: '关于 AGI 何时到来、它能改变什么，以及我们该如何理解那些相互矛盾的预测。',
    story: 'AGI 是我长期追踪的重要命题之一。人们既兴奋，又焦虑；有人认为突破已经近在眼前，也有人提醒我们，模型的能力与真正通用的智能还有距离。',
    detail: '我希望把各种预测重新放到同一张地图上：谁说过什么，为什么这么说，哪些证据支持，哪些约束没有解决。不是替读者决定未来，而是让每个人自己看清逻辑链。',
    steps: ['搜集研究者、企业领导者和重要实验室的原话。', '区分能力演示、可复制的技术进步与商业落地。', '追踪时间预测的变化，以及变化背后的新证据。'],
    quote: '未来不是一个答案，而是一组等待验证的假设。', secondary: galleryImage('future.webp')
  },
  {
    id: 'podcast', number: '05', name: '翻译播客', english: 'CONVERSATIONS', category: 'AUDIO / WORDS', image: galleryImage('podcast.webp'),
    title: '让值得听见的想法，跨过语言。',
    lead: '那些有价值的观点，有时藏在一段两三个小时的英文对话里。',
    story: '我喜欢长对谈里缓慢展开的思考。科技、AI、投资，以及人如何做出艰难的选择，都是我感兴趣的话题。翻译播客想做的事情很简单：找到值得听的交流，让它们跨过语言的边界。',
    detail: '重点不只是把英文换成中文，而是尽可能保留下观点的语境、前提、分歧，以及说话者真正想表达的意思。好的内容应该经得起回听。',
    steps: ['筛选信息密度真正足够的对谈。', '保留说话者的背景、立场与论点边界。', '围绕一个值得思考的问题，继续追查上下文。'],
    quote: '好的对谈，会让你改变提问题的方式。', secondary: galleryImage('agi.webp')
  },
  {
    id: 'future', number: '06', name: 'Future Atlas 未来志', english: 'FUTURE ATLAS', category: 'FUTURE / EDITORIAL', image: galleryImage('future.webp'),
    title: '给尚未到来的世界，画一张地图。',
    lead: '一座关于未来的私人展览馆：AGI、太空算力、可控核聚变与具身智能。',
    story: 'Future Atlas 是我正在制作的未来学项目。它连接重要人物对于 AI、能源、太空和机器人技术的观点，并把不同预测放到同一条时间轴上。',
    detail: '比大胆预测更重要的是结构：这个判断建立在什么技术假设上？哪些事件能够验证？哪些现实条件可能阻碍？我希望它成为一张不断更新的未来地图，而不是另一份转瞬即逝的科技新闻。',
    steps: ['以未来议题为入口，连接人物与技术。', '把大胆的观点与一手来源并排展示。', '保留分歧、时间线，以及尚未解决的难题。'],
    quote: '不是预测明天，而是理解明天为什么可能发生。', secondary: galleryImage('agi.webp')
  },
  {
    id: 'strategy', number: '07', name: '链上策略实验室', english: 'THE LAB', category: 'EXPERIMENT / TOOLS', image: galleryImage('strategy.webp'),
    title: '把好奇心变成可以运行的东西。',
    lead: '从金融工具到自动化脚本，把一个想法做成可以检验的原型。',
    story: '我对工具有一种几乎本能的兴趣。看见一个重复发生的问题，我就会想：能不能让机器帮我处理？能不能把凭感觉的判断变成可验证的流程？',
    detail: '这些实验并不保证成功。有些会成为长期使用的工具，有些则因为成本、复杂度或者不可靠而被放弃。对我来说，真正的价值是把想法放到现实里接受测试。',
    steps: ['提出清晰、足够小的可验证问题。', '给数据质量、安全边界和失败场景留出位置。', '能停下来、能复盘，才值得继续迭代。'],
    quote: '想法很便宜，真正运行起来才有意思。', secondary: galleryImage('research.webp')
  },
  {
    id: 'members', number: '08', name: '会员社区', english: 'INNER CIRCLE', category: 'COMMUNITY / LIVE', image: galleryImage('members.webp'),
    title: '在公开内容之外，聊得更深入。',
    lead: '与一群认真思考市场的人一起讨论、提问、分歧和修正。',
    story: '会员社区是一个围绕加密市场、链上项目和真实投资思考建立的小范围交流空间。这里会有定期直播，也会讨论我正在研究什么、为什么改变想法，以及哪些问题还没有答案。',
    detail: '做内容很容易变成单向输出。但真正深入的讨论往往来自持续追问：一个项目值不值得关注？风险有没有被低估？我们是否在用过去的经验误读新的市场？',
    steps: ['定期直播，分享研究过程与市场观察。', '在小范围里把问题聊得更具体。', '欢迎不同意见，也欢迎改变主意。'],
    quote: '观点不是用来供奉的，是用来碰撞的。', secondary: galleryImage('podcast.webp')
  },
  {
    id: 'about', number: '09', name: '关于 3D', english: 'SANDY', category: 'ABOUT / LIFE', image: galleryImage('about.webp'),
    title: '认真玩，尽兴活。',
    lead: '我是 Sandy，也叫 3D。创作者、研究者，以及一个总想折腾点新东西的人。',
    story: '以前主要在加密世界里找机会、做研究、讲故事。现在好奇的东西越来越多：人工智能、未来科技、投资，还有那些值得花很多年去理解的问题。',
    detail: '这个网站是我的个人存档，也是一个小小的游乐场。你可以随便浏览这些作品。它们不一定彼此相关，但每一件背后，都有一段我真正想弄明白的东西。',
    steps: ['保持好奇，持续学习。', '把想明白的事讲清楚。', '认真做事，也别忘了好玩。'],
    quote: '游戏人生。认真玩，尽兴活。', secondary: galleryImage('channel.webp'),
    link: xProfile, linkLabel: '关注 X @22333D',
  },
].map((project) => ({
  ...project,
  previewImage: `${import.meta.env.BASE_URL}gallery-lite/${project.id}.webp`,
}));

function CloseIcon() {
  return <svg width="25" height="25" viewBox="0 0 25 25" aria-hidden="true"><path d="M4 4L21 21M21 4L4 21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>;
}

export function App() {
  const [selected, setSelected] = useState(null);
  const [introPlaying, setIntroPlaying] = useState(() => typeof window !== 'undefined' && !window.matchMedia?.(reducedMotionQuery).matches);
  const [showContact, setShowContact] = useState(false);
  const detailRef = useRef(null);
  const active = projects.find((p) => p.id === selected);

  const open = useCallback((id) => {setSelected(id); setShowContact(false);}, []);
  const close = useCallback(() => {setSelected(null); setShowContact(false);}, []);
  const finishIntro = useCallback(() => setIntroPlaying(false), []);
  useEffect(() => { if (detailRef.current) detailRef.current.scrollTop = 0; }, [selected]);
  useEffect(() => {
    if (!introPlaying) return;
    const motion = window.matchMedia?.(reducedMotionQuery);
    if (!motion) return;
    const skipIfReduced = ({ matches }) => { if (matches) finishIntro(); };
    skipIfReduced(motion);
    motion.addEventListener('change', skipIfReduced);
    return () => motion.removeEventListener('change', skipIfReduced);
  }, [introPlaying, finishIntro]);
  useEffect(() => {
    const handler = (event) => {
      if (introPlaying && event.key === 'Escape') { finishIntro(); return; }
      if (event.key === 'Escape') { if (showContact) setShowContact(false); else if (selected) close(); }
      if (selected && event.key === 'ArrowRight') { const index = projects.findIndex((p) => p.id === selected); open(projects[(index + 1) % projects.length].id); }
      if (selected && event.key === 'ArrowLeft') { const index = projects.findIndex((p) => p.id === selected); open(projects[(index - 1 + projects.length) % projects.length].id); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selected, close, open, showContact, introPlaying, finishIntro]);

  return <div className="site-shell">
    <h1 className="sr-only">3D · Sandy — 业务与项目目录、动态作品背景</h1>
    <InfiniteGallery projects={projects} onOpen={open} visible={!active} dismissed={Boolean(active)} introPlaying={introPlaying} ambient />
    <BusinessOverview projects={projects} onOpen={open} onContact={() => setShowContact(true)} visible={!active} introPlaying={introPlaying} />
    {introPlaying && <GalleryIntro projects={projects} onFinish={finishIntro} />}

    {active && <section className="detail-screen" aria-label={`作品详情：${active.name}`}>
      <div className="detail-scroll" ref={detailRef} key={active.id}>
        <article className="case-study">
          <header className="case-heading">
            <span className="case-index">{active.number} / 09 — {active.category}</span>
            <h2>{active.name}</h2>
            <p className="case-lead">{active.lead}</p>
            {active.link && <a href={active.link} target="_blank" rel="noopener noreferrer" className="solid-link case-visit">{active.linkLabel} <span aria-hidden="true">↗</span></a>}
          </header>
          <div className="case-art"><img src={active.image} alt={`${active.name} 项目作品封面`} /></div>
          <div className="case-copy"><div className="case-section-label">01 / THE STORY</div><div className="case-prose"><h3>{active.title}</h3><p>{active.story}</p><p>{active.detail}</p></div></div>
          <div className="case-art case-art-secondary"><img src={active.secondary} alt={`${active.name} 相关视觉作品`} loading="lazy" /></div>
          <div className="case-copy"><div className="case-section-label">02 / THE APPROACH</div><div className="case-prose"><h3>我是怎么思考这件事的</h3><div className="case-methods">{active.steps.map((line, i) => <div className="method" key={line}><span>0{i + 1}</span><p>{line}</p></div>)}</div></div></div>
          <blockquote className="case-quote">“{active.quote}”<span>— 3D</span></blockquote>
          <nav className="case-bottom" aria-label="作品导航"><div><span className="case-section-label">03 / NEXT STORY</span><h3>还有很多故事，慢慢讲。</h3></div><div className="case-links"><button type="button" className="outline-link" onClick={close}>返回首页 <span>↗</span></button></div></nav>
        </article>
      </div>
      <div className="detail-top"><button className="wordmark" onClick={close} type="button" aria-label="返回首页">3D <span> / works</span></button><button className="detail-close" type="button" onClick={close} aria-label="关闭项目详情"><CloseIcon /></button></div>
      <div className="detail-pager" aria-label="切换项目"><span className="pager-label">{active.number} — 09</span><button type="button" onClick={() => { const i = projects.findIndex((p) => p.id === selected); open(projects[(i - 1 + projects.length) % projects.length].id); }} aria-label="上一个项目">←</button><button type="button" onClick={() => {const i = projects.findIndex((p) => p.id === selected); open(projects[(i + 1) % projects.length].id);}} aria-label="下一个项目">→</button></div>
    </section>}

    {showContact && !active && <div className="contact-backdrop" onClick={() => setShowContact(false)} role="presentation"><section className="contact-modal" role="dialog" aria-modal="true" aria-label="联系方式" onClick={(event) => event.stopPropagation()}><button type="button" className="contact-close" onClick={() => setShowContact(false)} aria-label="关闭联系方式"><CloseIcon /></button><span className="eyebrow">HELLO THERE</span><h2>聊点有意思的。</h2><p>关于加密、科技、内容创作，或者你正在做的一件有趣的事。</p><a href={xProfile} rel="noopener noreferrer" target="_blank" className="solid-link">在 X 上找到我 @22333D <span aria-hidden="true">↗</span></a><button type="button" className="contact-about" onClick={() => open('about')}>先了解我 →</button></section></div>}
  </div>;
}
