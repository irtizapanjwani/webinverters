import type { BrandKey } from "./brandIcons";

/* ------------------------------------------------------------------ */
/* Content for the service pages (/services/<slug>). Every page uses   */
/* the same layout (app/services/[service]/page.tsx); only the words,   */
/* pictures, tools and process steps below change.                      */
/* ------------------------------------------------------------------ */

/** One button in the platforms/tools card. `brand` draws that brand's mark
 *  (Simple Icons); `code` draws a code icon, for custom work. `badge` is the
 *  pill colour. */
export type PlatformItem = { name: string; badge: string; brand?: BrandKey; code?: boolean };

/** One tab along the foot of the showcase. `lead` and `rest` form the
 *  two-tone headline. */
export type ShowcaseTab = { label: string; lead: string; rest: string; body: string };

export type ProcessStep = { title: string; body: string };

export type ServicePage = {
  slug: string;
  meta: { title: string; description: string };
  /** The breadcrumb's last item, e.g. "Web Design Services". */
  crumb: string;
  hero: {
    /** Headline lines; `accent` lines are in light blue. */
    lines: { text: string; accent?: boolean }[];
    image: string;
    imageAlt: string;
    statement: string;
    body: string;
  };
  expertise: { name: string; body: string };
  showcase: { image: string; label: string; tabsLabel: string; tabs: ShowcaseTab[]; exclude?: string[] };
  platforms: { lead: string; rest: string; items: PlatformItem[] };
  process: { name: string; steps: ProcessStep[] };
};

const CODE_BADGE = "bg-[linear-gradient(135deg,#0F766E,#10B981)]";

/* ---------------- Web Design & Development ---------------- */

export const WEB_PLATFORMS: PlatformItem[] = [
  { name: "Webflow Design & Dev", badge: "bg-[#146EF5]", brand: "webflow" },
  { name: "WordPress Design & Dev", badge: "bg-[#21759B]", brand: "wordpress" },
  { name: "Custom & Headless Development", badge: CODE_BADGE, code: true },
  { name: "Wix Studio Design & Dev", badge: "bg-[linear-gradient(135deg,#4F46E5,#8B5CF6)]", brand: "wix" },
  { name: "Squarespace Design & Dev", badge: "bg-[#0B0B0B]", brand: "squarespace" },
];

export const WEB_TABS: ShowcaseTab[] = [
  {
    label: "Custom Web Design",
    lead: "Custom",
    rest: "Website Design",
    body: "A custom website should feel unmistakably connected to the business behind it, not the template beneath it. We start with your brand, audience and the commercial role of the site, then define the architecture, content, visual system and functionality around those needs — and choose the platform once the strategy is clear.",
  },
  {
    label: "Redesign",
    lead: "Website",
    rest: "Redesign",
    body: "When a site no longer reflects the business, we redesign it around what already works. We audit content, traffic and conversions first, keep what earns its place, and rebuild the rest — with redirects and SEO protected so nothing you have built is lost in the move.",
  },
  {
    label: "Responsive Web Design",
    lead: "Responsive",
    rest: "Web Design",
    body: "Most visitors arrive on a phone. We design every layout to adapt from the smallest screen to the widest desktop, so navigation, content and calls to action stay clear, fast and easy to use wherever someone meets your brand.",
  },
  {
    label: "Accessible Web Design",
    lead: "Accessible",
    rest: "Web Design",
    body: "An accessible website works for everyone. We design and build to WCAG guidelines — contrast, keyboard navigation, screen-reader structure and readable content — so more people can use your site, and it stands on firmer legal ground.",
  },
  {
    label: "Small Business Websites",
    lead: "Small Business",
    rest: "Websites",
    body: "A small business site has to work hard from day one. We build focused, professional websites that explain what you do, earn trust quickly and turn visitors into enquiries — without the cost or complexity of an enterprise build.",
  },
  {
    label: "B2B",
    lead: "B2B",
    rest: "Website Design",
    body: "B2B buyers research carefully and involve several decision-makers. We design sites that make complex offerings easy to understand, support each stage of a long sales cycle, and give your sales team pages worth sending.",
  },
  {
    label: "UX-Led",
    lead: "UX-Led",
    rest: "Website Design",
    body: "We start from how people actually use a site. Research, user journeys and testing shape the structure before any visual design, so the finished website is intuitive to navigate and guides visitors toward the actions that matter.",
  },
];

export const WEB_STEPS: ProcessStep[] = [
  {
    title: "Discover",
    body: "We align on goals, study your audience and competitors, and audit what you have — research that shapes the sitemap, content and standards.",
  },
  {
    title: "Design",
    body: "We turn strategy into layouts, components and responsive designs, with interactive prototypes so the decisions that matter are made before anything is built.",
  },
  {
    title: "Development",
    body: "We build on a clean, well-structured codebase or CMS, with accessibility, performance and analytics handled from the first line — not bolted on at the end.",
  },
  {
    title: "Launch",
    body: "We run full QA, set up redirects and tracking, hand over clearly, then plan the first improvements so the site keeps earning its place after go-live.",
  },
];

/* ---------------- All six pages ---------------- */

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: "web-design",
    meta: {
      title: "Web Design & Development — Web Inventers",
      description:
        "Web Inventers designs and engineers custom websites that make a stronger case for the businesses behind them — strategy, UX, design, development, SEO and accessibility in one team.",
    },
    crumb: "Web Design Services",
    hero: {
      lines: [{ text: "Custom Web" }, { text: "Design &", accent: true }, { text: "Development", accent: true }],
      image: "/services/website_service.png",
      imageAlt: "A laptop showing a custom website design, on a sculpted white stand",
      statement: "Web Inventers designs and engineers custom websites that make a stronger case for the businesses behind them.",
      body: "A website is often where a business has to make its case without anyone in the room. The message should be clear within seconds, the experience should earn trust, and the technology should support the work without getting in the way. We start with research and strategy, then turn that understanding into site architecture, content, UX, visual design, development, SEO and accessibility — built on Next.js and React, or the platform that fits you best.",
    },
    expertise: {
      name: "Web Design & Development",
      body: "Web Inventers brings strategy, UX, content, visual design, web development, accessibility and search together to build websites shaped around your business, your audience, and the decisions the experience needs to support.",
    },
    showcase: {
      image: "/services-landing-page/web-design.jpg",
      label: "Website design services",
      tabsLabel: "Kinds of website",
      tabs: WEB_TABS,
      exclude: ["ecommerce"],
    },
    platforms: { lead: "Platforms", rest: "We Design & Build On", items: WEB_PLATFORMS },
    process: { name: "Web Design", steps: WEB_STEPS },
  },

  {
    slug: "mobile-apps",
    meta: {
      title: "Mobile App Development — Web Inventers",
      description:
        "Web Inventers designs and builds native and cross-platform mobile apps for iOS and Android — engineered for performance, security and a delightful experience.",
    },
    crumb: "Mobile App Services",
    hero: {
      lines: [{ text: "Mobile App" }, { text: "Design &", accent: true }, { text: "Development", accent: true }],
      image: "/services/mobile_service.png",
      imageAlt: "Three smartphones showing app screens, on a floating platform",
      statement: "Web Inventers builds mobile apps people keep on their home screen — fast, secure and genuinely useful.",
      body: "An app earns its place on a phone one session at a time. It has to load quickly, feel natural on each platform, work when the signal drops, and keep data safe. We start with the product and the people who will use it, then design, build and ship native or cross-platform apps for iOS and Android — and support them through every release after launch.",
    },
    expertise: {
      name: "Mobile App Development",
      body: "Web Inventers brings product strategy, UX, interface design, engineering, security and store launch together to build apps shaped around your users, your business model, and the moments the app needs to deliver.",
    },
    showcase: {
      image: "/services-landing-page/mobile-dev.jpg",
      label: "Mobile app services",
      tabsLabel: "Kinds of app",
      tabs: [
        { label: "iOS Apps", lead: "Native", rest: "iOS Apps", body: "iPhone and iPad users expect apps that feel right at home. We build in Swift with Apple's design patterns, so every gesture, animation and screen feels native — fast, reliable and ready for App Store review." },
        { label: "Android Apps", lead: "Native", rest: "Android Apps", body: "Android runs on thousands of devices. We build in Kotlin with Material Design, test across screen sizes and OS versions, and make sure your app performs as well on a mid-range phone as on a flagship." },
        { label: "Cross-Platform", lead: "Cross-Platform", rest: "App Development", body: "One codebase, both stores. With React Native or Flutter we ship to iOS and Android together — cutting time and cost while keeping the look, feel and performance people expect from a native app." },
        { label: "App UI/UX Design", lead: "App", rest: "UI/UX Design", body: "Great apps are designed around how people hold and use their phones. We map user journeys, prototype key flows and test them early, so the finished app is intuitive from the very first tap." },
        { label: "MVP Development", lead: "MVP", rest: "Development", body: "Prove the idea before you scale it. We scope the smallest version that delivers real value, build it quickly on a foundation that can grow, and put it in front of users so every next decision is based on evidence." },
        { label: "App Modernization", lead: "App", rest: "Modernization", body: "Older apps slow teams down and frustrate users. We audit what you have, fix what is holding it back, and modernize the code, design and infrastructure — without losing the users and data you already have." },
        { label: "Maintenance & Support", lead: "Maintenance", rest: "& Support", body: "Launch is the start, not the finish. We keep your app current with new OS releases, monitor crashes and performance, and ship regular improvements so it keeps earning its place on the home screen." },
      ],
    },
    platforms: {
      lead: "Platforms",
      rest: "We Build Apps On",
      items: [
        { name: "iOS App Development", badge: "bg-[#111111]", brand: "apple" },
        { name: "Android App Development", badge: "bg-[#34A853]", brand: "android" },
        { name: "React Native Apps", badge: "bg-[#0B7FA3]", brand: "react" },
        { name: "Flutter Apps", badge: "bg-[#02569B]", brand: "flutter" },
        { name: "Swift & SwiftUI", badge: "bg-[#F05138]", brand: "swift" },
        { name: "Kotlin & Jetpack Compose", badge: "bg-[linear-gradient(135deg,#7F52FF,#C711E1)]", brand: "kotlin" },
      ],
    },
    process: {
      name: "App Development",
      steps: [
        { title: "Discover", body: "We define the product, its users and its goals, study competing apps, and agree the features that matter most for the first release." },
        { title: "Design", body: "We map user journeys and design the interface for each platform, with clickable prototypes tested before any code is written." },
        { title: "Development", body: "We build in focused sprints on a secure, scalable architecture, with automated testing and a working build to review every step." },
        { title: "Launch", body: "We handle App Store and Google Play submission, monitor the first releases closely, and plan the updates that follow." },
      ],
    },
  },

  {
    slug: "ecommerce",
    meta: {
      title: "E-commerce Development — Web Inventers",
      description:
        "Web Inventers builds custom online stores on Shopify, WooCommerce and headless stacks — designed to convert, fast to load and easy to run.",
    },
    crumb: "E-commerce Services",
    hero: {
      lines: [{ text: "E-commerce" }, { text: "Design &", accent: true }, { text: "Development", accent: true }],
      image: "/services/ecommerce_service_clean.png",
      imageAlt: "A laptop showing an online store, with a shopping cart, card and parcels",
      statement: "Web Inventers builds online stores that sell around the clock — and are easy for your team to run.",
      body: "A store has to do more than look good. Products need to be easy to find, pages fast to load, and checkout short enough that nobody gives up halfway. We plan the catalogue, design the shopping experience and build on the platform that fits your business — Shopify, WooCommerce or a headless stack — with payments, shipping and inventory connected from day one.",
    },
    expertise: {
      name: "E-commerce Development",
      body: "Web Inventers brings merchandising, UX, visual design, development, payments and search together to build stores shaped around your products, your customers, and the path from first click to checkout.",
    },
    showcase: {
      image: "/services-landing-page/firefly-ecommerce.png",
      label: "E-commerce services",
      tabsLabel: "Kinds of store",
      tabs: [
        { label: "Custom Online Stores", lead: "Custom", rest: "Online Stores", body: "Your store should look and feel like your brand, not a theme. We design around your products and customers, then build a storefront that makes browsing easy and buying feel effortless." },
        { label: "Shopify", lead: "Shopify", rest: "Store Development", body: "Shopify gives you a reliable, easy-to-run platform. We design custom themes, set up apps and integrations, and configure payments, shipping and taxes so your store is ready to sell from launch." },
        { label: "WooCommerce", lead: "WooCommerce", rest: "Development", body: "Already on WordPress? WooCommerce adds a flexible store to the site you have. We build custom product pages, checkout flows and extensions — fast, secure and easy for your team to update." },
        { label: "Headless Commerce", lead: "Headless", rest: "Commerce", body: "For brands that need total design freedom and top speed, we pair a commerce engine with a custom Next.js front end — a store that loads instantly and can grow into any channel." },
        { label: "Checkout Optimization", lead: "Checkout", rest: "Optimization", body: "Every extra step at checkout costs sales. We streamline the flow, add trusted payment options and remove friction, so more of the people who add to cart actually complete their order." },
        { label: "Store Migration", lead: "Store", rest: "Migration", body: "Moving platforms without losing momentum. We migrate products, customers and order history, protect your SEO with redirects, and switch over with minimal downtime." },
        { label: "B2B & Wholesale", lead: "B2B", rest: "& Wholesale", body: "Wholesale buyers need more than a cart. We build trade portals with customer-specific pricing, bulk ordering, quotes and account management that make repeat ordering fast." },
      ],
    },
    platforms: {
      lead: "Platforms",
      rest: "We Build Stores On",
      items: [
        { name: "Shopify & Shopify Plus", badge: "bg-[#5E8E3E]", brand: "shopify" },
        { name: "WooCommerce Development", badge: "bg-[#7F54B3]", brand: "woocommerce" },
        { name: "BigCommerce Development", badge: "bg-[#121118]", brand: "bigcommerce" },
        { name: "Headless & Custom Commerce", badge: CODE_BADGE, code: true },
        { name: "WordPress Integration", badge: "bg-[#21759B]", brand: "wordpress" },
      ],
    },
    process: {
      name: "E-commerce",
      steps: [
        { title: "Discover", body: "We study your products, customers and competitors, audit your current store, and agree the platform and features the business needs." },
        { title: "Design", body: "We design the storefront, product pages and checkout around how your customers shop, with prototypes tested before build." },
        { title: "Development", body: "We build the store, connect payments, shipping and inventory, and load your catalogue — tested on every device." },
        { title: "Launch", body: "We run full QA, set up analytics and redirects, go live smoothly, then optimize conversion as real orders come in." },
      ],
    },
  },

  {
    slug: "branding",
    meta: {
      title: "Branding & Identity Design — Web Inventers",
      description:
        "Web Inventers creates brand identities — strategy, logos, visual systems and guidelines — that make businesses instantly recognizable.",
    },
    crumb: "Branding Services",
    hero: {
      lines: [{ text: "Brand Strategy" }, { text: "& Identity", accent: true }, { text: "Design", accent: true }],
      image: "/services/branding_service.png",
      imageAlt: "A brand identity kit: a design screen, colour swatches, cards and merchandise",
      statement: "Web Inventers builds brands people recognize at a glance — and remember long after.",
      body: "A brand is the promise a business makes every time someone meets it. It has to be distinctive, consistent and true to what you stand for. We start with strategy — your audience, your position and your personality — then design the logo, colours, type and visual language that express it, and document it all so every touchpoint stays on brand.",
    },
    expertise: {
      name: "Branding & Identity",
      body: "Web Inventers brings research, strategy, naming, visual identity and brand guidelines together to build brands shaped around your values, your audience, and the impression every touchpoint needs to leave.",
    },
    showcase: {
      image: "/services-landing-page/branding-service.png",
      label: "Branding services",
      tabsLabel: "Kinds of branding work",
      tabs: [
        { label: "Brand Strategy", lead: "Brand", rest: "Strategy", body: "Strong brands start with clear thinking. We research your market, audience and competitors, then define your positioning, personality and message — the foundation every design decision builds on." },
        { label: "Logo Design", lead: "Logo", rest: "& Wordmark Design", body: "Your logo is the face of your business. We explore concepts rooted in your strategy and refine one into a mark that is distinctive, memorable and works everywhere, from app icon to billboard." },
        { label: "Visual Identity", lead: "Visual", rest: "Identity Systems", body: "A logo is only the start. We build a full identity — colour, typography, imagery and graphic elements — that makes every touchpoint instantly recognizable as yours." },
        { label: "Brand Guidelines", lead: "Brand", rest: "Guidelines", body: "Consistency builds trust. We document how your brand looks, speaks and behaves in clear guidelines, so your team and partners can apply it confidently everywhere." },
        { label: "Rebranding", lead: "Brand", rest: "Refresh & Rebrand", body: "When a brand no longer fits the business, we refresh or rebuild it — keeping the equity you have earned while giving you an identity ready for where you are going." },
        { label: "Packaging & Print", lead: "Packaging", rest: "& Print Design", body: "Your brand in people's hands. We design packaging, stationery and printed materials that carry your identity with the same care as your digital presence." },
        { label: "Motion Branding", lead: "Motion", rest: "Branding", body: "Brands move on screen now. We create animated logos, transitions and motion guidelines that bring your identity to life across video, social and your website." },
      ],
    },
    platforms: {
      lead: "Tools",
      rest: "We Design With",
      items: [
        { name: "Figma", badge: "bg-[linear-gradient(135deg,#F24E1E,#A259FF)]", brand: "figma" },
        { name: "Adobe Illustrator", badge: "bg-[#FF9A00]", brand: "adobeillustrator" },
        { name: "Adobe Photoshop", badge: "bg-[#31A8FF]", brand: "adobephotoshop" },
        { name: "Adobe After Effects", badge: "bg-[#9999FF]", brand: "adobeaftereffects" },
      ],
    },
    process: {
      name: "Branding",
      steps: [
        { title: "Discover", body: "We research your market, audience and competitors, and interview your team to understand what makes the business different." },
        { title: "Strategy", body: "We define your positioning, personality and messaging — the strategic foundation that guides every creative decision." },
        { title: "Design", body: "We explore logo and identity concepts, then refine the chosen direction into a complete visual system." },
        { title: "Deliver", body: "We hand over every file and format with clear brand guidelines, and help roll the new identity out across your touchpoints." },
      ],
    },
  },

  {
    slug: "seo",
    meta: {
      title: "SEO Services — Web Inventers",
      description:
        "Web Inventers delivers technical and content SEO that gets businesses found in search — and keeps them there.",
    },
    crumb: "SEO Services",
    hero: {
      lines: [{ text: "Search Engine" }, { text: "Optimization", accent: true }, { text: "That Lasts", accent: true }],
      image: "/services/seo-service.png",
      imageAlt: "A magnifying glass over search results, with rising charts",
      statement: "Web Inventers helps businesses get found in search — and keeps them there.",
      body: "Most journeys start with a search. If you are not on the first page, you are invisible to the people already looking for what you offer. We fix the technical foundations, research what your customers actually search for, create content that answers them, and earn the authority that moves you up — then report every month on what it brings in.",
    },
    expertise: {
      name: "Search Engine Optimization",
      body: "Web Inventers brings technical SEO, keyword research, content, on-page optimization, local search and analytics together to grow visibility shaped around your market, your customers, and the searches that lead to business.",
    },
    showcase: {
      image: "/services-landing-page/seofinal.png",
      label: "SEO services",
      tabsLabel: "Kinds of SEO",
      tabs: [
        { label: "Technical SEO", lead: "Technical", rest: "SEO", body: "Search engines have to crawl and understand your site before they can rank it. We audit and fix speed, indexing, structure, schema and Core Web Vitals, so nothing technical holds you back." },
        { label: "On-Page SEO", lead: "On-Page", rest: "Optimization", body: "Every page should target the right searches. We optimize titles, headings, content and internal links so search engines and people understand exactly what each page offers." },
        { label: "Content Strategy", lead: "Content", rest: "Strategy", body: "Rankings are earned with content that answers real questions. We plan topics around what your customers search for, and create pages and articles that build traffic month after month." },
        { label: "Keyword Research", lead: "Keyword", rest: "Research", body: "We find the searches that bring the right visitors — the terms your customers use, their volume and competition — and map them to the pages that should win them." },
        { label: "Local SEO", lead: "Local", rest: "SEO", body: "For businesses that serve an area, we optimize your Google Business Profile, local listings and location pages so you show up when nearby customers search." },
        { label: "E-commerce SEO", lead: "E-commerce", rest: "SEO", body: "Online stores have their own challenges. We optimize category and product pages, fix duplicate content and structure your catalogue so products are found in search." },
        { label: "SEO Audits", lead: "SEO", rest: "Audits", body: "Not sure where you stand? We run a full audit of your technical health, content and competition, and give you a clear, prioritized plan of what to fix first." },
      ],
    },
    platforms: {
      lead: "Tools",
      rest: "We Work With",
      items: [
        { name: "Google Search Console", badge: "bg-[#4285F4]", brand: "googlesearchconsole" },
        { name: "Google Analytics 4", badge: "bg-[#E37400]", brand: "googleanalytics" },
        { name: "Google Tag Manager", badge: "bg-[#246FDB]", brand: "googletagmanager" },
        { name: "Semrush", badge: "bg-[#FF642D]", brand: "semrush" },
        { name: "Custom Reporting Dashboards", badge: CODE_BADGE, code: true },
      ],
    },
    process: {
      name: "SEO",
      steps: [
        { title: "Audit", body: "We review your technical health, content, backlinks and competitors to understand where you stand and what is holding you back." },
        { title: "Strategy", body: "We research keywords, set priorities and build a clear roadmap tied to the searches that bring customers." },
        { title: "Optimize", body: "We fix technical issues, improve on-page SEO and create content that answers what your customers are searching for." },
        { title: "Report", body: "We track rankings, traffic and conversions every month, and keep refining the plan as results come in." },
      ],
    },
  },

  {
    slug: "social-media",
    meta: {
      title: "Social Media Management — Web Inventers",
      description:
        "Web Inventers plans, creates and manages social media content, communities and campaigns that turn followers into customers.",
    },
    crumb: "Social Media Services",
    hero: {
      lines: [{ text: "Social Media" }, { text: "Strategy &", accent: true }, { text: "Management", accent: true }],
      image: "/services/social_service_clean.png",
      imageAlt: "A phone showing a social post, surrounded by social icons, charts and a megaphone",
      statement: "Web Inventers turns social media into a channel that grows your audience — and your business.",
      body: "Posting often is not a strategy. Social works when every post has a purpose, the voice is consistent and someone is listening to the replies. We plan content around your goals, create posts and videos people want to engage with, manage your community day to day, and run campaigns that turn attention into enquiries and sales.",
    },
    expertise: {
      name: "Social Media Management",
      body: "Web Inventers brings strategy, content creation, community management, paid campaigns and analytics together to grow social channels shaped around your brand, your audience, and the results your business needs.",
    },
    showcase: {
      image: "/services-landing-page/social-service.png",
      label: "Social media services",
      tabsLabel: "Kinds of social media work",
      tabs: [
        { label: "Social Strategy", lead: "Social Media", rest: "Strategy", body: "Every platform plays a different role. We define your goals, audience and voice, choose the channels that matter, and plan how social supports the wider business." },
        { label: "Content Creation", lead: "Content", rest: "Creation", body: "Scroll-stopping content takes craft. We design posts, carousels, reels and stories that fit each platform and look unmistakably like your brand." },
        { label: "Community Management", lead: "Community", rest: "Management", body: "Social is a conversation. We reply to comments and messages, engage with your audience and handle feedback, so people feel heard and keep coming back." },
        { label: "Paid Social", lead: "Paid Social", rest: "Campaigns", body: "Reach the right people, not just more people. We plan, run and optimize ad campaigns across Meta, LinkedIn and TikTok, with every budget tied to clear results." },
        { label: "Influencer Marketing", lead: "Influencer", rest: "Marketing", body: "The right voices build trust fast. We find creators who fit your brand, manage partnerships and measure what each collaboration brings in." },
        { label: "Content Calendars", lead: "Content", rest: "Calendars", body: "Consistency builds audiences. We plan your posts weeks ahead in a clear calendar, so your channels stay active and every post has a purpose." },
        { label: "Analytics & Reporting", lead: "Analytics", rest: "& Reporting", body: "We track reach, engagement and conversions across every channel, and turn the numbers into clear monthly reports and next steps." },
      ],
    },
    platforms: {
      lead: "Platforms",
      rest: "We Manage",
      items: [
        { name: "Instagram", badge: "bg-[linear-gradient(135deg,#F58529,#DD2A7B,#8134AF)]", brand: "instagram" },
        { name: "Facebook", badge: "bg-[#0866FF]", brand: "facebook" },
        { name: "LinkedIn", badge: "bg-[#0A66C2]", brand: "linkedin" },
        { name: "TikTok", badge: "bg-[#111111]", brand: "tiktok" },
        { name: "X (Twitter)", badge: "bg-[#000000]", brand: "x" },
        { name: "YouTube", badge: "bg-[#FF0000]", brand: "youtube" },
      ],
    },
    process: {
      name: "Social Media",
      steps: [
        { title: "Audit", body: "We review your channels, audience and competitors to see what is working, what is not, and where the opportunities are." },
        { title: "Strategy", body: "We set goals, define your voice and content pillars, and plan which platforms and formats will reach your audience." },
        { title: "Create", body: "We produce and schedule on-brand posts, videos and campaigns, and manage your community day to day." },
        { title: "Grow", body: "We track results every month, report clearly, and refine the plan to keep growing reach and engagement." },
      ],
    },
  },
];

export function getServicePage(slug: string) {
  return SERVICE_PAGES.find((p) => p.slug === slug);
}
