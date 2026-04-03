import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import api from "../api";

const CATEGORIES = [
  "General",
  "Photography",
  "Teaching",
  "Content Writing",
  "Social Media",
  "Security",
  "Delivery Rider",
];

const categoryColors = {
  General: {
    bg: "rgba(124,58,237,.12)",
    color: "#a78bfa",
    border: "rgba(124,58,237,.25)",
  },
  "Data Entry": {
    bg: "rgba(245,158,11,.12)",
    color: "#fbbf24",
    border: "rgba(245,158,11,.25)",
  },
  "Social Media": {
    bg: "rgba(59,130,246,.12)",
    color: "#60a5fa",
    border: "rgba(59,130,246,.25)",
  },
  "Usability Testing": {
    bg: "rgba(16,185,129,.12)",
    color: "#34d399",
    border: "rgba(16,185,129,.25)",
  },
  Photography: {
    bg: "rgba(236,72,153,.12)",
    color: "#f472b6",
    border: "rgba(236,72,153,.25)",
  },
  "Content Writing": {
    bg: "rgba(245,158,11,.12)",
    color: "#fbbf24",
    border: "rgba(245,158,11,.25)",
  },
  "Research & Survey": {
    bg: "rgba(16,185,129,.12)",
    color: "#34d399",
    border: "rgba(16,185,129,.25)",
  },
};

const CITIES = [
  "Colombo",
  "Negombo",
  "Kandy",
  "Galle",
  "Kurunegala",
  "Jaffna",
  "Anuradhapura",
  "Matara",
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("jobs");
  const [myJobs, setMyJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [jobForm, setJobForm] = useState({
    title: "",
    description: "",
    category: "General",
    pay: "",
    address: "",
    city: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => {
      if (!u) navigate("/login");
      else {
        setUser(u);
        fetchJobs();
      }
    });
    return () => unsub();
  }, [navigate]);

  const fetchJobs = async () => {
    setLoadingJobs(true);
    try {
      if (!auth.currentUser) return;
      const token = await auth.currentUser.getIdToken();
      const res = await api.get("/jobs/provider", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMyJobs(
        res.data.map((j) => ({
          ...j,
          status: new Date(j.expires_at) > new Date() ? "Active" : "Expired",
        })),
      );
    } catch {
      toast.error("Failed to load your gigs.");
    } finally {
      setLoadingJobs(false);
    }
  };

  const handlePostJob = async (e) => {
    e.preventDefault();
    if (!jobForm.title || !jobForm.description || !jobForm.pay) {
      toast.error("All fields including payment are required.");
      return;
    }
    setSubmitting(true);
    try {
      const token = await auth.currentUser.getIdToken();
      await api.post("/jobs/", jobForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Gig posted successfully! ");
      setJobForm({
        title: "",
        description: "",
        category: "General",
        pay: "",
        address: "",
        city: "",
      });
      setTab("jobs");
      fetchJobs();
    } catch {
      toast.error("Failed to post gig.");
    } finally {
      setSubmitting(false);
    }
  };

  const activeCount = myJobs.filter((j) => j.status === "Active").length;
  const expiredCount = myJobs.filter((j) => j.status === "Expired").length;

  return (
    <div className="page">
      
      <div style={{ marginBottom: 32 }}>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(24px,4vw,36px)",
            color: "var(--text)",
            marginBottom: 6,
          }}
        >
          Provider Dashboard
        </h1>
        <p style={{ fontSize: 13, color: "var(--muted)" }}>
          {user?.email && (
            <span
              style={{ color: "var(--color-brand-light)", fontWeight: 600 }}
            >
              {user.email}
            </span>
          )}
          {user?.email && " · "}Manage your gigs and track applications.
        </p>
      </div>

      
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 14,
          marginBottom: 32,
        }}
      >
        {[
          { label: "Total Gigs", value: myJobs.length, color: "#a78bfa" },
          { label: "Active", value: activeCount, color: "#34d399" },
          { label: "Expired", value: expiredCount, color: "#f87171" },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 16,
              padding: "20px 22px",
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: 26,
                  color: s.color,
                  lineHeight: 1,
                }}
              >
                {s.value}
              </p>
              <p
                style={{
                  fontSize: 11,
                  color: "var(--muted)",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: ".07em",
                  marginTop: 3,
                }}
              >
                {s.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      
      <div
        style={{
          display: "inline-flex",
          gap: 4,
          padding: 4,
          borderRadius: 12,
          background: "var(--raised)",
          border: "1px solid var(--border)",
          marginBottom: 24,
        }}
      >
        {[
          ["jobs", "My Gigs"],
          ["newJob", "＋  Post a Gig"],
        ].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            style={{
              padding: "9px 22px",
              borderRadius: 9,
              fontWeight: 600,
              fontSize: 13,
              border: "none",
              cursor: "pointer",
              transition: "all .2s",
              background: tab === key ? "var(--color-brand)" : "transparent",
              color: tab === key ? "#fff" : "var(--muted)",
              fontFamily: "var(--font-sans)",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      
      {tab === "jobs" && (
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 20,
            padding: "28px 28px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 18,
                color: "var(--text)",
              }}
            >
              Posted Gigs
            </h2>
            <span
              style={{
                fontSize: 12,
                color: "var(--subtle)",
                background: "var(--raised)",
                border: "1px solid var(--border)",
                padding: "4px 14px",
                borderRadius: 999,
              }}
            >
              {myJobs.length} total
            </span>
          </div>

          {loadingJobs ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "56px 0",
              }}
            >
              <div
                className="spinner"
                style={{ width: 32, height: 32, borderWidth: 3 }}
              />
            </div>
          ) : myJobs.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "56px 0",
                border: "1px dashed var(--border)",
                borderRadius: 12,
              }}
            >
              <p style={{ fontSize: 36, marginBottom: 10 }}>📭</p>
              <p
                style={{
                  color: "var(--muted)",
                  fontSize: 14,
                  marginBottom: 16,
                }}
              >
                No gigs posted yet.
              </p>
              <button
                style={{
                  padding: "8px 20px",
                  borderRadius: 9,
                  fontSize: 13,
                  fontWeight: 600,
                  background: "var(--color-brand)",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-sans)",
                }}
                onClick={() => setTab("newJob")}
              >
                Post Your First Gig
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {myJobs.map((job) => {
                const catStyle =
                  categoryColors[job.category] || categoryColors["General"];
                const daysLeft = Math.max(
                  0,
                  Math.floor(
                    (new Date(job.expires_at) - Date.now()) / 86400000,
                  ),
                );
                return (
                  <div
                    key={job.id}
                    style={{
                      background: "var(--raised)",
                      border: "1px solid var(--border)",
                      borderRadius: 14,
                      padding: "18px 20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 16,
                      transition: "border-color .2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.borderColor =
                        "rgba(124,58,237,.4)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderColor = "var(--border)")
                    }
                  >
                    
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        flex: 1,
                        minWidth: 0,
                      }}
                    >
                      <div style={{ minWidth: 0 }}>
                        <p
                          style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 700,
                            fontSize: 15,
                            color: "var(--text)",
                            marginBottom: 6,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {job.title}
                        </p>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            flexWrap: "wrap",
                          }}
                        >
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 700,
                              padding: "2px 9px",
                              borderRadius: 999,
                              background: "var(--color-brand)",
                              color: "white",
                              border: `1px solid ${catStyle.border}`,
                            }}
                          >
                            {job.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    
                    <button
                      style={{
                        padding: "8px 18px",
                        borderRadius: 9,
                        fontSize: 13,
                        fontWeight: 600,
                        background: "transparent",
                        color: "var(--color-brand-light)",
                        border: "1px solid rgba(124,58,237,.35)",
                        cursor: "pointer",
                        fontFamily: "var(--font-sans)",
                        whiteSpace: "nowrap",
                        transition: "all .15s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "rgba(124,58,237,.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                      onClick={() => navigate(`/jobs/${job.id}/applications`)}
                    >
                      View Apps →
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      
      {tab === "newJob" && (
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderTop: "3px solid var(--color-brand)",
            borderRadius: 20,
            padding: "32px 32px",
            maxWidth: 560,
            margin: "0 auto",
          }}
        >
          <div style={{ marginBottom: 24 }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: 22,
                color: "var(--text)",
                marginBottom: 4,
              }}
            >
              Post a New Gig
            </h2>
            <p style={{ fontSize: 13, color: "var(--muted)" }}>
              Your task will be live for 7 days, visible to all UG students.
            </p>
          </div>

          <form
            onSubmit={handlePostJob}
            style={{ display: "flex", flexDirection: "column", gap: 18 }}
          >
            <div>
              <label className="label">Gig Title</label>
              <input
                className="input"
                type="text"
                placeholder="e.g. Test my new Android app"
                value={jobForm.title}
                onChange={(e) =>
                  setJobForm({ ...jobForm, title: e.target.value })
                }
              />
            </div>

            <div>
              <label className="label">Category</label>
              <select
                className="input"
                value={jobForm.category}
                onChange={(e) =>
                  setJobForm({ ...jobForm, category: e.target.value })
                }
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">City</label>
              <select
                className="input"
                value={jobForm.city}
                onChange={(e) =>
                  setJobForm({
                    ...jobForm,
                    city: e.target.value,
                  })
                }
              >
                <option value="">Select city</option>
                {CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">Address</label>
              <input
                className="input"
                type="text"
                placeholder="Enter the address where the task needs to be performed"
                value={jobForm.address}
                onChange={(e) =>
                  setJobForm({
                    ...jobForm,
                    address: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="label">Payment (LKR)</label>
              <input
                className="input"
                type="number"
                placeholder="Enter payment amount"
                value={jobForm.pay}
                onChange={(e) =>
                  setJobForm({
                    ...jobForm,
                    pay: e.target.value === "" ? "" : Number(e.target.value),
                  })
                }
              />
            </div>

            <div>
              <label className="label">Detailed Instructions</label>
              <textarea
                className="input"
                rows={6}
                placeholder="Describe exactly what you need done, and what evidence you require."
                value={jobForm.description}
                onChange={(e) =>
                  setJobForm({ ...jobForm, description: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              style={{
                padding: "13px",
                borderRadius: 10,
                fontSize: 15,
                fontWeight: 700,
                background: "var(--color-brand)",
                color: "#fff",
                border: "none",
                cursor: submitting ? "not-allowed" : "pointer",
                opacity: submitting ? 0.7 : 1,
                fontFamily: "var(--font-sans)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <span className="spinner" /> Posting…
                </>
              ) : (
                "Post Gig →"
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
