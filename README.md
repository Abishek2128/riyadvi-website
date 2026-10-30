# Riyadvi Software Technologies: Website Revamp

A multi-page, full-stack corporate website with a 3D interactive experience, dynamic content, working forms, a database and an admin dashboard. It positions Riyadvi as a technology and digital solutions partner.

- **Live site:** https://riyadvi-website-blue.vercel.app
- **Live API:** https://riyadvi-api.onrender.com
- **GitHub:** https://github.com/Abishek2128/riyadvi-website
- **Admin:** /admin (credentials available on request)

> The free hosting plan sleeps when idle, so the first request to the API can take about 50 seconds.

## Project overview

The site is built from reusable templates and data files, so a new service, project, article or job is added without building a new page. Forms are connected to a real backend and database.

## Features

- **Homepage:** interactive 3D hero, scroll-based transformation story (Challenge, Strategy, Design, Technology, Launch, Growth), 3D technology constellation, company timeline, free resources
- **Services:** six services from one data file and one template (`/services/[slug]`), each with its own 3D scene, problem, solution, features, use cases, stack, process and a quote button
- **Portfolio:** project data and one case-study template (`/portfolio/[slug]`), with interactive 3D presentations for selected projects
- **About:** animated company timeline, mission, vision, values, approach, recognition
- **Blog:** search, categories, tags, featured article, related articles, and a small data-access layer so a CMS can replace the sample data
- **Careers:** department, designation and experience filters, job pages, and an application form with resume upload
- **Contact:** validated form saved to the database
- **Business Health Checkup:** six-step form saved to the database
- **Software Project Planning Guide:** lead form, then access to the guide with a Save as PDF option
- **Admin dashboard:** secure login, counts, tables for every form, status changes, resume download

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (App Router), React, TypeScript, Tailwind CSS |
| Backend | Node.js, Express |
| Database | MongoDB Atlas (Mongoose) |
| Validation | Zod |
| Auth | JSON Web Tokens |
| Hosting | Vercel (frontend), Render (backend) |

## Installation

```bash
git clone https://github.com/Abishek2128/riyadvi-website.git
cd riyadvi-website

# backend
cd backend
npm install
npm run dev

# frontend (new terminal)
cd frontend
npm install
npm run dev
```
The site runs at http://localhost:3000 and the API at http://localhost:5000.

## Environment variables

`backend/.env`
```
PORT=5000
MONGODB_URI=<your MongoDB connection string>
CLIENT_URL=http://localhost:3000
ADMIN_EMAIL=<admin email>
ADMIN_PASSWORD=<admin password>
JWT_SECRET=<long random string>
```
`frontend/.env.local`
```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_WHATSAPP=<optional, number with country code, digits only>
NEXT_PUBLIC_CALENDLY_URL=<optional>
```
`CLIENT_URL` accepts several addresses separated by commas, for example `http://localhost:3000,https://riyadvi-website-blue.vercel.app`.

## Database setup

1. Create a free MongoDB Atlas cluster.
2. Create a database user and allow network access (Render uses changing IP addresses).
3. Put the connection string in `MONGODB_URI`, including the database name `riyadvi`.

Collections are created automatically on first use: `contacts`, `consultations`, `healthcheckups`, `leadmagnets`, `applications`.

## API endpoints

| Method | Path | Purpose |
|---|---|---|
| POST | /api/contact | Contact enquiry |
| POST | /api/consultation | Consultation request |
| POST | /api/health-checkup | Business Health Checkup |
| POST | /api/lead-magnet | Planning guide lead |
| POST | /api/applications | Job application (multipart, resume PDF or Word up to 2 MB) |
| POST | /api/admin/login | Admin login (rate limited, returns a token) |
| GET | /api/admin/stats | Counts (token required) |
| GET | /api/admin/list/:kind | Records for a form (token required) |
| PATCH | /api/admin/status/:kind/:id | Change status (token required) |
| GET | /api/admin/applications/:id/resume | Download resume (token required) |
| GET | /api/health | Health check |

All form endpoints validate input with Zod and respond with `{ success, message, data }`, or `{ success: false, message, errors: [{ field, message }] }` with status 400 for invalid input.

## Deployment

- **Frontend (Vercel):** root directory `frontend`, environment variable `NEXT_PUBLIC_API_URL` set to the API address.
- **Backend (Render):** root directory `backend`, build command `npm install`, start command `npm start`, with the `backend/.env` variables set in the Environment tab.

## AI Tools Used

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

## 3D libraries used

Three.js and React Three Fiber. All 3D scenes are generated in code, with no imported models.

## Animation libraries used

GSAP with ScrollTrigger (scroll story), Lenis (smooth scrolling), Motion (interface animation and the animated timeline).

## Third-party assets

No external images or 3D models. Font: Inter (Google Fonts, through `next/font`). Company facts (founding year, expansion, award) come from the public Riyadvi website.

## Performance optimization

- 3D canvases load only in the browser, after the page is rendered
- Pixel ratio is capped, and phones get fewer nodes and no antialiasing in the hero
- Labels in the technology scene are textures, not HTML overlays
- Dynamic pages are prerendered at build time
- The production build is run before every deploy

## Known limitations

- Portfolio, blog and careers content is sample content. The structure is what matters, and real content can be added in one data file each.
- Resumes are stored in MongoDB for simplicity. Production should use cloud file storage.
- The free Render plan sleeps when idle, so the first API request can take about 50 seconds.
- Email notifications, Calendly and a location map are not implemented. WhatsApp shows only when a number is configured.
- The consultation API exists but has no page yet, so the dashboard count stays at zero.
- One admin account. The token is kept in session storage, and a production site would use a secure cookie.

## Future improvements

CMS integration (Strapi or Sanity) for blog, jobs and projects, email notifications, cloud file storage, a consultation booking page with Calendly, admin user accounts with secure cookies, automated tests, and a Lighthouse and real-device performance pass.

## Known limitations

- Portfolio, blog and careers content is sample content. The structure is what matters, and real content can be added in one data file each.
- Resumes are stored in MongoDB for simplicity. Production should use cloud file storage.
- The free Render plan sleeps when idle, so the first API request can take about 50 seconds.
- Email notifications and Calendly are not implemented.
- Services, projects, posts and jobs live in typed data files behind a data-access layer, not in database models.
- The consultation API exists but has no page yet.
- Homepage service cards use lightweight animated visuals. Full 3D scenes are on the service pages, and weak devices get a static poster.
- One admin account. The token is kept in session storage, and a production site would use a secure cookie.
- No team section or device-motion hero yet.