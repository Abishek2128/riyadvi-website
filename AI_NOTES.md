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