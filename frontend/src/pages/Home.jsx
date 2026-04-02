import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const slides = [
  {
    url: "https://images.unsplash.com/photo-1568992688065-536aad8a12f6?w=1600&q=80",
    label: "Delivery & Courier",
  },
  {
    url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80",
    label: "Restaurant & Hospitality",
  },
  {
    url: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1600&q=80",
    label: "Freelance & Remote Work",
  },
  {
    url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600&q=80",
    label: "Office & Admin Support",
  },
  {
    url: "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=1600&q=80",
    label: "Customer Service",
  },
];


const features = [
  {
    title: "Built for UG Students",
    desc: "No experience needed. Browse tasks that fit around lectures, assignments, and campus life.",
  },
  {
    title: "Quick & Flexible",
    desc: "Complete tasks in your free time — morning, night, or between classes. You set your hours.",
  },
  {
    title: "Real Earnings",
    desc: "Get paid for data entry, app testing, surveys, photography & more. Providers pay you directly.",
  },
  {
    title: "Safe & Transparent",
    desc: "Providers sign in with verified accounts. Your contact info is only shared when you apply.",
  },
  {
    title: "Mobile Friendly",
    desc: "Apply for gigs from your phone between lectures. No laptop required.",
  },
  {
    title: "Skill Building",
    desc: "Build real portfolio experience in testing, marketing, research, and content creation.",
  },
];

const steps = [
  {
    n: "01",
    title: "Browse Open Gigs",
    desc: "No sign-up needed. Scroll through active tasks sorted by category and pay.",
  },
  {
    n: "02",
    title: "Pick One That Fits",
    desc: "Choose a task that matches your skills, schedule, and interests.",
  },
  {
    n: "03",
    title: "Complete & Submit",
    desc: "Do the work, submit your evidence — name, contact, and proof of completion.",
  },
  {
    n: "04",
    title: "Get Paid",
    desc: "The provider reviews your submission and contacts you directly to arrange payment.",
  },
];

const CATEGORIES = [
  { name: "Poster Design" },
  { name: "Photography" },
  { name: "Teaching" },
  { name: "Content Writing" },
  { name: "Social Media" },
  { name: "Security" },
  { name: "General" },
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % slides.length);
        setFading(false);
      }, 450);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const goTo = (i) => {
    if (i === current) return;
    setFading(true);
    setTimeout(() => {
      setCurrent(i);
      setFading(false);
    }, 400);
  };

  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      {/* HERO */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: "calc(100svh - 64px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "80px 24px",
        }}
      >
        {/* Slideshow bg */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img
            src={slides[0].url} // Keeps the first photo static
            alt="Background"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.22, 
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(5,5,12,0.62) 0%, rgba(5,5,12,0.80) 55%, rgba(5,5,12,0.96) 100%)",
            }}
          />
        </div>


        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: 680,
            margin: "0 auto",
          }}
        >
          
          <h1
            style={{
              fontSize: "clamp(40px,8vw,82px)",
              fontWeight: 800,
              color: "#fff",
              marginBottom: "1.25rem",
              letterSpacing: "-0.03em",
              lineHeight: 0.95,
              textShadow: "0 2px 24px rgba(0,0,0,0.5)",
            }}
          >
            Earn While
            <br />
            <span
              style={{
                background: "linear-gradient(135deg,#c4b5fd,#9d85ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              You Study.
            </span>
          </h1>

          <p
            style={{
              fontSize: "clamp(14px,2vw,17px)",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.75)",
              maxWidth: 500,
              margin: "0 auto 2.25rem",
              textShadow: "0 1px 8px rgba(0,0,0,0.4)",
            }}
          >
            UniGig connects undergraduate students with flexible micro-tasks —
            from app testing to data entry. No experience required.
          </p>

          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link to="/jobs">
              <button
                className="btn-primary"
                style={{ fontSize: 15, padding: "12px 28px" }}
              >
                Browse Gigs
              </button>
            </Link>
            <Link to="/login">
              <button
                style={{
                  fontSize: 15,
                  padding: "12px 28px",
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.25)",
                  background: "rgba(255,255,255,0.08)",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: 600,
                  backdropFilter: "blur(8px)",
                  transition: "background 0.2s, transform 0.15s",
                  fontFamily: "var(--font-sans)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.16)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.transform = "none";
                }}
              >
                Post a Task
              </button>
            </Link>
          </div>

          <p
            style={{
              marginTop: 20,
              fontSize: 12,
              color: "rgba(255,255,255,0.42)",
            }}
          >
            Joined by students from 40+ universities · Free to sign up
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        style={{ maxWidth: 1000, margin: "0 auto", padding: "72px 24px" }}
      >
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--color-brand-light)",
              marginBottom: 8,
            }}
          >
            How It Works
          </p>
          <h2
            style={{
              fontSize: "clamp(24px,4vw,38px)",
              fontWeight: 800,
              color: "var(--text)",
            }}
          >
            4 Steps to Your First Earning
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
            gap: 14,
          }}
        >
          {steps.map((s) => (
            <div
              key={s.n}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 14,
                padding: "22px 20px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                transition: "border-color 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(108,71,255,0.45)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.transform = "none";
              }}
            >
              <span
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  color: "var(--border)",
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                }}
              >
                {s.n}
              </span>
              <h3
                style={{
                  fontWeight: 700,
                  fontSize: 15,
                  color: "var(--text)",
                  letterSpacing: "-0.01em",
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  fontSize: 13,
                  lineHeight: 1.65,
                  color: "var(--muted)",
                }}
              >
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* BROWSE BY CATEGORY */}
      <section
        style={{
          background: "var(--surface)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "60px 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--color-brand-light)",
                marginBottom: 8,
              }}
            >
              Browse by Category
            </p>
            <h2
              style={{
                fontSize: "clamp(22px,4vw,34px)",
                fontWeight: 800,
                color: "var(--text)",
              }}
            >
              Find Work That Suits You
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))",
              gap: 10,
            }}
          >
            {CATEGORIES.map((c) => (
              <Link key={c.name} to={`/jobs?cat=${encodeURIComponent(c.name)}`}>
                <div
                  style={{
                    background: "var(--raised)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    padding: "16px 10px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                    transition: "all 0.2s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(108,71,255,0.45)";
                    e.currentTarget.style.background = "var(--color-brand-dim)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.background = "var(--raised)";
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  <p
                    style={{
                      fontWeight: 600,
                      fontSize: 12,
                      color: "var(--text)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {c.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY UNIGIG */}
      <section
        style={{ maxWidth: 1000, margin: "0 auto", padding: "72px 24px" }}
      >
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--color-brand-light)",
              marginBottom: 8,
            }}
          >
            Why UniGig
          </p>
          <h2
            style={{
              fontSize: "clamp(22px,4vw,34px)",
              fontWeight: 800,
              color: "var(--text)",
            }}
          >
            Designed Around Your Student Life
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
            gap: 14,
          }}
        >
          {features.map((f) => (
            <div
              key={f.title}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 14,
                padding: "22px 20px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "rgba(108,71,255,0.4)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "var(--border)")
              }
            >
              <h3
                style={{
                  fontWeight: 700,
                  fontSize: 15,
                  color: "var(--text)",
                  letterSpacing: "-0.01em",
                }}
              >
                {f.title}
              </h3>
              <p
                style={{ fontSize: 13, lineHeight: 1.7, color: "var(--muted)" }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "0 24px 80px" }}>
        <div
          style={{
            maxWidth: 860,
            margin: "0 auto",
            borderRadius: 20,
            padding: "56px 40px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            background: "var(--surface)",
            border: "1px solid var(--border)",
          }}
        >
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2
              style={{
                fontSize: "clamp(22px,5vw,40px)",
                fontWeight: 800,
                color: "var(--text)",
                marginBottom: 14,
                letterSpacing: "-0.03em",
              }}
            >
              Ready to Start Earning?
            </h2>
            <p
              style={{
                fontSize: 15,
                color: "var(--muted)",
                lineHeight: 1.7,
                maxWidth: 460,
                margin: "0 auto 28px",
              }}
            >
              Join thousands of students already earning with UniGig. No CV, no
              interviews — just pick a task and get started today.
            </p>
            <div
              style={{
                display: "flex",
                gap: 12,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link to="/jobs">
                <button
                  className="btn-primary"
                  style={{ fontSize: 15, padding: "12px 28px" }}
                >
                  Find Gigs Now
                </button>
              </Link>
              <Link to="/about">
                <button
                  className="btn-secondary"
                  style={{ fontSize: 15, padding: "12px 28px" }}
                >
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
