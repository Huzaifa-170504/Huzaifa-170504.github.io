"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Credentials", href: "#credentials" },
  { label: "Contact", href: "#contact" },
];

const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const projectFilters = [
  { id: "all", label: "All work" },
  { id: "ai", label: "AI / ML" },
  { id: "vision", label: "Computer vision" },
  { id: "security", label: "Cybersecurity" },
];

const projects = [
  {
    number: "01",
    title: "Deep Anomaly Detection System",
    short: "D-ADS",
    description:
      "A hybrid intrusion-detection research system that extends Snort3 with LSTM flow analysis and CNN payload inspection for anomaly detection on CICIDS2017 traffic.",
    contribution:
      "Team project — contributed the Snort3 preprocessor, embedded Python integration, inference bridge, and PCAP-replay testing.",
    tags: ["LSTM", "CNN", "Snort3", "Python", "CICIDS2017"],
    categories: ["ai", "security"],
    accent: "cyan",
    status: "Final year project",
    link: "https://github.com/Huzaifa-170504/DeepAnomalyDetectionSystem",
  },
  {
    number: "02",
    title: "Banana Instance Segmentation",
    short: "Vision R&D",
    description:
      "A two-class computer-vision pipeline for segmenting individual bananas and classifying healthy and unhealthy fruit, designed for future robotic picking workflows.",
    contribution:
      "Built the dataset workflow, validated YOLO11m-seg training, and explored Mamba-YOLO, boundary-aware loss, attention, and label-refinement upgrades.",
    tags: ["YOLO11m-seg", "Mamba-YOLO", "PyTorch", "Ultralytics", "Colab"],
    categories: ["ai", "vision"],
    accent: "violet",
    status: "Applied research",
    link: "https://github.com/Huzaifa-170504/Mamba-YOLO",
  },
];

const skillGroups = [
  {
    title: "Artificial intelligence",
    eyebrow: "Core focus",
    skills: ["Machine Learning", "Deep Learning", "Computer Vision", "Anomaly Detection", "Model Evaluation"],
  },
  {
    title: "Data & modelling",
    eyebrow: "Technical stack",
    skills: ["Python", "SQL", "Pandas", "NumPy", "Scikit-learn", "TensorFlow", "Keras", "PyTorch"],
  },
  {
    title: "Engineering",
    eyebrow: "Systems & tools",
    skills: ["Git & GitHub", "Linux", "Snort3", "Google Colab", "HTML/CSS", "JavaScript", "TypeScript"],
  },
];

function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {diagonal ? (
        <path d="M7 17 17 7M8 7h9v9" />
      ) : (
        <path d="M5 12h14m-5-5 5 5-5 5" />
      )}
    </svg>
  );
}

function ThemeIcon({ light }: { light: boolean }) {
  return light ? (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 15.2A8.2 8.2 0 0 1 8.8 4 8.2 8.2 0 1 0 20 15.2Z" />
    </svg>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightTheme, setLightTheme] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("portfolio-theme");
    const shouldUseLight = storedTheme === "light";
    const themeFrame = window.requestAnimationFrame(() => setLightTheme(shouldUseLight));
    document.documentElement.dataset.theme = shouldUseLight ? "light" : "dark";

    const updateProgress = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0);
    };

    const sections = document.querySelectorAll<HTMLElement>("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    sections.forEach((section) => observer.observe(section));
    document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => {
      window.cancelAnimationFrame(themeFrame);
      observer.disconnect();
      revealObserver.disconnect();
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  const filteredProjects = useMemo(
    () =>
      activeFilter === "all"
        ? projects
        : projects.filter((project) => project.categories.includes(activeFilter)),
    [activeFilter],
  );

  const toggleTheme = () => {
    const next = !lightTheme;
    setLightTheme(next);
    document.documentElement.dataset.theme = next ? "light" : "dark";
    window.localStorage.setItem("portfolio-theme", next ? "light" : "dark");
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText("huzaifabutt364@gmail.com");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const handleContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(String(data.get("subject") || "Portfolio enquiry"));
    const body = encodeURIComponent(
      `Hi Huzaifa,\n\n${String(data.get("message") || "")}\n\nFrom: ${String(data.get("name") || "")} (${String(data.get("email") || "")})`,
    );
    window.location.href = `mailto:huzaifabutt364@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      <header className="site-header">
        <a className="brand" href="#home" aria-label="Huzaifa Waqar Butt — home">
          <span className="brand-mark">
            <Image src={`${publicBasePath}/huzaifa-avatar.webp`} alt="" width={192} height={192} />
          </span>
          <span className="brand-name">Huzaifa Waqar Butt</span>
        </a>

        <nav className={`nav-links ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={activeSection === item.href.slice(1) ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button className="icon-button" type="button" onClick={toggleTheme} aria-label="Toggle color theme">
            <ThemeIcon light={lightTheme} />
          </button>
          <a className="header-cta" href="mailto:huzaifabutt364@gmail.com">
            Let&apos;s talk <ArrowIcon diagonal />
          </a>
          <button
            className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-grid" aria-hidden="true" />
          <div className="orb orb-one" aria-hidden="true" />
          <div className="orb orb-two" aria-hidden="true" />
          <div className="neural-mark" aria-hidden="true">
            <span className="node node-a" />
            <span className="node node-b" />
            <span className="node node-c" />
            <span className="node node-d" />
            <span className="neural-line line-a" />
            <span className="neural-line line-b" />
            <span className="neural-line line-c" />
            <strong>HWB</strong>
          </div>

          <div className="hero-content">
            <div className="availability-pill reveal is-visible">
              <span /> Open to AI / ML opportunities
            </div>
            <p className="hero-kicker reveal is-visible">Artificial intelligence · Machine learning · Data science</p>
            <h1 className="reveal is-visible">
              Building intelligent
              <span>systems with real-world impact.</span>
            </h1>
            <p className="hero-summary reveal is-visible">
              I&apos;m <strong>Huzaifa Waqar Butt</strong>, a BS Information Technology graduate focused on turning data,
              models, and engineering into practical AI solutions.
            </p>
            <div className="hero-actions reveal is-visible">
              <a className="button button-primary" href="#projects">
                Explore my work <ArrowIcon />
              </a>
              <a className="button button-secondary" href={`${publicBasePath}/Huzaifa_Waqar_Butt_CV.pdf`} download>
                Download résumé
              </a>
            </div>
          </div>

          <div className="hero-meta reveal is-visible">
            <div><span>Based in</span><strong>Bhimber, AJK, Pakistan</strong></div>
            <div><span>Education</span><strong>BSIT · University of Gujrat</strong></div>
            <div><span>Focus</span><strong>Applied AI & intelligent systems</strong></div>
          </div>

          <a className="scroll-cue" href="#about" aria-label="Scroll to about section">
            <span>Scroll to explore</span>
            <i />
          </a>
        </section>

        <section className="section about-section" id="about">
          <div className="section-heading reveal">
            <span className="section-index">01</span>
            <div>
              <p className="eyebrow">About me</p>
              <h2>Curious by nature.<br />Practical by design.</h2>
            </div>
          </div>

          <div className="about-layout">
            <figure className="about-portrait reveal">
              <div className="about-portrait-frame">
                <Image
                  src={`${publicBasePath}/huzaifa-waqar-butt.webp`}
                  alt="Huzaifa Waqar Butt in a navy suit"
                  width={900}
                  height={1125}
                />
              </div>
              <figcaption>
                <span>Huzaifa Waqar Butt</span>
                <strong>AI · ML · Data Science</strong>
              </figcaption>
            </figure>

            <div className="about-copy reveal">
              <p className="lead-copy">
                I work at the intersection of <em>machine intelligence</em>, data, and systems engineering.
              </p>
              <p>
                My path combines a BS in Information Technology with hands-on work in deep anomaly detection,
                computer vision, model training, and data analysis. I enjoy moving beyond notebooks—connecting
                models to systems that people can actually use.
              </p>
              <p>
                I&apos;m especially interested in AI/ML engineering, data science, intelligent automation, and research
                that produces measurable real-world value.
              </p>
              <div className="about-links">
                <a href="https://github.com/Huzaifa-170504" target="_blank" rel="noreferrer">
                  GitHub <ArrowIcon diagonal />
                </a>
                <a href="https://www.linkedin.com/in/huzaifabutt364" target="_blank" rel="noreferrer">
                  LinkedIn <ArrowIcon diagonal />
                </a>
              </div>
            </div>

            <div className="stats-grid reveal">
              <article>
                <strong>3.20</strong>
                <span>CGPA / 4.00</span>
              </article>
              <article>
                <strong>2026</strong>
                <span>BSIT graduate</span>
              </article>
              <article>
                <strong>02</strong>
                <span>Featured AI projects</span>
              </article>
              <article>
                <strong>AI+</strong>
                <span>Data · Vision · Security</span>
              </article>
            </div>
          </div>
        </section>

        <section className="section expertise-section" id="expertise">
          <div className="section-heading reveal">
            <span className="section-index">02</span>
            <div>
              <p className="eyebrow">Expertise</p>
              <h2>A focused, modern<br />technical toolkit.</h2>
            </div>
          </div>

          <div className="skill-grid">
            {skillGroups.map((group, index) => (
              <article className="skill-card reveal" key={group.title}>
                <div className="skill-card-top">
                  <span>0{index + 1}</span>
                  <p>{group.eyebrow}</p>
                </div>
                <h3>{group.title}</h3>
                <div className="skill-list">
                  {group.skills.map((skill) => <span key={skill}>{skill}</span>)}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section projects-section" id="projects">
          <div className="section-heading projects-heading reveal">
            <span className="section-index">03</span>
            <div>
              <p className="eyebrow">Selected work</p>
              <h2>Projects built to<br />solve, learn, and scale.</h2>
            </div>
          </div>

          <div className="project-filters reveal" role="group" aria-label="Filter projects">
            {projectFilters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                className={activeFilter === filter.id ? "active" : ""}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="project-list" aria-live="polite">
            {filteredProjects.map((project) => (
              <article className={`project-card accent-${project.accent}`} key={project.title}>
                <div className="project-number">{project.number}</div>
                <div className="project-visual" aria-hidden="true">
                  <div className="project-orbit orbit-a" />
                  <div className="project-orbit orbit-b" />
                  <span>{project.short}</span>
                </div>
                <div className="project-content">
                  <p className="project-status">{project.status}</p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <p className="project-contribution">{project.contribution}</p>
                  <div className="project-tags">
                    {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                  <a href={project.link} target="_blank" rel="noreferrer">
                    Explore on GitHub <ArrowIcon diagonal />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section credentials-section" id="credentials">
          <div className="section-heading reveal">
            <span className="section-index">04</span>
            <div>
              <p className="eyebrow">Education & credentials</p>
              <h2>A foundation built<br />for continuous learning.</h2>
            </div>
          </div>

          <div className="credentials-layout">
            <div className="education-card reveal">
              <p className="card-label">Formal education</p>
              <div className="degree-mark">BS<span>IT</span></div>
              <h3>BS Information Technology</h3>
              <p>University of Gujrat</p>
              <div className="degree-meta">
                <span>2022 — July 2026</span>
                <span>CGPA 3.20 / 4.00</span>
              </div>
              <div className="coursework">
                <span>Artificial Intelligence</span><span>Data Mining</span><span>Cyber Security</span>
                <span>Databases</span><span>Machine Learning</span><span>Statistics</span>
              </div>
            </div>

            <div className="credential-list">
              <article className="credential-item reveal">
                <span className="credential-year">2026</span>
                <div>
                  <p>Professional training</p>
                  <h3>Nationwide Virtual Technical Training Initiative</h3>
                  <span>Mar — Jun 2026 · AWS Data Analytics, AWS Machine Learning, and Google ML Engineer training tracks</span>
                </div>
              </article>
              <article className="credential-item reveal">
                <span className="credential-year">2026</span>
                <div>
                  <p>National assessment</p>
                  <h3>National Skills & Competency Test</h3>
                  <span>Qualified among 12,741 successful candidates from 33,038 participants across 199 universities</span>
                </div>
              </article>
              <article className="credential-item reveal">
                <span className="credential-year">2026</span>
                <div>
                  <p>Data science learning</p>
                  <h3>CodeWithHarry & Coursera</h3>
                  <span>Applied data science coursework and certificate-based learning · July 2026</span>
                </div>
              </article>
              <article className="credential-item reveal">
                <span className="credential-year">2022</span>
                <div>
                  <p>Prior education</p>
                  <h3>HSSC Pre-Medical & SSC Science</h3>
                  <span>HSSC: 907 / 1100 · SSC: 1056 / 1100</span>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-glow" aria-hidden="true" />
          <div className="contact-intro reveal">
            <p className="eyebrow">Let&apos;s build something meaningful</p>
            <h2>Have an opportunity<br />or an ambitious idea?</h2>
            <p>
              I&apos;m open to AI/ML engineering, data science, research, and intelligent automation opportunities.
            </p>
            <button type="button" className="copy-email" onClick={copyEmail}>
              <span>{copied ? "Copied to clipboard" : "huzaifabutt364@gmail.com"}</span>
              <ArrowIcon diagonal />
            </button>
          </div>

          <form className="contact-form reveal" onSubmit={handleContact}>
            <div className="form-row">
              <label>
                <span>Your name</span>
                <input name="name" type="text" placeholder="Name" required />
              </label>
              <label>
                <span>Email address</span>
                <input name="email" type="email" placeholder="you@company.com" required />
              </label>
            </div>
            <label>
              <span>Subject</span>
              <input name="subject" type="text" placeholder="Opportunity, collaboration, or project" required />
            </label>
            <label>
              <span>Message</span>
              <textarea name="message" rows={4} placeholder="Tell me a little about what you have in mind…" required />
            </label>
            <button className="button button-primary" type="submit">
              Start a conversation <ArrowIcon />
            </button>
            <p className="form-note">Submitting opens your preferred email application—no data is stored.</p>
          </form>
        </section>
      </main>

      <footer>
        <a className="brand" href="#home">
          <span className="brand-mark">
            <Image src={`${publicBasePath}/huzaifa-avatar.webp`} alt="" width={192} height={192} />
          </span>
          <span className="brand-name">Huzaifa Waqar Butt</span>
        </a>
        <p>AI · Machine Learning · Data Science</p>
        <div className="footer-links">
          <a href="https://github.com/Huzaifa-170504" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/huzaifabutt364" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="mailto:huzaifabutt364@gmail.com">Email</a>
        </div>
        <span>© {new Date().getFullYear()} Huzaifa Waqar Butt</span>
      </footer>
    </>
  );
}
