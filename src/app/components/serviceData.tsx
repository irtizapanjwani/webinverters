export type ServiceItem = {
  title: string;
  shortTitle: string;
  description: string;
  tags: string[];
  image: string;
  imageAlt: string;
  imageFit?: "cover" | "contain";
};

export const SERVICES: ServiceItem[] = [
  {
    title: "Web Design & Development",
    shortTitle: "Web Design & Development",
    description:
      "Fast, scalable, beautifully engineered websites built to convert and built to last.",
    tags: ["Next.js & React", "Headless CMS", "Enterprise Performance", "Tailored Architecture"],
    image: "/services-landing-page/web-design.jpg",
    imageAlt: "Modern website design on a laptop screen",
    imageFit: "contain",
  },
  {
    title: "Mobile App Development",
    shortTitle: "Mobile App Development",
    description:
      "Native and cross-platform apps engineered for performance and a delightful experience.",
    tags: ["iOS & Android Native", "React Native & Flutter", "Offline Architecture", "Biometric Security"],
    image: "/services-landing-page/mobile-dev.jpg",
    imageAlt: "Mobile app development on smartphone screens",
    imageFit: "contain",
  },
  {
    title: "E-commerce Development",
    shortTitle: "E-commerce",
    description:
      "Custom storefronts on Shopify, WooCommerce, and headless stacks that sell around the clock.",
    tags: ["Headless Commerce", "Custom Checkout Flows", "Payment Integration", "Inventory Sync"],
    image: "/services-landing-page/firefly-ecommerce.png",
    imageAlt: "E-commerce online shopping interface",
    imageFit: "contain",
  },
  {
    title: "Branding",
    shortTitle: "Branding",
    description:
      "Identity systems, logos, and visual languages that make businesses instantly recognizable.",
    tags: ["Visual Identity Systems", "Logo & Wordmark Design", "Brand Guidelines", "Motion Branding"],
    image: "/services-landing-page/branding-service.png",
    imageAlt: "Brand identity design materials and logo",
    imageFit: "contain",
  },
  {
    title: "SEO",
    shortTitle: "SEO",
    description:
      "Technical and content SEO strategies that get you found — and keep you found.",
    tags: ["Technical SEO Audits", "Content Strategy", "Keyword Research", "Core Web Vitals"],
    image: "/services-landing-page/seofinal.png",
    imageAlt: "SEO analytics dashboard with charts and metrics",
    imageFit: "contain",
  },
  {
    title: "Social Media Management",
    shortTitle: "Social Media",
    description:
      "Content, community, and campaigns that turn followers into customers.",
    tags: ["Content Calendars", "Multi-Platform Scheduling", "Community Management", "Performance Analytics"],
    image: "/services-landing-page/social-service.png",
    imageAlt: "Social media management on multiple platforms",
    imageFit: "contain",
  },
];
