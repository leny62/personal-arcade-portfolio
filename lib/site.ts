export const SITE = {
  name: "Leny Pascal IHIRWE",
  role: "Software Engineer & Creative Technologist",
  description:
    "Portfolio of Leny Pascal IHIRWE, a software engineer building secure, scalable web applications and distributed systems across full-stack, .NET, and Web3.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://lenyihirwe.com",
  email: "lihirwe6@gmail.com",
  github: "https://github.com/leny62",
  linkedin: "https://www.linkedin.com/in/leny-pascal-ihirwe/",
  x: "https://x.com/lenyIhirwe",
  twitter: "@lenyIhirwe",
} as const;

export const ROUTES = [
  { name: "HOME", path: "/", label: "Home" },
  { name: "BIO", path: "/bio", label: "Bio" },
  { name: "EXPERIENCE", path: "/experience", label: "Experience" },
  { name: "SKILLS", path: "/skills", label: "Skills" },
  { name: "PROJECTS", path: "/projects", label: "Projects" },
  { name: "CONTACT", path: "/contact", label: "Contact" },
] as const;
