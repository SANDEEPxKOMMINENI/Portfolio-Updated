import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  const html = `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sandeep Chowdary Kommineni | AI/ML Engineer & Full-Stack Developer</title>
<meta name="description" content="Portfolio of Sandeep Chowdary Kommineni - AI/ML Engineer, Full-Stack Developer, and Generative AI Builder. Building production-ready AI systems.">
<meta name="keywords" content="AI Engineer, ML Engineer, Full Stack Developer, Generative AI, LLM, React, Python, TypeScript">
<meta property="og:title" content="Sandeep Chowdary Kommineni - AI/ML Engineer">
<meta property="og:description" content="AI/ML Engineer & Full-Stack Developer building next-gen AI products.">
<meta property="og:type" content="website">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.1/css/all.min.css" rel="stylesheet">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link href="/static/style.css" rel="stylesheet">
</head>
<body>
<!-- Animated background -->
<div class="bg-grid" id="bgGrid"></div>
<div class="orb orb-1"></div>
<div class="orb orb-2"></div>
<div class="orb orb-3"></div>

<!-- Cursor glow -->
<div class="cursor-glow" id="cursorGlow"></div>

<!-- Navigation -->
<nav class="nav" id="nav">
  <div class="nav-inner">
    <a href="#hero" class="nav-logo">
      <span class="logo-bracket">&lt;</span>SK<span class="logo-bracket">/&gt;</span>
    </a>
    <div class="nav-links" id="navLinks">
      <a href="#about" class="nav-link">About</a>
      <a href="#projects" class="nav-link">Projects</a>
      <a href="#skills" class="nav-link">Skills</a>
      <a href="#certifications" class="nav-link">Certifications</a>
      <a href="#education" class="nav-link">Education</a>
      <a href="#contact" class="nav-link">Contact</a>
    </div>
    <div class="nav-actions">
      <button class="theme-toggle" id="themeToggle" aria-label="Toggle theme">
        <i class="fas fa-moon"></i>
      </button>
      <button class="nav-burger" id="navBurger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</nav>

<!-- Mobile menu -->
<div class="mobile-menu" id="mobileMenu">
  <a href="#about" class="mobile-link">About</a>
  <a href="#projects" class="mobile-link">Projects</a>
  <a href="#skills" class="mobile-link">Skills</a>
  <a href="#certifications" class="mobile-link">Certifications</a>
  <a href="#education" class="mobile-link">Education</a>
  <a href="#contact" class="mobile-link">Contact</a>
</div>

<!-- Hero Section -->
<section class="hero" id="hero">
  <div class="hero-content">
    <div class="hero-text">
      <div class="hero-badge animate-in">
        <span class="badge-dot"></span>
        Available for opportunities
      </div>
      <h1 class="hero-name animate-in delay-1">
        Sandeep Chowdary<br><span class="name-highlight">Kommineni</span>
      </h1>
      <p class="hero-title animate-in delay-2">
        <span class="title-role">AI/ML Engineer</span>
        <span class="title-sep">&bull;</span>
        <span class="title-role">Full-Stack Developer</span>
        <span class="title-sep">&bull;</span>
        <span class="title-role">GenAI Builder</span>
      </p>
      <p class="hero-desc animate-in delay-3">
        Building production-ready AI systems and full-stack applications. 
        Ranked <strong>6th out of 4,500+</strong> at IIT Guwahati AIML Hackathon. 
        Passionate about transforming complex problems into elegant, scalable solutions.
      </p>
      <div class="hero-cta animate-in delay-4">
        <a href="#projects" class="btn btn-primary">
          <i class="fas fa-rocket"></i> View Projects
        </a>
        <a href="#contact" class="btn btn-secondary">
          <i class="fas fa-envelope"></i> Contact Me
        </a>
        <a href="https://drive.google.com/file/d/1-_a8XWPrCqR7NvVfdMBV8ragr2U8BfjX/view" target="_blank" class="btn btn-ghost">
          <i class="fas fa-file-alt"></i> Resume
        </a>
      </div>
      <div class="hero-socials animate-in delay-5">
        <a href="https://github.com/SANDEEPxKOMMINENI" target="_blank" class="social-icon" aria-label="GitHub">
          <i class="fab fa-github"></i>
        </a>
        <a href="https://www.linkedin.com/in/sandeep-chowdary-kommineni/" target="_blank" class="social-icon" aria-label="LinkedIn">
          <i class="fab fa-linkedin"></i>
        </a>
        <a href="mailto:sandeepkommineni2@gmail.com" class="social-icon" aria-label="Email">
          <i class="fas fa-envelope"></i>
        </a>
      </div>
    </div>
    <div class="hero-visual animate-in delay-2">
      <div class="hero-avatar-container">
        <div class="avatar-ring"></div>
        <div class="avatar-ring ring-2"></div>
        <div class="avatar-glow"></div>
        <img src="https://github.com/SANDEEPxKOMMINENI.png" alt="Sandeep Chowdary Kommineni" class="hero-avatar" loading="eager">
      </div>
      <div class="hero-stats">
        <div class="stat-item">
          <span class="stat-num" data-count="12">0</span>
          <span class="stat-label">Projects</span>
        </div>
        <div class="stat-item">
          <span class="stat-num" data-count="7">0</span>
          <span class="stat-label">Certifications</span>
        </div>
        <div class="stat-item">
          <span class="stat-num" data-count="6">0</span>
          <span class="stat-label">Hackathon Rank</span>
        </div>
      </div>
    </div>
  </div>
  <div class="scroll-indicator animate-in delay-5">
    <div class="scroll-line"></div>
    <span>Scroll to explore</span>
  </div>
</section>

<!-- About Section -->
<section class="section" id="about">
  <div class="container">
    <div class="section-header">
      <span class="section-tag"><i class="fas fa-user"></i> About</span>
      <h2 class="section-title">Building the Future<br>with <span class="gradient-text">AI & Code</span></h2>
    </div>
    <div class="about-grid">
      <div class="about-card glass-card reveal">
        <div class="about-icon"><i class="fas fa-brain"></i></div>
        <h3>AI/ML Engineering</h3>
        <p>Deep expertise in machine learning, deep learning, NLP, and computer vision. Built transformer-based models, RAG systems, and production ML pipelines that solve real-world problems.</p>
      </div>
      <div class="about-card glass-card reveal">
        <div class="about-icon"><i class="fas fa-code"></i></div>
        <h3>Full-Stack Development</h3>
        <p>End-to-end product builder with React, TypeScript, Node.js, Python, and cloud services. From pixel-perfect UIs to scalable backends, I ship complete products.</p>
      </div>
      <div class="about-card glass-card reveal">
        <div class="about-icon"><i class="fas fa-robot"></i></div>
        <h3>Generative AI</h3>
        <p>Pioneering GenAI applications with LLMs, multi-model architectures, and intelligent agents. Built platforms leveraging 50+ AI models for real-world use cases.</p>
      </div>
      <div class="about-card glass-card reveal">
        <div class="about-icon"><i class="fas fa-trophy"></i></div>
        <h3>Hackathon Champion</h3>
        <p>Ranked 6th out of 4,500+ participants at IIT Guwahati AIML Hackathon. Competed in Amazon ML Challenge 2024. Thrive under pressure and deliver winning solutions.</p>
      </div>
    </div>
    <div class="about-summary glass-card reveal">
      <div class="terminal-header">
        <span class="terminal-dot red"></span>
        <span class="terminal-dot yellow"></span>
        <span class="terminal-dot green"></span>
        <span class="terminal-title">sandeep@portfolio:~</span>
      </div>
      <div class="terminal-body">
        <p><span class="term-prompt">$</span> <span class="term-cmd">cat</span> about.md</p>
        <p class="term-output">B.Tech CSE (AI & ML) @ KL University (2022-2026)</p>
        <p class="term-output">12+ production projects spanning AI/ML, GenAI, and Full-Stack</p>
        <p class="term-output">AWS, Oracle, Salesforce, GitHub certified professional</p>
        <p class="term-output">Passionate about building AI tools that people actually use</p>
        <p><span class="term-prompt">$</span> <span class="term-cursor">|</span></p>
      </div>
    </div>
  </div>
</section>

<!-- Projects Section -->
<section class="section section-dark" id="projects">
  <div class="container">
    <div class="section-header">
      <span class="section-tag"><i class="fas fa-rocket"></i> Projects</span>
      <h2 class="section-title">Featured <span class="gradient-text">Work</span></h2>
      <p class="section-sub">Production-grade applications built with modern tech stacks</p>
    </div>

    <!-- Project Filter -->
    <div class="project-filters reveal">
      <button class="filter-btn active" data-filter="all">All</button>
      <button class="filter-btn" data-filter="ai">AI/ML</button>
      <button class="filter-btn" data-filter="fullstack">Full-Stack</button>
      <button class="filter-btn" data-filter="hackathon">Hackathon</button>
    </div>

    <div class="projects-grid">

      <!-- Project 1: San Vortex AI -->
      <article class="project-card glass-card reveal" data-category="ai fullstack">
        <div class="project-img">
          <div class="project-gradient grad-1"></div>
          <div class="project-icon-big"><i class="fas fa-comments"></i></div>
          <div class="project-badge">Featured</div>
        </div>
        <div class="project-body">
          <h3 class="project-title">San Vortex AI</h3>
          <p class="project-desc">Multi-model AI chat platform with 50+ advanced models rivaling GPT-4O. Features Supabase auth, folder organization, theme customization, and media uploads.</p>
          <div class="project-tags">
            <span class="tag">React</span><span class="tag">Supabase</span><span class="tag">OpenRouter</span><span class="tag">GenAI</span><span class="tag">LLMs</span>
          </div>
          <div class="project-links">
            <a href="https://san-vortex-ai.netlify.app/" target="_blank" class="proj-link live"><i class="fas fa-external-link-alt"></i> Live Demo</a>
            <a href="https://github.com/SANDEEPxKOMMINENI/San_Vortex_Ai" target="_blank" class="proj-link github"><i class="fab fa-github"></i> Source</a>
          </div>
        </div>
      </article>

      <!-- Project 2: AI-LinguaSync -->
      <article class="project-card glass-card reveal" data-category="ai fullstack">
        <div class="project-img">
          <div class="project-gradient grad-2"></div>
          <div class="project-icon-big"><i class="fas fa-language"></i></div>
        </div>
        <div class="project-body">
          <h3 class="project-title">AI-LinguaSync</h3>
          <p class="project-desc">Real-time AI voice translation across 12+ languages with TTS, speaker recognition, secure auth, and cross-platform support using advanced AI models.</p>
          <div class="project-tags">
            <span class="tag">AI/ML</span><span class="tag">NLP</span><span class="tag">TTS</span><span class="tag">Python</span><span class="tag">React</span>
          </div>
          <div class="project-links">
            <a href="https://github.com/SANDEEPxKOMMINENI/AI-LinguaSync" target="_blank" class="proj-link github"><i class="fab fa-github"></i> Source</a>
          </div>
        </div>
      </article>

      <!-- Project 3: AskDocs AI -->
      <article class="project-card glass-card reveal" data-category="ai fullstack">
        <div class="project-img">
          <div class="project-gradient grad-3"></div>
          <div class="project-icon-big"><i class="fas fa-file-pdf"></i></div>
        </div>
        <div class="project-body">
          <h3 class="project-title">AskDocs AI</h3>
          <p class="project-desc">Intelligent document assistant for PDF analysis with semantic search, smart Q&A with source citations, and real-time processing powered by cutting-edge NLP.</p>
          <div class="project-tags">
            <span class="tag">RAG</span><span class="tag">NLP</span><span class="tag">Semantic Search</span><span class="tag">Python</span><span class="tag">LLM</span>
          </div>
          <div class="project-links">
            <a href="https://github.com/SANDEEPxKOMMINENI/askdocs-ai" target="_blank" class="proj-link github"><i class="fab fa-github"></i> Source</a>
          </div>
        </div>
      </article>

      <!-- Project 4: Stock Analysis -->
      <article class="project-card glass-card reveal" data-category="ai">
        <div class="project-img">
          <div class="project-gradient grad-4"></div>
          <div class="project-icon-big"><i class="fas fa-chart-line"></i></div>
        </div>
        <div class="project-body">
          <h3 class="project-title">Stock Analysis (Informer Transformer)</h3>
          <p class="project-desc">Deep learning stock prediction using the Informer Transformer architecture optimized for time-series forecasting, with Gradio UI and HuggingFace export.</p>
          <div class="project-tags">
            <span class="tag">Transformer</span><span class="tag">Deep Learning</span><span class="tag">Gradio</span><span class="tag">Python</span>
          </div>
          <div class="project-links">
            <a href="https://github.com/SANDEEPxKOMMINENI/Stock-Analysis" target="_blank" class="proj-link github"><i class="fab fa-github"></i> Source</a>
          </div>
        </div>
      </article>

      <!-- Project 5: IIT Guwahati Hackathon -->
      <article class="project-card glass-card reveal" data-category="ai hackathon">
        <div class="project-img">
          <div class="project-gradient grad-5"></div>
          <div class="project-icon-big"><i class="fas fa-trophy"></i></div>
          <div class="project-badge badge-gold">Rank #6 / 4500+</div>
        </div>
        <div class="project-body">
          <h3 class="project-title">IIT Guwahati AIML Hackathon</h3>
          <p class="project-desc">Email open-rate prediction ML system. Ranked 6th out of 4,500+ participants by predicting optimal email send times from customer communication history.</p>
          <div class="project-tags">
            <span class="tag">ML</span><span class="tag">Python</span><span class="tag">Feature Engineering</span><span class="tag">Classification</span>
          </div>
          <div class="project-links">
            <a href="https://github.com/SANDEEPxKOMMINENI/IIT-Guwahati-AIML-Second-Round" target="_blank" class="proj-link github"><i class="fab fa-github"></i> Source</a>
          </div>
        </div>
      </article>

      <!-- Project 6: Amazon ML Challenge -->
      <article class="project-card glass-card reveal" data-category="ai hackathon">
        <div class="project-img">
          <div class="project-gradient grad-6"></div>
          <div class="project-icon-big"><i class="fab fa-amazon"></i></div>
          <div class="project-badge">First Hackathon</div>
        </div>
        <div class="project-body">
          <h3 class="project-title">Amazon ML Challenge 2024</h3>
          <p class="project-desc">Image feature extraction + LightGBM pipeline for predicting product entity values from images. Built an end-to-end ML pipeline for large-scale datasets.</p>
          <div class="project-tags">
            <span class="tag">Computer Vision</span><span class="tag">LightGBM</span><span class="tag">Deep Learning</span><span class="tag">Python</span>
          </div>
          <div class="project-links">
            <a href="https://github.com/SANDEEPxKOMMINENI/amazon_ml_2024-challenge" target="_blank" class="proj-link github"><i class="fab fa-github"></i> Source</a>
          </div>
        </div>
      </article>

      <!-- Project 7: AnimeRadar -->
      <article class="project-card glass-card reveal" data-category="fullstack">
        <div class="project-img">
          <div class="project-gradient grad-7"></div>
          <div class="project-icon-big"><i class="fas fa-play-circle"></i></div>
        </div>
        <div class="project-body">
          <h3 class="project-title">AnimeRadar</h3>
          <p class="project-desc">Anime discovery & streaming platform with ML-powered recommendations, adaptive streaming, watchlists, and a responsive dark-mode UI with smooth animations.</p>
          <div class="project-tags">
            <span class="tag">React</span><span class="tag">Node.js</span><span class="tag">MongoDB</span><span class="tag">ML</span><span class="tag">GCP</span>
          </div>
          <div class="project-links">
            <a href="https://animerador.netlify.app/" target="_blank" class="proj-link live"><i class="fas fa-external-link-alt"></i> Live Demo</a>
          </div>
        </div>
      </article>

      <!-- Project 8: Scaffolding Agent -->
      <article class="project-card glass-card reveal" data-category="ai fullstack">
        <div class="project-img">
          <div class="project-gradient grad-8"></div>
          <div class="project-icon-big"><i class="fas fa-sitemap"></i></div>
        </div>
        <div class="project-body">
          <h3 class="project-title">Scaffolding Agent</h3>
          <p class="project-desc">AI-powered smart scaffolding tool that generates optimized project structures based on your tech stack and requirements using intelligent agents.</p>
          <div class="project-tags">
            <span class="tag">AI Agents</span><span class="tag">Python</span><span class="tag">LLM</span><span class="tag">DevTools</span>
          </div>
          <div class="project-links">
            <a href="https://github.com/SANDEEPxKOMMINENI/Scaffolding_Agent" target="_blank" class="proj-link github"><i class="fab fa-github"></i> Source</a>
          </div>
        </div>
      </article>

      <!-- Project 9: AWS URL Shortener -->
      <article class="project-card glass-card reveal" data-category="fullstack">
        <div class="project-img">
          <div class="project-gradient grad-9"></div>
          <div class="project-icon-big"><i class="fas fa-link"></i></div>
        </div>
        <div class="project-body">
          <h3 class="project-title">AWS Serverless URL Shortener</h3>
          <p class="project-desc">Modern, secure URL shortener with React, TypeScript, AWS Lambda, DynamoDB, and API Gateway. Instant shortening with serverless architecture.</p>
          <div class="project-tags">
            <span class="tag">AWS Lambda</span><span class="tag">DynamoDB</span><span class="tag">React</span><span class="tag">TypeScript</span>
          </div>
          <div class="project-links">
            <a href="https://github.com/SANDEEPxKOMMINENI/url-redirection-using-aws-lambda-dynamodb-and-apigateway" target="_blank" class="proj-link github"><i class="fab fa-github"></i> Source</a>
          </div>
        </div>
      </article>

      <!-- Project 10: MoveLogic Form -->
      <article class="project-card glass-card reveal" data-category="fullstack">
        <div class="project-img">
          <div class="project-gradient grad-10"></div>
          <div class="project-icon-big"><i class="fas fa-clipboard-list"></i></div>
          <div class="project-badge">Interview Project</div>
        </div>
        <div class="project-body">
          <h3 class="project-title">MoveLogic Form</h3>
          <p class="project-desc">Multi-step moving inventory form built for MoveLogic.ai interview round. React + Supabase + Zustand with pixel-perfect design replication.</p>
          <div class="project-tags">
            <span class="tag">React</span><span class="tag">Supabase</span><span class="tag">Zustand</span><span class="tag">TypeScript</span>
          </div>
          <div class="project-links">
            <a href="https://movelogic-ai-form.netlify.app/" target="_blank" class="proj-link live"><i class="fas fa-external-link-alt"></i> Live Demo</a>
            <a href="https://github.com/SANDEEPxKOMMINENI/movelogic-form" target="_blank" class="proj-link github"><i class="fab fa-github"></i> Source</a>
          </div>
        </div>
      </article>

      <!-- Project 11: Sustainable Living -->
      <article class="project-card glass-card reveal" data-category="fullstack">
        <div class="project-img">
          <div class="project-gradient grad-11"></div>
          <div class="project-icon-big"><i class="fas fa-leaf"></i></div>
        </div>
        <div class="project-body">
          <h3 class="project-title">Sustainable Living Platform</h3>
          <p class="project-desc">Comprehensive web platform for sustainable living with educational resources, interactive tools, data visualization, and community engagement features.</p>
          <div class="project-tags">
            <span class="tag">React</span><span class="tag">Express</span><span class="tag">Firebase</span><span class="tag">GCP</span>
          </div>
          <div class="project-links">
            <a href="https://github.com/SANDEEPxKOMMINENI/Sustainable-Living-Education" target="_blank" class="proj-link github"><i class="fab fa-github"></i> Source</a>
          </div>
        </div>
      </article>

      <!-- Project 12: JPMC Forage -->
      <article class="project-card glass-card reveal" data-category="fullstack">
        <div class="project-img">
          <div class="project-gradient grad-12"></div>
          <div class="project-icon-big"><i class="fas fa-university"></i></div>
        </div>
        <div class="project-body">
          <h3 class="project-title">JPMC Software Engineering</h3>
          <p class="project-desc">Completed JP Morgan Chase Advanced Software Engineering virtual program. Repository serves as guidance for aspiring JPMC freshers and interns.</p>
          <div class="project-tags">
            <span class="tag">Python</span><span class="tag">Finance</span><span class="tag">Software Engineering</span>
          </div>
          <div class="project-links">
            <a href="https://github.com/SANDEEPxKOMMINENI/forage-midas" target="_blank" class="proj-link github"><i class="fab fa-github"></i> Source</a>
          </div>
        </div>
      </article>

    </div>
  </div>
</section>

<!-- Skills Section -->
<section class="section" id="skills">
  <div class="container">
    <div class="section-header">
      <span class="section-tag"><i class="fas fa-cogs"></i> Skills</span>
      <h2 class="section-title">Technical <span class="gradient-text">Arsenal</span></h2>
    </div>
    <div class="skills-grid">
      <div class="skill-category glass-card reveal">
        <h3><i class="fas fa-brain"></i> AI / ML</h3>
        <div class="skill-items">
          <span class="skill-chip">Machine Learning</span>
          <span class="skill-chip">Deep Learning</span>
          <span class="skill-chip">NLP</span>
          <span class="skill-chip">Computer Vision</span>
          <span class="skill-chip">Transformers</span>
          <span class="skill-chip">RAG</span>
          <span class="skill-chip">LLMs</span>
          <span class="skill-chip">Generative AI</span>
          <span class="skill-chip">Fine-Tuning</span>
          <span class="skill-chip">Data Science</span>
        </div>
      </div>
      <div class="skill-category glass-card reveal">
        <h3><i class="fas fa-code"></i> Languages</h3>
        <div class="skill-items">
          <span class="skill-chip">Python</span>
          <span class="skill-chip">TypeScript</span>
          <span class="skill-chip">JavaScript</span>
          <span class="skill-chip">Java</span>
          <span class="skill-chip">SQL</span>
          <span class="skill-chip">HTML/CSS</span>
        </div>
      </div>
      <div class="skill-category glass-card reveal">
        <h3><i class="fas fa-layer-group"></i> Frameworks</h3>
        <div class="skill-items">
          <span class="skill-chip">React</span>
          <span class="skill-chip">Node.js</span>
          <span class="skill-chip">Express</span>
          <span class="skill-chip">PyTorch</span>
          <span class="skill-chip">TensorFlow</span>
          <span class="skill-chip">LangChain</span>
          <span class="skill-chip">Gradio</span>
          <span class="skill-chip">Tailwind CSS</span>
        </div>
      </div>
      <div class="skill-category glass-card reveal">
        <h3><i class="fas fa-cloud"></i> Cloud & DevOps</h3>
        <div class="skill-items">
          <span class="skill-chip">AWS</span>
          <span class="skill-chip">GCP</span>
          <span class="skill-chip">Azure</span>
          <span class="skill-chip">Oracle Cloud</span>
          <span class="skill-chip">Firebase</span>
          <span class="skill-chip">Supabase</span>
          <span class="skill-chip">MongoDB</span>
          <span class="skill-chip">DynamoDB</span>
          <span class="skill-chip">Git/GitHub</span>
        </div>
      </div>
      <div class="skill-category glass-card reveal">
        <h3><i class="fas fa-wand-magic-sparkles"></i> AI Tools & APIs</h3>
        <div class="skill-items">
          <span class="skill-chip">OpenAI API</span>
          <span class="skill-chip">Google Gemini</span>
          <span class="skill-chip">Anthropic Claude</span>
          <span class="skill-chip">OpenRouter</span>
          <span class="skill-chip">HuggingFace</span>
          <span class="skill-chip">LightGBM</span>
          <span class="skill-chip">GitHub Copilot</span>
        </div>
      </div>
      <div class="skill-category glass-card reveal">
        <h3><i class="fas fa-tools"></i> Tools & Practices</h3>
        <div class="skill-items">
          <span class="skill-chip">VS Code</span>
          <span class="skill-chip">Docker</span>
          <span class="skill-chip">CI/CD</span>
          <span class="skill-chip">REST APIs</span>
          <span class="skill-chip">Agile</span>
          <span class="skill-chip">System Design</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Certifications Section -->
<section class="section section-dark" id="certifications">
  <div class="container">
    <div class="section-header">
      <span class="section-tag"><i class="fas fa-certificate"></i> Certifications</span>
      <h2 class="section-title">Professional <span class="gradient-text">Credentials</span></h2>
    </div>
    <div class="certs-grid">
      <div class="cert-card glass-card reveal">
        <div class="cert-logo"><i class="fab fa-aws"></i></div>
        <h3>AWS Certified Cloud Practitioner</h3>
        <p class="cert-issuer">Amazon Web Services</p>
        <a href="https://drive.google.com/file/d/1T7DKd0PekARgeUCDnHt3oroFTMUzFoj5/view" target="_blank" class="cert-link"><i class="fas fa-external-link-alt"></i> View Certificate</a>
      </div>
      <div class="cert-card glass-card reveal">
        <div class="cert-logo"><i class="fab fa-salesforce"></i></div>
        <h3>Salesforce Certified AI Associate</h3>
        <p class="cert-issuer">Salesforce</p>
        <a href="https://drive.google.com/file/d/1qVV4Z0PPHPe0VI1h_GSKCxmSa9JuY4YZ/view" target="_blank" class="cert-link"><i class="fas fa-external-link-alt"></i> View Certificate</a>
      </div>
      <div class="cert-card glass-card reveal">
        <div class="cert-logo"><i class="fab fa-github"></i></div>
        <h3>GitHub Foundations</h3>
        <p class="cert-issuer">GitHub</p>
        <a href="https://drive.google.com/file/d/1HEhn7S0fIuqUVg6dRxutCRRRQEMDdOvS/view" target="_blank" class="cert-link"><i class="fas fa-external-link-alt"></i> View Certificate</a>
      </div>
      <div class="cert-card glass-card reveal">
        <div class="cert-logo"><i class="fab fa-java"></i></div>
        <h3>Java Full Stack - Digital Skills</h3>
        <p class="cert-issuer">TalentNext (Wipro)</p>
        <a href="https://drive.google.com/file/d/1VNF4LbROBZIycB-QWPGNrwXPRcGuht4I/view" target="_blank" class="cert-link"><i class="fas fa-external-link-alt"></i> View Certificate</a>
      </div>
      <div class="cert-card glass-card reveal">
        <div class="cert-logo"><i class="fas fa-robot"></i></div>
        <h3>Automation Professional</h3>
        <p class="cert-issuer">Automation Anywhere</p>
        <a href="https://drive.google.com/file/d/1BqLjdQCOK8Z4rpkE9K4k-B_Bi3VBbSwB/view" target="_blank" class="cert-link"><i class="fas fa-external-link-alt"></i> View Certificate</a>
      </div>
      <div class="cert-card glass-card reveal">
        <div class="cert-logo cert-oracle"><i class="fas fa-cloud"></i></div>
        <h3>OCI 2024 AI Foundations Associate</h3>
        <p class="cert-issuer">Oracle</p>
        <a href="https://drive.google.com/file/d/1t51xfBT_0-yfwV7_-HmzK_JEX4pCGyMa/view" target="_blank" class="cert-link"><i class="fas fa-external-link-alt"></i> View Certificate</a>
      </div>
      <div class="cert-card glass-card reveal">
        <div class="cert-logo cert-oracle"><i class="fas fa-server"></i></div>
        <h3>OCI 2025 Architect Associate</h3>
        <p class="cert-issuer">Oracle</p>
        <a href="https://drive.google.com/file/d/1teGaotHcjOpdqRU7RJS4rwZBGidbeOWa/view" target="_blank" class="cert-link"><i class="fas fa-external-link-alt"></i> View Certificate</a>
      </div>
    </div>
  </div>
</section>

<!-- Education Section -->
<section class="section" id="education">
  <div class="container">
    <div class="section-header">
      <span class="section-tag"><i class="fas fa-graduation-cap"></i> Education</span>
      <h2 class="section-title">Academic <span class="gradient-text">Journey</span></h2>
    </div>
    <div class="timeline">
      <div class="timeline-item reveal">
        <div class="timeline-dot"></div>
        <div class="timeline-content glass-card">
          <div class="timeline-date">2022 - 2026</div>
          <h3>KL University</h3>
          <p class="timeline-degree">B.Tech - Computer Science & Engineering (AI & ML)</p>
          <p class="timeline-location"><i class="fas fa-map-marker-alt"></i> Vaddeswaram, Andhra Pradesh</p>
          <p>Pursuing in-depth curriculum focused on AI, machine learning, and software development. Engaged in hands-on projects and research in AI innovation.</p>
        </div>
      </div>
      <div class="timeline-item reveal">
        <div class="timeline-dot"></div>
        <div class="timeline-content glass-card">
          <div class="timeline-date">2021 - 2022</div>
          <h3>Sri Chaitanya Junior College</h3>
          <p class="timeline-degree">Intermediate - MPC (Math, Physics, Chemistry)</p>
          <p class="timeline-location"><i class="fas fa-map-marker-alt"></i> Guntur, Andhra Pradesh</p>
          <p>Strong foundation in core science subjects.</p>
        </div>
      </div>
      <div class="timeline-item reveal">
        <div class="timeline-dot"></div>
        <div class="timeline-content glass-card">
          <div class="timeline-date">2020</div>
          <h3>Bhashyam High School</h3>
          <p class="timeline-degree">Class 10 - CGPA: 10/10</p>
          <p class="timeline-location"><i class="fas fa-map-marker-alt"></i> Guntur, Andhra Pradesh</p>
          <p>Secured perfect 10 CGPA in board examinations.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Contact Section -->
<section class="section section-dark" id="contact">
  <div class="container">
    <div class="section-header">
      <span class="section-tag"><i class="fas fa-paper-plane"></i> Contact</span>
      <h2 class="section-title">Let's <span class="gradient-text">Connect</span></h2>
      <p class="section-sub">Open to opportunities, collaborations, and conversations</p>
    </div>
    <div class="contact-grid">
      <a href="mailto:sandeepkommineni2@gmail.com" class="contact-card glass-card reveal">
        <div class="contact-icon"><i class="fas fa-envelope"></i></div>
        <h3>Email</h3>
        <p>sandeepkommineni2@gmail.com</p>
      </a>
      <a href="https://www.linkedin.com/in/sandeep-chowdary-kommineni/" target="_blank" class="contact-card glass-card reveal">
        <div class="contact-icon"><i class="fab fa-linkedin"></i></div>
        <h3>LinkedIn</h3>
        <p>sandeep-chowdary-kommineni</p>
      </a>
      <a href="https://github.com/SANDEEPxKOMMINENI" target="_blank" class="contact-card glass-card reveal">
        <div class="contact-icon"><i class="fab fa-github"></i></div>
        <h3>GitHub</h3>
        <p>SANDEEPxKOMMINENI</p>
      </a>
      <div class="contact-card glass-card reveal">
        <div class="contact-icon"><i class="fas fa-map-marker-alt"></i></div>
        <h3>Location</h3>
        <p>Guntur, Andhra Pradesh, India</p>
      </div>
    </div>
  </div>
</section>

<!-- Footer -->
<footer class="footer">
  <div class="container">
    <div class="footer-inner">
      <div class="footer-brand">
        <span class="logo-bracket">&lt;</span>SK<span class="logo-bracket">/&gt;</span>
        <p>Designed & Built by Sandeep Chowdary Kommineni</p>
      </div>
      <div class="footer-links">
        <a href="https://github.com/SANDEEPxKOMMINENI" target="_blank"><i class="fab fa-github"></i></a>
        <a href="https://www.linkedin.com/in/sandeep-chowdary-kommineni/" target="_blank"><i class="fab fa-linkedin"></i></a>
        <a href="mailto:sandeepkommineni2@gmail.com"><i class="fas fa-envelope"></i></a>
      </div>
    </div>
    <div class="footer-copy">&copy; 2026 Sandeep Chowdary Kommineni. All rights reserved.</div>
  </div>
</footer>

<script src="/static/app.js"></script>
</body>
</html>`
  return c.html(html)
})

export default app
