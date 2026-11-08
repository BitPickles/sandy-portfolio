# Prototype Instructions

## Dual-mode demo direction (user-requested, 2026-11-08)

- This directory is a separate **Demo** copied from the original Site; do not change or publish over the original `郑智 · Crypto3D — 作品画廊` Site.
- Preserve all nine existing image assets, the 2.7-second real-project cinematic opening, the fast long-form case studies, and the seamless draggable infinite canvas.
- After the cinematic opening, reveal a highly legible, polished **Overview / Index** containing explicit counts and groups, with direct links to all nine projects. The overview should clarify that there are *two core operating directions*, additional research and new projects, and an About entry—never equate nine tiles with nine independent businesses.
- Provide a clear, reversible **总览 ↔ 自由画布** toggle; switching modes and returning from project detail must not replay the cinematic opening or reset the underlying canvas pan state.
- Favor refined light editorial typography, existing original artwork, restrained translucency, and satisfying motion; no decorative sphere or unrelated floating object.

## Durable creative direction (user-confirmed, 2026-11-08; overrides older orb ideas)

- Primary visual reference: the **expanded portfolio grid/gallery** visible in the user's attached screenshot of `https://angelo.so/`, not its initial home sphere.
- The user explicitly **does not want any spheres, floating balls, orbit/concentric navigation, or globe gimmicks**. All former orb navigation/assets must be absent from the rendered UI.
- Home must load directly into a generous white editorial project gallery: a big, three-column partially edge-clipped grid of pale-gray rounded rectangular mats, oversized white gutters, refined distinct design imagery centered inside mats, small fixed footer signature/social/contact, and a small top-right close control. Source image: `/workspace/scratch/16a5064905ba/upload/image(20261107-203922).png`.
- **2026-11-08 update:** The finite set of nine gallery projects must feel like an **infinite two-dimensional canvas**. Preserve the Angelo-style large white gallery cards exactly, but allow free mouse/touch dragging in any direction, smooth wheel navigation (including horizontal trackpads), subtle inertia, and mathematically seamless wraparound in both axes. The same nine artworks repeat, with no visible canvas edges or jumps; do not introduce extra decorative objects. Distinguish a drag from a click to enter the **fast**, scrollable long-form case study; close returns to the same pan position. Preserve enough room for text; no side drawer.
- **2026-11-08 cinematic opening:** On first page entry, play a brisk **2–3 second** sequence in which **all nine real project cards** whip by the viewer with dynamic motion blur, before the entire Angelo-style three-column pattern resolves from depth into the existing infinite canvas. The final animation frame must be pixel-identical to the resting canvas: no flash, snap, teleport, or unintended replay on return from a project. Use the existing nine cover assets, **not** spheres, decorative shapes, generic glass art, or extra cards. Respect reduced-motion preferences and let visitor input skip the intro immediately.
- Art direction: premium Apple-like minimal restraint and craft, *not* a generic glassmorphism UI, excessive effects or prefab template. Original artwork has vibrancy; gallery and detail chrome stay almost-white.
- Projects and works: 3D 加密频道, Crypto3D Research, 什么值得挖, AGI, 翻译播客, Future Atlas 未来志, 链上策略实验室, 会员社区, 关于郑智. Core six retained; extra tiles lead into existing focus areas.
- User repeatedly called previous examples too generic/ugly. Fidelity to the attached gallery screenshot outweighs reintroducing novelty not present in the reference.

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.
