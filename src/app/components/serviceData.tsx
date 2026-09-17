import type { ComponentType } from "react";
import BrandingGraphic from "./service-graphics/BrandingGraphic";
import EcommerceGraphic from "./service-graphics/EcommerceGraphic";
import MobileDevGraphic from "./service-graphics/MobileDevGraphic";
import SeoGraphic from "./service-graphics/SeoGraphic";
import SocialGraphic from "./service-graphics/SocialGraphic";
import WebDevGraphic from "./service-graphics/WebDevGraphic";

export type ServiceItem = {
  title: string;
  exploreLabel: string;
  description: string;
  tags: string[];
  Graphic: ComponentType<{ tiltDisabled?: boolean }>;
};

export const SERVICES: ServiceItem[] = [
  {
    title: "Web Design & Development",
    exploreLabel: "Web Development",
    description:
      "Fast, scalable, beautifully engineered websites built to convert and built to last.",
    tags: ["Next.js & React", "Headless CMS", "Enterprise Performance", "Tailored Architecture"],
    Graphic: WebDevGraphic,
  },
  {
    title: "Mobile App Development",
    exploreLabel: "Mobile Development",
    description:
      "Native and cross-platform apps engineered for performance and a delightful experience.",
    tags: ["iOS & Android Native", "React Native & Flutter", "Offline Architecture", "Biometric Security"],
    Graphic: MobileDevGraphic,
  },
  {
    title: "E-commerce Development",
    exploreLabel: "E-commerce",
    description:
      "Custom storefronts on Shopify, WooCommerce, and headless stacks that sell around the clock.",
    tags: ["Headless Commerce", "Custom Checkout Flows", "Payment Integration", "Inventory Sync"],
    Graphic: EcommerceGraphic,
  },
  {
    title: "Branding",
    exploreLabel: "Branding",
    description:
      "Identity systems, logos, and visual languages that make businesses instantly recognizable.",
    tags: ["Visual Identity Systems", "Logo & Wordmark Design", "Brand Guidelines", "Motion Branding"],
    Graphic: BrandingGraphic,
  },
  {
    title: "SEO",
    exploreLabel: "SEO",
    description: "Technical and content SEO strategies that get you found — and keep you found.",
    tags: ["Technical SEO Audits", "Content Strategy", "Keyword Research", "Core Web Vitals"],
    Graphic: SeoGraphic,
  },
  {
    title: "Social Media Management",
    exploreLabel: "Social Media",
    description: "Content, community, and campaigns that turn followers into customers.",
    tags: ["Content Calendars", "Multi-Platform Scheduling", "Community Management", "Performance Analytics"],
    Graphic: SocialGraphic,
  },
];
