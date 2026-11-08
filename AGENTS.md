# Prototype Instructions

## Ambient infinite canvas homepage (latest user direction, 2026-11-08)

- This directory is a separate **Demo** copied from the original Crypto3D gallery Site; do not change or publish over the original Site.
- Preserve all nine existing image assets, the 2.7-second real-project cinematic opening, the fast long-form case studies, and the mathematically seamless two-dimensional canvas.
- After the cinematic opening, show **one homepage**: an editorial project directory with three terse groups (业务、研究、探索), eight projects, and a standalone 关于 3D entry. Never equate nine tiles with nine independent businesses.
- Reveal the complete homepage during the ninth cover's exit. Keep the directory and its ambient background in the same reveal, with no standalone canvas or pause between the opening and the homepage.
- The user selected the original 2.7-second opening after reviewing the filmstrip and fast sweep previews. Use the original alternating cover paths for the live opening.
- Use lightweight covers in the opening, ambient canvas, and homepage preview. Prioritize the first cover and keep the original full-resolution artwork in project details.
- Use the supplied public destinations and verified branding for the YouTube channel, Crypto3D 数据站, 什么值得挖, and X. Identify 什么值得挖 as a member sign-in entry when linking to its public landing page.
- The user no longer wants a separate infinite-canvas browsing mode. Reuse the nine-image infinite field **only as a gently, continuously moving ambient background** under a tasteful transparent/frosted-glass directory. No duplicate canvas entry CTA, mode toggle, or independent gallery interaction.
- The background must not intercept foreground interactions, should pause behind a detailed story, and must stop moving for visitors who prefer reduced motion. Returning from a project must not replay the cinematic opening.
- Favor refined light editorial typography, existing original artwork, restrained translucency, strong text contrast, and satisfying motion; no decorative sphere or unrelated floating object.
- **Naming and copy update:** Never surface the user's real name anywhere in the Site (page copy, metadata, quotes, details, or footer). Public shorthand and signature: **3D**. Full alias: **Sandy**. Remove decorative text counters and repetitive labels such as 个人档案, 研究与新项目, and bilingual metadata in the overview. Let the project list itself explain the breadth.

## Durable creative direction (user-confirmed, 2026-11-08; overrides older orb ideas)

- Primary visual reference: the **expanded portfolio grid/gallery** visible in the user's attached screenshot of `https://angelo.so/`, not its initial home sphere.
- The user explicitly **does not want any spheres, floating balls, orbit/concentric navigation, or globe gimmicks**. All former orb navigation/assets must be absent from the rendered UI.
- Home must load directly into a generous white editorial project gallery: a big, three-column partially edge-clipped grid of pale-gray rounded rectangular mats, oversized white gutters, refined distinct design imagery centered inside mats, small fixed footer signature/social/contact, and a small top-right close control. Source image: `/workspace/scratch/16a5064905ba/upload/image(20261107-203922).png`.
- **2026-11-08 update:** The finite set of nine gallery projects must feel like an **infinite two-dimensional canvas**. Preserve the Angelo-style large white gallery cards exactly, but allow free mouse/touch dragging in any direction, smooth wheel navigation (including horizontal trackpads), subtle inertia, and mathematically seamless wraparound in both axes. The same nine artworks repeat, with no visible canvas edges or jumps; do not introduce extra decorative objects. Distinguish a drag from a click to enter the **fast**, scrollable long-form case study; close returns to the same pan position. Preserve enough room for text; no side drawer.
- **2026-11-08 cinematic opening:** On first page entry, play a brisk **2–3 second** sequence in which **all nine real project cards** whip by the viewer with dynamic motion blur. The last card transitions directly into the directory homepage with its ambient canvas. Use the existing nine cover assets, **not** spheres, decorative shapes, generic glass art, or extra cards. Respect reduced-motion preferences and let visitor input skip the intro immediately.
- Art direction: premium Apple-like minimal restraint and craft, *not* a generic glassmorphism UI, excessive effects or prefab template. Original artwork has vibrancy; gallery and detail chrome stay almost-white.
- Projects and works: 3D 加密频道, Crypto3D Research, 什么值得挖, AGI, 翻译播客, Future Atlas 未来志, 链上策略实验室, 会员社区, 关于 3D. Core six retained; extra tiles lead into existing focus areas.
- User repeatedly called previous examples too generic/ugly. Fidelity to the attached gallery screenshot outweighs reintroducing novelty not present in the reference.

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.
