export type ServiceItem = {
  title: string;
  shortTitle: string;
  description: string;
  tags: string[];
  image: string;
  imageAlt: string;
};

export const SERVICES: ServiceItem[] = [
  {
    title: "Web Design & Development",
    shortTitle: "Web Design & Development",
    description:
      "Fast, scalable, beautifully engineered websites built to convert and built to last.",
    tags: ["Next.js & React", "Headless CMS", "Enterprise Performance", "Tailored Architecture"],
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
    imageAlt: "Modern website design on a laptop screen",
  },
  {
    title: "Mobile App Development",
    shortTitle: "Mobile App Development",
    description:
      "Native and cross-platform apps engineered for performance and a delightful experience.",
    tags: ["iOS & Android Native", "React Native & Flutter", "Offline Architecture", "Biometric Security"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    imageAlt: "Mobile app development on smartphone screens",
  },
  {
    title: "E-commerce Development",
    shortTitle: "E-commerce",
    description:
      "Custom storefronts on Shopify, WooCommerce, and headless stacks that sell around the clock.",
    tags: ["Headless Commerce", "Custom Checkout Flows", "Payment Integration", "Inventory Sync"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    imageAlt: "E-commerce online shopping interface",
  },
  {
    title: "Branding",
    shortTitle: "Branding",
    description:
      "Identity systems, logos, and visual languages that make businesses instantly recognizable.",
    tags: ["Visual Identity Systems", "Logo & Wordmark Design", "Brand Guidelines", "Motion Branding"],
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80",
    imageAlt: "Brand identity design materials and logo",
  },
  {
    title: "SEO",
    shortTitle: "SEO",
    description:
      "Technical and content SEO strategies that get you found — and keep you found.",
    tags: ["Technical SEO Audits", "Content Strategy", "Keyword Research", "Core Web Vitals"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    imageAlt: "SEO analytics dashboard with charts and metrics",
  },
  {
    title: "Social Media Management",
    shortTitle: "Social Media",
    description:
      "Content, community, and campaigns that turn followers into customers.",
    tags: ["Content Calendars", "Multi-Platform Scheduling", "Community Management", "Performance Analytics"],
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    imageAlt: "Social media management on multiple platforms",
  },
];
