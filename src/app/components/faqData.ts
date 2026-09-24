/** FAQ content, transcribed from public/faqs.txt.
 *
 *  Edits made while transcribing, and only these:
 *  - each question appeared twice in a row in the file; it is kept once
 *  - "Eggs Media" (the agency the text was adapted from) → "Web Inventers"
 *  - "Web Inverters" → "Web Inventers"; "projected" → "protected"
 *  - a sentence cut off mid-way ("If you want to come in and discuss your")
 *    is dropped; two missing full stops are added
 *  Everything else is word for word — including the specific claims (prices in
 *  CAD, a Toronto office, SiteGround, AODA, 24/7 support, timelines), which
 *  describe the source agency and must be checked against how Web Inventers
 *  actually works before launch. */

export type FaqBlock =
  | { kind: "p"; text: string }
  | { kind: "list"; ordered?: boolean; items: string[] }
  | { kind: "terms"; items: { term: string; text: string }[] };

export type Faq = { q: string; a: FaqBlock[] };
export type FaqCategory = { title: string; items: Faq[] };

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    title: "Choosing the Right Web Design Partner",
    items: [
      {
        q: "How do I choose the right web design agency?",
        a: [
          {
            kind: "p",
            text: "The first step is to define what you’re looking for. Your goals, your objectives, and the type of site you want matter. That’s because there are many different designers out there. Set a budget as well. Having an idea of what you’re able to spend will let you narrow down the options. Then you’ll want to shop around. Don’t just choose the first site that comes up on Google. Look at several agencies that fit your criteria, compare their offerings and their portfolios, and ask questions. Choose the web design agency that can get the work you need done at a price you can afford and that is easy to work with.",
          },
        ],
      },
      {
        q: "What should I look for before hiring a web design company?",
        a: [
          {
            kind: "p",
            text: "The main thing to focus on is whether the company can help you reach your goals. The best web design companies know that creating a website is about more than just how the site looks. It’s about building a site that represents your brand, draws targeted traffic through SEO and technical best practices, is accessible to your audience, and can grow with your business.",
          },
          {
            kind: "p",
            text: "You want a company with a proven track record of success and that has case studies and references available. They should have great communication and take the time to understand your business and what you’re looking for.",
          },
          {
            kind: "p",
            text: "The right web design company won’t just put your logo on a template, they’ll create a site that truly represents your business and helps you achieve your goals. That’s why Web Inventers always starts every meeting with a detailed discussion on your plans and objectives, so we can make you the site your company needs to thrive.",
          },
        ],
      },
      {
        q: "Freelancer vs agency vs in-house web design. What is the difference?",
        a: [
          {
            kind: "p",
            text: "The choice between a freelance web design, a web design agency, and an in-house team depends on your situation, your budget, and what you’re looking for.",
          },
          {
            kind: "p",
            text: "A freelance designer will likely be less expensive and could get the work done faster, if you’re looking for something simple or a one-time deal. They may struggle with larger projects, and may not provide much support after the work is done.",
          },
          {
            kind: "p",
            text: "A design agency can connect you with a team of experts and help with more than just the design process. Many agencies offer SEO services, business strategy, guidance, and technical expertise. They allow you to get the benefits of a knowledgeable team without needing to pay full-time employees.",
          },
          {
            kind: "p",
            text: "Having an in-house web design team gives you professionals that are fully aligned with your brand and your practices. However, you’ll be required to pay them full-time salaries along with benefits.",
          },
        ],
      },
      {
        q: "How do I know if I need a new website or just improvements?",
        a: [
          {
            kind: "p",
            text: "If your site functions well, but the style or content is old or outdated, you might just need a refresh. This often means doing surface-level changes while keeping the backend and general structure the same. This route can save you time and money, but it won’t fix deeper or more serious problems.",
          },
          {
            kind: "p",
            text: "A full website redesign is needed for sites that aren’t mobile friendly, that have serious issues (such as sites that have errors or take a very long time to load), or websites that are functioning on older technologies.",
          },
          {
            kind: "p",
            text: "The way to decide between the two paths is to think about what your website is and isn’t doing for you. If the problem is that it doesn’t look great or it’s outdated, a refresh could work. If it doesn’t function like it should, doesn’t perform like it should, or if your business has changed and your site no longer matches your company, you’re better off doing a full redesign.",
          },
        ],
      },
      {
        q: "What are common mistakes when hiring a web agency?",
        a: [
          { kind: "p", text: "Here are a few things to avoid when hiring a web agency:" },
          {
            kind: "terms",
            items: [
              {
                term: "Choosing entirely based on price",
                text: "Going for the cheapest price can hurt you as an agency charging significantly less likely has quality or reliability issues. On the other hand, choosing the most expensive developer doesn’t automatically mean great quality.",
              },
              {
                term: "Ignoring their portfolio",
                text: "Focus on what the agency has done. Look at their previous work or speak to past clients to learn what it’s like to work with them. Be sure to get specifics on what they actually did in each project.",
              },
              {
                term: "Not focusing on communication",
                text: "You’ll need to be able to communicate with your designer. If they’re slow to respond or don’t give you firm details when you ask for them, they’re probably not a good choice.",
              },
              {
                term: "Getting vague information",
                text: "When you ask for specifics, you should get specifics. In fact, you should get specifics even when you don’t directly ask for them. If a company is vague about the work they do, the timeline or cost for the project, or their plans for getting things done, be suspicious.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Pricing and Budget",
    items: [
      {
        q: "How much does a website cost?",
        a: [
          {
            kind: "p",
            text: "With Web Inventers, our starting price for website design is $3,000 CAD. However, each project is different. We work with each one of our clients to create the exact site they need. The overall cost depends on multiple factors, mostly on your wishes and requirements, as well as the complexity of the project. We do not offer flat rate packages. Of course, we always give you a full quote in advance so you always know what to expect.",
          },
        ],
      },
      {
        q: "What is the average cost of a website for a small business?",
        a: [
          {
            kind: "p",
            text: "Small business websites usually start at around $3,000 CAD, depending on what you’re looking for. Sites that require specialized features (such as custom booking systems) or ecommerce functionality will influence the price, however, and a site that is more complicated will likely cost more. Don’t worry though, because when you’re working with Web Inventers, you always get a full and firm quote upfront so there’s no guesswork and no surprises.",
          },
        ],
      },
      {
        q: "What factors affect the cost of a website project?",
        a: [
          { kind: "p", text: "Many different factors affect the cost of a website. Some of the biggest are:" },
          {
            kind: "terms",
            items: [
              {
                term: "Project complexity",
                text: "Simply put, the more complicated your website is, the higher the cost. A simple website with only a few pages will cost significantly less than a larger site with many technical requirements and features.",
              },
              {
                term: "Customization",
                text: "The most customization and branding you need for your site, the higher the costs. At Web Inventers, however, we always make sure your site is designed specifically for your brand and your business. We don’t create generic sites and we don’t lock the features you need behind higher cost plans.",
              },
              {
                term: "Functionality",
                text: "User registration systems, online booking tools, ecommerce solutions, chatbot integration, and other personalized tools or specialized functionality will increase the project cost as well as the development time.",
              },
              {
                term: "Timeline",
                text: "If you need your new website fast, we’ll need to use greater resources and possibly more designers and developers to get the work done. That will increase the cost.",
              },
              {
                term: "Ongoing costs",
                text: "Post-launch maintenance (such as keeping your site secure and updated) can increase costs. Of course, monthly or yearly costs like hosting and your domain name will also affect the price.",
              },
            ],
          },
        ],
      },
      {
        q: "Why are custom websites more expensive than templates?",
        a: [
          {
            kind: "p",
            text: "Templates are pre-designed and mass produced, so it’s easier to get them up and running. That means costs are lower, but it also means they’re more generic and they probably don’t accurately represent your brand.",
          },
          {
            kind: "p",
            text: "Customizing the UX and UI, designing logos and graphics, coding unique features, and implementing unique functionality takes time and expertise. This means the price goes up, but it also means the end product is exactly what you want, not the same cookie-cutter design you’ll find all over the internet.",
          },
        ],
      },
      {
        q: "What is included in a typical web design project?",
        a: [
          {
            kind: "p",
            text: "Web Inventers offers everything needed to properly showcase your brand online. Our web design projects are built to be strategic, scalable, and tailored to your business goals.",
          },
          { kind: "p", text: "Most projects include:" },
          {
            kind: "terms",
            items: [
              { term: "Discovery", text: "Before we start, we make sure we understand your business and your goals." },
              {
                term: "UX strategy",
                text: "Your site needs to be easy to use and intuitive to navigate. Before we start designing, we make sure it all makes sense.",
              },
              {
                term: "UI design",
                text: "Your site will always be designed to exactly match your brand. This doesn’t just mean the logos and colours either, it also means the overall look and feel.",
              },
              {
                term: "Custom development",
                text: "You won’t just get a template with your logo in the corner. Web Inventers custom codes all designs to modern standards so your site looks fresh, performs great, and scales with you.",
              },
              {
                term: "Responsive design",
                text: "Every website we create is designed to look great on desktop, mobile, and every other device that’s out there.",
              },
              {
                term: "Quality assurance",
                text: "Once your site is ready to go, we do extensive testing before and after launch to ensure it’s performing exactly as it should.",
              },
              {
                term: "Ongoing support",
                text: "Web Inventers works with you as a partner and our ongoing maintenance services make sure you’re never alone.",
              },
              {
                term: "On-page SEO",
                text: "The right people need to find your business. Every site we create is done with SEO in mind, so you won’t be lost in the wilderness.",
              },
              {
                term: "Accessibility",
                text: "All of our websites follow accessibility guidelines and are AODA compliant, so your brand is available to anyone who needs to experience it.",
              },
            ],
          },
        ],
      },
      {
        q: "Do you offer payment plans?",
        a: [
          {
            kind: "p",
            text: "We always give firm quotes up front so you know exactly what you’re going to pay. Our prices are fair and in line with our experience, but if you’d like to talk about payment options, we’re always here for you. Let’s discuss and work something out that make sense.",
          },
        ],
      },
    ],
  },
  {
    title: "Process and Timeline",
    items: [
      {
        q: "What does your web design process look like?",
        a: [
          {
            kind: "p",
            text: "The website design process starts with discovery, where we get to know everything important about your brand. We then move on to UX strategy and planning to make sure your site works like it should. The next phase of our process is branding and UI design. Nothing is cookie cutter. It’s all designed specifically for you. After that, it’s time for development and content. We make sure to include on-page SEO strategies into everything we do.",
          },
          {
            kind: "p",
            text: "When it’s all done, we test it, make sure it all works like it should, and get ready for launch. Our team makes sure you understand everything about your site and how it works so you’re ready to hit the ground running on launch day.",
          },
          {
            kind: "p",
            text: "If you want to learn everything we do in detail, be sure to check out our process.",
          },
        ],
      },
      {
        q: "How long does it take to build a website?",
        a: [
          {
            kind: "p",
            text: "Most custom-designed sites take between 2-4 months to design and develop. Of course, it all depends on your business and what you’re looking for. Web Inventers works with businesses of all sizes and in locations from Toronto to around the world, and each site is unique. We’ll give you a firm timeframe before we begin and provide frequent updates throughout the process.",
          },
        ],
      },
      {
        q: "What are the steps to build a website from scratch?",
        a: [
          {
            kind: "p",
            text: "Each site is unique and we approach every project differently depending on your goals, but there are basically ten steps to every website we build from scratch.",
          },
          {
            kind: "list",
            ordered: true,
            items: [
              "Discovery and goal setting",
              "Making sure your domain and hosting are active and appropriate",
              "Choosing the tools, systems, and platform needed",
              "Planning and UX design",
              "UI design and branding",
              "Development and content",
              "SEO optimizations",
              "Testing",
              "Launch",
              "After-site support",
            ],
          },
        ],
      },
      {
        q: "What is expected from me during the project?",
        a: [
          {
            kind: "p",
            text: "Your input and partnership is vital to the success of the project. We want to make sure we meet your goals and expectations, so we’ll talk with you in depth about your brand, your goals, and what makes your business what it is. The more you can tell us about your objectives, your target audience, and the purpose of the site, the better we’ll be able to perform.",
          },
          {
            kind: "p",
            text: "If you have any writing, images, or videos you’d like included, making sure we have everything can really speed up the process and ensure you get the site you’re looking for. If there’s anything we need access to (hosting, APIs, domain registrars, etc.) we’ll ask and timely response really helps.",
          },
          {
            kind: "p",
            text: "The sooner you can respond to questions or approve work or revisions, the faster we’ll be able to get the job done. It’s best if you treat the project like the collaboration it is.",
          },
        ],
      },
      {
        q: "How many revisions are included?",
        a: [
          {
            kind: "p",
            text: "We want to make sure that you’re satisfied, so we always get your approval before every major step. If you don’t love what you see, please let us know ASAP and we’ll make it right. We’ll never reject a reasonable revision request as long as it’s within the scope of the project.",
          },
        ],
      },
      {
        q: "What happens after the website is launched?",
        a: [
          {
            kind: "p",
            text: "Once your website is launched, we’ll make sure it’s all performing as it should and that everything is running smoothly. Don’t worry, our team will make sure you know how to keep everything updated and answer any questions you have. We even offer long-term website maintenance so you always know that everything is updated, secure, backed up, and performing at its best.",
          },
        ],
      },
    ],
  },
  {
    title: "Working with Web Inventers",
    items: [
      {
        q: "What makes Web Inventers different from other agencies?",
        a: [
          {
            kind: "p",
            text: "At Web Inventers, we focus on your business goals, not just the design itself. We take the time to understand your audience, objectives, and brand so we can create a website that truly supports your growth.",
          },
          {
            kind: "p",
            text: "ON-SITE SEO is also built into everything we do, from site structure and performance to user experience and content strategy. We also prioritize accessibility and AODA compliance to ensure every website is inclusive and easy to use.",
          },
          {
            kind: "p",
            text: "Finally, we place a strong emphasis on communication and long term support. We work closely with our clients throughout the entire process and make sure questions are answered quickly and clearly.",
          },
        ],
      },
      {
        q: "Do you use in-house developers or outsource?",
        a: [
          {
            kind: "p",
            text: "Web Inventers has in-house developers working in our downtown Toronto office to make sure projects are completed successfully and on-time. However, we often work with other professionals in Toronto and around the world to make sure we’re taking advantage of the most talented and experienced professionals out there.",
          },
        ],
      },
      {
        q: "How do you handle communication during projects?",
        a: [
          {
            kind: "p",
            text: "We work with you and that means we need to talk to you. If you have any questions or if there’s anything you want to know, just reach out. We’re always actively communicating with you at every step of the process.",
          },
        ],
      },
      {
        q: "What happens if I do not like the design direction?",
        a: [
          {
            kind: "p",
            text: "Let us know. The sooner you tell us that you’d like to go in a different direction, the sooner we’re able to adapt. Don’t sit in silence as the project heads down a different road. We’re here to make you happy, so tell us right away and we’ll work to get things back to where you want them to be.",
          },
        ],
      },
      {
        q: "Can you work with our internal team or partners?",
        a: [
          {
            kind: "p",
            text: "Yes! If you have an internal team or if you’re working with other partners for branding, content, SEO, or other projects, let us know and we’ll work with them to make sure everyone is on the same page.",
          },
        ],
      },
    ],
  },
  {
    title: "Platform and Technical",
    items: [
      {
        q: "Which platform is best for my website?",
        a: [
          {
            kind: "p",
            text: "The best platform for your website depends on what you’re looking for and your objectives. Most of our clients choose WordPress for their content management system. It’s user-friendly, flexible, scalable, and SEO friendly. There are countless plugins to extend functionality, it supports full ecommerce solutions, and it’s safe and secure. However, we can also work with other platforms if that makes more sense for your brand.",
          },
        ],
      },
      {
        q: "Will I own my website after it is completed?",
        a: [
          {
            kind: "p",
            text: "Yes. Once we’re done designing and developing your website, you will own it and be free to use it in whatever ways you see fit.",
          },
        ],
      },
      {
        q: "Can I edit the website myself?",
        a: [
          {
            kind: "p",
            text: "Yes. We make sure you understand exactly how to manage and update your website with confidence. Most of the websites we develop use lightweight and easy to manage sections through Advanced Custom Fields (ACF), making it simple to update content, images, and other areas of your site without technical experience.",
          },
        ],
      },
      {
        q: "How do you handle hosting, security, and backups?",
        a: [
          {
            kind: "p",
            text: "We offer website hosting through SiteGround, which is a reliable provider that’s also secure and easy to work with. Learn more about our web hosting options.",
          },
          {
            kind: "p",
            text: "We can also provide ongoing security, maintenance and support, keeping your website updated, backed up, and protected. Learn more about our 24/7 website support.",
          },
        ],
      },
      {
        q: "Can you take over an existing website?",
        a: [
          {
            kind: "p",
            text: "If you have a current website that you’d like us to update, maintain, or support, just let us know! We’re here for you.",
          },
        ],
      },
    ],
  },
  {
    title: "Results and Performance",
    items: [
      {
        q: "How do I know if my website is successful?",
        a: [
          {
            kind: "p",
            text: "Your website is successful if it helps you achieve your business goals. That means it targets your specified audience, represents your brand, and helps you reach your goals. It needs to successfully convert visitors to customers. This happens with engaging content, intuitive design, a positive user experience, and strong technical performance.",
          },
        ],
      },
      {
        q: "Will my new website improve SEO?",
        a: [
          {
            kind: "p",
            text: "If you’ve worked with Web Inventers, yes. We incorporate basic on site SEO best practices into all of our web designs. This includes responsive, mobile first development, site speed optimizations, a logical site architecture, keyword focused URLs, optimized images, clean code structure, and proper heading hierarchy.",
          },
          {
            kind: "p",
            text: "We also pay attention to important technical elements such as metadata, internal linking, crawlability, and overall user experience to help your website perform well in search engines. More advanced SEO strategies and ongoing growth campaigns are available through our monthly SEO services.",
          },
        ],
      },
      {
        q: "How long does it take to see SEO results?",
        a: [
          {
            kind: "p",
            text: "SEO changes don’t suddenly show up overnight. In general, it takes about 3-6 months to notice measurable results. However, for brand new sites or for sites working in very competitive industries, it’s not uncommon for it to take up to 12 months to see substantial traffic increases.",
          },
        ],
      },
      {
        q: "Do you guarantee rankings or performance?",
        a: [
          {
            kind: "p",
            text: "Though we always take SEO into account during every step of the web design process, there isn’t a way to guarantee specific rankings. Search engines results are highly personal and always changing. However, we do guarantee that we will always focus on presenting your site and your company in the best possible light so that search engines and AI tools can easily access, categorize, and rank your page.",
          },
        ],
      },
    ],
  },
];
