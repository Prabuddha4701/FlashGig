import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNumber: "",
    landLine: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  const set = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      if (!formData.email || !formData.password) {
        toast.error("Fill in all fields.");
        return;
      }
      setLoading(true);
      try {
        await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password,
        );
        toast.success("Welcome back! 👋");
        navigate("/dashboard");
      } catch (err) {
        toast.error(err.message || "Authentication error.");
      } finally {
        setLoading(false);
      }
    } else {
      const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        contactNumber,
      } = formData;
      if (
        !firstName ||
        !lastName ||
        !email ||
        !password ||
        !confirmPassword ||
        !contactNumber
      ) {
        toast.error("Please fill in all required fields.");
        return;
      }
      if (password !== confirmPassword) {
        toast.error("Passwords do not match.");
        return;
      }
      const passwordRules =
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/;
      if (!passwordRules.test(password)) {
        toast.error(
          "Password must be at least 6 characters, include one capital letter, one number, and one symbol.",
        );
        return;
      }
      setLoading(true);
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );

        await updateProfile(user, { displayName: `${firstName} ${lastName}` });

        await setDoc(doc(db, "providers", user.uid), {
          firstName,
          lastName,
          email,
          contactNumber,
          landLine: formData.landLine || "",
          address: formData.address || "",
          createdAt: new Date().toISOString(),
        });

        toast.success("Account created! 🎉");
        navigate("/dashboard");
      } catch (err) {
        toast.error(err.message || "Registration error.");
      } finally {
        setLoading(false);
      }
    }
  };

  const switchMode = () => {
    setIsLogin((l) => !l);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      contactNumber: "",
      landLine: "",
    });
  };

  const fieldStyle = { display: "flex", flexDirection: "column", gap: 18 };

  return (
    <div className="min-h-[calc(100svh-64px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 justify-center mb-6"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #5b21b6)",
              }}
            >
              UG
            </div>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: 20,
                color: "var(--text)",
              }}
            >
              UniGig
            </span>
          </Link>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: 26,
              color: "var(--text)",
              marginBottom: 6,
            }}
          >
            {isLogin ? "Provider Sign In" : "Create Account"}
          </h1>
          <p style={{ fontSize: 13, color: "var(--muted)" }}>
            {isLogin
              ? "Access your dashboard to manage gigs"
              : "Sign up to start posting tasks"}
          </p>
        </div>

        <div
          className="rounded-2xl border p-8"
          style={{
            background: "var(--surface)",
            borderColor: "var(--border)",
            borderTop: "3px solid var(--color-brand)",
          }}
        >
          <form onSubmit={handleSubmit} style={fieldStyle}>
            {!isLogin && (
              <>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                  }}
                >
                  <div>
                    <label className="label">
                      First Name{" "}
                      <span style={{ color: "var(--color-brand-light)" }}>
                        *
                      </span>
                    </label>
                    <input
                      className="input"
                      type="text"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={set("firstName")}
                    />
                  </div>
                  <div>
                    <label className="label">
                      Last Name{" "}
                      <span style={{ color: "var(--color-brand-light)" }}>
                        *
                      </span>
                    </label>
                    <input
                      className="input"
                      type="text"
                      placeholder="Silva"
                      value={formData.lastName}
                      onChange={set("lastName")}
                    />
                  </div>
                </div>

                <div>
                  <label className="label">
                    Contact Number{" "}
                    <span style={{ color: "var(--color-brand-light)" }}>*</span>
                  </label>
                  <input
                    className="input"
                    type="tel"
                    placeholder="+94 77 123 4567"
                    value={formData.contactNumber}
                    onChange={set("contactNumber")}
                  />
                </div>

                <div>
                  <label
                    className="label"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    Land Line
                    <span
                      style={{
                        fontWeight: 400,
                        fontSize: 11,
                        color: "var(--muted)",
                      }}
                    >
                      Optional
                    </span>
                  </label>
                  <input
                    className="input"
                    type="tel"
                    placeholder="+94 11 234 5678"
                    value={formData.landLine}
                    onChange={set("landLine")}
                  />
                </div>

                <div>
                  <label
                    className="label"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    Business / Personal Address
                    <span
                      style={{
                        fontWeight: 400,
                        fontSize: 11,
                        color: "var(--muted)",
                      }}
                    >
                      Optional
                    </span>
                  </label>
                  <textarea
                    className="input"
                    placeholder="123 Main Street, Colombo 03"
                    rows={2}
                    style={{ resize: "none" }}
                    value={formData.address}
                    onChange={set("address")}
                  />
                </div>
              </>
            )}

            <div>
              <label className="label">
                Email Address{" "}
                {!isLogin && (
                  <span style={{ color: "var(--color-brand-light)" }}>*</span>
                )}
              </label>
              <input
                className="input"
                type="email"
                placeholder="you@university.edu"
                value={formData.email}
                onChange={set("email")}
              />
            </div>

            <div>
              <label className="label">
                Password{" "}
                {!isLogin && (
                  <span style={{ color: "var(--color-brand-light)" }}>*</span>
                )}
              </label>
              <input
                className="input"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={set("password")}
              />
            </div>

            {!isLogin && (
              <div>
                <label className="label">
                  Confirm Password{" "}
                  <span style={{ color: "var(--color-brand-light)" }}>*</span>
                </label>
                <input
                  className="input"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={set("confirmPassword")}
                />
              </div>
            )}

            <button
              type="submit"
              className="btn-primary w-full py-3 text-base mt-1"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner" /> Processing…
                </>
              ) : isLogin ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div
            className="text-center mt-5"
            style={{ fontSize: 13, color: "var(--muted)" }}
          >
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              className="font-semibold ml-1"
              style={{
                color: "var(--color-brand-light)",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              onClick={switchMode}
            >
              {isLogin ? "Sign up" : "Log in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
