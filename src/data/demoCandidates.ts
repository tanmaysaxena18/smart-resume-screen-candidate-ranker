import { Candidate } from "../types";

export const demoCandidates: Record<string, Candidate[]> = {
  // Senior Full-Stack Engineer template demo candidates
  "Senior Full-Stack Engineer (React & Node)": [
    {
      id: "cand-1",
      name: "David K. Andersson",
      email: "david.andersson@techmail.io",
      phone: "+1 (555) 234-5678",
      fileName: "David_Andersson_Resume.pdf",
      fileSize: "142 KB",
      matchScore: 98,
      criteriaScores: [
        {
          name: "Technical Expertise & Architecture",
          score: 98,
          feedback: "Incredible technical depth in typescript, advanced React state management, and robust Express/NestJS server architecture design."
        },
        {
          name: "Practical Project Delivery",
          score: 96,
          feedback: "Demonstrated success shipping large SaaS portals and resolving critical rendering bottleneck issues on active systems."
        },
        {
          name: "Leadership & Collaboration",
          score: 95,
          feedback: "Led a cross-functional squad of 6 engineers; spearheaded high-quality architectural design proposals and active mentoring program."
        },
        {
          name: "Education & Foundation",
          score: 100,
          feedback: "B.S. in Computer Science from Stanford University with honors; strong conceptual fundamentals."
        }
      ],
      summary: "David is an exceptional, top-tier Full-Stack Engineer with 8+ years of industry experience. He has a proven track record of shipping highly-optimized SaaS platforms and leading successful technical squads. His expertise perfectly aligns with all requested technologies, particularly React, Node.js, and PostgreSQL.",
      strengths: [
        "8.5+ years of production experience with TypeScript and modern React patterns.",
        "Proven background designing secure, highly-scalable backend systems and PostgreSQL schemas.",
        "Experienced technical leader who has mentored 5+ junior and mid-level developers.",
        "Strong system design principles with direct experience in Docker containerization and CI/CD."
      ],
      weaknesses: [
        "Limited exposure to gRPC, which is listed as an optional preference in the secondary stack description.",
        "Most of his experience is in mid-to-large startups; may require brief acclimation to a fast-paced seed environment."
      ],
      missingSkills: [],
      recAction: "shortlist",
      recNotes: "Absolute must-hire profile. His technical depth and team leadership skills match our role requirements perfectly. Recommend initiating an immediate technical panel interview.",
      interviewQuestions: [
        "In your resume, you mentioned optimizing PostgreSQL queries to reduce latency by 45%. What indexing strategy and query profiling tools did you employ?",
        "How do you handle cross-team alignment on architectural standards when building monolithic vs. microservices components?",
        "Can you describe a situation where you had to mentor an engineer who was struggling with TypeScript concepts?"
      ],
      emailDraft: "Subject: ResuMatch AI - Interview Invitation: Senior Full-Stack Engineer\n\nDear David,\n\nThank you for your interest in our Senior Full-Stack Engineer (React & Node) position. Our technical screening system, powered by ResuMatch AI, has evaluated your profile, and our engineering team was exceptionally impressed by your background at Stripe and your deep expertise in React and system design.\n\nWe would love to invite you to an initial 30-minute introductory conversation to learn more about your goals, share details about our active engineering roadmap, and walk through our technical process.\n\nAre you available for a brief Zoom session next Tuesday or Wednesday afternoon?\n\nBest regards,\n\nSarah Jenkins\nEngineering Recruitment, ResuMatch AI Team",
      parsedSuccess: true
    },
    {
      id: "cand-2",
      name: "Elena Rodriguez",
      email: "elena.rodriguez.dev@gmail.com",
      phone: "+34 611 22 33 44",
      fileName: "Elena_Rodriguez_CV.pdf",
      fileSize: "185 KB",
      matchScore: 94,
      criteriaScores: [
        {
          name: "Technical Expertise & Architecture",
          score: 95,
          feedback: "Outstanding relational database optimization abilities. Extremely deep knowledge of Node.js cluster processes and clean server patterns."
        },
        {
          name: "Practical Project Delivery",
          score: 92,
          feedback: "Successfully rebuilt a core legacy API, decreasing average response time by 60% and scaling throughput to 50k RPS."
        },
        {
          name: "Leadership & Collaboration",
          score: 88,
          feedback: "Great cross-functional collaborator. Actively led standups and code hygiene initiatives, but less focus on formal management."
        },
        {
          name: "Education & Foundation",
          score: 90,
          feedback: "M.S. in Software Engineering from Polytech Madrid. Solid algorithmic background."
        }
      ],
      summary: "Elena is a senior-level full-stack engineer who leans strongly backend-heavy. She brings 6 years of robust development experience in highly-scaled API infrastructures and PostgreSQL management. She demonstrates deep database profiling, memory leak diagnosis, and modular service creation skills.",
      strengths: [
        "Expert-level understanding of Node.js event-loop optimization and relational databases.",
        "Strong proficiency with TypeScript and building modular, testable backend code.",
        "Experienced with cloud deployments and Kubernetes cluster orchestrations.",
        "Excellent analytical mindset with a strong emphasis on clean code and robust integration tests."
      ],
      weaknesses: [
        "Weaker relative experience with modern Tailwind CSS and UI design; she leans heavily backend-centric.",
        "Has not recently handled complex client-side client-only global state engines (e.g. Redux/Zustand at massive scale)."
      ],
      missingSkills: ["Tailwind CSS"],
      recAction: "interview",
      recNotes: "Excellent technical talent, specifically for database and core API scalability. If our current priority is highly-available backend APIs, she is a stellar candidate despite slight UI gaps.",
      interviewQuestions: [
        "Can you walk us through how you identified and resolved a severe database deadlock issue on a production PostgreSQL database?",
        "Since this is a full-stack role, how comfortable are you taking high-fidelity Figma components and writing responsive front-end layouts with Tailwind CSS?",
        "What are your favorite practices for designing robust APIs that are clean and intuitive for frontend consumption?"
      ],
      emailDraft: "Subject: ResuMatch AI - Let's connect: Senior Full-Stack Engineer\n\nDear Elena,\n\nI hope you're having a wonderful week!\n\nI am writing to thank you for applying to our Senior Full-Stack Engineer role. Our recruiting team reviewed your resume, and we are highly intrigued by your deep Node.js profiling and PostgreSQL optimization accomplishments.\n\nWe would love to schedule a quick 30-minute technical chat to dive into your background and discuss how your skills fit our stack.\n\nPlease let me know if you have some availability this Thursday at 10 AM or 3 PM CET.\n\nWarmly,\n\nSarah Jenkins\nEngineering Recruitment, ResuMatch AI Team",
      parsedSuccess: true
    },
    {
      id: "cand-3",
      name: "Marcus Chen",
      email: "m.chen@seattledev.net",
      phone: "+1 (206) 789-0123",
      fileName: "Marcus_Chen_Resume.pdf",
      fileSize: "210 KB",
      matchScore: 81,
      criteriaScores: [
        {
          name: "Technical Expertise & Architecture",
          score: 78,
          feedback: "Extensive background in systems architecture, but predominantly in Java and enterprise Spring Boot instead of modern React/Node ecosystem."
        },
        {
          name: "Practical Project Delivery",
          score: 85,
          feedback: "Managed huge infrastructure migrations for fortune 500 business units, demonstrating bulletproof project execution."
        },
        {
          name: "Leadership & Collaboration",
          score: 92,
          feedback: "Exceptional organizational leadership. Commanded technical standards across multiple cross-functional departments."
        },
        {
          name: "Education & Foundation",
          score: 80,
          feedback: "B.S. in Informatics from UW. Practical enterprise design pattern champion."
        }
      ],
      summary: "Marcus is an industry veteran with 12+ years of software architecture and developer leadership experience. He has spent the bulk of his career leading Java/Enterprise squads. While his systems-thinking and leadership are elite, his day-to-day familiarity with modern frontend SPA environments and Node microservices is relatively light.",
      strengths: [
        "12+ years of software engineering and robust architectural design leadership.",
        "Deep understanding of distributed messaging systems, transactional integrity, and horizontal scaling.",
        "Outstanding developer mentor, communicator, and process leader."
      ],
      weaknesses: [
        "Lacks deep modern production experience with Node.js/Express, preferring Java Spring Boot.",
        "React knowledge is high-level/conceptual; would require training on modern hook lifecycle and frontend build toolchains.",
        "No hands-on work with Tailwind CSS listed in his resume profiles."
      ],
      missingSkills: ["React", "Express", "Tailwind CSS"],
      recAction: "review",
      recNotes: "Highly seasoned architect who could level up our engineering culture, but lacks direct hands-on proficiency in our specific tech stack (React/Node). Human recruiter double-check advised to weigh enterprise value against training cost.",
      interviewQuestions: [
        "Given your deep experience in JVM architecture, how do you see yourself adapting to the single-threaded asynchronous nature of Node.js for high-throughput backends?",
        "What are your core principles when defining system boundaries in microservices architectures?",
        "Can you share an experience where you had to rapidly learn and deploy a system using an unfamiliar language or framework?"
      ],
      emailDraft: "Subject: ResuMatch AI - Application Status Update: Senior Full-Stack Engineer\n\nDear Marcus,\n\nThank you for taking the time to apply to our Senior Full-Stack Engineer position and for sharing your highly impressive career achievements with us.\n\nYour vast background in enterprise software design and systems architecture at scale is truly notable. Our engineering leadership team is currently conducting a detailed review of all applications to ensure the best alignment with our day-to-day React/TypeScript requirements.\n\nWe will update you within the next few business days regarding potential next steps. We appreciate your patience and interest in our work!\n\nBest regards,\n\nSarah Jenkins\nSenior Recruiter, ResuMatch AI Team",
      parsedSuccess: true
    },
    {
      id: "cand-4",
      name: "Sarah L. Miller",
      email: "sarah.miller@austincodes.dev",
      phone: "+1 (512) 345-6789",
      fileName: "Sarah_Miller_SDE.pdf",
      fileSize: "115 KB",
      matchScore: 71,
      criteriaScores: [
        {
          name: "Technical Expertise & Architecture",
          score: 75,
          feedback: "Good functional understanding of React hooks, CSS styling, and MongoDB/SQL tables, but lacks advanced architectural design modeling."
        },
        {
          name: "Practical Project Delivery",
          score: 70,
          feedback: "Has built and shipped single-page dashboards and simple CRUD websites, but limited experience scaling to large traffic loads."
        },
        {
          name: "Leadership & Collaboration",
          score: 65,
          feedback: "Great collaborative peer, but lacks experience leading code reviews, writing design specifications, or mentoring others."
        },
        {
          name: "Education & Foundation",
          score: 85,
          feedback: "Graduate of top-tier full-stack coding bootcamp with additional personal projects."
        }
      ],
      summary: "Sarah is a productive mid-level software engineer with 4 years of professional experience writing clean React apps and solid Node.js REST services. She is a reliable individual contributor, but lacks the high-level system design modeling, mentor leadership, and architectural experience required for a Senior Engineer role.",
      strengths: [
        "Strong visual eye and outstanding styling velocity with Tailwind CSS and CSS modules.",
        "Solid, responsive React UI component creation speed.",
        "Eager learner who shows great enthusiasm for modern development standards."
      ],
      weaknesses: [
        "Does not meet the 5+ years seniority requirement; lacks deep design authority.",
        "Limited experience with advanced database tuning, database normalization, or horizontal scaling.",
        "No containerization experience (Docker/Kubernetes) mentioned in work history."
      ],
      missingSkills: ["Docker", "System Design"],
      recAction: "reject",
      recNotes: "An excellent candidate for a Mid-Level SDE or frontend-specific role, but currently lacks the technical breadth, leadership experience, and scaling mastery expected of a Senior Full-Stack Engineer.",
      interviewQuestions: [
        "In your projects, how have you handled client-side performance issues like unnecessary components re-renders?",
        "Can you describe your experience writing SQL queries vs using ORM managers, and how you ensure queries run efficiently?"
      ],
      emailDraft: "Subject: ResuMatch AI - Application Status Update\n\nDear Sarah,\n\nThank you very much for your application for the Senior Full-Stack Engineer position and for your interest in our team. We truly appreciate the time and effort you invested in sharing your portfolio and credentials with us.\n\nWhile your experience in responsive React development and Tailwind CSS is highly impressive, we have decided to move forward with candidates whose backgrounds align more closely with the senior architectural scaling and system design requirements of this specific position.\n\nHowever, we were very fond of your coding portfolio and would love to keep your profile on file for future mid-level SDE or frontend developer openings. We wish you the absolute best in your career pursuits!\n\nSincerely,\n\nSarah Jenkins\nEngineering Recruitment, ResuMatch AI Team",
      parsedSuccess: true
    }
  ],

  // Senior Product Manager template demo candidates
  "Senior Product Manager (AI & Analytics)": [
    {
      id: "pm-cand-1",
      name: "Alex Rivera",
      email: "alex.rivera.pm@saasventures.com",
      phone: "+1 (415) 321-9876",
      fileName: "Alex_Rivera_AI_PM.pdf",
      fileSize: "168 KB",
      matchScore: 89,
      criteriaScores: [
        {
          name: "AI & Domain Knowledge",
          score: 85,
          feedback: "Strong conceptual understanding of LLM parameters, semantic search, and structured JSON outputs. Actively shipped AI copilots."
        },
        {
          name: "Product Strategy & execution",
          score: 92,
          feedback: "Elite roadmap prioritization. Shipped multiple 0-to-1 analytics charts and drove key metrics improvement."
        },
        {
          name: "Communication & User Empathy",
          score: 90,
          feedback: "Conducted dozens of customer focus sessions. Superb presenter to enterprise executive stakeholders."
        },
        {
          name: "Data & Analytical Mindset",
          score: 88,
          feedback: "Fluent in SQL query writing, running complex A/B search tests, and synthesizing user funnel metrics."
        }
      ],
      summary: "Alex is a high-performing Senior Product Manager with 5 years of experience managing B2B SaaS analytics suites. He spent the last two years successfully directing an intelligent feature squad, implementing smart automation assistants and conversational customer interfaces.",
      strengths: [
        "Strong product sense for balancing advanced AI tech potential with genuine customer simplicity.",
        "Proven track record managing highly technical dev teams and data scientists.",
        "Excellent data analysis credentials; queries Postgres database and monitors Mixpanel funnels independently."
      ],
      weaknesses: [
        "Does not possess a formal computer science degree (B.A. in Economics), though his practical technical PM skills are excellent.",
        "Has not managed predictive regression analytics models, primarily focusing on generative AI integrations."
      ],
      missingSkills: ["AI/ML Concepts"],
      recAction: "interview",
      recNotes: "A highly strategic and data-literate candidate who is ready to run our AI analytics dashboard initiative immediately. Highly recommended for hiring manager screening.",
      interviewQuestions: [
        "Can you share how you defined success metrics for the AI copilot feature you shipped, and how you iterated when initial adoption was low?",
        "How do you resolve conflict between engineering estimates and product timelines when launching complex, unpredictable AI search models?",
        "Walk us through a customer feedback insight that completely pivoted your product roadmap."
      ],
      emailDraft: "Subject: ResuMatch AI - Interview Invitation: Senior PM (AI & Analytics)\n\nDear Alex,\n\nThank you for applying for our Senior Product Manager (AI & Analytics) role.\n\nOur team was incredibly impressed by your background at SaaS Ventures, specifically your work driving 0-to-1 intelligent dashboards and your analytical rigor using SQL and direct customer feedback. This aligns perfectly with what we are building.\n\nWe would love to invite you to a 45-minute introductory interview to dive into your product methodology and introduce our product roadmap.\n\nCould you let me know if you have availability this Thursday or Friday morning?\n\nBest regards,\n\nSarah Jenkins\nProduct Recruiting, ResuMatch AI Team",
      parsedSuccess: true
    },
    {
      id: "pm-cand-2",
      name: "Priya Patel",
      email: "priya.patel.pm@analyticsinc.org",
      phone: "+1 (617) 543-2109",
      fileName: "Priya_Patel_Product.pdf",
      fileSize: "142 KB",
      matchScore: 74,
      criteriaScores: [
        {
          name: "AI & Domain Knowledge",
          score: 50,
          feedback: "Very limited exposure to generative AI integrations or semantic search. Mostly experienced with traditional numeric business intelligence."
        },
        {
          name: "Product Strategy & execution",
          score: 85,
          feedback: "Robust, disciplined agile practitioner. Consistently delivers enterprise dashboard widgets on-time with clean specs."
        },
        {
          name: "Communication & User Empathy",
          score: 80,
          feedback: "Strong client management and feedback aggregation. Excellent writing skills."
        },
        {
          name: "Data & Analytical Mindset",
          score: 95,
          feedback: "Exceptional analytical mastery. Hands-on SQL expert who builds her own custom database reports and data visualization widgets."
        }
      ],
      summary: "Priya is a Senior PM with 6 years of experience specializing in traditional enterprise business intelligence, dashboard widgets, and user analytics tools. She is highly analytical and data-driven, but has very little hands-on domain experience with LLMs, prompt engineering, or vector datasets.",
      strengths: [
        "Outstanding dashboard visual design and metric reporting strategy mastery.",
        "Elite SQL knowledge and data schema comprehension.",
        "Strong, reliable delivery track record in standard Agile environments."
      ],
      weaknesses: [
        "Major domain gap in Generative AI, embeddings, or LLM evaluation metrics.",
        "Has primarily worked in large corporate structures; may lack high-growth startup urgency."
      ],
      missingSkills: ["AI/ML Concepts"],
      recAction: "review",
      recNotes: "A world-class traditional BI analytics PM, but has noticeable gaps in active machine learning or LLM feature management. If our core priority is deep analytic reports first, she is viable, but otherwise lacks AI domain authority.",
      interviewQuestions: [
        "While your analytics and SQL credentials are elite, this role involves managing automated resume analysis using LLMs. How do you plan to get up to speed with prompt optimization, model evaluation, and safety grounding?",
        "Describe a complex data reporting feature you shipped that significantly increased user engagement on an analytical dashboard."
      ],
      emailDraft: "Subject: ResuMatch AI - Application Status Update: Senior PM\n\nDear Priya,\n\nThank you for taking the time to share your credentials and apply for our Senior Product Manager (AI & Analytics) position.\n\nOur product leadership team was highly impressed by your deep analytical expertise and your outstanding achievements shipping enterprise business intelligence tools. We are currently evaluating how the balance of our upcoming roadmap between traditional analytics and advanced machine learning models fits our prospective candidates.\n\nWe will reach out with a clear update early next week. Thank you for your interest and patience!\n\nBest wishes,\n\nSarah Jenkins\nProduct Recruiting, ResuMatch AI Team",
      parsedSuccess: true
    }
  ],

  // Growth Marketing Specialist template demo candidates
  "Growth Marketing Specialist": [
    {
      id: "mkt-cand-1",
      name: "Jordan Patel",
      email: "jordan.patel@growthmarketer.co",
      phone: "+1 (312) 654-3210",
      fileName: "Jordan_Patel_Growth.pdf",
      fileSize: "132 KB",
      matchScore: 92,
      criteriaScores: [
        {
          name: "Paid Acquisition & SEO",
          score: 94,
          feedback: "Demonstrated 3x ROI increase on Google Search ads while scaling budget. Shrunk CPC by 30% through strict keyword optimization."
        },
        {
          name: "Content & Copywriting",
          score: 90,
          feedback: "Wrote high-ranking blogs generating 50k monthly organic visits. Exceptional, creative copywriting styles."
        },
        {
          name: "Data-Driven Optimization",
          score: 92,
          feedback: "Managed rapid, high-velocity landing page A/B tests. Excellent tracking setup with Google Analytics and pixel triggers."
        },
        {
          name: "Tool Proficiency",
          score: 90,
          feedback: "Fluent in SEMRush, Ahrefs, Webflow, and automated campaign flows."
        }
      ],
      summary: "Jordan is an outstanding Growth Marketer with 4 years of proven SaaS customer acquisition experience. He excels at writing highly enticing ad copies, structuring high-ROI campaign frameworks, optimizing organic SEO rankings, and running high-cadence web conversion experiments.",
      strengths: [
        "Proven results scaling organic and paid search traffic profiles for high-growth SaaS tools.",
        "Deeply analytical approach to marketing; relies heavily on cohort data and conversion funnel science.",
        "Expert copywriter with a portfolio of high-performing email courses and active ad templates."
      ],
      weaknesses: [
        "Mainly focused on B2B SaaS acquisition; has less direct experience with consumer B2C viral growth loops.",
        "Does not have a background in graphic design or HTML/JS, requiring a developer's help for complex custom page elements."
      ],
      missingSkills: [],
      recAction: "shortlist",
      recNotes: "A highly competent, high-velocity growth specialist who lives and breathes acquisition metrics. He fits our marketing priorities perfectly and should be scheduled for interviews immediately.",
      interviewQuestions: [
        "Walk us through a successful Google Ads campaign you scaled. How did you structure the ad groups and optimize the landing page match?",
        "How do you approach keyword research and content mapping when competing against established incumbents with high domain authority?",
        "What are your core KPIs when evaluating the success of an automated email newsletter sequence?"
      ],
      emailDraft: "Subject: ResuMatch AI - Interview Invitation: Growth Marketing Specialist\n\nDear Jordan,\n\nThank you for applying to join our team as a Growth Marketing Specialist!\n\nOur marketing and growth squad has reviewed your application and was incredibly impressed by your track record scaling Google Ads campaigns and your quantitative approach to SEO keyword growth at your previous company.\n\nWe would love to invite you to a 30-minute introductory call to explore your background, discuss our growth goals, and share how our team operates.\n\nAre you available for a brief call this Wednesday at 2 PM or Thursday at 11 AM CST?\n\nWarm regards,\n\nSarah Jenkins\nGrowth Recruitment, ResuMatch AI Team",
      parsedSuccess: true
    }
  ],

  // Data Scientist & AI Engineer template demo candidates
  "Data Scientist & AI Engineer (Python & LLMs)": [
    {
      id: "ai-cand-1",
      name: "Dr. Aris Thorne",
      email: "aris.thorne@ai-research.org",
      phone: "+1 (617) 222-3344",
      fileName: "Dr_Aris_Thorne_AI_Resume.pdf",
      fileSize: "214 KB",
      matchScore: 96,
      criteriaScores: [
        {
          name: "AI/ML Modeling & Deep Learning",
          score: 98,
          feedback: "Incredible modeling depth. Shipped fine-tuned Mistral 7B models in production environments for complex classification trees."
        },
        {
          name: "System Integration & Prompt Engineering",
          score: 95,
          feedback: "Excellent integration expertise. Expertly constructed custom retrieval-augmented generation loops with vector data layers."
        },
        {
          name: "Data Engineering & SQL",
          score: 92,
          feedback: "Strong data handling capability. Wrote clean Apache Spark ETL tasks and scaled PGVector indexes efficiently."
        },
        {
          name: "Research & Foundational math",
          score: 100,
          feedback: "Ph.D. in Computer Science (focused on deep learning optimization) from MIT. Exceptionally strong mathematical and algorithmic grounds."
        }
      ],
      summary: "Dr. Aris Thorne is an exceptional AI Specialist and Data Scientist with over 6 years of industry experience post-Ph.D. He has published multiple papers on neural networks and actively transitioned high-impact academic modeling architectures into scalable, business-critical product environments.",
      strengths: [
        "Extensive experience fine-tuning open-source LLMs and building custom semantic index wrappers.",
        "Deep quantitative background with advanced statistics, probability, and neural net design models.",
        "Hands-on production proficiency with PyTorch, LlamaIndex, PGVector, and PostgreSQL schemas.",
        "Collaborated with core product developers to deliver intelligent classification pipelines on-time."
      ],
      weaknesses: [
        "Prefers research-backed, highly optimized model builds, which may sometimes conflict with fast-paced startup hacky timelines.",
        "Limited familiarity with client-side JavaScript structures (React, node), though Python fluency is elite."
      ],
      missingSkills: [],
      recAction: "shortlist",
      recNotes: "An absolute world-class AI engineering talent. Possesses a rare blend of deep statistical Ph.D. foundation and actual production-deployed engineering pragmatism. Strongly recommend immediate hiring-manager screening.",
      interviewQuestions: [
        "When fine-tuning the Mistral-7B model, what specific parameter optimization techniques (e.g. QLoRA vs full-parameter) did you employ, and how did you measure performance drift?",
        "Can you describe a situation where you had to balance the scientific accuracy of a model against server latency and hosting costs in production?",
        "How do you handle query performance bottlenecks when doing similarity searches across million-row vector indices?"
      ],
      emailDraft: "Subject: ResuMatch AI - Interview Invitation: Senior AI Engineer\n\nDear Dr. Thorne,\n\nThank you for applying for our Data Scientist & AI Engineer position. Our team at ResuMatch AI reviewed your credentials, and we are highly impressed by your MIT Ph.D. work and your practical experience deploying fine-tuned Mistral models in high-load production.\n\nYour research background combined with production-ready software engineering is precisely what we need as we transition our platform to custom, specialized models.\n\nWe would love to schedule a 45-minute introductory technical and product discussion with our VP of Engineering to walk through our upcoming goals and learn more about your research path.\n\nCould you let us know your availability for next Tuesday or Wednesday morning?\n\nWarm regards,\n\nSarah Jenkins\nEngineering Recruitment, ResuMatch AI Team",
      parsedSuccess: true
    },
    {
      id: "ai-cand-2",
      name: "Chloe Jenkins",
      email: "chloe.j.data@techspace.io",
      phone: "+1 (415) 888-9900",
      fileName: "Chloe_Jenkins_CV_Data.pdf",
      fileSize: "156 KB",
      matchScore: 84,
      criteriaScores: [
        {
          name: "AI/ML Modeling & Deep Learning",
          score: 80,
          feedback: "Competent with PyTorch and standard classifiers (XGBoost, Random Forest). Getting started with transformer fine-tuning models."
        },
        {
          name: "System Integration & Prompt Engineering",
          score: 88,
          feedback: "Great hands-on developer using LangChain and OpenAI endpoints. Highly skilled at writing structured prompts and JSON-schema parsers."
        },
        {
          name: "Data Engineering & SQL",
          score: 90,
          feedback: "Outstanding data pipeline skills. Strong SQL optimizer, fluent in Pandas data cleaning and Postgres schema design."
        },
        {
          name: "Research & Foundational math",
          score: 75,
          feedback: "B.S. in Applied Mathematics. Good statistical foundation but lacks advanced specialized AI research depth."
        }
      ],
      summary: "Chloe is a highly competent Data Scientist and AI Integrator with 4 years of professional experience. She is highly proficient in Python, SQL databases, and constructing smart LLM application wrappers using LangChain. She leans more towards engineering and data pipelining than deep neural-net training.",
      strengths: [
        "Excellent Python developer with strong skills in Pandas, Scikit-Learn, and LlamaIndex integrations.",
        "A SQL expert who easily manages data prep pipelines and database cleanings.",
        "Very fast iteration speed on prompt engineering and structured LLM responses."
      ],
      weaknesses: [
        "Less hands-on experience training or fine-tuning models locally; has primarily relied on API endpoints.",
        "Does not possess an advanced research degree (Ph.D./M.S. in CS), though practical application speed is high."
      ],
      missingSkills: ["Model Fine-tuning"],
      recAction: "interview",
      recNotes: "An excellent practical developer for our AI pipelines. While she isn't a deep neural research scientist, her software craftsmanship and API wiring velocity are highly valuable for shipping customer-facing features.",
      interviewQuestions: [
        "You've built several pipelines using LangChain. What are the main challenges you've faced with chain reliability, and how did you resolve them?",
        "How do you structure validation tests for prompt outputs to ensure they adhere to strict JSON schemas under edge cases?",
        "Walk us through your workflow for cleaning a messy, unannotated dataset for training or evaluation."
      ],
      emailDraft: "Subject: ResuMatch AI - Interview Invitation: AI Developer\n\nDear Chloe,\n\nThank you for applying for our Data Scientist & AI Engineer role!\n\nOur team reviewed your resume and was highly intrigued by your practical experience with LangChain pipelines and your strong SQL data-engineering skills. We think your hands-on approach to connecting LLM APIs to production databases fits our active feature roadmap perfectly.\n\nWe would love to invite you to a 30-minute chat to discuss our platform tech stack and learn more about your recent project achievements.\n\nAre you available next Thursday at 11 AM or 2 PM PST?\n\nBest regards,\n\nSarah Jenkins\nEngineering Recruitment, ResuMatch AI Team",
      parsedSuccess: true
    }
  ],

  // UI/UX Product Designer template demo candidates
  "UI/UX Product Designer (Figma & Design Systems)": [
    {
      id: "ux-cand-1",
      name: "Maya Lin",
      email: "maya.lin.design@creativepixel.com",
      phone: "+1 (512) 444-5566",
      fileName: "Maya_Lin_Design_Portfolio.pdf",
      fileSize: "320 KB",
      matchScore: 94,
      criteriaScores: [
        {
          name: "Interaction Design & Visual Craft",
          score: 96,
          feedback: "Stellar visual execution. Beautiful grid structures, gorgeous type hierarchies, and extremely thoughtful, smooth micro-interactions."
        },
        {
          name: "User Research & Testing",
          score: 90,
          feedback: "Conducted multiple quantitative customer surveys and moderated usability sessions, synthesizing insights into clean journey maps."
        },
        {
          name: "Design Systems & Collaboration",
          score: 98,
          feedback: "Exceptional design system advocate. Built and maintained modular Figma libraries with tokenized colors, spaces, and responsive components."
        },
        {
          name: "Frontend Code Familiarity",
          score: 85,
          feedback: "Very comfortable writing HTML and basic CSS/Tailwind classes, making developer handoff exceptionally seamless."
        }
      ],
      summary: "Maya is a brilliant, highly collaborative Mid-to-Senior UI/UX Product Designer with 5 years of professional SaaS experience. She excels at translating complex, data-heavy user workflows into simple, beautiful, and accessible interfaces. She is a design system expert with deep knowledge of Figma and WCAG accessibility guidelines.",
      strengths: [
        "Elite layout design skills, specializing in complex analytical SaaS dashboards.",
        "Experienced in launching and scaling shared multi-product Figma design libraries.",
        "Outstanding communication skills, easily facilitating technical handoffs to developers.",
        "Strong user advocacy backed by structured qualitative user testing and analytics."
      ],
      weaknesses: [
        "Most of her background is in B2B web applications; has relatively lighter experience designing native iOS or Android apps.",
        "Lacks experience with 3D graphic rendering (Spline/three.js), focusing purely on clean flat vector layouts."
      ],
      missingSkills: [],
      recAction: "shortlist",
      recNotes: "A pristine portfolio and perfect skills match. Her deep expertise establishing design systems and simplifying complex layouts is exactly what our dashboard interfaces require. Schedule for a portfolio review immediately.",
      interviewQuestions: [
        "In your portfolio, you showed a major overhaul of an analytical dashboard. What was your process for identifying user friction points, and how did you measure the design's success?",
        "Can you describe your methodology for structuring design tokens and maintaining consistency between Figma libraries and production Tailwind configurations?",
        "How do you navigate situations where developer constraints prevent the implementation of your ideal interaction flow?"
      ],
      emailDraft: "Subject: ResuMatch AI - Portfolio Review: Product Designer\n\nDear Maya,\n\nThank you for applying to join our team as a UI/UX Product Designer! We reviewed your application and were absolutely blown away by your design portfolio, particularly your work scaling complex enterprise Figma systems and your meticulous attention to typographic hierarchy.\n\nYour design system philosophy aligns perfectly with our front-end architecture, and we'd love to learn more about your creative process.\n\nWe would like to invite you to a 45-minute portfolio review with our Design and Engineering leads next week to walk through one of your favorite product case studies.\n\nCould you let us know which of these slots works best for you?\n\n- Next Tuesday at 2:00 PM CST\n- Next Wednesday at 10:00 AM CST\n\nLooking forward to talking!\n\nBest regards,\n\nSarah Jenkins\nDesign Recruitment, ResuMatch AI Team",
      parsedSuccess: true
    },
    {
      id: "ux-cand-2",
      name: "Thomas Wright",
      email: "t.wright.visuals@gmail.com",
      phone: "+1 (206) 333-4455",
      fileName: "Thomas_Wright_Visual_CV.pdf",
      fileSize: "280 KB",
      matchScore: 78,
      criteriaScores: [
        {
          name: "Interaction Design & Visual Craft",
          score: 85,
          feedback: "Great illustrative skills and eye-catching branding. Excellent presentation graphics. However, slightly less disciplined with dense grid alignment."
        },
        {
          name: "User Research & Testing",
          score: 70,
          feedback: "Capable of running simple usability polls, but has not driven comprehensive qualitative user study cohorts independently."
        },
        {
          name: "Design Systems & Collaboration",
          score: 80,
          feedback: "Familiar with utilizing Figma templates and basic components, but lacks experience architecting complex nested components from scratch."
        },
        {
          name: "Frontend Code Familiarity",
          score: 72,
          feedback: "High-level understanding of web limitations, but does not write or read HTML/CSS code directly."
        }
      ],
      summary: "Thomas is a creative Product and Visual Designer with 3 years of experience. He is highly skilled at branding, graphic asset creation, marketing layouts, and designing clean landing pages. While his aesthetic eye is strong, he has less experience designing dense, interactive SaaS data applications.",
      strengths: [
        "Exceptional illustrative talent, great at custom icons, branding guides, and high-impact hero screens.",
        "Extremely fast at creating high-fidelity interactive visual concepts in Figma.",
        "Very collaborative team player with high creative energy."
      ],
      weaknesses: [
        "Slightly lighter experience handling multi-state transactional forms or highly complex data table dashboards.",
        "Lacks deep web accessibility audit experience (WCAG compliance metrics)."
      ],
      missingSkills: ["Design Systems", "Web Accessibility"],
      recAction: "review",
      recNotes: "Thomas is a highly creative visual talent with excellent branding skills, but has clear gaps in enterprise design systems and structured user research methodologies. He'd be phenomenal for a visual brand designer role, but might require supervision on deep SaaS application layouts.",
      interviewQuestions: [
        "Could you walk us through a design project where you had to prioritize web accessibility (e.g., color contrast, screen reader compatibility) and how it influenced your choices?",
        "When designing a complex workflow, how do you map out state changes (e.g. empty states, error triggers, loading indicators) for developers?"
      ],
      emailDraft: "Subject: ResuMatch AI - Application Status: Product Designer\n\nDear Thomas,\n\nThank you for applying to join our team as a UI/UX Product Designer and for sharing your beautiful visual design portfolio with us.\n\nOur design leadership squad was very impressed by your graphic craftsmanship, custom illustration assets, and clean branding work. We are currently reviewing how the balance of our upcoming tasks between brand design and deep interactive SaaS metrics dashboards matches our candidates' expertise.\n\nWe will reach out with a final update early next week. Thank you again for your time and creative passion!\n\nWarmly,\n\nSarah Jenkins\nDesign Recruitment, ResuMatch AI Team",
      parsedSuccess: true
    }
  ],

  // Technical Customer Success Lead template demo candidates
  "Technical Customer Success Lead": [
    {
      id: "cs-cand-1",
      name: "Samir Al-Fayed",
      email: "samir.alfayed@successlabs.com",
      phone: "+1 (415) 555-1122",
      fileName: "Samir_Al_Fayed_CS_Resume.pdf",
      fileSize: "148 KB",
      matchScore: 91,
      criteriaScores: [
        {
          name: "Technical Support & Troubleshooting",
          score: 95,
          feedback: "Elite technical diagnostics. Fluent in Chrome DevTools inspection, analyzing REST API payloads, and writing PostgreSQL diagnostic queries."
        },
        {
          name: "Onboarding & Relationship Building",
          score: 90,
          feedback: "Managed 20+ high-value enterprise accounts, consistently maintaining a 98% net retention rate and shortening onboarding by 40%."
        },
        {
          name: "Team Mentorship & Operations",
          score: 88,
          feedback: "Successfully ran the Zendesk escalation channel and developed standard internal troubleshooting guides for Tier-1 support."
        },
        {
          name: "Product Feedback loop",
          score: 92,
          feedback: "Excellent analytical translator. Effectively tagged support trends to provide engineers with clear reproduction scripts for bugs."
        }
      ],
      summary: "Samir is a highly technical and analytical Customer Success Lead with over 5 years of professional experience in SaaS environments. He stands out due to his strong troubleshooting capabilities—frequently analyzing network requests, inspecting APIs, and querying customer databases directly to solve high-tier escalations without developer help.",
      strengths: [
        "Unusually high technical aptitude for CS: understands basic web architectures, REST APIs, and database lookups.",
        "Proven results managing high-value enterprise customer relationships and driving product adoption.",
        "Strong operational metrics tracker (Net Retention, CSAT, SLA times) with direct Zendesk setup experience.",
        "Clear, calm, and incredibly polished written and verbal communicator."
      ],
      weaknesses: [
        "Has primarily worked with business clients (B2B SaaS); has limited experience in high-volume, transactional B2C customer support.",
        "No formal programming certifications, though hands-on technical diagnostic skills are elite."
      ],
      missingSkills: [],
      recAction: "shortlist",
      recNotes: "A phenomenal customer success talent. His outstanding technical curiosity and capability to debug API queries independently make him the perfect CS lead for a highly technical developer platform. Schedule for direct panel screening immediately.",
      interviewQuestions: [
        "Can you share an experience where an enterprise customer was frustrated by a critical backend bug? How did you manage the client's expectations while helping developers reproduce the issue?",
        "Walk us through how you inspect a network request payload in Chrome Developer Tools when investigating a client-reported integration error.",
        "What are your core strategies for onboarding an enterprise team to ensure rapid adoption and high long-term account retention?"
      ],
      emailDraft: "Subject: ResuMatch AI - Interview Invitation: Customer Success Lead\n\nDear Samir,\n\nThank you for applying to join our squad as a Technical Customer Success Lead!\n\nOur customer operations team reviewed your credentials and was incredibly impressed by your background, particularly your 98% net account retention rate and your impressive ability to debug REST APIs and query customer databases independently. Finding a CS leader with such strong technical analytical skills is rare and highly exciting for us.\n\nWe would love to invite you to a 35-minute introductory Zoom discussion with our Head of Operations to explore your customer management methodology and share our product roadmap.\n\nWould you have some availability next Wednesday or Thursday afternoon for a chat?\n\nBest regards,\n\nSarah Jenkins\nOperations Recruitment, ResuMatch AI Team",
      parsedSuccess: true
    },
    {
      id: "cs-cand-2",
      name: "Rachel Green",
      email: "rachel.green@fashionplaza.com",
      phone: "+1 (212) 777-8899",
      fileName: "Rachel_Green_CS_CV.pdf",
      fileSize: "124 KB",
      matchScore: 72,
      criteriaScores: [
        {
          name: "Technical Support & Troubleshooting",
          score: 55,
          feedback: "Very limited technical background. Needs developer assistance for simple web issues or API setups. Not familiar with SQL databases."
        },
        {
          name: "Onboarding & Relationship Building",
          score: 88,
          feedback: "Extremely welcoming and warm relationship manager. Guided account setups beautifully for non-technical customer squads."
        },
        {
          name: "Team Mentorship & Operations",
          score: 75,
          feedback: "Great coworker and active mentor, but less experience structuring support ticketing queues or establishing strict SLAs."
        },
        {
          name: "Product Feedback loop",
          score: 80,
          feedback: "Passionate advocate for the user, summarizing customer wishes into high-level descriptive feature suggestions."
        }
      ],
      summary: "Rachel is an energetic and highly empathetic Customer Success Manager with 3 years of experience. She excels at customer relationship management, running onboarding training webinars, and driving account satisfaction. However, she has a very low level of technical troubleshooting capability, which makes highly technical SaaS escalations difficult for her.",
      strengths: [
        "Incredibly empathetic, warm, and engaging customer champion.",
        "Excellent presentation skills, comfortable leading webinars and onboarding training for 50+ clients.",
        "High motivation to support customers and build long-term trust relationships."
      ],
      weaknesses: [
        "Major technical skills gap: uncomfortable inspecting logs, reading API specs, or querying database tables.",
        "Limited experience with complex integration setups (SSO, Webhooks, custom APIs)."
      ],
      missingSkills: ["API Troubleshooting"],
      recAction: "review",
      recNotes: "Rachel is an outstanding relationship manager with fantastic customer empathy, perfect for non-technical SaaS applications. However, since our platform involves complex technical APIs and developer screens, her technical support gap might require excessive developer support. Advise human review to weigh client communication value against tech constraints.",
      interviewQuestions: [
        "If a customer reports that their automated webhook integration is failing, what steps do you take to gather relevant details before escalating to engineering?",
        "Can you share a time when you successfully saved a customer account that was on the verge of churning? What was your approach?"
      ],
      emailDraft: "Subject: ResuMatch AI - Application Update: Customer Success Lead\n\nDear Rachel,\n\nThank you for taking the time to share your career accomplishments and apply for our Customer Success Lead role.\n\nOur hiring team was highly impressed by your warm customer relationship experience and your outstanding successes running group training webinars. We are currently analyzing the technical escalations balance of our upcoming CS goals, particularly regarding complex API lookups and developer tools setups.\n\nWe will update you with a clear decision by early next week. Thank you again for your interest in our team!\n\nWarmly,\n\nSarah Jenkins\nOperations Recruitment, ResuMatch AI Team",
      parsedSuccess: true
    }
  ],
  "Junior Full-Stack Developer (React & Node)": [
    {
      id: "jr-cand-1",
      name: "Liam Carter",
      email: "liam.carter.dev@gmail.com",
      phone: "+1 (555) 345-6789",
      fileName: "Liam_Carter_Resume.pdf",
      fileSize: "115 KB",
      matchScore: 90,
      criteriaScores: [
        {
          name: "Technical Aptitude & Fundamentals",
          score: 92,
          feedback: "Impressive understanding of core JavaScript, React hooks, asynchronous requests, and state management principles. Well-versed in Node.js basics."
        },
        {
          name: "Personal Projects & Practical Building",
          score: 95,
          feedback: "Showcases two outstanding personal full-stack projects: a collaborative kanban board and a real-time chat app. Pristine GitHub documentation."
        },
        {
          name: "Coachability & Growth Mindset",
          score: 90,
          feedback: "Extremely eager to learn. Active open-source contributor and regular hackathon participant. Shows high code craft curiosity."
        },
        {
          name: "Collaboration & Communication",
          score: 85,
          feedback: "Articulate and friendly speaker. Explains code and architecture trade-offs with humbleness and exceptional clarity."
        }
      ],
      summary: "Liam is an outstanding entry-level developer with highly advanced personal projects in React and Node.js. Despite having 0 years of professional corporate experience, his technical aptitude, clean coding patterns, and self-motivated growth mindset make him a premium candidate for our junior position.",
      strengths: [
        "Highly polished personal full-stack projects using React, Node.js, and Tailwind CSS.",
        "Solid conceptual grasp of modern JavaScript, asynchronous operations, and Git flows.",
        "Exceptional hunger for mentorship and technical skills expansion."
      ],
      weaknesses: [
        "Lacks corporate full-cycle software release pipeline experience.",
        "Limited exposure to complex enterprise databases (such as highly-scaled production PostgreSQL)."
      ],
      missingSkills: [],
      recAction: "shortlist",
      recNotes: "Liam is an absolute standout junior candidate. His personal projects rival the work of mid-level engineers. Highly recommend shortlisting for immediate technical interview.",
      interviewQuestions: [
        "In your collaborative kanban board project, how did you handle data synchronization across multiple active client screens?",
        "What is your approach when you encounter a complex bug in an unfamiliar library or package?"
      ],
      emailDraft: "Subject: ResuMatch AI - Interview Invitation: Junior Developer\n\nDear Liam,\n\nThank you for applying for the Junior Full-Stack Developer position at our company. We reviewed your portfolio and resume with great excitement!\n\nYour personal projects (especially the collaborative kanban board) show phenomenal React and Node.js fundamentals and a solid self-taught software craft. We would love to invite you to a 30-minute introductory Google Meet conversation with our lead frontend engineer to discuss your projects and career aspirations.\n\nPlease let us know your availability for this week!\n\nBest regards,\n\nSarah Jenkins\nEngineering Recruitment Team",
      parsedSuccess: true
    },
    {
      id: "jr-cand-2",
      name: "Chloe Jenkins",
      email: "chloe.j.design@outlook.com",
      phone: "+1 (555) 456-7890",
      fileName: "Chloe_Jenkins_CV.pdf",
      fileSize: "98 KB",
      matchScore: 48,
      criteriaScores: [
        {
          name: "Technical Aptitude & Fundamentals",
          score: 45,
          feedback: "Very limited coding background. Familiar with basic HTML/CSS, but does not know modern React, TypeScript, or backend server concepts."
        },
        {
          name: "Personal Projects & Practical Building",
          score: 50,
          feedback: "Projects are limited to static web page designs and simple landing page clones without dynamic client/server logic."
        },
        {
          name: "Coachability & Growth Mindset",
          score: 65,
          feedback: "Enthusiastic and eager to enter the field, but currently lacks foundational training or intensive programming practice."
        },
        {
          name: "Collaboration & Communication",
          score: 80,
          feedback: "Brilliant, warm communicator with a strong background in graphic and visual design layouts."
        }
      ],
      summary: "Chloe is an aspiring web designer who is eager to transition into development. However, she currently lacks the React, TypeScript, and Node.js engineering basics required for this Junior Full-Stack Developer position.",
      strengths: [
        "Great visual and graphic design sense.",
        "Excellent communication skills and highly collaborative personality."
      ],
      weaknesses: [
        "Severe technical skills gap in React, TypeScript, state managers, and Node.js.",
        "No experience building full-stack applications or dealing with APIs."
      ],
      missingSkills: ["React", "TypeScript", "Node.js", "Express", "Git"],
      recAction: "reject",
      recNotes: "Chloe has a fantastic visual design eye, but doesn't meet the baseline coding requirements for this developer role. She would be an excellent fit for a Web Designer or UI designer role instead.",
      interviewQuestions: [
        "Are there any projects where you connected a web interface to a database or a third-party API? How did you build it?"
      ],
      emailDraft: "Subject: ResuMatch AI - Application Status Update\n\nDear Chloe,\n\nThank you very much for your interest in our Junior Full-Stack Developer role and for sharing your resume with us.\n\nWhile we loved your visual layout skills and warm presentation, our team is currently looking for a candidate who already possesses core coding foundations in React and Node.js to hit the ground running. Therefore, we cannot move forward with your application for this specific engineering role.\n\nWe would love to keep your contact information on file for any future visual web design or junior UI/UX designer roles that open up in our company. We wish you the absolute best in your career journey!\n\nWarmly,\n\nSarah Jenkins\nEngineering Recruitment Team",
      parsedSuccess: true
    }
  ],
  "Software Quality Assurance (SQA) Engineer": [
    {
      id: "qa-cand-1",
      name: "Marcus Chen",
      email: "marcus.chen.qa@testpro.net",
      phone: "+1 (555) 567-8901",
      fileName: "Marcus_Chen_QA_Resume.pdf",
      fileSize: "135 KB",
      matchScore: 94,
      criteriaScores: [
        {
          name: "Technical Testing & Automation",
          score: 95,
          feedback: "Elite skills in automation scripting using Cypress and Jest. Excellent REST API validation using Postman and Newman runners."
        },
        {
          name: "Test Planning & Execution",
          score: 92,
          feedback: "Proven ability to map business stories into thorough test scenarios, including complex edge cases and security validations."
        },
        {
          name: "Defect Resolution & Reports",
          score: 95,
          feedback: "Creates outstanding bug reports with precise reproduction steps, video captures, terminal logs, and suggested database fixes."
        },
        {
          name: "Agile QA Mindset",
          score: 90,
          feedback: "Deep experience with Agile methodologies, leading QA efforts in sprints, and automating testing triggers inside CI/CD pipelines."
        }
      ],
      summary: "Marcus is an elite SQA Automation Engineer with 3 years of experience building scalable Cypress test suites and ensuring pristine product quality. His expertise in TypeScript, Jest, API testing, and continuous integration pipelines perfectly aligns with our QA requirements.",
      strengths: [
        "Advanced automation suite development with Cypress, Playwright, and Jest.",
        "Deep expertise in REST API testing, mocking, and Postman collection runs.",
        "Excellent bug documentation and developer collaboration habits."
      ],
      weaknesses: [
        "Limited experience with mobile app automated testing (Appium) or load testing tools."
      ],
      missingSkills: ["Selenium"],
      recAction: "shortlist",
      recNotes: "Marcus is a phenomenal mid-level QA engineer who will instantly automate our manual regression processes. Highly recommend moving to immediate technical screening.",
      interviewQuestions: [
        "How do you design your test automation code to prevent flaky tests and keep execution times low?",
        "Describe how you integrate automated Cypress test suites into a GitHub Actions CI/CD deployment pipeline."
      ],
      emailDraft: "Subject: ResuMatch AI - Interview Invitation: QA Engineer\n\nDear Marcus,\n\nThank you for applying for our SQA Engineer position! Your resume and experience building Cypress automation suites caught the eyes of our engineering team immediately.\n\nWe are highly impressed by your robust approach to test coverage and continuous integration. We would love to schedule a 30-minute introductory phone interview with our QA Lead to discuss your testing philosophy and experience.\n\nPlease let us know your availability this week!\n\nBest regards,\n\nSarah Jenkins\nQA Hiring Squad",
      parsedSuccess: true
    },
    {
      id: "qa-cand-2",
      name: "Priya Patel",
      email: "priya.patel.qa@gmail.com",
      phone: "+1 (555) 678-9012",
      fileName: "Priya_Patel_CV.pdf",
      fileSize: "121 KB",
      matchScore: 75,
      criteriaScores: [
        {
          name: "Technical Testing & Automation",
          score: 60,
          feedback: "Strong manual tester, but automation skills are limited to basic, recorded Selenium scripts. Just starting to learn Cypress and JavaScript coding."
        },
        {
          name: "Test Planning & Execution",
          score: 90,
          feedback: "Superb coverage analysis. Extremely methodical at exploring edge cases, security permissions, and validating data synchronization."
        },
        {
          name: "Defect Resolution & Reports",
          score: 85,
          feedback: "Writes high-quality, reproducible bug tickets in Jira. Highly supportive of developers during fast debugging sessions."
        },
        {
          name: "Agile QA Mindset",
          score: 80,
          feedback: "Familiar with Scrum routines, active participant in backlog grooming, and an excellent quality advocate."
        }
      ],
      summary: "Priya is a detail-oriented SQA Specialist with 4 years of manual testing and test planning experience. She has outstanding exploration habits and bug tracking skills, but currently has a technical gap in writing automated code-based test scripts.",
      strengths: [
        "Meticulous manual exploratory testing and outstanding test plan writing.",
        "Exceptional communication, documentation, and user advocacy habits.",
        "Strong understanding of product workflows and data inputs."
      ],
      weaknesses: [
        "Lacks hands-on programming experience (JavaScript/TypeScript) for custom test automation.",
        "No direct experience setting up tests inside CI/CD deployment pipelines."
      ],
      missingSkills: ["Cypress", "Jest"],
      recAction: "interview",
      recNotes: "Priya is a world-class manual QA and test planner. If our team has senior QA engineers who can write automation code, she would be a wonderful team addition to focus on test scenarios and product quality. Recommend initial interview.",
      interviewQuestions: [
        "Can you describe your experience testing REST APIs manually? What tools do you use and what responses do you validate?",
        "What resources or courses are you currently using to expand your automated test scripting skills?"
      ],
      emailDraft: "Subject: ResuMatch AI - SQA Application Update\n\nDear Priya,\n\nThank you for applying for the Software Quality Assurance (SQA) Engineer position. We truly appreciate you sharing your credentials and accomplishments with our hiring team.\n\nYour methodical approach to test coverage and edge-case design is highly impressive. While our active goals require a strong emphasis on automation scripts (Cypress/Jest), we are very interested in your manual exploration mastery and would love to have a brief 20-minute chat to learn more about your background.\n\nPlease let us know if you are free for a quick call this week!\n\nWarmly,\n\nSarah Jenkins\nQA Hiring Squad",
      parsedSuccess: true
    }
  ],
  "Data Analyst (Product & Operations)": [
    {
      id: "da-cand-1",
      name: "Sophia Martinez",
      email: "sophia.martinez.data@analytix.com",
      phone: "+1 (555) 789-0123",
      fileName: "Sophia_Martinez_Data_Analyst.pdf",
      fileSize: "128 KB",
      matchScore: 96,
      criteriaScores: [
        {
          name: "SQL & Query Building",
          score: 98,
          feedback: "Excellent capability writing complex SQL queries using window functions, complex joins, and aggregations. Very optimization-conscious."
        },
        {
          name: "Data Visualization & Reporting",
          score: 95,
          feedback: "Mastery of Tableau and Power BI. Focuses deeply on design simplicity, responsive actions, and actionable KPIs for leadership."
        },
        {
          name: "Analytical Thinking & A/B Tests",
          score: 95,
          feedback: "Exceptional background running product experiment groups, evaluating statistical significance, and tracking cohort conversion funnels."
        },
        {
          name: "Business Acumen & Alignment",
          score: 92,
          feedback: "Trained in translating metrics into clear business proposals. Helped previous team increase user conversion by 14%."
        }
      ],
      summary: "Sophia is an exceptional Data Analyst with 3 years of experience running product experiment groups and building real-time dashboard reports in B2B SaaS environments. Her advanced SQL mastery, Python data scripting, and deep analytics capability perfectly align with our requirements.",
      strengths: [
        "Advanced SQL query building and database normalization concepts.",
        "Proven experience designing intuitive, executive-ready Tableau and Power BI reports.",
        "Strong scripting background in Python (Pandas, Numpy) and statistical validation."
      ],
      weaknesses: [
        "Limited experience with high-volume real-time data streaming technologies (Kafka, Spark)."
      ],
      missingSkills: [],
      recAction: "shortlist",
      recNotes: "Sophia is a premium, top-tier candidate who has direct experience solving the precise product analytics and A/B testing problems we face. Hire immediately.",
      interviewQuestions: [
        "Can you describe a time when an A/B test result was statistically ambiguous? How did you present your findings to the product squad?",
        "How do you approach optimizing a slow-running SQL query that joins multiple high-velocity transaction tables?"
      ],
      emailDraft: "Subject: ResuMatch AI - Interview Invitation: Data Analyst\n\nDear Sophia,\n\nThank you for applying for the Data Analyst (Product & Operations) position. We reviewed your profile and were incredibly excited by your experience running product experiments and building Tableau dashboards.\n\nYour success boosting conversions by 14% at your previous company perfectly aligns with our immediate team goals. We would love to invite you to a 30-minute Google Meet conversation with our Director of Product to learn more about your analytic style.\n\nPlease share your availability for this week!\n\nBest regards,\n\nSarah Jenkins\nProduct & Analytics Hiring Team",
      parsedSuccess: true
    },
    {
      id: "da-cand-2",
      name: "Tyler Vance",
      email: "tyler.vance94@hotmail.com",
      phone: "+1 (555) 890-1234",
      fileName: "Tyler_Vance_Resume.pdf",
      fileSize: "110 KB",
      matchScore: 62,
      criteriaScores: [
        {
          name: "SQL & Query Building",
          score: 45,
          feedback: "Basic SQL knowledge (SELECT, simple WHERE filters). Lacks experience with complex window functions, aggregations, or CTEs."
        },
        {
          name: "Data Visualization & Reporting",
          score: 80,
          feedback: "Fantastic mastery of Microsoft Excel reporting, pivoting, and charts. Moderate, self-taught dashboard building in Power BI."
        },
        {
          name: "Analytical Thinking & A/B Tests",
          score: 65,
          feedback: "Familiar with digital tracking and conversion funnels, but has limited experience structuring statistical A/B tests or cohort models."
        },
        {
          name: "Business Acumen & Alignment",
          score: 75,
          feedback: "Solid business background with strong verbal explanation skills. Detail-oriented and highly organized."
        }
      ],
      summary: "Tyler is an organized and competent Business Analyst with strong Excel-based reporting skills. While he excels at administrative data curation, he currently lacks the advanced SQL query and Python-based data modeling required for our Product & Operations Data Analyst role.",
      strengths: [
        "Elite Microsoft Excel skills (VLOOKUP, Pivots, Macros, complex logic formulas).",
        "Excellent communication and highly organized operational management."
      ],
      weaknesses: [
        "Significant technical gaps in intermediate-to-advanced SQL querying.",
        "No experience with programming languages like Python or R for data analysis."
      ],
      missingSkills: ["SQL", "Python", "A/B Testing"],
      recAction: "reject",
      recNotes: "Tyler has great business operations skills but lacks the database and coding foundations required for our product analytics platform. Best suited for an Operations Analyst or Excel-based Business Planner role.",
      interviewQuestions: [
        "Can you describe your experience with databases? Have you ever written queries with multiple table joins, and if so, how did you handle them?"
      ],
      emailDraft: "Subject: ResuMatch AI - Data Analyst Application Update\n\nDear Tyler,\n\nThank you for applying for the Data Analyst (Product & Operations) position at our company. We appreciate you sharing your accomplishments and your strong Excel reporting background with us.\n\nWhile we were highly impressed by your expert spreadsheets and organized business tracking, our current roadmap requires an analyst with advanced hands-on SQL and Python engineering skills to query raw databases directly. Therefore, we cannot move forward with your application for this specific technical role.\n\nWe will retain your details in our system for any future Business Operations or spreadsheet-heavy planning opportunities. We wish you the absolute best in your future endeavors!\n\nWarmly,\n\nSarah Jenkins\nProduct & Analytics Hiring Team",
      parsedSuccess: true
    }
  ]
};
