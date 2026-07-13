import { JobTemplate } from "../types";

export const jobTemplates: JobTemplate[] = [
  {
    title: "Senior Full-Stack Engineer (React & Node)",
    department: "Engineering",
    experienceLevel: "Senior",
    skillsRequired: ["React", "TypeScript", "Node.js", "Express", "Tailwind CSS", "PostgreSQL", "Docker", "System Design"],
    criteria: [
      {
        name: "Technical Expertise & Architecture",
        weight: 40,
        description: "Proven experience with TypeScript, React, and server-side framework architectures, database modeling, and state management."
      },
      {
        name: "Practical Project Delivery",
        weight: 30,
        description: "Evidence of shipped, production-grade SaaS applications, refactoring complex code bases, and performance optimization."
      },
      {
        name: "Leadership & Collaboration",
        weight: 20,
        description: "Experience mentoring juniors, writing system proposals, leading code reviews, and working closely with PMs."
      },
      {
        name: "Education & Foundation",
        weight: 10,
        description: "Computer Science degree or equivalent practical industry background showing fundamental coding patterns."
      }
    ],
    descriptionText: `We are looking for a Senior Full-Stack Engineer to join our core platform team. You will lead the development of our next-generation web client and backend services.

Key Responsibilities:
- Design, build, and maintain highly-scalable full-stack features using React, TypeScript, and Node.js.
- Optimize database structures (PostgreSQL) and APIs for speed, durability, and secure data flow.
- Mentor junior engineers, conduct robust code reviews, and champion engineering excellence across the team.
- Collaborate closely with Product Managers and Designers to transform requirements into delightful user experiences.

What We Look For:
- 5+ years of software engineering experience in full-stack web roles.
- Expert knowledge of modern React ecosystem (hooks, state, suspense) and Tailwind CSS styling patterns.
- Strong proficiency in Node.js, Express, TypeScript, and SQL relational query design.
- Excellent communication skills and a team-first, collaborative mindset.`
  },
  {
    title: "Senior Product Manager (AI & Analytics)",
    department: "Product",
    experienceLevel: "Senior",
    skillsRequired: ["Product Strategy", "AI/ML Concepts", "Data Analytics", "Agile Roadmap", "SQL", "User Research", "Wireframing"],
    criteria: [
      {
        name: "AI & Domain Knowledge",
        weight: 35,
        description: "Understanding of large language models, predictive analysis, embeddings, data pipelines, and intelligent interfaces."
      },
      {
        name: "Product Strategy & execution",
        weight: 35,
        description: "Ability to construct roadmaps, prioritize feature backlog, define clear metrics, and drive features from spec to launch."
      },
      {
        name: "Communication & User Empathy",
        weight: 20,
        description: "Excellent presentation skills, cross-functional alignment, conducting user research, and articulating complex product plans."
      },
      {
        name: "Data & Analytical Mindset",
        weight: 10,
        description: "Proficiency in metrics analysis, data visualization, query building, and running A/B experiments."
      }
    ],
    descriptionText: `As a Senior PM for AI & Analytics, you will own the roadmap for our core intelligent screening dashboard, driving advanced predictive features and analytical reporting widgets.

Key Responsibilities:
- Define product vision, roadmap, and quarterly goals for the AI analytics product line.
- Write crisp, thorough Product Requirement Documents (PRDs) and maintain a healthy, ranked engineering backlog.
- Partner with Data Science and AI Engineering to explore, test, and integrate advanced matching algorithms safely.
- Conduct deep customer discovery sessions and synthesize findings into high-impact user experiences.

What We Look For:
- 4+ years of Product Management experience, preferably in B2B SaaS or data-heavy platforms.
- Deep familiarity with modern machine learning, GenAI APIs, or predictive analytic structures.
- Strong track record of launching and iterating on customer-facing dashboards.
- Exceptional analytical skills with hands-on capability to query and inspect data structures directly.`
  },
  {
    title: "Growth Marketing Specialist",
    department: "Marketing",
    experienceLevel: "Mid-to-Senior",
    skillsRequired: ["Google Ads", "SEO", "Growth Hacking", "Content Strategy", "A/B Testing", "Email Marketing", "Google Analytics"],
    criteria: [
      {
        name: "Paid Acquisition & SEO",
        weight: 40,
        description: "Demonstrated success driving high-ROI paid search campaigns, local ad placements, and organic keyword growth."
      },
      {
        name: "Content & Copywriting",
        weight: 30,
        description: "Strong messaging capability, developing click-worthy email sequences, landing page content, and visual storytelling."
      },
      {
        name: "Data-Driven Optimization",
        weight: 20,
        description: "Comfort reading marketing metrics, running structured A/B tests, and tracking conversion funnels closely."
      },
      {
        name: "Tool Proficiency",
        weight: 10,
        description: "Hands-on experience with modern SEO tools, analytics suites, automated campaign runners, and pixel triggers."
      }
    ],
    descriptionText: `We are searching for a high-velocity Growth Marketing Specialist to supercharge our user acquisition channels, managing content execution, paid distribution, and conversion optimization.

Key Responsibilities:
- Design, launch, and monitor performance of paid acquisition campaigns across search, social, and professional networks.
- Lead content marketing strategy, including high-ranking articles, informative case studies, and engaging weekly newsletters.
- Run continuous landing page experiment groups (A/B testing) to maximize signup rate and user conversion values.
- Analyze campaign analytics deeply to attribute leads accurately and scale our overall cost-of-acquisition target.

What We Look For:
- 3+ years of direct experience in growth marketing, inbound traffic creation, or digital ad strategy.
- Deep expertise with Google Ads, Meta Ads, Search Console, and leading email marketing providers.
- Exceptional written English skills with a portfolio of high-converting copies and headlines.
- Self-motivated structure: you love setting targets, testing hypotheses rapidly, and pivoting based on data.`
  },
  {
    title: "Data Scientist & AI Engineer (Python & LLMs)",
    department: "Engineering",
    experienceLevel: "Senior",
    skillsRequired: ["Python", "PyTorch", "LLMs", "Vector Databases", "LangChain", "SQL", "Hugging Face", "Model Fine-tuning"],
    criteria: [
      {
        name: "AI/ML Modeling & Deep Learning",
        weight: 40,
        description: "Understanding of transformer architectures, fine-tuning neural networks, embeddings, and machine learning pipelines."
      },
      {
        name: "System Integration & Prompt Engineering",
        weight: 30,
        description: "Experience connecting models via LangChain/LlamaIndex, building robust vector index queries, and handling prompt safety."
      },
      {
        name: "Data Engineering & SQL",
        weight: 20,
        description: "Expertise cleaning high-velocity datasets, writing complex relational/NoSQL queries, and orchestrating batch ETL processes."
      },
      {
        name: "Research & Foundational math",
        weight: 10,
        description: "Academic or applied math background in statistics, probability, and algorithmic optimization."
      }
    ],
    descriptionText: `We are looking for a Senior Data Scientist & AI Engineer to build, evaluate, and scale our core intelligence matching engines. You will lead the transition of our product from single-prompt APIs into fine-tuned local models.

Key Responsibilities:
- Design, evaluate, and deploy advanced NLP and generative AI models into production environments.
- Optimize semantic search layers using vector databases (Pinecone, pgvector) for millisecond latency retrievals.
- Fine-tune small open-source LLMs (Llama, Mistral) on custom proprietary dataset annotations.
- Collaborate with the core full-stack team to bridge the gap between Python AI engines and Node/React wrappers.

What We Look For:
- 5+ years of quantitative experience in AI/ML engineering, Data Science, or Applied Mathematics.
- Strong proficiency in Python, PyTorch, Pandas, and deep learning modeling toolkits.
- Direct experience deploying LLM production pipelines with semantic vector indexing layers.
- Excellent understanding of statistical validation, model evaluation metrics, and bias auditing.`
  },
  {
    title: "UI/UX Product Designer (Figma & Design Systems)",
    department: "Design",
    experienceLevel: "Mid-to-Senior",
    skillsRequired: ["Figma", "Design Systems", "User Research", "Prototyping", "Web Accessibility", "Interaction Design", "Wireframing"],
    criteria: [
      {
        name: "Interaction Design & Visual Craft",
        weight: 40,
        description: "Ability to design highly elegant, modern layouts utilizing precise typography, negative space, and micro-interactions."
      },
      {
        name: "User Research & Testing",
        weight: 30,
        description: "Proven record conducting user interviews, synthesizing feedback, mapping user journeys, and iterating wireframes."
      },
      {
        name: "Design Systems & Collaboration",
        weight: 20,
        description: "Experience maintaining enterprise Figma component libraries, tokenizing UI assets, and guiding engineering hands-off."
      },
      {
        name: "Frontend Code Familiarity",
        weight: 10,
        description: "Basic HTML/CSS/JS knowledge to ensure design feasibility and smooth collaboration with web developers."
      }
    ],
    descriptionText: `We are seeking a high-caliber UI/UX Product Designer to champion our visual identity, establish our central design system, and craft the screen flows of our SaaS hiring applications.

Key Responsibilities:
- Design clean, delightful end-to-end user interfaces, starting from conceptual wireframes to high-fidelity clickable mockups.
- Establish, document, and scale our visual Design System components in Figma.
- Plan and conduct qualitative customer feedback surveys and continuous usability test runs.
- Work hand-in-hand with frontend developers to ensure design integrity, web accessibility, and motion fluidity in the shipped product.

What We Look For:
- 4+ years of experience designing web and mobile B2B SaaS products.
- Elite visual craft: you are obsessed with spacing rhythm, typography pairings, grid structures, and accessibility standards.
- Strong product thinking: you don't just make things look pretty, you design interfaces that solve actual functional user friction.
- An online portfolio showcasing detailed design processes, wireframes, and polished mockups.`
  },
  {
    title: "Technical Customer Success Lead",
    department: "Operations",
    experienceLevel: "Mid-to-Senior",
    skillsRequired: ["Zendesk", "Customer Retention", "Intercom", "SaaS Support", "API Troubleshooting", "KPI Tracking", "Client Onboarding"],
    criteria: [
      {
        name: "Technical Support & Troubleshooting",
        weight: 40,
        description: "Hands-on ability to inspect browser console errors, debug simple webhook/API parameters, and write basic SQL queries."
      },
      {
        name: "Onboarding & Relationship Building",
        weight: 30,
        description: "Demonstrated success onboarding complex enterprise customer clients, boosting account retention, and reducing churn."
      },
      {
        name: "Team Mentorship & Operations",
        weight: 20,
        description: "Experience managing ticketing support queues, establishing escalation criteria, and mentoring junior agents."
      },
      {
        name: "Product Feedback loop",
        weight: 10,
        description: "Ability to translate client frustration, feature requests, and support trends into clear product specifications."
      }
    ],
    descriptionText: `We are looking for a proactive, technical Customer Success Lead to run client onboarding, manage technical ticket escalations, and champion customer delight across our enterprise SaaS client base.

Key Responsibilities:
- Own the customer onboarding journey for mid-market and enterprise companies, ensuring high tool adoption and satisfaction.
- Act as the senior point of escalation for complex technical queries (REST APIs, integration configs, custom SSO setups).
- Build and monitor daily performance dashboard reports to track ticket response times, client retention, and CSAT scores.
- Sync regularly with our Product and Engineering squads to ensure recurring customer pain points are translated into roadmap features.

What We Look For:
- 4+ years of customer success or technical support experience in B2B SaaS companies.
- Excellent interpersonal skills: you are extremely empathetic, structured, and a brilliant, calm communicator.
- Technical curiosity: you are comfortable with chrome developer tools, reading API request logs, and running basic SQL commands.
- High-level organization: you can juggle multiple customer accounts and queue priorities without losing poise.`
  },
  {
    title: "Junior Full-Stack Developer (React & Node)",
    department: "Engineering",
    experienceLevel: "Entry Level",
    skillsRequired: ["React", "JavaScript", "TypeScript", "Node.js", "Express", "CSS", "Git", "HTML"],
    criteria: [
      {
        name: "Technical Aptitude & Fundamentals",
        weight: 40,
        description: "Solid grasp of foundational JavaScript/TypeScript, React state management, web requests, and CSS fundamentals."
      },
      {
        name: "Personal Projects & Practical Building",
        weight: 30,
        description: "Shows evidence of building real projects, academic assignments, hackathon submissions, or coding bootcamps."
      },
      {
        name: "Coachability & Growth Mindset",
        weight: 20,
        description: "Eager to learn, responsive to feedback, participates in the developer community, and is passionate about software craft."
      },
      {
        name: "Collaboration & Communication",
        weight: 10,
        description: "Clear communication, ability to explain their personal projects and code walk-throughs in simple terms."
      }
    ],
    descriptionText: `We are looking for a Junior Full-Stack Developer to join our growing product squad. This is an entry-level position where you will be mentored by senior engineers and work on real user features.

Key Responsibilities:
- Build and fix components using React, TypeScript, and Tailwind CSS.
- Learn to design and connect backend API endpoints using Node.js and Express.
- Collaborate with engineers and designers to understand feature requirements and design specifications.
- Actively participate in sprint ceremonies, code reviews, and pairing sessions to accelerate your growth.

What We Look For:
- 0-2 years of software engineering experience or completion of a comprehensive computer science program/bootcamp.
- Familiarity with core React concepts (components, state, props, hooks).
- Basic understanding of APIs, server communication, and version control (Git).
- Strong hunger to learn, ask questions, and grow as a software craftsperson.`
  },
  {
    title: "Software Quality Assurance (SQA) Engineer",
    department: "QA & Testing",
    experienceLevel: "Mid",
    skillsRequired: ["Manual Testing", "Automation Testing", "Selenium", "Jest", "Cypress", "API Testing", "Postman", "CI/CD", "Bug Tracking"],
    criteria: [
      {
        name: "Technical Testing & Automation",
        weight: 40,
        description: "Knowledge of automation tools (Cypress, Jest, Selenium), API testing with Postman, and scripting tests."
      },
      {
        name: "Test Planning & Execution",
        weight: 30,
        description: "Capability to write comprehensive test plans, design edge-case scenarios, and execute manual QA pipelines."
      },
      {
        name: "Defect Resolution & Reports",
        weight: 20,
        description: "Clear bug reporting, root cause investigation, and collaboration with software engineers to prioritize fixes."
      },
      {
        name: "Agile QA Mindset",
        weight: 10,
        description: "Understanding of development lifecycles, Agile/Scrum ceremonies, and release management."
      }
    ],
    descriptionText: `We are looking for a Software Quality Assurance (SQA) Engineer to own the quality pipeline of our active SaaS applications. You will balance manual test design with robust, automated regression suites to ensure zero-downtime releases.

Key Responsibilities:
- Design, write, and execute comprehensive test plans for newly shipped web and API features.
- Build and maintain automated end-to-end regression suites using Cypress, Playwright, or Selenium.
- Partner with product managers and engineers to understand core user stories and design critical edge-case validations.
- Investigate, document, and track software defects thoroughly using modern issue tracking suites.

What We Look For:
- 2-4 years of experience as an SQA or QA Automation engineer.
- Hands-on scripting proficiency in JavaScript/TypeScript or Python for automation.
- Strong knowledge of REST API testing tools (Postman, Insomnia) and network tab inspection.
- Excellent communication skills to advocate for high-quality user experiences and clear defect reproduction.`
  },
  {
    title: "Data Analyst (Product & Operations)",
    department: "Analytics",
    experienceLevel: "Mid",
    skillsRequired: ["SQL", "Python", "Tableau", "Power BI", "A/B Testing", "Excel", "Data Modeling", "Google Analytics"],
    criteria: [
      {
        name: "SQL & Query Building",
        weight: 40,
        description: "Ability to write complex, highly-optimized SQL queries to join and aggregate diverse datasets."
      },
      {
        name: "Data Visualization & Reporting",
        weight: 30,
        description: "Proven success building intuitive Tableau, Power BI, or Looker dashboards for non-technical stakeholders."
      },
      {
        name: "Analytical Thinking & A/B Tests",
        weight: 20,
        description: "Understanding of statistical validation, conversion funnels, cohort analysis, and A/B test experiments."
      },
      {
        name: "Business Acumen & Alignment",
        weight: 10,
        description: "Translating database trends into clear product opportunities and operational recommendations."
      }
    ],
    descriptionText: `We are looking for a Data Analyst to translate raw metrics into high-impact product decisions and operational insights. You will be the primary analytics partner for our Product and Marketing squads.

Key Responsibilities:
- Write optimized, reliable SQL queries to retrieve and aggregate operational and user metrics.
- Build, design, and maintain real-time analytical reporting dashboards using Tableau or Power BI.
- Structure, run, and report on the results of continuous A/B product experiment groups.
- Perform ad-hoc deep dives into customer retention, feature adoption, and user journey drop-offs.

What We Look For:
- 2-4 years of experience as a Data Analyst, Product Analyst, or Business Intelligence specialist.
- Expert-level SQL queries (Window functions, complex CTEs, index-friendly structures).
- Experience scripting in Python or R for statistical analysis and data manipulation.
- Strong visualization design: you know how to display data simply, clearly, and elegantly.`
  }
];
