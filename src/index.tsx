import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  const html = `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sandeep Kommineni — AI/ML Engineer & Full-Stack Developer</title>
<meta name="description" content="Sandeep Kommineni — AI/ML Engineer building production-grade AI platforms. Expert in Generative AI, LLMs, real-time systems, and full-stack development.">
<meta property="og:title" content="Sandeep Kommineni — AI/ML Engineer">
<meta property="og:description" content="Building production-grade AI platforms. Expert in GenAI, LLMs, and full-stack development.">
<meta property="og:image" content="/static/profile.jpg">
<meta property="og:type" content="website">
<link rel="icon" type="image/svg+xml" href="/static/favicon.svg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.1/css/all.min.css" rel="stylesheet">
<link href="/static/style.css" rel="stylesheet">
</head>
<body>

<!-- Canvas for particle background -->
<canvas id="particleCanvas"></canvas>
<div class="noise"></div>
<div class="blob blob-1"></div>
<div class="blob blob-2"></div>
<div class="spotlight" id="spotlight"></div>

<!-- Navigation -->
<nav class="nav" id="nav">
  <div class="nav-container">
    <a href="#" class="nav-logo">
      <span class="logo-icon">SK</span>
      <span class="logo-text">Sandeep Kommineni<span class="logo-dot">.</span></span>
    </a>
    <div class="nav-links" id="navLinks">
      <a href="#about" class="nav-link">About</a>
      <a href="#experience" class="nav-link">Experience</a>
      <a href="#work" class="nav-link">Work</a>
      <a href="#projects" class="nav-link">Projects</a>
      <a href="#skills" class="nav-link">Skills</a>
      <a href="#certifications" class="nav-link">Credentials</a>
      <a href="#contact" class="nav-link">Contact</a>
    </div>
    <div class="nav-right">
      <button class="theme-btn" id="themeBtn" aria-label="Toggle theme">
        <i class="fas fa-moon" id="themeIcon"></i>
      </button>
      <a href="#contact" class="nav-cta">Let's Talk</a>
      <button class="burger" id="burger" aria-label="Menu">
        <span></span><span></span>
      </button>
    </div>
  </div>
</nav>

<!-- Mobile Menu -->
<div class="mobile-nav" id="mobileNav">
  <a href="#about" class="mobile-link">About</a>
  <a href="#experience" class="mobile-link">Experience</a>
  <a href="#work" class="mobile-link">Production Work</a>
  <a href="#projects" class="mobile-link">Projects</a>
  <a href="#skills" class="mobile-link">Skills</a>
  <a href="#certifications" class="mobile-link">Credentials</a>
  <a href="#contact" class="mobile-link">Contact</a>
  <div class="mobile-socials">
    <a href="https://github.com/SANDEEPxKOMMINENI" target="_blank"><i class="fab fa-github"></i></a>
    <a href="https://www.linkedin.com/in/sandeep-chowdary-kommineni/" target="_blank"><i class="fab fa-linkedin"></i></a>
    <a href="mailto:sandeepkommineni2@gmail.com"><i class="fas fa-envelope"></i></a>
  </div>
</div>

<!-- ==================== HERO ==================== -->
<section class="hero" id="hero">
  <div class="hero-container">

    <!-- Profile photo with rings -->
    <div class="hero-photo-wrap reveal-up">
      <div class="photo-ring"></div>
      <div class="photo-ring ring-2"></div>
      <div class="photo-glow"></div>
            <img src="/static/profile.jpg" alt="Sandeep Kommineni" class="hero-photo" loading="eager">
    </div>

    <div class="hero-eyebrow reveal-up d1">
      <div class="status-dot"></div>
      <span>Available for opportunities</span>
    </div>

    <h1 class="hero-headline reveal-up d2">
      Hi, I'm <span class="text-gradient" id="scrambleText">Sandeep Kommineni.</span>
    </h1>

    <p class="hero-tagline reveal-up d3">
      <span class="typewriter" id="typewriter"></span>
    </p>

    <p class="hero-sub reveal-up d4">
      Building production-grade AI platforms at <strong>TruGen.AI</strong> and <strong>MoveLogic.ai</strong>.<br>
      Expert in Generative AI, LLMs, real-time systems, and scalable full-stack applications.
    </p>

    <div class="hero-actions reveal-up d5">
      <a href="#work" class="btn-primary">
        View My Work
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17l9.2-9.2M7 7h10v10"/></svg>
      </a>
      <a href="https://drive.google.com/file/d/1-_a8XWPrCqR7NvVfdMBV8ragr2U8BfjX/view?usp=sharing" target="_blank" class="btn-outline">
        <i class="fas fa-file-text"></i> Resume
      </a>
      <a href="https://github.com/SANDEEPxKOMMINENI" target="_blank" class="btn-outline">
        <i class="fab fa-github"></i> GitHub
      </a>
    </div>

    <div class="hero-metrics reveal-up d5">
      <div class="metric">
        <span class="metric-value" data-count="3">0</span>
        <span class="metric-label">Production Apps</span>
      </div>
      <div class="metric-divider"></div>
      <div class="metric">
        <span class="metric-value" data-count="350">0</span>
        <span class="metric-label">GitHub Commits/yr</span>
      </div>
      <div class="metric-divider"></div>
      <div class="metric">
        <span class="metric-value" data-count="7">0</span>
        <span class="metric-label">Certifications</span>
      </div>
      <div class="metric-divider"></div>
      <div class="metric">
        <span class="metric-value special" data-count="6" data-suffix="th">0</span>
        <span class="metric-label">IIT Hackathon</span>
      </div>
    </div>
  </div>
</section>

<!-- Tech Marquee -->
<div class="marquee-wrap">
  <div class="marquee-track">
    <span>Generative AI</span><span class="marquee-dot">&bull;</span>
    <span>LLMs</span><span class="marquee-dot">&bull;</span>
    <span>React</span><span class="marquee-dot">&bull;</span>
    <span>Next.js</span><span class="marquee-dot">&bull;</span>
    <span>Python</span><span class="marquee-dot">&bull;</span>
    <span>FastAPI</span><span class="marquee-dot">&bull;</span>
    <span>AWS</span><span class="marquee-dot">&bull;</span>
    <span>LiveKit</span><span class="marquee-dot">&bull;</span>
    <span>OpenAI</span><span class="marquee-dot">&bull;</span>
    <span>RAG</span><span class="marquee-dot">&bull;</span>
    <span>Agentic AI</span><span class="marquee-dot">&bull;</span>
    <span>TypeScript</span><span class="marquee-dot">&bull;</span>
    <span>Docker</span><span class="marquee-dot">&bull;</span>
    <span>Transformers</span><span class="marquee-dot">&bull;</span>
    <span>Computer Vision</span><span class="marquee-dot">&bull;</span>
    <span>NLP</span><span class="marquee-dot">&bull;</span>
    <span>Generative AI</span><span class="marquee-dot">&bull;</span>
    <span>LLMs</span><span class="marquee-dot">&bull;</span>
    <span>React</span><span class="marquee-dot">&bull;</span>
    <span>Next.js</span><span class="marquee-dot">&bull;</span>
    <span>Python</span><span class="marquee-dot">&bull;</span>
    <span>FastAPI</span><span class="marquee-dot">&bull;</span>
    <span>AWS</span><span class="marquee-dot">&bull;</span>
    <span>LiveKit</span><span class="marquee-dot">&bull;</span>
    <span>OpenAI</span><span class="marquee-dot">&bull;</span>
    <span>RAG</span><span class="marquee-dot">&bull;</span>
    <span>Agentic AI</span><span class="marquee-dot">&bull;</span>
    <span>TypeScript</span><span class="marquee-dot">&bull;</span>
  </div>
</div>

<!-- ==================== ABOUT ME ==================== -->
<section class="section" id="about">
  <div class="section-container">
    <div class="section-label reveal-up">About Me</div>
    <h2 class="section-heading reveal-up d1">
      Passionate about building<br><span class="text-gradient">AI that ships.</span>
    </h2>

    <div class="about-layout">
      <div class="about-photo-col reveal-up">
        <div class="about-photo-card">
          <img src="/static/profile.jpg" alt="Sandeep Kommineni" class="about-photo">
          <div class="about-name-card">
            <strong>Sandeep Kommineni</strong>
            <span>AI/ML Engineer</span>
            <div class="about-socials">
              <a href="https://github.com/SANDEEPxKOMMINENI" target="_blank" aria-label="GitHub"><i class="fab fa-github"></i></a>
              <a href="https://www.linkedin.com/in/sandeep-chowdary-kommineni/" target="_blank" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
              <a href="mailto:sandeepkommineni2@gmail.com" aria-label="Email"><i class="fas fa-envelope"></i></a>
            </div>
          </div>
        </div>
      </div>

      <div class="about-text-col">
        <p class="about-para reveal-up">
          I'm an <strong>AI/ML Engineer</strong> with real-world experience building and deploying production-grade AI platforms. Currently contributing to <strong>TruGen.AI</strong> — a multimodal conversational AI platform — at Truviz.AI, where I work on AI workflows, system architecture, and real-time features using LiveKit and advanced LLMs.
        </p>
        <p class="about-para reveal-up">
          Previously, I built core features for <strong>MoveLogic.ai</strong> — an AI-powered logistics SaaS serving 1000+ users — at Isoft Technologies. I've also done AI/ML research at <strong>KL University</strong>, developing domain-specific generative AI models and intelligent agent prototypes.
        </p>
        <p class="about-para reveal-up">
          I'm a <strong>final-year B.Tech student</strong> specializing in AI/ML at KL University (CGPA: 9.0), with 7 industry certifications from AWS, Oracle, Salesforce, and GitHub. Ranked <strong>6th out of 4,500+</strong> at IIT Convolve 3.0 hackathon.
        </p>
        <p class="about-para reveal-up">
          My interests span Generative AI, LLMs, Prompt Engineering, RAG, Agentic AI, and applied ML — always focused on building things that real people use.
        </p>

        <div class="about-quick reveal-up">
          <div class="quick-item">
            <i class="fas fa-map-marker-alt"></i>
            <span>Hyderabad, Telangana, India &bull; Open to relocation</span>
          </div>
          <div class="quick-item">
            <i class="fas fa-graduation-cap"></i>
            <span>B.Tech CSE (AI/ML), KL University &bull; 9.0 CGPA</span>
          </div>
          <div class="quick-item">
            <i class="fas fa-envelope"></i>
            <span>sandeepkommineni2@gmail.com</span>
          </div>
          <div class="quick-item">
            <i class="fas fa-phone"></i>
            <span>+91 9573456001</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ==================== EXPERIENCE ==================== -->
<section class="section section-alt" id="experience">
  <div class="section-container">
    <div class="section-label reveal-up">Experience</div>
    <h2 class="section-heading reveal-up d1">
      Where I've<br><span class="text-gradient">made impact.</span>
    </h2>

    <!-- Timeline wrapper -->
    <div class="exp-timeline">

      <!-- Truviz -->
      <div class="exp-card reveal-up" data-tilt>
        <div class="exp-timeline-dot current"></div>
        <div class="exp-header">
          <div class="exp-company-info">
            <div class="exp-icon" style="background: linear-gradient(135deg, #6366f1, #8b5cf6);">
              <i class="fas fa-brain"></i>
            </div>
            <div>
              <h3 class="exp-company">Truviz.AI (TruGen.AI)</h3>
              <p class="exp-role">AI/ML Engineer</p>
            </div>
          </div>
          <div class="exp-meta-right">
            <span class="exp-badge">Current</span>
            <span class="exp-date">Jan 2026 — Present</span>
            <span class="exp-loc"><i class="fas fa-map-marker-alt"></i> Remote</span>
          </div>
        </div>
        <ul class="exp-list">
          <li>Contributed to TruGen.AI platform development, focusing on AI workflows, system architecture, and real-world product delivery</li>
          <li>Conducted comprehensive end-to-end testing of live platform, identifying & resolving bugs, performance bottlenecks, and UX issues</li>
          <li>Explored & evaluated LiveKit for real-time communication and multimodal AI integration in production environment</li>
        </ul>
        <div class="exp-tags">
          <span>LiveKit</span><span>OpenAI</span><span>Groq</span><span>Agentic AI</span><span>WebRTC</span><span>Cloud</span>
        </div>
      </div>

      <!-- KL University — Undergraduate Research -->
      <div class="exp-card reveal-up" data-tilt>
        <div class="exp-timeline-dot"></div>
        <div class="exp-header">
          <div class="exp-company-info">
            <div class="exp-icon" style="background: linear-gradient(135deg, #06b6d4, #3b82f6);">
              <i class="fas fa-flask"></i>
            </div>
            <div>
              <h3 class="exp-company">KL University</h3>
              <p class="exp-role">Undergraduate Research Assistant</p>
            </div>
          </div>
          <div class="exp-meta-right">
            <span class="exp-date">Jun 2025 — Jan 2026</span>
            <span class="exp-loc"><i class="fas fa-map-marker-alt"></i> Guntur, India</span>
          </div>
        </div>
        <ul class="exp-list">
          <li>Advanced research in Generative AI and LLMs, developing domain-specific models and intelligent agent prototypes</li>
          <li>Experimented with open-source frameworks, fine-tuning for efficiency, scalability, and interpretability</li>
          <li>Collaborated on machine learning, NLP, and human-AI interaction projects with faculty and peers</li>
        </ul>
        <div class="exp-tags">
          <span>Generative AI</span><span>LLMs</span><span>Fine-tuning</span><span>NLP</span><span>Research</span>
        </div>
      </div>

      <!-- Isoft Technologies (MoveLogic.ai) -->
      <div class="exp-card reveal-up" data-tilt>
        <div class="exp-timeline-dot"></div>
        <div class="exp-header">
          <div class="exp-company-info">
            <div class="exp-icon" style="background: linear-gradient(135deg, #10b981, #059669);">
              <i class="fas fa-truck"></i>
            </div>
            <div>
              <h3 class="exp-company">Isoft Technologies (MoveLogic.ai)</h3>
              <p class="exp-role">Full-Stack AI Developer Intern</p>
            </div>
          </div>
          <div class="exp-meta-right">
            <span class="exp-date">Mar 2025 — Jun 2025</span>
            <span class="exp-loc"><i class="fas fa-map-marker-alt"></i> Remote / Auckland, NZ</span>
          </div>
        </div>
        <ul class="exp-list">
          <li>Developed AI-powered web application using Next.js and FastAPI, integrating machine learning models for production</li>
          <li>Built scalable backend with databases, REST APIs, and cloud platforms, enabling real-time predictions</li>
          <li>Deployed production-ready system with 98% uptime and optimized performance for live users</li>
        </ul>
        <div class="exp-tags">
          <span>Next.js</span><span>FastAPI</span><span>Python</span><span>ML</span><span>Cloud</span><span>REST APIs</span>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- ==================== PRODUCTION WORK ==================== -->
<section class="section" id="work">
  <div class="section-container">
    <div class="section-label reveal-up">Industry Projects</div>
    <h2 class="section-heading reveal-up d1">
      Live platforms I've<br><span class="text-gradient">shipped.</span>
    </h2>
    <p class="section-sub reveal-up d2">Real products in production, serving real users — not just code on GitHub.</p>

    <div class="featured-projects">

      <div class="featured-card reveal-up" data-tilt>
        <div class="featured-visual" style="background: linear-gradient(135deg, #6366f1 0%, #a78bfa 100%);">
          <div class="featured-icon"><i class="fas fa-comments"></i></div>
          <div class="featured-badges">
            <span class="f-badge live-badge"><span class="live-dot"></span> Live</span>
            <span class="f-badge">@ Truviz.AI</span>
          </div>
        </div>
        <div class="featured-body">
          <div class="featured-top">
            <span class="featured-label">Company Product &bull; 2026</span>
            <h3>TruGen.AI</h3>
            <p class="featured-subtitle">Multimodal Conversational AI Platform</p>
          </div>
          <p>Real-time multimodal AI system built with LiveKit, OpenAI, Groq, and cloud infrastructure. Features agentic & context-aware AI capabilities for advanced conversational agents. Currently in active development as an AI/ML Engineer.</p>
          <div class="featured-tags">
            <span>LiveKit</span><span>OpenAI</span><span>Groq</span><span>Multimodal AI</span><span>Agentic AI</span><span>Cloud</span>
          </div>
          <div class="featured-links">
            <a href="https://TruGen.AI" target="_blank" class="f-link-primary"><i class="fas fa-external-link-alt"></i> Visit TruGen.AI</a>
          </div>
        </div>
      </div>

      <div class="featured-card featured-reverse reveal-up" data-tilt>
        <div class="featured-visual" style="background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%);">
          <div class="featured-icon"><i class="fas fa-truck-moving"></i></div>
          <div class="featured-badges">
            <span class="f-badge live-badge"><span class="live-dot"></span> Live</span>
            <span class="f-badge">@ Isoft Technologies</span>
            <span class="f-badge">1000+ Users</span>
          </div>
        </div>
        <div class="featured-body">
          <div class="featured-top">
            <span class="featured-label">Company Product &bull; 2025</span>
            <h3>MoveLogic.ai</h3>
            <p class="featured-subtitle">AI-Powered Moving Logistics SaaS</p>
          </div>
          <p>Full-stack AI platform with Next.js, FastAPI, computer vision, and automation logic. Engineered core features, built scalable backend, and deployed production-ready system with 98% uptime serving 1000+ active users.</p>
          <div class="featured-tags">
            <span>Next.js</span><span>FastAPI</span><span>Computer Vision</span><span>Python</span><span>Cloud</span><span>REST APIs</span>
          </div>
          <div class="featured-links">
            <a href="https://movelogic.ai" target="_blank" class="f-link-primary"><i class="fas fa-external-link-alt"></i> Visit MoveLogic.ai</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ==================== PERSONAL PROJECTS ==================== -->
<section class="section section-alt" id="projects">
  <div class="section-container">
    <div class="section-label reveal-up">Personal Projects</div>
    <h2 class="section-heading reveal-up d1">
      Things I've built<br><span class="text-gradient">on my own.</span>
    </h2>

    <div class="project-grid-header reveal-up">
      <div class="filter-pills">
        <button class="pill active" data-filter="all">All</button>
        <button class="pill" data-filter="ai">AI / ML</button>
        <button class="pill" data-filter="fullstack">Full-Stack</button>
        <button class="pill" data-filter="hackathon">Hackathon</button>
      </div>
    </div>

    <div class="project-grid">

      <article class="proj-card reveal-up" data-cat="ai fullstack" data-tilt>
        <div class="proj-top">
          <div class="proj-icon" style="color:#6366f1;"><i class="fas fa-robot"></i></div>
          <div class="proj-links-top">
            <a href="https://san-vortex-ai.netlify.app/" target="_blank" title="Live Demo"><i class="fas fa-external-link-alt"></i></a>
            <a href="https://github.com/SANDEEPxKOMMINENI/San_Vortex_Ai" target="_blank" title="GitHub"><i class="fab fa-github"></i></a>
          </div>
        </div>
        <h4>San Vortex AI</h4>
        <p>Multi-model AI chat platform with 50+ models. Supabase auth, folder organization, theme customization, and media uploads.</p>
        <div class="proj-tags"><span>React</span><span>Supabase</span><span>OpenRouter</span><span>GenAI</span></div>
      </article>

      <article class="proj-card reveal-up" data-cat="ai fullstack" data-tilt>
        <div class="proj-top">
          <div class="proj-icon" style="color:#06b6d4;"><i class="fas fa-language"></i></div>
          <div class="proj-links-top">
            <a href="https://github.com/SANDEEPxKOMMINENI/AI-LinguaSync" target="_blank"><i class="fab fa-github"></i></a>
          </div>
        </div>
        <h4>AI-LinguaSync</h4>
        <p>Real-time AI voice translation across 12+ languages with TTS, speaker recognition, and cross-platform support.</p>
        <div class="proj-tags"><span>AI/ML</span><span>NLP</span><span>TTS</span><span>Python</span></div>
      </article>

      <article class="proj-card reveal-up" data-cat="ai" data-tilt>
        <div class="proj-top">
          <div class="proj-icon" style="color:#f59e0b;"><i class="fas fa-file-pdf"></i></div>
          <div class="proj-links-top">
            <a href="https://github.com/SANDEEPxKOMMINENI/askdocs-ai" target="_blank"><i class="fab fa-github"></i></a>
          </div>
        </div>
        <h4>AskDocs AI</h4>
        <p>Intelligent document assistant with semantic search, smart Q&A with source citations, powered by cutting-edge NLP.</p>
        <div class="proj-tags"><span>RAG</span><span>NLP</span><span>LLM</span><span>Semantic Search</span></div>
      </article>

      <article class="proj-card reveal-up" data-cat="ai" data-tilt>
        <div class="proj-top">
          <div class="proj-icon" style="color:#10b981;"><i class="fas fa-chart-line"></i></div>
          <div class="proj-links-top">
            <a href="https://github.com/SANDEEPxKOMMINENI/Stock-Analysis" target="_blank"><i class="fab fa-github"></i></a>
          </div>
        </div>
        <h4>Stock Analysis (Informer)</h4>
        <p>Transformer-based stock prediction using Informer architecture for time-series forecasting with Gradio UI and HuggingFace export.</p>
        <div class="proj-tags"><span>Transformer</span><span>Deep Learning</span><span>Gradio</span></div>
      </article>

      <article class="proj-card reveal-up" data-cat="ai hackathon" data-tilt>
        <div class="proj-top">
          <div class="proj-icon" style="color:#eab308;"><i class="fas fa-trophy"></i></div>
          <div class="proj-links-top">
            <a href="https://github.com/SANDEEPxKOMMINENI/IIT-Guwahati-AIML-Second-Round" target="_blank"><i class="fab fa-github"></i></a>
          </div>
        </div>
        <h4>IIT Convolve 3.0 — Rank #6</h4>
        <p>Email open-rate prediction ML system. Ranked 6th out of 4,500+ participants at IIT Guwahati AIML Hackathon.</p>
        <div class="proj-tags"><span>ML</span><span>Python</span><span>Feature Eng.</span></div>
      </article>

      <article class="proj-card reveal-up" data-cat="ai hackathon" data-tilt>
        <div class="proj-top">
          <div class="proj-icon" style="color:#f97316;"><i class="fab fa-amazon"></i></div>
          <div class="proj-links-top">
            <a href="https://github.com/SANDEEPxKOMMINENI/amazon_ml_2024-challenge" target="_blank"><i class="fab fa-github"></i></a>
          </div>
        </div>
        <h4>Amazon ML Challenge 2024</h4>
        <p>Image feature extraction + LightGBM pipeline for product entity prediction from large-scale e-commerce datasets.</p>
        <div class="proj-tags"><span>Computer Vision</span><span>LightGBM</span><span>Deep Learning</span></div>
      </article>

      <article class="proj-card reveal-up" data-cat="fullstack" data-tilt>
        <div class="proj-top">
          <div class="proj-icon" style="color:#ec4899;"><i class="fas fa-play-circle"></i></div>
          <div class="proj-links-top">
            <a href="https://animerador.netlify.app/" target="_blank"><i class="fas fa-external-link-alt"></i></a>
          </div>
        </div>
        <h4>AnimeRadar</h4>
        <p>Anime discovery & streaming platform with ML-powered recommendations, adaptive streaming, and responsive dark-mode UI.</p>
        <div class="proj-tags"><span>React</span><span>Node.js</span><span>MongoDB</span><span>ML</span></div>
      </article>

      <article class="proj-card reveal-up" data-cat="ai" data-tilt>
        <div class="proj-top">
          <div class="proj-icon" style="color:#14b8a6;"><i class="fas fa-sitemap"></i></div>
          <div class="proj-links-top">
            <a href="https://github.com/SANDEEPxKOMMINENI/Scaffolding_Agent" target="_blank"><i class="fab fa-github"></i></a>
          </div>
        </div>
        <h4>Scaffolding Agent</h4>
        <p>AI-powered smart scaffolding tool generating optimized project structures based on tech stack requirements.</p>
        <div class="proj-tags"><span>AI Agents</span><span>LLM</span><span>Python</span></div>
      </article>

      <article class="proj-card reveal-up" data-cat="fullstack" data-tilt>
        <div class="proj-top">
          <div class="proj-icon" style="color:#f43f5e;"><i class="fas fa-link"></i></div>
          <div class="proj-links-top">
            <a href="https://github.com/SANDEEPxKOMMINENI/url-redirection-using-aws-lambda-dynamodb-and-apigateway" target="_blank"><i class="fab fa-github"></i></a>
          </div>
        </div>
        <h4>AWS Serverless URL Shortener</h4>
        <p>Modern URL shortener with React, TypeScript, AWS Lambda, DynamoDB, and API Gateway. Instant shortening with serverless architecture.</p>
        <div class="proj-tags"><span>AWS Lambda</span><span>DynamoDB</span><span>React</span><span>TypeScript</span></div>
      </article>

      <article class="proj-card reveal-up" data-cat="fullstack" data-tilt>
        <div class="proj-top">
          <div class="proj-icon" style="color:#84cc16;"><i class="fas fa-clipboard-list"></i></div>
          <div class="proj-links-top">
            <a href="https://movelogic-ai-form.netlify.app/" target="_blank"><i class="fas fa-external-link-alt"></i></a>
            <a href="https://github.com/SANDEEPxKOMMINENI/movelogic-form" target="_blank"><i class="fab fa-github"></i></a>
          </div>
        </div>
        <h4>MoveLogic Form</h4>
        <p>Multi-step moving inventory form built for MoveLogic.ai interview. React + Supabase + Zustand with pixel-perfect design.</p>
        <div class="proj-tags"><span>React</span><span>Supabase</span><span>Zustand</span></div>
      </article>

      <article class="proj-card reveal-up" data-cat="fullstack" data-tilt>
        <div class="proj-top">
          <div class="proj-icon" style="color:#22c55e;"><i class="fas fa-leaf"></i></div>
          <div class="proj-links-top">
            <a href="https://github.com/SANDEEPxKOMMINENI/Sustainable-Living-Education" target="_blank"><i class="fab fa-github"></i></a>
          </div>
        </div>
        <h4>Sustainable Living Platform</h4>
        <p>Comprehensive web platform promoting sustainable living with educational resources and data visualization tools.</p>
        <div class="proj-tags"><span>React</span><span>Express</span><span>Firebase</span></div>
      </article>

    </div>
  </div>
</section>

<!-- ==================== SKILLS ==================== -->
<section class="section" id="skills">
  <div class="section-container">
    <div class="section-label reveal-up">Skills</div>
    <h2 class="section-heading reveal-up d1">
      Technical<br><span class="text-gradient">expertise.</span>
    </h2>

    <div class="skills-grid">
      <div class="skill-block reveal-up" data-tilt>
        <div class="skill-header">
          <div class="skill-icon"><i class="fas fa-brain"></i></div>
          <h3>AI & ML</h3>
        </div>
        <div class="skill-chips">
          <span>Generative AI</span><span>LLMs</span><span>OpenAI API</span><span>Groq</span>
          <span>RAG</span><span>Multimodal AI</span><span>Deep Learning</span><span>NLP</span>
          <span>Computer Vision</span><span>Fine-tuning</span><span>Data Science</span>
        </div>
      </div>

      <div class="skill-block reveal-up" data-tilt>
        <div class="skill-header">
          <div class="skill-icon"><i class="fas fa-bolt"></i></div>
          <h3>Real-time & Conversational</h3>
        </div>
        <div class="skill-chips">
          <span>LiveKit</span><span>WebRTC</span><span>Speech-to-Text</span>
          <span>Text-to-Speech</span><span>Agentic AI</span><span>Transformers</span>
        </div>
      </div>

      <div class="skill-block reveal-up" data-tilt>
        <div class="skill-header">
          <div class="skill-icon"><i class="fas fa-code"></i></div>
          <h3>Full-Stack</h3>
        </div>
        <div class="skill-chips">
          <span>React</span><span>Next.js</span><span>Node.js</span><span>Python</span>
          <span>FastAPI</span><span>TypeScript</span><span>JavaScript</span><span>REST APIs</span>
          <span>Java</span><span>Tailwind CSS</span>
        </div>
      </div>

      <div class="skill-block reveal-up" data-tilt>
        <div class="skill-header">
          <div class="skill-icon"><i class="fas fa-cloud"></i></div>
          <h3>Cloud & Infrastructure</h3>
        </div>
        <div class="skill-chips">
          <span>AWS</span><span>Azure</span><span>GCP</span><span>Docker</span>
          <span>CI/CD</span><span>Real-time Inference</span><span>Supabase</span>
          <span>Firebase</span><span>MongoDB</span><span>DynamoDB</span>
        </div>
      </div>

      <div class="skill-block reveal-up" data-tilt>
        <div class="skill-header">
          <div class="skill-icon"><i class="fas fa-wand-magic-sparkles"></i></div>
          <h3>AI Tools & APIs</h3>
        </div>
        <div class="skill-chips">
          <span>OpenAI</span><span>Google Gemini</span><span>Anthropic Claude</span>
          <span>OpenRouter</span><span>HuggingFace</span><span>LangChain</span>
          <span>LightGBM</span><span>Gradio</span><span>n8n</span>
        </div>
      </div>

      <div class="skill-block reveal-up" data-tilt>
        <div class="skill-header">
          <div class="skill-icon"><i class="fas fa-vial"></i></div>
          <h3>Testing & Quality</h3>
        </div>
        <div class="skill-chips">
          <span>E2E Testing</span><span>Debugging</span><span>Exploratory QA</span>
          <span>Performance Optimization</span><span>Git/GitHub</span><span>System Design</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ==================== OPEN SOURCE ==================== -->
<section class="section section-alt" id="opensource">
  <div class="section-container">
    <div class="section-label reveal-up">Open Source</div>
    <h2 class="section-heading reveal-up d1">
      Community<br><span class="text-gradient">contributions.</span>
    </h2>
    <div class="os-stats reveal-up">
      <div class="os-stat">
        <div class="os-stat-value">350+</div>
        <div class="os-stat-label">Commits / Year</div>
      </div>
      <div class="os-stat">
        <div class="os-stat-value">2</div>
        <div class="os-stat-label">Major Contributions</div>
      </div>
    </div>
    <div class="os-cards">
      <a href="https://github.com/n8n-io/n8n" target="_blank" class="os-card reveal-up" data-tilt>
        <div class="os-card-icon"><i class="fas fa-project-diagram"></i></div>
        <div class="os-card-info">
          <h4>n8n</h4>
          <p>Workflow orchestration automations — contributed to the open-source workflow automation platform</p>
        </div>
        <i class="fas fa-arrow-up-right-from-square os-card-arrow"></i>
      </a>
      <a href="https://github.com/mendableai/firecrawl" target="_blank" class="os-card reveal-up" data-tilt>
        <div class="os-card-icon"><i class="fas fa-fire"></i></div>
        <div class="os-card-info">
          <h4>Firecrawl</h4>
          <p>LLM-powered data pipelines — contributed to intelligent web crawling for AI applications</p>
        </div>
        <i class="fas fa-arrow-up-right-from-square os-card-arrow"></i>
      </a>
    </div>
    <!-- GitHub contribution graph placeholder -->
    <div class="github-embed reveal-up">
      <img src="https://ghchart.rshah.org/6366f1/SANDEEPxKOMMINENI" alt="Sandeep's GitHub Contribution Graph" class="github-graph" loading="lazy">
    </div>
  </div>
</section>

<!-- ==================== CERTIFICATIONS ==================== -->
<section class="section" id="certifications">
  <div class="section-container">
    <div class="section-label reveal-up">Credentials</div>
    <h2 class="section-heading reveal-up d1">
      Industry<br><span class="text-gradient">certified.</span>
    </h2>

    <div class="certs-grid">
      <div class="cert-item reveal-up" data-tilt>
        <div class="cert-icon"><i class="fab fa-aws"></i></div>
        <div class="cert-info">
          <h4>AWS Cloud Practitioner</h4>
          <span>Amazon Web Services &bull; 2024–2027</span>
        </div>
        <a href="https://drive.google.com/file/d/1T7DKd0PekARgeUCDnHt3oroFTMUzFoj5/view?usp=sharing" target="_blank" class="cert-view"><i class="fas fa-arrow-up-right-from-square"></i></a>
      </div>
      <div class="cert-item reveal-up" data-tilt>
        <div class="cert-icon"><i class="fas fa-cloud"></i></div>
        <div class="cert-info">
          <h4>OCI Architect Associate</h4>
          <span>Oracle &bull; 2025–2028</span>
        </div>
        <a href="https://drive.google.com/file/d/1teGaotHcjOpdqRU7RJS4rwZBGidbeOWa/view?usp=sharing" target="_blank" class="cert-view"><i class="fas fa-arrow-up-right-from-square"></i></a>
      </div>
      <div class="cert-item reveal-up" data-tilt>
        <div class="cert-icon"><i class="fas fa-microchip"></i></div>
        <div class="cert-info">
          <h4>OCI AI Foundations Associate</h4>
          <span>Oracle &bull; 2025–2028</span>
        </div>
        <a href="https://drive.google.com/file/d/1t51xfBT_0-yfwV7_-HmzK_JEX4pCGyMa/view?usp=sharing" target="_blank" class="cert-view"><i class="fas fa-arrow-up-right-from-square"></i></a>
      </div>
      <div class="cert-item reveal-up" data-tilt>
        <div class="cert-icon"><i class="fab fa-salesforce"></i></div>
        <div class="cert-info">
          <h4>Salesforce AI Associate</h4>
          <span>Salesforce &bull; 2024–2027</span>
        </div>
        <a href="https://drive.google.com/file/d/1qVV4Z0PPHPe0VI1h_GSKCxmSa9JuY4YZ/view?usp=sharing" target="_blank" class="cert-view"><i class="fas fa-arrow-up-right-from-square"></i></a>
      </div>
      <div class="cert-item reveal-up" data-tilt>
        <div class="cert-icon"><i class="fab fa-github"></i></div>
        <div class="cert-info">
          <h4>GitHub Foundations</h4>
          <span>GitHub &bull; 2025–2028</span>
        </div>
        <a href="https://drive.google.com/file/d/1HEhn7S0fIuqUVg6dRxutCRRRQEMDdOvS/view?usp=sharing" target="_blank" class="cert-view"><i class="fas fa-arrow-up-right-from-square"></i></a>
      </div>
      <div class="cert-item reveal-up" data-tilt>
        <div class="cert-icon"><i class="fas fa-robot"></i></div>
        <div class="cert-info">
          <h4>Automation Essentials Professional</h4>
          <span>Automation Anywhere &bull; 2025–2028</span>
        </div>
        <a href="https://drive.google.com/file/d/1BqLjdQCOK8Z4rpkE9K4k-B_Bi3VBbSwB/view?usp=sharing" target="_blank" class="cert-view"><i class="fas fa-arrow-up-right-from-square"></i></a>
      </div>
      <div class="cert-item reveal-up" data-tilt>
        <div class="cert-icon"><i class="fab fa-java"></i></div>
        <div class="cert-info">
          <h4>Java Full Stack — Digital Skills</h4>
          <span>TalentNext (Wipro) &bull; 2024</span>
        </div>
        <a href="https://drive.google.com/file/d/1VNF4LbROBZIycB-QWPGNrwXPRcGuht4I/view?usp=sharing" target="_blank" class="cert-view"><i class="fas fa-arrow-up-right-from-square"></i></a>
      </div>
    </div>
  </div>
</section>

<!-- ==================== EDUCATION ==================== -->
<section class="section section-alt" id="education">
  <div class="section-container">
    <div class="section-label reveal-up">Education</div>
    <h2 class="section-heading reveal-up d1">
      Academic<br><span class="text-gradient">foundation.</span>
    </h2>
    <div class="edu-list">
      <div class="edu-item reveal-up">
        <div class="edu-year">Mar 2022 — Mar 2026</div>
        <div class="edu-content">
          <h3>KL University</h3>
          <p class="edu-degree">B.Tech — Computer Science & Engineering (Specialization: AI & ML)</p>
          <p class="edu-detail">CGPA: 9.0/10 &bull; Top 15% ranking &bull; Vaddeswaram, Andhra Pradesh</p>
        </div>
      </div>
      <div class="edu-item reveal-up">
        <div class="edu-year">2020 — 2022</div>
        <div class="edu-content">
          <h3>Sri Chaitanya Junior College</h3>
          <p class="edu-degree">Senior Secondary Education (12th Grade, HSC — PCM)</p>
          <p class="edu-detail">CPI: 7.3/10 &bull; Lakshmipuram, Guntur, Andhra Pradesh</p>
        </div>
      </div>
      <div class="edu-item reveal-up">
        <div class="edu-year">2019 — 2020</div>
        <div class="edu-content">
          <h3>Bhashyam IIT Main Campus</h3>
          <p class="edu-degree">Secondary Education (10th Grade, SSC — AP Board)</p>
          <p class="edu-detail">CPI: 9.8/10 &bull; Lakshmipuram, Guntur, Andhra Pradesh</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ==================== CONTACT ==================== -->
<section class="section" id="contact">
  <div class="section-container contact-section">
    <div class="section-label reveal-up">Contact</div>
    <h2 class="section-heading reveal-up d1">
      Let's build<br><span class="text-gradient">something great.</span>
    </h2>
    <p class="contact-desc reveal-up d2">
      Open to full-time roles, freelance projects, and research collaborations.<br>
      Feel free to reach out — I'd love to chat.
    </p>
    <div class="contact-cards">
      <a href="mailto:sandeepkommineni2@gmail.com" class="contact-card reveal-up">
        <i class="fas fa-envelope"></i>
        <span>sandeepkommineni2@gmail.com</span>
      </a>
      <a href="tel:+919573456001" class="contact-card reveal-up">
        <i class="fas fa-phone"></i>
        <span>+91 9573456001</span>
      </a>
      <a href="https://www.linkedin.com/in/sandeep-chowdary-kommineni/?profileId=ACoAAD-K9BgBeyuX5F1fPz-X0LijRwW6WLH3l0" target="_blank" class="contact-card reveal-up">
        <i class="fab fa-linkedin"></i>
        <span>LinkedIn</span>
      </a>
      <a href="https://github.com/SANDEEPxKOMMINENI" target="_blank" class="contact-card reveal-up">
        <i class="fab fa-github"></i>
        <span>GitHub</span>
      </a>
    </div>
    <div class="contact-location reveal-up">
      <i class="fas fa-map-marker-alt"></i>
      Hyderabad, Telangana, India &bull; Available for relocation
    </div>
  </div>
</section>

<!-- Footer -->
<footer class="footer">
  <div class="footer-container">
    <div class="footer-left">
      <span class="footer-logo">sandeep<span class="logo-dot">.</span></span>
      <span class="footer-copy">&copy; 2026 Sandeep Kommineni. Crafted with passion.</span>
    </div>
    <div class="footer-right">
      <a href="https://github.com/SANDEEPxKOMMINENI" target="_blank" aria-label="GitHub"><i class="fab fa-github"></i></a>
      <a href="https://www.linkedin.com/in/sandeep-chowdary-kommineni/" target="_blank" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
      <a href="mailto:sandeepkommineni2@gmail.com" aria-label="Email"><i class="fas fa-envelope"></i></a>
      <a href="https://drive.google.com/file/d/1-_a8XWPrCqR7NvVfdMBV8ragr2U8BfjX/view?usp=sharing" target="_blank" aria-label="Resume"><i class="fas fa-file-text"></i></a>
    </div>
  </div>
</footer>

<script src="/static/app.js"></script>
</body>
</html>`
  return c.html(html)
})

export default app
