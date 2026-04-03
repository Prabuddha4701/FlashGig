import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { auth } from "../firebase";
import api from "../api";

export default function JobApplications() {
  const { id } = useParams();
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async () => {
      try {
        const headers = auth.currentUser
          ? { Authorization: `Bearer ${await auth.currentUser.getIdToken()}` }
          : {};
        const res = await api.get(`/applications/job/${id}`, { headers });
        setApps(res.data);
      } catch {
        setError("Could not load applications.");
      } finally {
        setLoading(false);
      }
    });
    return () => unsub();
  }, [id]);

  if (loading)
    return (
      <div
        className="flex items-center justify-center"
        style={{ minHeight: "60vh" }}
      >
        <div
          className="spinner"
          style={{ width: 36, height: 36, borderWidth: 3 }}
        />
      </div>
    );

  return (
    <div className="page">
      
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm mb-6"
        style={{ color: "var(--muted)" }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.color = "var(--color-brand-light)")
        }
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
      >
        ← Back to Dashboard
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-7">
        <div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(22px,4vw,32px)",
              color: "var(--text)",
              marginBottom: 4,
            }}
          >
            Applications
          </h1>
          <p
            style={{
              fontSize: 12,
              color: "var(--subtle)",
              fontFamily: "monospace",
            }}
          >
            Job ID: {id.slice(0, 16)}…
          </p>
        </div>
        <span className="badge badge-brand text-sm">
          {apps.length} Submission{apps.length !== 1 ? "s" : ""}
        </span>
      </div>

      {error && (
        <div
          className="rounded-xl p-4 mb-6 flex items-center gap-3"
          style={{
            background: "rgba(239,68,68,.08)",
            border: "1px solid rgba(239,68,68,.2)",
            color: "#ef4444",
            fontSize: 13,
          }}
        >
          {error}
        </div>
      )}

      {apps.length === 0 && !error ? (
        <div
          className="rounded-2xl p-16 text-center"
          style={{
            background: "var(--surface)",
            border: "1px dashed var(--border)",
          }}
        >
          <p style={{ fontSize: 36, marginBottom: 8 }}>📂</p>
          <p style={{ color: "var(--muted)", fontSize: 15 }}>
            No applications yet. Check back soon.
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {apps.map((app, i) => (
            <div
              key={app.id}
              className="rounded-2xl border p-6 transition-all"
              style={{
                background: "var(--surface)",
                borderColor: "var(--border)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "rgba(124,58,237,.4)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "var(--border)")
              }
            >
              
              <div
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                      style={{
                        background: "linear-gradient(135deg,#7c3aed,#5b21b6)",
                      }}
                    >
                      {app.worker_name.slice(0, 2).toUpperCase()}
                    </span>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: 16,
                        color: "var(--text)",
                      }}
                    >
                      {app.worker_name}
                    </h3>
                    <span className="badge badge-brand">#{i + 1}</span>
                  </div>
                  <p
                    style={{
                      fontSize: 12,
                      color: "var(--color-accent-light)",
                      marginLeft: 40,
                    }}
                  >
                    {app.contact_info}
                  </p>
                </div>
                <p
                  style={{
                    fontSize: 11,
                    color: "var(--subtle)",
                    background: "var(--raised)",
                    border: "1px solid var(--border)",
                    padding: "3px 10px",
                    borderRadius: 8,
                    whiteSpace: "nowrap",
                  }}
                >
                  {new Date(app.timestamp).toLocaleString()}
                </p>
              </div>

              
              <div>
                <p className="label mb-2">Submission Evidence</p>
                <div
                  className="rounded-xl p-4"
                  style={{
                    background: "var(--raised)",
                    border: "1px solid var(--border)",
                    fontSize: 13,
                    color: "var(--muted)",
                    lineHeight: 1.7,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {app.submission_data}
                </div>
              </div>

              
              <div className="flex justify-end gap-2 mt-4">
                <button
                  className="btn-secondary"
                  style={{
                    padding: "6px 14px",
                    fontSize: 12,
                    marginTop: "10px",
                  }}
                  onClick={() =>
                    navigator.clipboard?.writeText(app.contact_info)
                  }
                >
                  Copy Contact
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
