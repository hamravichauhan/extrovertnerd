import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router";

type Theme = "light" | "dark";

const projects = [
  {
    number: "01",
    title: "Multi-Hop OTA Flight & Hotel Scraper",
    problem: "Travel inventory was arriving late, incomplete, and too expensive to trust.",
    tradeoff:
      "We traded convenient third-party APIs for a resilient, observable scraping layer built to survive hostile endpoints.",
    metrics: [
      ["99.4%", "anti-bot bypass"],
      ["380ms", "P95 response"],
      ["1.2M+", "points / day"],
    ],
    className: "work-feature",
  },
  {
    number: "02",
    title: "Patsons Goa Catalog & Order Gateway",
    problem:
      "A busy local team was losing orders to phone calls, PDFs, and slow product discovery.",
    tradeoff:
      "Instead of another complex dashboard, we designed around how staff already sold—and made every action obvious.",
    metrics: [
      ["+350%", "order speed"],
      ["−42%", "cart drop-off"],
      ["<15 min", "staff training"],
    ],
    className: "work-reverse",
  },
  {
    number: "03",
    title: "High-Performance Headless Editorial Platform",
    problem:
      "A content business needed a site that felt instant without carrying an enterprise-sized hosting bill.",
    tradeoff:
      "We chose boring infrastructure, aggressive caching, and fewer moving parts over fashionable complexity.",
    metrics: [
      ["100/100", "Core Web Vitals"],
      ["0.4s", "first paint"],
      ["<$40", "monthly infra"],
    ],
    className: "work-editorial",
  },
];

const capabilities = [
  ["Engineering", "Next.js, React, TypeScript, Laravel, FastAPI, PostgreSQL"],
  ["Data & Scraping", "Playwright, anti-bot mitigation, ETL pipelines"],
  ["Applied AI", "LoRA / QLoRA, local inference, Ollama, quantization"],
  ["Production", "Docker, Nginx, VPS, cPanel, CI/CD"],
];

const writing = [
  {
    date: "12.08.2026",
    tag: "Infrastructure",
    title: "The best server is the one nobody has to think about.",
    summary:
      "What small teams actually need from production infrastructure—and why boring choices keep winning.",
  },
  {
    date: "28.06.2026",
    tag: "Applied AI",
    title: "Running useful small models without renting somebody else’s GPU.",
    summary: "Notes from quantizing, tuning, and serving code models locally on a Mac mini.",
  },
  {
    date: "03.04.2026",
    tag: "Engineering",
    title: "PostgreSQL indexing is a product decision.",
    summary:
      "A practical argument for treating query plans, latency, and data shape as customer experience.",
  },
  {
    date: "19.01.2026",
    tag: "Leadership",
    title: "Technical leadership starts before the architecture diagram.",
    summary: "How to ask better questions when the business problem is still blurry.",
  },
];

export const phoneNumber = "+917758943614";
export const phoneFormatted = "+91 77589 43614";
export const whatsappLink =
  "https://wa.me/917758943614?text=Hi%20Ravi%2C%20I%20have%20a%20project%20worth%20discussing.";

export function Arrow({ long = false }: { long?: boolean }) {
  return (
    <svg className={long ? "arrow arrow-long" : "arrow"} viewBox="0 0 48 18" aria-hidden="true">
      <path d="M1 9.5C12 9 26 8.2 44 9" />
      <path d="m37 2 8 7-8 7" />
    </svg>
  );
}

function Clock({ compact = false }: { compact?: boolean }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <span className={compact ? "clock clock-compact" : "clock"}>
      <span className="clock-dot" />
      {time || "--:--:--"} IST
    </span>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="shell" data-reveal>
        <p className="eyebrow">Have a serious problem?</p>
        <h2>
          Got something worth building? <em>Let’s talk.</em>
        </h2>
        <div className="footer-actions">
          <a className="footer-email" href="mailto:hamravichauhan@gmail.com">
            hamravichauhan@gmail.com
          </a>
          <a className="footer-phone" href="tel:+917758943614">
            +91 77589 43614
          </a>
          <a className="button-primary" href={whatsappLink} target="_blank" rel="noreferrer">
            Message on WhatsApp <Arrow />
          </a>
        </div>
        <div className="footer-base">
          <p className="footnote">Built by hand. No templates, no tech-bro jargon.</p>
          <a href="https://github.com/hamravichauhan" target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <Link to="/">Home ↑</Link>
          <Clock compact />
        </div>
      </div>
    </footer>
  );
}

export function SiteLayout() {
  const location = useLocation();
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem("portfolio-theme") as Theme) || "light";
  });

  useEffect(() => {
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${location.pathname === "/" ? "Extrovert Nerd" : location.pathname.slice(1).replace(/^\w/, (c) => c.toUpperCase())} — Ravi Chauhan`;
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.dataset.visible = "true";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <div className="site" data-theme={theme}>
      <div className="grain" aria-hidden="true" />
      <header className="site-header">
        <nav className="nav shell" aria-label="Primary navigation">
          <Link className="wordmark" to="/" aria-label="Extrovert Nerd, home">
            Extrovert Nerd<span>_</span>
          </Link>
          <div className="nav-links">
            {["work", "about", "writing", "contact"].map((page) => (
              <NavLink key={page} to={`/${page}`}>
                {page[0].toUpperCase() + page.slice(1)}
              </NavLink>
            ))}
          </div>
          <div className="theme-switch" aria-label="Choose portfolio theme">
            <button
              type="button"
              className={theme === "light" ? "active" : ""}
              onClick={() => setTheme("light")}
              aria-pressed={theme === "light"}
            >
              Light
            </button>
            <span>/</span>
            <button
              type="button"
              className={theme === "dark" ? "active" : ""}
              onClick={() => setTheme("dark")}
              aria-pressed={theme === "dark"}
            >
              Ink
            </button>
          </div>
        </nav>
      </header>
      <Outlet />
      <Footer />
    </div>
  );
}

export function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="hero-grid shell">
          <div className="hero-kicker">
            <span>Independent engineering partner</span>
            <span>Goa, India · Worldwide</span>
          </div>
          <div className="hero-copy">
            <h1>
              I build the{" "}
              <em>
                unglamorous
                <span className="strike" aria-hidden="true" />
              </em>{" "}
              systems that make businesses run.
            </h1>
            <p className="hero-subhead">
              Full-stack developer · ML tinkerer · Goa, India <span>→ working globally.</span>
            </p>
            <div className="hero-actions">
              <a className="button-primary" href={whatsappLink} target="_blank" rel="noreferrer">
                Start a project <Arrow />
              </a>
              <Link className="text-link" to="/work">
                See selected work <span>→</span>
              </Link>
            </div>
          </div>
          <div className="hero-aside">
            <div className="hero-portrait-card">
              <div className="hero-portrait-img-wrap">
                <img
                  src="/ravi.jpg"
                  alt="Ravi Chauhan — full-stack developer in Goa"
                  className="hero-portrait-img"
                  loading="eager"
                />
              </div>
              <div className="hero-portrait-caption">
                <span>Ravi Chauhan</span>
                <span>Goa, India</span>
              </div>
            </div>
            <p>
              For founders and teams who need someone to think past the ticket and own the outcome.
            </p>
            <svg className="drawn-arrow" viewBox="0 0 100 80" aria-hidden="true">
              <path d="M90 6C54 10 28 29 19 65" />
              <path d="m10 53 9 14 15-8" />
            </svg>
          </div>
          <div className="availability">
            <div>
              <span className="pulse" />
              Available — Q4 2026
            </div>
            <span className="response">replies under 2 hours</span>
            <Clock />
          </div>
        </div>
      </section>
      <ProofStrip />
      <section className="home-bridge shell" data-reveal>
        <p className="eyebrow">Working principle / 01</p>
        <p>
          Good engineering should make the business <em>quieter</em>—fewer manual steps, fewer
          surprises, and fewer expensive decisions made twice.
        </p>
        <Link className="case-link" to="/about">
          How I work <Arrow long />
        </Link>
      </section>
      <SetupRating />
    </main>
  );
}

function SetupRating() {
  const [rating, setRating] = useState<number | null>(() => {
    const saved = localStorage.getItem("setup-rating");
    return saved ? Number(saved) : null;
  });

  const rate = (value: number) => {
    setRating(value);
    localStorage.setItem("setup-rating", String(value));
  };

  return (
    <section className="setup-section shell" data-reveal>
      <div className="setup-copy">
        <p className="eyebrow">A small interruption / For fun</p>
        <h2>
          Rate my setup—the place your next big thing <em>might come from.</em>
        </h2>
        <p>
          Mac mini, one good keyboard, too many terminal windows, and a view that occasionally wins
          against the work.
        </p>
      </div>
      <div className="setup-sketch" aria-label="Photo of Ravi's desk setup">
        <div className="setup-photo-frame">
          <img
            src="/setup.jpg"
            alt="Ravi's desk setup with Mac mini, monitor, laptop, and keyboard in Goa"
            className="setup-photo"
            loading="lazy"
          />
        </div>
        <span className="setup-note">Goa, usually after 10am</span>
      </div>
      <div className="rating-panel">
        <div className="rating-header">
          <span>YOUR VERDICT</span>
          <span>{rating ? `${rating}/5` : "—/5"}</span>
        </div>
        <div className="rating-buttons" role="group" aria-label="Rate this setup out of five">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              type="button"
              key={value}
              className={rating && value <= rating ? "selected" : ""}
              onClick={() => rate(value)}
              aria-label={`${value} out of 5`}
              aria-pressed={rating === value}
            >
              {value}
            </button>
          ))}
        </div>
        <p className="rating-response" aria-live="polite">
          {rating
            ? rating >= 4
              ? "Approved. I’ll try not to let the desk take the credit."
              : "Fair. The work is considerably tidier than the cables."
            : "Be honest. The Mac mini can take it."}
        </p>
      </div>
    </section>
  );
}

function WorkList() {
  return (
    <>
      <div className="work-list">
        {projects.map((project) => (
          <article className={`work-item ${project.className}`} key={project.number} data-reveal>
            <div className="work-inner shell">
              <div className="project-number">{project.number}</div>
              <div className="project-story">
                <h3>{project.title}</h3>
                <div className="project-notes">
                  <p>
                    <span>The problem</span>
                    {project.problem}
                  </p>
                  <p>
                    <span>The call</span>
                    {project.tradeoff}
                  </p>
                </div>
                <a
                  className="case-link"
                  href={`mailto:hamravichauhan@gmail.com?subject=Case study: ${encodeURIComponent(project.title)}`}
                >
                  Request full case study <Arrow long />
                </a>
              </div>
              <div className="metrics">
                {project.metrics.map(([value, label]) => (
                  <div className="metric" key={label}>
                    <strong>{value}</strong>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
      <article className="side-project shell" data-reveal>
        <div className="side-index">04 / SMALL &amp; SHARP</div>
        <div>
          <h3>CodeSmart AI</h3>
          <p>
            A private coding assistant tuned to run locally—because not every useful model needs a
            cloud bill.
          </p>
        </div>
        <div className="side-metrics">
          <span>
            <strong>68</strong> tok/s
          </span>
          <span>
            <strong>3.8</strong> GB VRAM
          </span>
          <span>
            <strong>$0</strong> /mo API
          </span>
        </div>
        <a
          className="case-link"
          href="mailto:hamravichauhan@gmail.com?subject=Case study: CodeSmart AI"
        >
          Request details <Arrow />
        </a>
      </article>
    </>
  );
}

export function WorkPage() {
  return (
    <main className="inner-page">
      <section className="page-intro shell" data-reveal>
        <p className="eyebrow">Selected work / 2023—26</p>
        <h1>Evidence, not adjectives.</h1>
        <p>
          Hard production problems, commercially useful outcomes, and the engineering decisions
          between them.
        </p>
      </section>
      <section className="work-section work-page">
        <WorkList />
      </section>
    </main>
  );
}

export function AboutPage() {
  return (
    <main className="inner-page">
      <section className="page-intro page-intro-about shell" data-reveal>
        <p className="eyebrow">About Ravi / Goa, India</p>
        <h1>Useful before impressive. Always.</h1>
        <p>
          Developer, ML tinkerer, speaker, occasional actor, and the person who will ask what this
          costs to run.
        </p>
      </section>
      <section className="about shell" data-reveal>
        <div className="about-label">
          <div className="about-portrait">
            <img src="/ravi.jpg" alt="Ravi Chauhan in Goa" className="about-photo" loading="lazy" />
          </div>
          <p className="eyebrow">A little context</p>
          <p className="margin-note">Quietly obsessive about the details.</p>
        </div>
        <div className="about-copy">
          <h2>I like systems that are useful before they are impressive.</h2>
          <div className="about-columns">
            <p>
              I live in Goa, where I spend an unreasonable number of hours on PostgreSQL indexes and
              running small LoRA models locally on a Mac mini. I’ve spoken to rooms of 500+ people,
              run a collegiate tech fest, and—slightly less predictably—acted in short films.
            </p>
            <p>
              That mix taught me to explain the complex without hiding behind jargon. I think about
              server bills, cash flow, and operational drag like an owner, because good engineering
              has to make business sense too.
            </p>
          </div>
        </div>
      </section>
      <section className="capabilities shell" data-reveal>
        <div className="cap-intro">
          <p className="eyebrow">Capabilities</p>
          <h2>From first commit to a quiet production server.</h2>
        </div>
        <div className="cap-list">
          {capabilities.map(([title, body], index) => (
            <div className="cap-row" key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </section>
      <ProofStrip />
    </main>
  );
}

export function WritingPage() {
  return (
    <main className="inner-page">
      <section className="page-intro shell" data-reveal>
        <p className="eyebrow">Writing / Field notes</p>
        <h1>Notes from the unglamorous parts.</h1>
        <p>Engineering, local AI, infrastructure, and leading technical work without theatre.</p>
      </section>
      <section className="writing-list shell" data-reveal>
        {writing.map((article, index) => (
          <a
            className="writing-row"
            href={`mailto:hamravichauhan@gmail.com?subject=Article: ${encodeURIComponent(article.title)}`}
            key={article.title}
          >
            <span className="writing-index">0{index + 1}</span>
            <div>
              <p className="writing-meta">
                {article.tag} · {article.date}
              </p>
              <h2>{article.title}</h2>
              <p>{article.summary}</p>
            </div>
            <Arrow long />
          </a>
        ))}
        <p className="writing-note">
          Longer essays are currently shared privately with clients and collaborators. Ask for one
          and I’ll send it over.
        </p>
      </section>
    </main>
  );
}

export function ContactPage() {
  return (
    <main className="inner-page contact-page">
      <section className="contact-intro shell" data-reveal>
        <div>
          <p className="eyebrow">Contact / Start a conversation</p>
          <h1>Bring me the problem you can’t afford to solve twice.</h1>
        </div>
        <div className="contact-details">
          <p>
            A useful first message includes the business problem, what already exists, and the
            decision or deadline you are working toward.
          </p>
          <a className="button-primary" href={whatsappLink} target="_blank" rel="noreferrer">
            Start on WhatsApp <Arrow />
          </a>
          <a className="contact-email" href="mailto:hamravichauhan@gmail.com">
            hamravichauhan@gmail.com
          </a>
          <a className="contact-phone" href="tel:+917758943614">
            +91 77589 43614
          </a>
        </div>
        <div className="contact-status">
          <span>
            <i className="pulse" /> Available — Q4 2026
          </span>
          <Clock />
        </div>
      </section>
    </main>
  );
}

export function NotFoundPage() {
  return (
    <main className="inner-page">
      <section className="page-intro shell">
        <p className="eyebrow">404 / Wrong turn</p>
        <h1>This page doesn’t exist.</h1>
        <Link className="case-link" to="/">
          Return home <Arrow long />
        </Link>
      </section>
    </main>
  );
}

function ProofStrip() {
  return (
    <section className="proof" aria-label="Selected credentials">
      <div className="proof-track">
        <span>Spoke to 500+</span>
        <i />
        <span>Directed a tech fest</span>
        <i />
        <span>100/100 Core Web Vitals</span>
        <i />
        <span>$0/mo AI bill</span>
      </div>
    </section>
  );
}
