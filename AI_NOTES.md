## 3D Hero
- Tool: Claude
- Purpose: Initial React Three Fiber concept (node sphere, cursor and scroll response)
- Prompt: Create an interactive 3D digital ecosystem representing technology and business transformation
- Manual changes: moved sphere to the right, added emissive core, resized headline
- Why: fast starting point; I tuned it for layout and readability

## Transformation scroll story
- Tool: Claude
- Purpose: GSAP ScrollTrigger pinned timeline for the 6-step approach section
- Manual changes: (write what you change, for example the step text or timing)

- Debugging: Drei <Html> labels caused a React "unmount a root while rendering" error on Next 16. I replaced them with canvas-texture sprites, which also avoids DOM overlays on the 3D canvas.

## Dynamic service pages and form APIs
- Tool: Claude
- Purpose: one data-driven /services/[slug] template, reusable R3F scenes, and Express + Zod + Mongoose form APIs
- Debugging: fixed a Next.js 16 error by wrapping the awaited params in Suspense; fixed a wrong-folder issue where new backend files were not in the running project
- Manual changes: (write what you really changed)