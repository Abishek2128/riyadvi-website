export type Job = {
  slug: string;
  title: string;
  department: string;
  designation: string;
  experience: string;
  location: string;
  type: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
};

// SAMPLE CONTENT: replace with the real openings at Riyadvi.
const jobs: Job[] = [
  {
    slug: "full-stack-developer",
    title: "Full Stack Developer",
    department: "Engineering",
    designation: "Developer",
    experience: "1-3 years",
    location: "Chennai",
    type: "Full-time",
    summary: "Build websites and web apps for clients, from interface to database.",
    responsibilities: [
      "Build responsive interfaces with React and Next.js",
      "Create and maintain APIs with Node.js and Express",
      "Work with MongoDB or MySQL databases",
      "Review code and fix bugs with the team",
    ],
    requirements: [
      "Hands-on experience with JavaScript and React",
      "Basic knowledge of Node.js and databases",
      "Good communication and a habit of learning",
    ],
  },
  {
    slug: "ui-ux-designer",
    title: "UI/UX Designer",
    department: "Design",
    designation: "Designer",
    experience: "1-3 years",
    location: "Chennai",
    type: "Full-time",
    summary: "Design clear, attractive interfaces for web and mobile products.",
    responsibilities: [
      "Create wireframes, prototypes and final designs",
      "Build and maintain a consistent design system",
      "Work closely with developers on handoff",
      "Improve designs using feedback from real users",
    ],
    requirements: [
      "Portfolio showing web or app design work",
      "Strong skills in Figma",
      "Understanding of usability and accessibility",
    ],
  },
  {
    slug: "digital-marketing-executive",
    title: "Digital Marketing Executive",
    department: "Marketing",
    designation: "Executive",
    experience: "Fresher",
    location: "Chennai",
    type: "Full-time",
    summary: "Plan and run campaigns and content that bring qualified leads.",
    responsibilities: [
      "Manage social media content and posters",
      "Run and report on paid ad campaigns",
      "Track results in analytics tools",
      "Support SEO and content planning",
    ],
    requirements: [
      "Interest in digital marketing and social media",
      "Clear writing and basic design sense",
      "Willingness to learn analytics and ad tools",
    ],
  },
  {
    slug: "3d-artist",
    title: "3D Artist",
    department: "Design",
    designation: "Artist",
    experience: "3+ years",
    location: "Chennai",
    type: "Full-time",
    summary: "Create product and environment models for web, AR and VR projects.",
    responsibilities: [
      "Model, texture and optimise 3D assets",
      "Prepare models for web and real-time use",
      "Collaborate with developers on 3D scenes",
      "Keep file sizes small and quality high",
    ],
    requirements: [
      "Strong Blender skills with a portfolio",
      "Knowledge of texturing and optimisation",
      "Experience with glTF or real-time workflows is a plus",
    ],
  },
  {
    slug: "software-engineer-intern",
    title: "Software Engineer Intern",
    department: "Engineering",
    designation: "Intern",
    experience: "Fresher",
    location: "Chennai",
    type: "Internship",
    summary: "Learn by building real features with experienced developers.",
    responsibilities: [
      "Build small features under guidance",
      "Fix bugs and write simple tests",
      "Learn our tools and code review process",
    ],
    requirements: [
      "Basic JavaScript and web knowledge",
      "A project or two you can show us",
      "Curiosity and a willingness to ask questions",
    ],
  },
];

// Data-access layer: swap these to use a CMS or the database later.
export async function getAllJobs(): Promise<Job[]> {
  return jobs;
}

export async function getJobBySlug(slug: string): Promise<Job | undefined> {
  return jobs.find((j) => j.slug === slug);
}