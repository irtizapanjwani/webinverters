import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import ContactSection from "../../components/ContactSection";
import PlatformsCard from "../../components/PlatformsCard";
import WebProcess from "../../components/WebProcess";
import WebServiceTabs from "../../components/WebServiceTabs";
import WhyUs from "../../components/WhyUs";
import ServiceIcon from "../../components/ServiceIcon";
import { SERVICES } from "../../components/serviceData";
import { SERVICE_SHADES } from "../../components/serviceShades";
import { SERVICE_PAGES, getServicePage } from "../../components/servicePages";

/* One page per service, all on the same layout — the content comes from
   components/servicePages.ts. Only the six services listed there exist;
   any other address under /services/ is a 404. */

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_PAGES.map((p) => ({ service: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[service]">): Promise<Metadata> {
  const page = getServicePage((await params).service);
  return page ? page.meta : {};
}

function GridIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-3.5">
      <circle cx="7" cy="7" r="2" />
      <circle cx="17" cy="7" r="2" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-3.5">
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

export default async function ServicePage({ params }: PageProps<"/services/[service]">) {
  const page = getServicePage((await params).service);
  if (!page) notFound();
  const iconIndex = SERVICES.findIndex((s) => s.slug === page.slug);

  return (
    <div className="relative w-full bg-bg">
      <Nav />

      <main id="top" className="relative z-10">
        {/* ---------- Hero ----------
            A full-width backdrop in the site's deep navy, with faint blue and
            teal glows echoing the card, runs up behind the navbar (pulled up
            by the navbar's height: 73px, 77px from xl) and frames the card on
            every side. The card starts just below the navbar and fills the
            rest of the screen. */}
        <div className="relative -mt-[73px] bg-[radial-gradient(60%_70%_at_85%_10%,rgba(27,90,240,0.28),transparent_70%),radial-gradient(50%_60%_at_5%_90%,rgba(14,116,144,0.22),transparent_70%),linear-gradient(180deg,#05070C_0%,#0B1330_100%)] px-3 pt-[85px] pb-3 sm:px-5 sm:pb-5 xl:-mt-[77px] xl:pt-[89px]">
          <section
            data-surface="dark"
            aria-labelledby="service-heading"
            className={`relative mx-auto max-w-[1880px] overflow-hidden rounded-[28px] border border-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_30px_80px_-30px_rgba(27,90,240,0.45)] ${SERVICE_SHADES[0]}`}
          >
            <div className="relative grid gap-10 p-7 sm:p-10 lg:min-h-[max(640px,calc(100svh-101px))] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-6 lg:p-12 xl:gap-10">
              {/* Left: breadcrumb, icon, headline, call to action */}
              <div className="relative z-10 flex flex-col">
                <nav aria-label="Breadcrumb" className="mb-8 lg:mb-10">
                  <ol className="flex items-center gap-2.5 text-[14.5px]">
                    <li>
                      <Link href="/services" className="flex items-center gap-2 font-semibold text-white transition-colors hover:text-white/80">
                        <GridIcon />
                        All Services
                      </Link>
                    </li>
                    <li aria-hidden="true" className="text-white/60">
                      <ChevronRight />
                    </li>
                    <li aria-current="page" className="text-white/65">
                      {page.crumb}
                    </li>
                  </ol>
                </nav>

                <span className="mb-8 flex size-[68px] items-center justify-center rounded-[14px] border border-white/25 bg-white/10 backdrop-blur-sm">
                  <ServiceIcon index={iconIndex} strokeWidth={1.4} className="size-8" />
                </span>

                <h1
                  id="service-heading"
                  className="mb-9 font-display text-[clamp(30px,3.4vw,50px)] leading-[1.06] font-extrabold tracking-[-0.03em] [overflow-wrap:normal]"
                >
                  {page.hero.lines.map((line, i) => (
                    <span key={line.text} className={line.accent ? "text-[#8FB2FF]" : undefined}>
                      {i > 0 && <br />}
                      {line.text}
                    </span>
                  ))}
                </h1>

                <a
                  href="#start-project"
                  className="inline-flex w-fit items-center rounded-full bg-accent px-6 py-3 text-[15px] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(27,90,240,0.8)] transition-colors duration-300 hover:bg-accent-lift"
                >
                  Request a Proposal
                </a>
              </div>

              {/* Centre: the service illustration */}
              <div className="relative flex items-center justify-center lg:-mx-6">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-[10%] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.2),transparent)] blur-2xl"
                />
                <div className="relative aspect-[3/2] w-full max-w-[640px]">
                  <Image
                    src={page.hero.image}
                    alt={page.hero.imageAlt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 40vw, 90vw"
                    className="object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.4)]"
                  />
                </div>
              </div>

              {/* Right: the statement, and the longer explanation at the foot */}
              <div className="relative z-10 flex flex-col justify-between gap-8 lg:pt-28">
                <p className="text-[clamp(17px,1.35vw,20px)] leading-[1.5] font-semibold">
                  {page.hero.statement}
                </p>
                <p className="text-[15px] leading-[1.75] text-white/75">
                  {page.hero.body}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* ---------- Expertise intro ---------- */}
        <section aria-labelledby="web-expertise-heading" className="bg-bg px-5 pt-20 pb-6 text-center sm:px-8 lg:pt-28">
          <span className="mb-5 block text-xs font-bold tracking-[0.18em] text-accent-2 uppercase">
            Expertise
          </span>
          <h2
            id="web-expertise-heading"
            className="mx-auto mb-6 max-w-[1240px] font-display text-[clamp(28px,3.7vw,56px)] leading-[1.08] font-extrabold tracking-[-0.03em] text-ink"
          >
            <span className="text-accent">{page.expertise.name}</span>
            <br />
            Expertise
          </h2>
          <p className="mx-auto max-w-[720px] text-[16.5px] leading-[1.7] text-ink-dim">
            {page.expertise.body}
          </p>
        </section>

        {/* Showcase with a tab per kind of website, then related services */}
        <WebServiceTabs
          slug={page.slug}
          image={page.showcase.image}
          label={page.showcase.label}
          tabsLabel={page.showcase.tabsLabel}
          tabs={page.showcase.tabs}
          exclude={page.showcase.exclude ?? []}
        />

        {/* The platforms or tools this service is built with, full width */}
        <div className="mx-auto w-full max-w-[1400px] px-4 pt-8 sm:px-6 lg:px-8 lg:pt-10">
          <PlatformsCard size="large" lead={page.platforms.lead} rest={page.platforms.rest} items={page.platforms.items} />
        </div>

        {/* Our <Service> Process — four steps on a line that fills as you scroll */}
        <WebProcess name={page.process.name} steps={page.process.steps} />

        {/* The landing page's "Why Web Inventers" section — video testimonials,
            trust cards and the awards carousel */}
        <WhyUs />

        {/* The Contact page's "Start the Conversation" form, above the footer on
            every page */}
        <ContactSection as="h2" className="pt-12 pb-20 lg:pt-16 lg:pb-24" />
      </main>

      {/* Carries the "Let's build, something awesome!" scroller beneath it */}
      <Footer />
    </div>
  );
}
