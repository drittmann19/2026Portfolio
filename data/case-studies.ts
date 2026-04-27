// ── Content types ─────────────────────────────────────────────────────────────

export type Block =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[] }
  | { type: "metric"; metric: string; label: string; sublabel?: string }
  | { type: "metrics_grid"; items: { metric: string; label: string; sublabel?: string }[] }
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; caption?: string };

export interface CaseStudySection {
  id: "overview" | "discovery" | "insight" | "approach" | "solution" | "impact" | "reflection";
  label: string;
  heading: string;
  blocks: Block[];
}

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  metrics: string;
  tags: string[];
  color: string;
  year?: number;
  cardImage?: string;
  cardImageFit?: "cover" | "contain";
  cardImagePadding?: string;
  heroImage?: string;
  sections: CaseStudySection[];
}

// ── Case studies ──────────────────────────────────────────────────────────────

export const caseStudies: CaseStudy[] = [
  {
    slug: "agriculture-workflow-optimization",
    year: 2025,
    title: "Matching Enterprise Tools to Field-First Work",
    subtitle: "Cut order creation time by 60% and doubled transaction volume by identifying a critical device strategy gap, then leading the redesign across 4 product squads serving 10,000+ users.",
    metrics: "60% faster order creation · 2x transaction volume · 4 product squads · 10,000+ users",
    tags: ["Enterprise SaaS", "Cross-Platform Strategy", "AgTech"],
    color: "#23556C",
    cardImage: "/images/case-studies/agriculture-workflow-optimization/card.png",
    cardImageFit: "contain",
    cardImagePadding: "0 24px",
    heroImage: "/images/case-studies/agriculture-workflow-optimization/hero.png",
    sections: [
      {
        id: "discovery",
        label: "Discovery",
        heading: "When tools fight against workflows, everyone loses",
        blocks: [
          {
            type: "p",
            text: "Nutrien's 10,000+ crop consultants are the company's biggest competitive advantage. They build relationships with farmers, provide expert guidance in the field, and drive over $1.5 billion in annual retail revenue. But their digital tools weren't matching how they actually worked.",
          },
          {
            type: "p",
            text: "Simple orders that could be completed in five minutes still required desktop access, forcing consultants to drive back to sales branches unnecessarily. Complex planning documents that benefited from larger screens lacked the efficiency features needed for real productivity. This mismatch was eating into the time consultants could spend with customers, which is the most valuable part of their job.",
          },
          {
            type: "p",
            text: "Initial interviews about Nutrien's new digital hub revealed a pattern hiding beneath positive feedback. Consultants appreciated the new features, but two signals demanded deeper investigation. Despite our desktop-focused application, most employees said they preferred mobile because they spent most of their day in the field. Even more concerning, some consultants had quietly reverted to legacy software for ordering. That was a clear sign of workflow misalignment. I needed to find out why.",
          },
          {
            type: "image",
            src: "/images/case-studies/agriculture-workflow-optimization/Discovery.png",
            alt: "Field consultant using the Nutrien mobile app in a greenhouse",
          },
        ],
      },
      {
        id: "insight",
        label: "Insight",
        heading: "Question the strategy before optimizing the experience",
        blocks: [
          {
            type: "p",
            text: "I synthesized patterns across multiple user studies from the past two years and used OpenAI's deep research to benchmark pain points across the ag-tech industry against our internal findings. The data confirmed what interviews had hinted at. Consultants used mobile devices 70% of the time, yet over 70% of documents were created on desktop.",
          },
          {
            type: "p",
            text: "We had been optimizing for the wrong question. The company was asking \"how do we make mobile work?\" when we should have been asking \"what work belongs on mobile?\" Different document types have fundamentally different complexity requirements. Quick field tasks belong on mobile. Complex planning belongs on desktop. The strategy needed to match the work, not force the work into one device.",
          },
          {
            type: "p",
            text: "I presented this systems-level finding to leadership, connecting user frustration directly to business efficiency. The presentation convinced them to create \"Improved Sales Document Workflow\" as a new strategic priority, proving that UX research can reshape organizational direction when you frame insights around business impact.",
          },
          {
            type: "image",
            src: "/images/case-studies/agriculture-workflow-optimization/Roadmap.png",
            alt: "Nutrien business roadmap showing Improved Sales Document Workflow as a new strategic priority",
          },
        ],
      },
      {
        id: "approach",
        label: "Approach",
        heading: "Designing for the field, not the desk",
        blocks: [
          {
            type: "p",
            text: "The reframe gave us a new design strategy built on three principles. Mobile optimization for high-frequency field tasks. Desktop enhancement for complex planning work. Seamless cross-device workflows for flexibility. Every design decision had to answer one question. Does this match how the work actually happens?",
          },
          {
            type: "h3",
            text: "Leading across 4 squads with 4 different working styles",
          },
          {
            type: "p",
            text: "The hardest part of leading across 4 product squads wasn't coordination, it was adaptation. We had one PM across all 12 employee-facing squads, but each squad had its own engineering lead with their own preferences for how design and engineering collaborated. Some teams wanted me hands-on in their daily work. Others operated more independently and preferred async handoffs.",
          },
          {
            type: "p",
            text: "I held UX retros with each squad to understand how they actually worked, then tailored my process to fit. That meant more frequent design syncs with hands-on teams, lighter-touch reviews and clearer documentation for hands-off teams. The retros also surfaced where my time would have the biggest impact, so I could focus my design effort on the squads that needed it most rather than spreading thin trying to give every team the same treatment. Standardizing the process would have been easier. Adapting to each team was what actually made the work move.",
          },
          {
            type: "h3",
            text: "Documentation as a design tool",
          },
          {
            type: "p",
            text: "Throughout the project, I maintained documentation tailored to different audiences. Decision logs to track agreements and rationale. High-level design files for stakeholder collaboration. Detailed specifications for engineering handoff. I used ChatGPT to synthesize notes, organize action items, and create shared resources so the whole team stayed aligned without endless meetings. Figma's AI tools for layer naming and content autofill let me build realistic prototypes faster, which meant more feedback cycles with users before we locked in decisions.",
          },
          {
            type: "h3",
            text: "Navigating scope uncertainty",
          },
          {
            type: "p",
            text: "Not everything made the cut. Offline mode, which research showed was critical for field work in areas with poor connectivity, got pushed to a future phase due to technical complexity. We also had to reduce the scope of inline editing interactions to meet timeline constraints. These trade-offs were difficult, but necessary. We focused on shipping what we could do well rather than shipping everything poorly.",
          },
        ],
      },
      {
        id: "solution",
        label: "Solution",
        heading: "Mobile quick order: field-first design",
        blocks: [
          {
            type: "p",
            text: "I transformed the ordering experience from a 14-click desktop-dependent flow to an 8-click mobile-optimized process that consultants could complete directly in the field with customers. Through user behavior analysis, I identified optimal defaults like delivery dates, high-inventory SKUs, and suggested retail prices that users selected over 80% of the time. This data-driven approach to smart defaults, combined with multi-select functionality, eliminated redundant interactions while maintaining information integrity. The redesign enabled consultants to complete orders on-site, reducing office visits and maximizing customer face time.",
          },
          {
            type: "video",
            src: "/images/case-studies/agriculture-workflow-optimization/Userflows.mov",
            caption: "Mobile quick order user flow",
          },
          {
            type: "h3",
            text: "Desktop inline editing: navigating real constraints",
          },
          {
            type: "p",
            text: "For complex planning documents, I designed inline editing that let users modify products directly within table interfaces, eliminating disruptive context switching. But when engineering tested the feature, they raised a concern. Real-time search across thousands of products was too slow.",
          },
          {
            type: "p",
            text: "I worked with the team to find a solution that preserved the user experience while meeting technical constraints. Our research showed that 80% of users already knew their target products, so implementing a three-character search activation threshold would limit results to manageable sets without impacting usability. For the 20% who needed to browse, the full catalog drawer remained available. This compromise maintained the streamlined workflow while keeping the system performant.",
          },
          {
            type: "video",
            src: "/images/case-studies/agriculture-workflow-optimization/InlineProtoDemo.mov",
            caption: "Desktop inline editing with three-character search activation",
          },
          {
            type: "h3",
            text: "Product reference tracking: connecting planning to execution",
          },
          {
            type: "p",
            text: "I established a universal reference pattern that scaled across document types, enabling consultants to track product status, source relevant context inline, and quickly add items to new workflows. This created seamless connections between contracted products, active orders, and planning documents, bridging the gap between yearly planning and daily execution.",
          },
          {
            type: "video",
            src: "/images/case-studies/agriculture-workflow-optimization/ReferenceFlow.mov",
            caption: "Universal product reference pattern across document types",
          },
          {
            type: "image",
            src: "/images/case-studies/agriculture-workflow-optimization/iphonemock.jpeg",
            alt: "Final Nutrien mobile app home screen mockup",
          },
          {
            type: "video",
            src: "/images/case-studies/agriculture-workflow-optimization/orderflowvidPAdding.mov",
            caption: "Mobile quick order flow — 8-click field-optimized process",
          },
        ],
      },
      {
        id: "impact",
        label: "Impact",
        heading: "When strategy aligns with user needs, everyone wins",
        blocks: [
          {
            type: "p",
            text: "The results validated the systems thinking approach.",
          },
          {
            type: "list",
            items: [
              "60% reduction in order completion time",
              "2x transaction volume completed in the digital hub",
              "Organizational shift toward device-appropriate design strategy across product teams",
            ],
          },
          {
            type: "p",
            text: "Most importantly, we changed how Nutrien thinks about cross-platform design. The conversation shifted from \"how do we ensure compatibility?\" to \"how do we optimize for device strengths based on task complexity?\" Consultants got their time back, and that time went where it belonged. With customers in the field, building the relationships that drive the business.",
          },
        ],
      },
      {
        id: "reflection",
        label: "Reflection",
        heading: "Where to look for problems",
        blocks: [
          {
            type: "p",
            text: "The biggest lesson from this project wasn't about design systems or cross-team coordination. It was about where to look for problems. The device disconnect was hiding in plain sight across two years of research. No one had connected the dots because we were asking the wrong question. That reframe changed everything.",
          },
          {
            type: "p",
            text: "I've since applied this lens to every complex system I touch. Before optimizing the experience, question whether the strategy matches reality. The biggest design wins often live one level above the design problem itself.",
          },
        ],
      },
    ],
  },
  {
    slug: "customer-financial-hub",
    year: 2023,
    title: "Building Trust in Agricultural Payments",
    subtitle: "Reduced payment time by 85% and cut errors by 50% on a $500M+ financial platform by redesigning complex payment flows into a clear, trustworthy experience.",
    metrics: "85% faster payments · 50% fewer errors · 2x digital adoption · $500M+ platform",
    tags: ["Fintech", "Payment Flows", "Enterprise SaaS"],
    color: "#4F5D6D",
    cardImage: "/images/case-studies/customer-financial-hub/card.png",
    cardImageFit: "contain",
    cardImagePadding: "24px 0",
    heroImage: "/images/case-studies/customer-financial-hub/hero.png",
    sections: [
      {
        id: "discovery",
        label: "Discovery",
        heading: "When payments feel risky, people avoid them",
        blocks: [
          {
            type: "p",
            text: "Nutrien's agricultural customers manage complex finances. Balances, invoices, and payment schedules tied to seasonal cycles and fluctuating costs. The company processes over $500 million in annual payments through these relationships. But the digital payment experience wasn't working.",
          },
          {
            type: "p",
            text: "Payments took over 6 minutes to complete. The error rate for online payments was 15%, but only 10% of customers were paying online at all. Most preferred to bring checks directly to their crop consultant. That's how much they trusted people over the system.",
          },
          {
            type: "p",
            text: "The digital hub wasn't earning that trust. In an early usability test with 5 customers, I found they weren't abandoning online payments because the interface was slow or ugly. They were abandoning because they didn't understand what they owed or why. Balances were fragmented across multiple screens. Due dates were unclear. Customers couldn't tell if they were paying the right amount, so they defaulted to the safest option. Handing a check to someone they trusted.",
          },
          {
            type: "p",
            text: "The problem wasn't interaction design. It was confidence.",
          },
          {
            type: "image",
            src: "/images/case-studies/customer-financial-hub/discovery.png",
            alt: "Fragmented balance screens causing customer confusion",
          },
        ],
      },
      {
        id: "insight",
        label: "Insight",
        heading: "Clarity over clicks",
        blocks: [
          {
            type: "p",
            text: "Traditional UX thinking would focus on reducing clicks, enlarging buttons, streamlining the flow. But our usability testing revealed something different. Users didn't need fewer steps. They needed to understand each step.",
          },
          {
            type: "p",
            text: "The breakthrough was simple. Create a single current balance, like a credit card statement, with one clear amount and one due date. Then show exactly how that number was calculated by letting customers view the invoices and charges that added up to the total. When users could see the math, they trusted the number. When they trusted the number, they completed the payment with confidence.",
          },
          {
            type: "image",
            src: "/images/case-studies/customer-financial-hub/insight.png",
            alt: "Currently due card showing transparent invoice breakdown",
          },
        ],
      },
      {
        id: "approach",
        label: "Approach",
        heading: "Aligning a product trio through constant change",
        blocks: [
          {
            type: "p",
            text: "This was my first time working in the product trio model, with design, product, and engineering aligned throughout development. Early on, alignment was breaking down.",
          },
          {
            type: "p",
            text: "The biggest challenge was data. Nutrien has massive amounts of agronomic and financial data, but it wasn't always accessible when we needed it. Requirements shifted as data teams worked through technical constraints. Assumptions we made in design would change mid-sprint when we learned certain data couldn't be surfaced.",
          },
          {
            type: "p",
            text: "I took the initiative to create structure around this uncertainty. I established weekly trio syncs with my PM and engineering lead to catch misalignment early, and I shared the clarity insight with both of them so we could align on a new design principle. Every decision had to answer one question. Does this help the user feel confident they're doing the right thing? Status indicators, clear descriptions, and visible calculations all stemmed from this principle.",
          },
          {
            type: "h3",
            text: "One artifact kept our product trio aligned",
          },
          {
            type: "p",
            text: "I created and managed a dynamic model with my PM and engineering lead. A hybrid of a user flow and requirements tracker that let us outline all requirements and organize them into an intuitive information architecture in one view. The dynamic model became the engineering team's source of truth for visualizing the system and tracking progress. I used it as a template to start wireframing. Our engineering lead used it to write Jira tickets. When requirements shifted, we updated the model together so everyone stayed aligned.",
          },
          {
            type: "image",
            src: "/images/case-studies/customer-financial-hub/dynamic-model.png",
            alt: "Information architecture and payment flow diagram",
          },
          {
            type: "h3",
            text: "Learning to leverage a design system",
          },
          {
            type: "p",
            text: "This was also my first project working with an extensive design system. I partnered with our design system team to understand component capabilities and constraints. Initially it felt like a constraint because my ideas never fit perfectly into existing components. But over time, my thinking shifted from \"how do I make this work with components?\" to \"which components can I leverage to solve this problem?\" That mindset change made me faster and more consistent, and meant our engineers could build more efficiently because they were working with familiar patterns.",
          },
        ],
      },
      {
        id: "solution",
        label: "Solution",
        heading: "The payment flow: building trust through transparency",
        blocks: [
          {
            type: "p",
            text: "I restructured the payment flow around the clarity principle, using a stepper pattern to reduce cognitive load and ensure users focused on one decision at a time. The flow breaks into three steps.",
          },
          {
            type: "h3",
            text: "Step 1: Choose your account",
          },
          {
            type: "p",
            text: "Users see all their accounts sorted by due date, with the most urgent payments surfaced first. The currently due amount is the most prominent information on each card, so users immediately understand what needs attention.",
          },
          {
            type: "h3",
            text: "Step 2: Select your balance",
          },
          {
            type: "p",
            text: "This is where transparency matters most. We default to the currently due amount, similar to a credit card statement balance, and show all the transactions that make up the total. Users can see exactly how the number was calculated. For accounts with more than five transactions, a \"show more\" option keeps the interface clean while still providing full visibility when needed.",
          },
          {
            type: "h3",
            text: "Step 3: Confirm payment details",
          },
          {
            type: "p",
            text: "Users select their payment account and date. By this point, they've already seen what they owe and why, so the final step is just confirmation.",
          },
          {
            type: "p",
            text: "This structure transformed a confusing 6-minute process into a 55-second flow. The stepper kept users oriented, the transparency built confidence, and defaulting to the currently due amount guided users toward the right choice without forcing them to figure it out themselves.",
          },
          {
            type: "image",
            src: "/images/case-studies/customer-financial-hub/payment-flow.png",
            alt: "Three-step payment flow: account selection, balance, and payment confirmation",
          },
          {
            type: "h3",
            text: "A trade-off that didn't make the cut",
          },
          {
            type: "p",
            text: "We originally wanted to remove the review screen entirely and replace it with a 5-minute undo window after payment submission. This would reduce a click while still giving users a safety net.",
          },
          {
            type: "p",
            text: "But our engineering lead flagged that the technical lift was significant, and when we tested the concept, users didn't understand it. The undo window created more anxiety, not less. They wanted to review before submitting, not after. We cut the feature and kept the review screen. Sometimes the simpler solution is the right one.",
          },
          {
            type: "h3",
            text: "Beyond payments: the trust principle scaled",
          },
          {
            type: "p",
            text: "The same clarity principle shaped a unified financial dashboard I designed alongside the payment flow. It consolidated balances, records, and purchase history into one place, replacing a fragmented experience that forced users to hunt for information across multiple screens. Feedback from our usability test highlighted the same response we saw on payments. When users could see what they needed clearly, they trusted what they were looking at.",
          },
          {
            type: "image",
            src: "/images/case-studies/customer-financial-hub/account-hub-final.png",
            alt: "Final account dashboard consolidating balances, records, and payment history",
          },
        ],
      },
      {
        id: "impact",
        label: "Impact",
        heading: "When users trust the system, they use it",
        blocks: [
          {
            type: "p",
            text: "The results validated the clarity-first approach.",
          },
          {
            type: "list",
            items: [
              "85% reduction in average payment completion time (6 minutes to 55 seconds)",
              "50% reduction in payment errors",
              "2x increase in digital payments within the first year, as customers shifted from handing checks to consultants to paying online",
              "90% satisfaction score after the redesign",
            ],
          },
          {
            type: "p",
            text: "We didn't just make payments faster. We made customers confident enough to stop bringing checks to their consultants and start trusting the digital experience.",
          },
        ],
      },
      {
        id: "reflection",
        label: "Reflection",
        heading: "Clarity builds trust",
        blocks: [
          {
            type: "p",
            text: "The biggest lesson from this project wasn't about payment flows or design systems. It was about what actually earns user trust.",
          },
          {
            type: "p",
            text: "I came in thinking the problem was friction. Too many steps, too many clicks, too much time. But the real problem was uncertainty. Users didn't trust the numbers they were seeing, so no amount of streamlining would make them confident enough to complete the payment. The solution wasn't fewer clicks. It was showing the math.",
          },
          {
            type: "p",
            text: "I've carried this principle into every project since. Before optimizing for speed, make sure users understand what they're doing and why. Confidence comes from clarity, not convenience.",
          },
        ],
      },
    ],
  },

  {
    slug: "design-system-onboarding",
    year: 2024,
    title: "Interactive Design System Onboarding",
    subtitle: "Created the organization's first interactive design system training. Scaled adoption from the design team to product and engineering functions where it became the standard onboarding resource.",
    metrics: "10 designers onboarded · Scaled to PM + Engineering · Org-wide standard",
    tags: ["Design Systems", "Internal Tools", "Onboarding UX"],
    color: "#480B3F",
    cardImage: "/images/case-studies/design-system-onboarding/card.png",
    heroImage: "/images/case-studies/design-system-onboarding/hero.png",
    sections: [
      {
        id: "discovery",
        label: "Discovery",
        heading: "A problem the team had decided not to solve",
        blocks: [
          {
            type: "p",
            text: "While working with Nutrien's design system team on a broader system redesign, I led the synthesis of a service blueprint from conversations with multiple product teams. The blueprint surfaced five takeaways, but one stood out as both common and underserved. Designers across the organization didn't fully understand the design system's principles, components, or documentation. Onboarding to the system was inconsistent, slow, and mostly self-directed.",
          },
          {
            type: "p",
            text: "The team had decided to deprioritize the problem. Not because it didn't matter, but because the bigger system redesign was already consuming bandwidth. I disagreed with the call. The problem was high-impact and could be solved with minimal investment. I made the case to my manager, got backing, and took it on as a side project.",
          },
          {
            type: "image",
            src: "/images/case-studies/design-system-onboarding/service-blueprint.png",
            alt: "Design system service blueprint mapping phases and pain points across contributing roles",
          },
        ],
      },
      {
        id: "insight",
        label: "Insight",
        heading: "Learn the system by using the system",
        blocks: [
          {
            type: "p",
            text: "Most design system onboarding assumes designers will read documentation and absorb principles. That's the slow path. Educational psychology research on learning retention is clear. People learn faster and remember longer when they practice what they're learning, not when they read about it.",
          },
          {
            type: "p",
            text: "The reframe was simple. Onboarding shouldn't teach designers about the system. It should put them inside the system, working with real components, solving real problems, recreating real screens. Hands-on practice would build muscle memory in a way documentation never could.",
          },
        ],
      },
      {
        id: "approach",
        label: "Approach",
        heading: "Figma as the classroom",
        blocks: [
          {
            type: "p",
            text: "I chose Figma as the platform because it was already the team's primary design tool, which meant zero adoption friction. More importantly, Figma's interactive capabilities let me build practice scenarios that mirrored real design work, not abstract exercises.",
          },
          {
            type: "p",
            text: "I worked with another designer to audit existing materials, research how other design systems handled onboarding, and build a comprehensive list of learning objectives. We used a value matrix to rank objectives by value and effort, which gave us a focused outline for the first version rather than trying to cover everything.",
          },
          {
            type: "image",
            src: "/images/case-studies/design-system-onboarding/value-matrix.png",
            alt: "Value vs effort priority matrix used to scope onboarding learning objectives",
          },
          {
            type: "p",
            text: "The structure paired every informational slide with a hands-on task that reinforced the material. Practice scenarios pulled from real examples in our application, so designers were solving authentic problems and recreating actual pages, not toy exercises. Distinct color schemes signaled when designers were in interactive mode versus reading mode, making the file easy to navigate.",
          },
          {
            type: "p",
            text: "An early round of feedback surfaced something I hadn't anticipated. The file itself needed onboarding. Designers weren't sure how to duplicate it, navigate between modules, or work inside it without breaking the structure. I added a \"before you start\" section covering the basics, which improved the experience significantly. A small reminder that even good onboarding products need their own onboarding.",
          },
        ],
      },
      {
        id: "solution",
        label: "Solution",
        heading: "Five modules, built around doing",
        blocks: [
          {
            type: "p",
            text: "The final file comprised five modules covering design principles, components, and foundations. Each topic built progressively on the last. Most informational content was followed immediately by an interactive task, so designers could test their understanding before moving on.",
          },
          {
            type: "p",
            text: "I included a module on auto-layout that wasn't strictly part of the design system but was essential to how our application was built. It gave designers tips that would streamline their day-to-day work, not just their design system work. The final module focused on design practice. Designers recreated simple screens from our application in Figma and were guided through the process of soliciting feedback from the design system team to ensure pixel-perfect accuracy.",
          },
          {
            type: "image",
            src: "/images/case-studies/design-system-onboarding/module-overview.png",
            alt: "Overview of all five onboarding modules in the interactive Figma file",
          },
        ],
      },
      {
        id: "impact",
        label: "Impact",
        heading: "From side project to org-wide standard",
        blocks: [
          {
            type: "p",
            text: "The file shipped to the design team and was adopted immediately. Two new designers used it, and all 10 existing designers went back through it to refresh their own skills. Leadership saw the impact and expanded the approach beyond design. Versions of the interactive onboarding pattern were adopted across product management and engineering, making me the pioneer of the organization's primary design system onboarding resource.",
          },
          {
            type: "p",
            text: "The cost was a few weeks of focused work on a side project. The return was a scaled training resource adopted across multiple functions. Sometimes the highest-leverage work is the work nobody asked you to do.",
          },
        ],
      },
      {
        id: "reflection",
        label: "Reflection",
        heading: "Onboarding is a design problem, not a documentation problem",
        blocks: [
          {
            type: "p",
            text: "The biggest lesson from this project wasn't about Figma or design systems. It was about how learning actually happens. We invest enormous effort in making products intuitive for users, then assume our internal teams can self-teach from documentation. They can't, and they shouldn't have to. Onboarding deserves the same design rigor as the products themselves.",
          },
          {
            type: "p",
            text: "I've carried two principles forward from this work. First, when I see a high-impact problem the team has deprioritized, I make the case for it rather than waiting for permission. Second, when I'm teaching anything, I default to hands-on practice over passive content. People learn by doing.",
          },
        ],
      },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export function getPrevNext(slug: string): {
  prev: { slug: string; title: string; metrics: string } | null;
  next: { slug: string; title: string; metrics: string } | null;
} {
  const idx = caseStudies.findIndex((c) => c.slug === slug);
  const n = caseStudies.length;
  const prevStudy = caseStudies[(idx - 1 + n) % n];
  const nextStudy = caseStudies[(idx + 1) % n];
  return {
    prev: { slug: prevStudy.slug, title: prevStudy.title, metrics: prevStudy.metrics },
    next: { slug: nextStudy.slug, title: nextStudy.title, metrics: nextStudy.metrics },
  };
}
