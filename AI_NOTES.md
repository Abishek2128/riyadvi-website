# AI Tools Used

## Claude (main development assistant)

**Why I chose it:** it can plan a full-stack project step by step, write React, Three.js and Express code, and explain errors when I paste them. I used it as a pair programmer, not as a one-click generator.

**How I used it:** I asked for a plan and priorities first, then built one feature at a time, running and testing each one before moving on.

### 1. 3D hero (React Three Fiber)
- **Purpose:** an interactive node-sphere that reacts to cursor and scroll.
- **Example prompt:** "Create an interactive 3D digital ecosystem representing technology and business transformation, in gold and black, that works on mobile."
- **Generated:** the first version of the node network and the hero layout.
- **Manually changed:** moved the sphere to the right, added an emissive gold core, resized the headline, lowered node count and pixel ratio on phones.
- **Debugging:** the sphere stayed centred on wide screens because screen size was read only once at load. I changed it to a live resize listener and positioned the sphere from the real viewport width.

### 2. Scroll-based transformation story (GSAP ScrollTrigger + Lenis)
- **Purpose:** Challenge, Strategy, Design, Technology, Launch, Growth as a pinned scroll animation.
- **Generated:** the first timeline.
- **Manually changed:** shortened the scroll distance per step, added scrub smoothing, tuned Lenis smoothness.
- **Debugging:** the section rendered squeezed into half the screen. The pinned element was a flex container that lost its width, so I pinned a plain wrapper and set `invalidateOnRefresh`.

### 3. Technology constellation (R3F)
- **Purpose:** orbiting rings of technology labels with hover.
- **Debugging:** labels made with Drei `Html` caused a React error ("unmount a root while rendering") on Next.js 16. I replaced them with canvas-texture sprites, which also avoids a DOM overlay on the 3D canvas.

### 4. Dynamic service pages
- **Purpose:** one data file and one `/services/[slug]` template for all six services, plus one reusable 3D scene component with six configurations.
- **Generated:** the template, the data structure and the scenes.
- **Manually changed:** (write what you changed, for example wording in services.ts or scene colours)
- **Debugging:** Next.js 16 requires awaited `params` to be read inside `Suspense`, and my file briefly had two `export default` lines. I wrapped the content in Suspense and fixed the duplicate export. I confirmed it with `npm run build`.

### 5. Backend APIs (Express, Zod, Mongoose)
- **Purpose:** contact, consultation, health checkup, lead magnet and job application endpoints with validation and clear error responses.
- **Generated:** the route structure, schemas and models.
- **Manually changed:** (write what you changed, for example validation rules or messages)
- **Debugging:** the cloud database could not be reached because of a DNS problem on my network (fixed by setting DNS servers in code), the Atlas IP allow-list had to include Render's servers, the Render connection string was entered wrongly twice, and CORS blocked the live site until `CLIENT_URL` contained the Vercel address.

### 6. Forms (contact, 6-step Business Health Checkup, lead magnet)
- **Purpose:** forms that call the API, show validation errors per field, and store data in MongoDB.
- **Manually changed:** (write what you changed, for example step titles, options or wording)
- **Verified:** I checked each submission in MongoDB Atlas, locally and on the live site.

### 7. Portfolio and case studies
- **Purpose:** project data, a `/portfolio` grid and one `/portfolio/[slug]` template, with interactive 3D presentation for selected case studies.
- **Content note:** case-study text is sample content, because the company website only publishes client logos. Industries are illustrative.
- **Debugging:** pages were empty or in a mistyped folder (`porfolio`), which gave a 404 and a "default export is not a React component" error. I checked file sizes, moved the content and deleted the wrong folder.

### 8. About page
- **Purpose:** animated company timeline with a scroll-linked line.
- **Source of content:** real facts from the Riyadvi website (founded 2021, expansion, Australia, the 2024 award). I reworded the mission, vision and values.

### 9. Blog
- **Purpose:** search, categories, tags, featured article and related articles, with a small data-access layer (`getAllPosts`, `getPostBySlug`, `getRelatedPosts`) so a CMS can replace the sample data later.
- **Content note:** the five articles are sample content.

### 10. Careers
- **Purpose:** job filters (department, designation, experience), job pages, and an application form with resume upload (multer, stored in MongoDB for simplicity).
- **Content note:** the roles are sample content.

## Process and workflow problems I solved myself
- I committed from the wrong folder once, and Git recorded every file as deleted. I restored the project with `git revert`, then kept a single working folder.
- I rotated my database password after it appeared in screenshots, and stored secrets only in `.env` files and hosting settings.
- I ran `npm run build` before pushing, so the same checks pass on Vercel.

## What I wrote or decided without AI
- (add your own: product decisions, content choices, which features to cut, design choices)
- (add any other AI tools you really used, such as image or design tools, with the same fields)

## Honest limitations
- Sample content in portfolio, blog and careers.
- Resumes are stored in MongoDB, and a production site should use cloud storage.
- The free Render server sleeps, so the first request can take about 50 seconds.