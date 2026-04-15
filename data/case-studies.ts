// ── Content types ─────────────────────────────────────────────────────────────

export type Block =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[] }
  | { type: "metric"; metric: string; label: string; sublabel?: string }
  | { type: "metrics_grid"; items: { metric: string; label: string; sublabel?: string }[] }
  | { type: "image"; src: string; alt: string };

export interface CaseStudySection {
  id: "overview" | "discovery" | "approach" | "design" | "impact" | "reflection";
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
  heroImage?: string;
  sections: CaseStudySection[];
}

// ── Case studies ──────────────────────────────────────────────────────────────

export const caseStudies: CaseStudy[] = [
  {
    slug: "agriculture-workflow-optimization",
    title: "Agricultural Workflow Optimization",
    subtitle: "Cut order creation time by 60% and doubled transaction volume by identifying a critical device strategy gap, then leading the redesign across 4 product squads serving 10,000+ users.",
    metrics: "60% faster order creation · 2x transaction volume · 10,000+ users",
    tags: ["Enterprise", "Systems Thinking", "Design Leadership"],
    color: "#23556C",
    heroImage: undefined,
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
            type: "h3",
            text: "Something didn't add up",
          },
          {
            type: "p",
            text: "Initial interviews about Nutrien's new digital hub revealed a pattern hiding beneath positive feedback. Consultants appreciated the new features, but two signals demanded deeper investigation: despite our desktop-focused application, most employees said they preferred mobile because they spent most of their day in the field. Even more concerning, some consultants had quietly reverted to legacy software for ordering.",
          },
          {
            type: "p",
            text: "That was a clear sign of workflow misalignment. I needed to find out why.",
          },
          {
            type: "h3",
            text: "The data told a story no one had connected",
          },
          {
            type: "p",
            text: "I synthesized patterns across multiple user studies from the past two years and used OpenAI's deep research to benchmark pain points across the ag-tech industry against our internal findings. The data confirmed what interviews had hinted at: consultants used mobile devices 70% of the time, yet over 70% of documents were created on desktop.",
          },
          {
            type: "metric",
            metric: "70%",
            label: "Of work time spent on mobile devices",
            sublabel: "Yet 70%+ of documents were created on desktop",
          },
          {
            type: "p",
            text: "We had been optimizing for the wrong question. The company was asking 'how do we make mobile work?' when we should have been asking 'what work belongs on mobile?'",
          },
          {
            type: "h3",
            text: "Reframing the strategy",
          },
          {
            type: "p",
            text: "This insight led me to develop a device-appropriate design strategy. Different document types have fundamentally different complexity requirements:",
          },
          {
            type: "list",
            items: [
              "Mobile optimization for high-frequency field tasks",
              "Desktop enhancement for complex planning work",
              "Seamless cross-device workflows for flexibility",
            ],
          },
          {
            type: "p",
            text: "I presented this systems-level finding to leadership, connecting user frustration directly to business efficiency. The presentation convinced them to create 'Improved Sales Document Workflow' as a new strategic priority, proving that UX research can reshape organizational direction when you frame insights around business impact.",
          },
        ],
      },
      {
        id: "approach",
        label: "Approach",
        heading: "Making 4 teams move as one",
        blocks: [
          {
            type: "p",
            text: "Leading design across multiple product squads required clear principles and flexible execution. I developed shared component standards and consistent handoff processes, supported by structured collaboration rhythms: weekly syncs with product and engineering leads for alignment, bi-weekly jam sessions for design feedback, and regular demos with office hours to keep everyone accessible.",
          },
          {
            type: "p",
            text: "I established these rhythms because early in the project, misalignment between design and engineering led to rework. Structured touchpoints caught feasibility issues before they became costly.",
          },
          {
            type: "h3",
            text: "Documentation as a design tool",
          },
          {
            type: "p",
            text: "Throughout the process, I maintained comprehensive documentation tailored to different audiences: decision logs to track agreements and rationale, high-level design files for stakeholder collaboration, and detailed specifications for engineering handoff. I used ChatGPT to synthesize notes, organize action items, and create shared resources so the whole team stayed aligned without endless meetings. Figma's AI tools for layer naming and content autofill let me build realistic prototypes faster, which meant more feedback cycles with users before we locked in decisions.",
          },
          {
            type: "h3",
            text: "Navigating scope uncertainty",
          },
          {
            type: "p",
            text: "Not everything made the cut. Offline mode — which research showed was critical for field work in areas with poor connectivity — got pushed to a future phase due to technical complexity. We also had to reduce the scope of inline editing interactions to meet timeline constraints.",
          },
          {
            type: "p",
            text: "These trade-offs were difficult, but necessary. We focused on shipping what we could do well rather than shipping everything poorly. The results validated that approach.",
          },
        ],
      },
      {
        id: "design",
        label: "Design",
        heading: "Mobile quick order: field-first design",
        blocks: [
          {
            type: "p",
            text: "I transformed the ordering experience from a 14-click desktop-dependent flow to an 8-click mobile-optimized process that consultants could complete directly in the field with customers. Through user behavior analysis, I identified optimal defaults — delivery dates, high-inventory SKUs, and suggested retail prices — that users selected over 80% of the time. This data-driven approach to smart defaults, combined with multi-select functionality, eliminated redundant interactions while maintaining information integrity. The redesign enabled consultants to complete orders on-site, reducing office visits and maximizing customer face time.",
          },
          {
            type: "h3",
            text: "Desktop inline editing: navigating real constraints",
          },
          {
            type: "p",
            text: "For complex planning documents, I designed inline editing that let users modify products directly within table interfaces, eliminating disruptive context switching. But when engineering tested the feature, they raised a concern: real-time search across thousands of products was too slow.",
          },
          {
            type: "p",
            text: "I worked with the team to find a solution that preserved the user experience while meeting technical constraints. Our research showed that 80% of users already knew their target products, so implementing a three-character search activation threshold would limit results to manageable sets without impacting usability. For the 20% who needed to browse, the full catalog drawer remained available. This compromise maintained the streamlined workflow while keeping the system performant.",
          },
          {
            type: "h3",
            text: "Product reference tracking: connecting planning to execution",
          },
          {
            type: "p",
            text: "I established a universal reference pattern that scaled across document types, enabling consultants to track product status, source relevant context inline, and quickly add items to new workflows. This created seamless connections between contracted products, active orders, and planning documents, bridging the gap between yearly planning and daily execution.",
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
            text: "The results validated our systems thinking approach.",
          },
          {
            type: "metrics_grid",
            items: [
              { metric: "60%", label: "Reduction in order completion time" },
              { metric: "2x", label: "Transaction volume in the digital hub" },
            ],
          },
          {
            type: "p",
            text: "Most importantly, we changed how Nutrien thinks about cross-platform design. The conversation shifted from 'how do we ensure compatibility?' to 'how do we optimize for device strengths based on task complexity?'",
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
            text: "The biggest lesson from this project wasn't about design systems or cross-team coordination. It was about where to look for problems.",
          },
          {
            type: "p",
            text: "The device disconnect was hiding in plain sight across two years of research. No one had connected the dots because we were asking the wrong question. That reframe changed everything.",
          },
          {
            type: "p",
            text: "I've since applied this lens to every complex system I touch: before optimizing the experience, question whether the strategy matches reality.",
          },
        ],
      },
    ],
  },
  {
    slug: "customer-financial-hub",
    title: "Payment Flow Redesign",
    subtitle: "Reduced payment time by 85% and cut errors by 50% on a $500M+ financial platform by redesigning complex payment flows into a clear, trustworthy experience.",
    metrics: "85% faster payments · 50% fewer errors · 2,000+ users · 90% satisfaction",
    tags: ["Fintech", "UX Design", "Payments"],
    color: "#4F5D6D",
    heroImage: undefined,
    sections: [
      {
        id: "discovery",
        label: "Discovery",
        heading: "When payments feel risky, people avoid them",
        blocks: [
          {
            type: "p",
            text: "Nutrien's agricultural customers manage complex finances, with balances, invoices, and payment schedules tied to seasonal cycles and fluctuating costs. The company processes over $500 million in annual payments through these relationships. But the digital payment experience wasn't working.",
          },
          {
            type: "p",
            text: "Payments took over 6 minutes to complete. The error rate on online payments was 15%. And only 10% of customers were paying online at all. Most preferred to bring checks directly to their crop consultant. That's how much they trusted people over the system.",
          },
          {
            type: "p",
            text: "The digital hub wasn't earning that trust.",
          },
          {
            type: "metric",
            metric: "6 min",
            label: "Average payment completion time before redesign",
            sublabel: "Only 10% of customers paid online",
          },
          {
            type: "h3",
            text: "The real cost of confusion",
          },
          {
            type: "p",
            text: "Our research showed that customers weren't abandoning online payments because the interface was slow or ugly. They were abandoning because they didn't understand what they owed or why. Balances were fragmented across multiple screens. Due dates were unclear. Customers couldn't tell if they were paying the right amount, so they defaulted to the safest option: handing a check to someone they trusted.",
          },
          {
            type: "p",
            text: "The problem wasn't interaction design. It was confidence.",
          },
          {
            type: "h3",
            text: "Clarity over clicks",
          },
          {
            type: "p",
            text: "Traditional UX thinking would focus on reducing clicks, enlarging buttons, streamlining the flow. But our usability testing with 5 participants revealed something different: users didn't need fewer steps. They needed to understand each step.",
          },
          {
            type: "p",
            text: "The breakthrough was simple. Create a single current balance, like a credit card statement, with one clear amount and one due date. Then show exactly how that number was calculated by letting customers view the invoices and charges that added up to the total.",
          },
          {
            type: "p",
            text: "This transparency changed everything. When users could see the math, they trusted the number. When they trusted the number, they completed the payment.",
          },
          {
            type: "h3",
            text: "Designing for confidence, not speed",
          },
          {
            type: "p",
            text: "This insight reshaped our entire approach. Every design decision filtered through one question: does this help the user feel confident they're doing the right thing? Status indicators, clear descriptions, and visible calculations all stemmed from this principle. The speed improvements came as a byproduct of clarity, not the other way around.",
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
            text: "This was my first time working with a dedicated product manager and engineering squad. Our company promoted the product trio model, with design, product, and engineering aligned throughout development. But early on, alignment was breaking down.",
          },
          {
            type: "p",
            text: "The biggest challenge was data. Nutrien has massive amounts of agronomic and financial data, but it wasn't always accessible when we needed it. Requirements shifted as data teams worked through technical constraints. Assumptions we made in design would change mid-sprint when we learned certain data couldn't be surfaced.",
          },
          {
            type: "p",
            text: "I took the initiative to create structure around this uncertainty. I established weekly trio syncs to catch misalignment early, and created decision documents to track what we agreed on, why, and who was responsible.",
          },
          {
            type: "h3",
            text: "A shared artifact for alignment",
          },
          {
            type: "p",
            text: "One tool that made a significant difference was the dynamic model — a hybrid of a user flow and requirements tracker that I facilitated creating with my PM and engineering lead. The model let us outline all requirements and organize them into an intuitive information architecture in one view.",
          },
          {
            type: "p",
            text: "Once created, the dynamic model became our single source of truth. I used it as a template to start wireframing. Engineering used it to write Jira tickets. As the project progressed, it served as a reference for tracking completed work and ensuring nothing slipped through the cracks. When requirements shifted, we updated the model together so everyone stayed aligned.",
          },
          {
            type: "h3",
            text: "Learning to leverage a design system",
          },
          {
            type: "p",
            text: "This was also my first project working with an extensive design system. Initially it felt like a constraint because my ideas never fit perfectly into existing components. But over time, my thinking shifted from 'how do I make this work with components?' to 'which components can I leverage to solve this problem?'",
          },
          {
            type: "p",
            text: "That mindset change made me faster and more consistent. It also meant the engineering team could build more efficiently because they were working with familiar patterns.",
          },
        ],
      },
      {
        id: "design",
        label: "Design",
        heading: "The payment flow: building trust through transparency",
        blocks: [
          {
            type: "p",
            text: "The payment flow was the core of the redesign. I restructured it around the clarity principle, using a stepper pattern to reduce cognitive load and ensure users focused on one decision at a time.",
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
            text: "This is where transparency matters most. We default to the currently due amount — similar to a credit card statement balance — and show all the transactions that make up the total. Users can see exactly how the number was calculated. For accounts with more than five transactions, a 'show more' option keeps the interface clean while still providing full visibility when needed.",
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
            type: "h3",
            text: "A trade-off that didn't make the cut",
          },
          {
            type: "p",
            text: "We originally wanted to remove the review screen entirely and replace it with a 5-minute undo window after payment submission. This would reduce a click while still giving users a safety net.",
          },
          {
            type: "p",
            text: "But the technical lift was significant, and when we tested the concept, users didn't understand it. The undo window created more anxiety, not less. They wanted to review before submitting, not after. We cut the feature and kept the review screen.",
          },
          {
            type: "p",
            text: "Sometimes the simpler solution is the right one.",
          },
          {
            type: "h3",
            text: "Financial account management: a unified dashboard",
          },
          {
            type: "p",
            text: "Beyond payments, I designed a dashboard that consolidated all of a customer's financial information: balances, records, and purchase history in one place. The previous application fragmented this information across multiple screens, forcing users to hunt for what they needed.",
          },
          {
            type: "p",
            text: "The dashboard used cards prioritized by importance and included sorting and filtering to help users find information quickly. Initial feedback highlighted the ease and clarity of information retrieval, validating the same transparency principle that drove the payment redesign.",
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
            text: "The results validated our clarity-first approach.",
          },
          {
            type: "metrics_grid",
            items: [
              { metric: "85%", label: "Faster payment completion", sublabel: "6 min → 55 sec" },
              { metric: "50%", label: "Reduction in payment errors" },
              { metric: "2,000+", label: "Users adopted within one year", sublabel: "Up from 0" },
              { metric: "90%", label: "Satisfaction score after redesign" },
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
            text: "I came in thinking the problem was friction. Too many steps, too many clicks, too much time. But the real problem was uncertainty. Users didn't trust the numbers they were seeing, so no amount of streamlining would make them confident enough to complete the payment.",
          },
          {
            type: "p",
            text: "The solution wasn't fewer clicks. It was showing the math.",
          },
          {
            type: "p",
            text: "I've carried this principle into every project since: before optimizing for speed, make sure users understand what they're doing and why. Confidence comes from clarity, not convenience.",
          },
        ],
      },
    ],
  },

  {
    slug: "design-system-onboarding",
    title: "Interactive Design System Onboarding",
    subtitle: "Created the organization's first interactive design system training. Scaled adoption from the design team to product and engineering functions where it became the standard onboarding resource.",
    metrics: "10 designers onboarded · 5 modules · Org-wide adoption",
    tags: ["Design Systems", "Onboarding"],
    color: "#480B3F",
    heroImage: undefined,
    sections: [
      {
        id: "discovery",
        label: "Discovery",
        heading: "A gap hiding in plain sight",
        blocks: [
          {
            type: "h3",
            text: "Background",
          },
          {
            type: "p",
            text: "This idea originated from research our design system team was conducting for the redesign of our design system. Conversations with various product teams laid the groundwork for a comprehensive service blueprint crafted by our team. I uncovered five takeaways by synthesizing the gathered insights and identifying key pain points. One main issue was a widespread lack of understanding and training surrounding design system principles and documentation.",
          },
          {
            type: "p",
            text: "Despite its significance, this challenge found itself deprioritized by the team. Recognizing the importance of this problem and its potential for resolution with minimal investment, I passionately advocated for its elevation in priority. With the backing of my manager, I was able to take on this work as a side project.",
          },
          {
            type: "h3",
            text: "Goal",
          },
          {
            type: "p",
            text: "After evaluating many different design systems and their onboarding processes, I determined that Figma was the best platform for our onboarding file. Given its widespread adoption among designers and its status as our primary design tool, Figma offered a seamless transition for new designers. Additionally, its interactive capabilities provided an opportunity to enhance learning retention, a concept supported by research in educational psychology.",
          },
          {
            type: "p",
            text: "The goal was to create an interactive Figma file aimed at educating new designers on design system principles, familiarizing them with our Figma components, guiding them in accessing documentation, and empowering them to leverage Figma more efficiently.",
          },
        ],
      },
      {
        id: "approach",
        label: "Approach",
        heading: "Building the right learning structure",
        blocks: [
          {
            type: "h3",
            text: "Learning objectives",
          },
          {
            type: "p",
            text: "The initial phase in constructing a training program was to establish clear learning objectives. I worked with another designer to thoroughly research existing design systems to gather insights and ideas. Additionally, we conducted an audit of our own system to identify any pre-existing materials.",
          },
          {
            type: "p",
            text: "These efforts yielded an extensive list of objectives that we prioritized using a value matrix to rank all the items by value and effort. The results helped us formulate an outline for the initial version.",
          },
          {
            type: "h3",
            text: "Draft",
          },
          {
            type: "p",
            text: "The training was structured to offer users ample practice examples to equip them for designing our products. I developed the content before proceeding to craft interactive scenarios aimed at reinforcing the material. These scenarios drew upon real examples from our application, providing users with practical experience in solving authentic problems and recreating entire pages.",
          },
          {
            type: "p",
            text: "I made the file easy to navigate by creating a tutorial on its usage and distinguishing interactive pages with a vibrant, distinctive color scheme.",
          },
        ],
      },
      {
        id: "design",
        label: "Design",
        heading: "Rise Onboarding: five modules, one cohesive experience",
        blocks: [
          {
            type: "p",
            text: "The training file comprised five modules, each centered around a main learning objective. These modules covered three key design system topics — design principles, components, and foundations — which progressively built upon one another. Nearly every informational slide was followed by an interactive task designed to reinforce the user's understanding of the material.",
          },
          {
            type: "list",
            items: [
              "Design principles — foundational concepts for how we build products",
              "Components — hands-on practice with our Figma component library",
              "Foundations — color, typography, spacing, and iconography",
              "Auto-layout — essential workflow techniques for designing efficiently",
              "Design practice — recreating real screens with design system team feedback",
            ],
          },
          {
            type: "p",
            text: "The final section focused on design practice. Users are given the opportunity to recreate simple screens from our application in Figma. The module also guides them through the process of soliciting feedback from the design system team to ensure the accuracy and pixel perfection of their recreations.",
          },
          {
            type: "p",
            text: "Upon sharing it with the team, several designers eagerly utilized it to refine and refresh their design skills — before any formal onboarding program was even in place.",
          },
        ],
      },
      {
        id: "impact",
        label: "Impact",
        heading: "A side project that became a standard",
        blocks: [
          {
            type: "p",
            text: "What started as an advocated side project became the org's standard onboarding resource for new designers.",
          },
          {
            type: "metrics_grid",
            items: [
              { metric: "10", label: "Designers onboarded across the org" },
              { metric: "5", label: "Modules covering design system fundamentals" },
            ],
          },
          {
            type: "p",
            text: "Feedback also surfaced an unexpected finding: designers needed better onboarding for the file itself. I expanded the 'before you start' section to include more detail on how to duplicate, navigate, and understand the file. That small adjustment significantly improved the experience and reinforced the core lesson of the project: even onboarding needs onboarding.",
          },
        ],
      },
      {
        id: "reflection",
        label: "Reflection",
        heading: "The importance of onboarding",
        blocks: [
          {
            type: "p",
            text: "My primary takeaway from this project underscores the critical importance of onboarding. While we aspire to design products that are intuitively easy to use, the reality is that not everything can be self-explanatory. Joining a new company can be an overwhelming experience, and mastering the company's unique design workflows, principles, and components presents its own set of challenges.",
          },
          {
            type: "p",
            text: "Effective training not only benefits the company by enhancing the productivity of new designers more rapidly — it also serves as a conduit for new designers to connect with the design team and foster a supportive learning environment.",
          },
          {
            type: "p",
            text: "The unexpected feedback about onboarding the file itself was a good reminder: no matter how much thought you put into a design, users always find something you didn't anticipate. That's not a failure — that's the process working.",
          },
        ],
      },
    ],
  },
  {
    slug: "collectiviz",
    title: "Collectiviz",
    subtitle: "Built a data visualization tool that transformed scattered alumni career data into an engaging, explorable story for prospective design students.",
    metrics: "Full-stack web app · Firebase · 2 user types · 3 rounds of testing",
    tags: ["Data Viz", "Full-Stack"],
    color: "#0E0E0E",
    heroImage: undefined,
    sections: [
      {
        id: "discovery",
        label: "Discovery",
        heading: "A career field most students don't know exists",
        blocks: [
          {
            type: "h3",
            text: "The problem",
          },
          {
            type: "p",
            text: "Not many people — especially high school students — know about degrees and careers in the design field. Tracking student and alumni career information is also time-consuming, disorganized, and hard to present publicly. The result: prospective students couldn't easily understand what a design degree actually leads to.",
          },
          {
            type: "h3",
            text: "Current solutions",
          },
          {
            type: "p",
            text: "Current methods of career data collection and verification are either costly or have a poor user experience. The goal of our solution was to create a product that solved this problem while also providing an intuitive and informative data visualization experience.",
          },
          {
            type: "h3",
            text: "Our users",
          },
          {
            type: "p",
            text: "Current and prospective students are worried about career opportunities — they're either trying to pick a major or already looking for a job. They need an easier way to learn about the specific jobs alumni have acquired after graduating from the CTD program.",
          },
          {
            type: "p",
            text: "Alumni want to inform students about their careers, but they don't have a lot of time to talk with past advisors or fill out lengthy surveys. They need a single, streamlined method of entering career information that won't take much time.",
          },
        ],
      },
      {
        id: "approach",
        label: "Approach",
        heading: "Building the data pipeline from scratch",
        blocks: [
          {
            type: "h3",
            text: "The form",
          },
          {
            type: "p",
            text: "We set out to build a quick and intuitive form using Bootstrap. We created questions we thought would be valuable based on research, compiled and ordered them, then presented them to CTD alumni through user testing. Testing helped us iterate on which questions were important and which could be cut.",
          },
          {
            type: "p",
            text: "We had initially assumed our contacts at the ATLAS Institute would send the form directly. Instead, we learned more about the alumni communication process — and discovered that the department had already been sending a career information form. We pivoted to mirror the existing form, building in skip logic, input validation, and database-populated menus for a streamlined submission experience.",
          },
          {
            type: "h3",
            text: "The database",
          },
          {
            type: "p",
            text: "One of our main goals from the start was to collect CTD career data in one central place without ATLAS staff having to manually enter every piece of data from their surveys. After researching different storage methods, we chose Firebase — a Backend-as-a-Service platform — for both hosting and data storage.",
          },
          {
            type: "p",
            text: "The first step was setting up the database and writing data to it. We wrote JavaScript to pull all form data, store it in variables, and push it to Firebase on submit. Getting the data there was one challenge — ensuring it was the right data was another. We incorporated extensive error-handling to make sure whatever alumni entered was exactly what ended up stored.",
          },
          {
            type: "p",
            text: "Retrieving data was where the real complexity emerged. Pulling from the database was straightforward; formatting and displaying it without any errors was tedious and time-consuming. All alumni data had to be styled and presented visually, which meant no tolerance for behind-the-scenes inconsistencies.",
          },
        ],
      },
      {
        id: "design",
        label: "Design",
        heading: "Turning raw data into a story students could trust",
        blocks: [
          {
            type: "p",
            text: "We started by identifying the most important career and internship data points. Through research and conversations with current students, we determined that salaries, job titles, company names, locations, and job types were most relevant. Our initial prototype used Chart.js to build all visualizations.",
          },
          {
            type: "h3",
            text: "Round 1: layout and narrative",
          },
          {
            type: "p",
            text: "Our first round of user testing — a survey and two one-on-one interviews — revealed that users preferred a scrolling layout and wanted the design to feel more like an infographic with a narrative and interesting stats. As we iterated, we also received new data from the program's communications team that shifted focus toward more qualitative, program-experience insights. We rebuilt our visualizations from scratch to reflect the new data.",
          },
          {
            type: "h3",
            text: "Round 2: making it personal",
          },
          {
            type: "p",
            text: "Our final round of testing with students and design experts helped finalize the layout, visualizations, and color palette. We kept the program's official colors in hopes they would adopt the product. The key feedback: make it more personal.",
          },
          {
            type: "p",
            text: "We reached out to alumni for in-depth interviews about their experiences in the CTD program and their careers after. We added alumni profiles to the site so users could get a real look at where the degree leads — and have an actual person to contact with questions. All alumni agreed to be available as a resource for prospective and current students.",
          },
          {
            type: "h3",
            text: "The final product",
          },
          {
            type: "p",
            text: "Collectiviz is a two-page web application. The first page is a Bootstrap form that collects alumni career data in a comprehensive yet quick way. It automatically stores submitted data in a real-time Firebase database, changing dynamically based on user inputs to stay streamlined. The second page is a visualization accessible to anyone curious about CTD career prospects.",
          },
          {
            type: "p",
            text: "The visualization pulls data from Firebase and formats it using two chart-based APIs. It shows employment percentages, job titles, companies, and locations. It also surfaces alumni opinions on the program — likelihood to recommend, favorite aspects — and gives students a curated set of alumni profiles to connect with directly.",
          },
        ],
      },
      {
        id: "impact",
        label: "Impact",
        heading: "A public resource where there was nothing before",
        blocks: [
          {
            type: "p",
            text: "Before Collectiviz, there was no public-facing resource that showed prospective CTD students where the degree actually leads. The application filled that gap with real alumni data, real stories, and a real path to connect with people who had been through the program.",
          },
          {
            type: "metrics_grid",
            items: [
              { metric: "2", label: "User types served — students and alumni" },
              { metric: "3", label: "Rounds of user testing across the project" },
            ],
          },
          {
            type: "p",
            text: "The communications team at CU's ATLAS Institute was the distribution partner for the form — a signal that the tool fit naturally into their existing workflow rather than creating new overhead.",
          },
        ],
      },
      {
        id: "reflection",
        label: "Reflection",
        heading: "What building end-to-end taught me",
        blocks: [
          {
            type: "p",
            text: "Collectiviz was my first experience owning a project from research through full-stack development. The pivot mid-project — when we discovered the communications team already had a form — was a pivotal lesson in staying flexible. A rigid plan would have wasted weeks. Adapting made the final product more useful.",
          },
          {
            type: "p",
            text: "The shift to qualitative data midway through also forced a complete rethink of the visualization strategy. That was uncomfortable, but it produced a better result. The human stories — the alumni profiles — ended up being the most valuable part of the product.",
          },
          {
            type: "p",
            text: "Building the backend gave me a lasting appreciation for what engineers navigate. Error handling, data formatting, and database structure decisions that seem minor have outsized effects on what's possible in the UI. That perspective has made me a better collaborator ever since.",
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
  return {
    prev: idx > 0 ? { slug: caseStudies[idx - 1].slug, title: caseStudies[idx - 1].title, metrics: caseStudies[idx - 1].metrics } : null,
    next: idx < caseStudies.length - 1 ? { slug: caseStudies[idx + 1].slug, title: caseStudies[idx + 1].title, metrics: caseStudies[idx + 1].metrics } : null,
  };
}
