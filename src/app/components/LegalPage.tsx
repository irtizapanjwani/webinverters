import Nav from "./Nav";
import Footer from "./Footer";

export type LegalBlock =
  | { kind: "p"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "subheading"; text: string }
  | {
      kind: "contact";
      name: string;
      email: string;
      phone: string;
      /** Digits only, for the tel: URI — the displayed number is untouched. */
      phoneHref: string;
    };

export type LegalSection = {
  title: string;
  blocks: LegalBlock[];
  /** True for a closing block the source document leaves outside its
   *  numbered outline (e.g. a trailing "Contact Information" block that
   *  follows the last numbered Article). Renders without a number prefix,
   *  matching the source rather than inventing one. */
  unnumbered?: boolean;
};

type LegalPageProps = {
  title: string;
  lastUpdated: string;
  intro: string;
  /** Numbered from 1 in order, matching the source document. */
  sections: LegalSection[];
};

/**
 * Shared shell for the legal documents, so Terms and Privacy cannot drift into
 * two different-looking pages. Each page supplies only its transcribed text.
 */
export default function LegalPage({
  title,
  lastUpdated,
  intro,
  sections,
}: LegalPageProps) {
  const heading =
    "mb-4 font-display text-[clamp(18px,2.2vw,23px)] leading-[1.25] font-bold tracking-[-0.01em] text-ink";
  const body = "text-[16px] leading-[1.75] text-ink-dim";

  return (
    <div className="relative w-full bg-bg">
      {/* Page opens on white, so the nav uses its dark-text treatment */}
      <Nav onLight />

      <main id="top">
        <div className="mx-auto w-full max-w-[1400px] px-5 pt-16 pb-20 sm:px-8 lg:pt-20 lg:pb-28">
          {/* Capped to a comfortable reading measure rather than the full grid:
              legal text is read line by line, and full-width lines are where
              the eye loses its place. */}
          <div className="mx-auto w-full max-w-[820px]">
            <header className="mb-12 lg:mb-16">
              <span className="mb-4 block text-xs font-bold tracking-[0.18em] text-accent-2 uppercase">
                Legal
              </span>

              <h1 className="font-display text-[clamp(26px,4vw,45px)] leading-[1.1] font-extrabold tracking-[-0.02em] text-ink">
                {title}
              </h1>

              <p className="mt-5 font-mono text-[13px] tracking-[0.02em] text-ink-faint">
                Last Updated: {lastUpdated}
              </p>

              <p className={`mt-6 border-t border-border pt-6 ${body}`}>
                {intro}
              </p>
            </header>

            {sections.map((section, index) => (
              <section
                key={section.title}
                className="mb-11 last:mb-0 lg:mb-14 lg:last:mb-0"
              >
                <h2 className={heading}>
                  {!section.unnumbered && (
                    <span className="mr-2 font-mono text-[0.8em] font-medium text-accent">
                      {index + 1}.
                    </span>
                  )}
                  {section.title}
                </h2>

                {section.blocks.map((block, i) => {
                  if (block.kind === "p") {
                    return (
                      <p key={i} className={`mb-3.5 last:mb-0 ${body}`}>
                        {block.text}
                      </p>
                    );
                  }

                  if (block.kind === "subheading") {
                    return (
                      <h3
                        key={i}
                        className="mt-6 mb-3 font-display text-[15px] font-bold tracking-[-0.005em] text-ink first:mt-0"
                      >
                        {block.text}
                      </h3>
                    );
                  }

                  if (block.kind === "list") {
                    return (
                      <ul
                        key={i}
                        className="mb-3.5 flex flex-col gap-2.5 last:mb-0"
                      >
                        {block.items.map((item) => (
                          <li
                            key={item}
                            className={`relative pl-5 before:absolute before:top-[0.68em] before:left-0 before:size-1.5 before:rounded-full before:bg-accent ${body}`}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    );
                  }

                  return (
                    <address
                      key={i}
                      className="mt-5 rounded-[16px] border border-border bg-bg-alt p-6 text-[16px] leading-[1.8] text-ink-dim not-italic"
                    >
                      <span className="block font-semibold text-ink">
                        {block.name}
                      </span>
                      <span className="block">
                        Email:{" "}
                        <a
                          href={`mailto:${block.email}`}
                          className="text-accent transition-colors hover:text-accent-lift"
                        >
                          {block.email}
                        </a>
                      </span>
                      <span className="block">
                        Phone:{" "}
                        <a
                          href={`tel:${block.phoneHref}`}
                          className="text-accent transition-colors hover:text-accent-lift"
                        >
                          {block.phone}
                        </a>
                      </span>
                    </address>
                  );
                })}
              </section>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
