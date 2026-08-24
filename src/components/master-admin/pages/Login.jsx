// src/components/master-admin/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";
import landingbg from "../../../assets/images/landing-bg.jpg";
import { API_URL } from "../../../utils/api.js";
import { persistMasterAdminSession } from "../../../utils/masterAdminAuth.js";

export default function MasterAdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/master-admin/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success || !data.token) {
        setError(data.message || "Invalid email or password");
        return;
      }

      persistMasterAdminSession({ token: data.token, user: data.user });
      navigate("/master-admin/dashboard");
    } catch {
      setError("Unable to reach server. Is the API running on port 4500?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative isolate overflow-hidden min-h-screen flex items-center justify-center py-16 md:py-24">
      {/* Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <img
          src={landingbg}
          alt="Background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gray/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-via-white/80 via-white/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-md w-full px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-md">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold tracking-wide text-emerald-300">
            <Shield className="mr-1 h-3.5 w-3.5" /> Master Admin Access
          </span>

          <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Master Admin <span className="text-emerald-300">Login</span>
          </h1>
          <p className="mt-1 text-sm text-slate-300">Secure access to admin panel</p>

          <div className="group relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur shadow-lg shadow-black/20 ring-1 ring-white/10 mt-6">
            <form onSubmit={handleSubmit} className="grid gap-3" noValidate>
              {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-red-300 mt-0.5 flex-none" />
                  <p className="text-xs text-red-300">{error}</p>
                </div>
              )}

              <label className="mt-2 text-xs font-medium text-slate-200" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@scholarsmediatech.com"
                  autoComplete="username"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-3 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
                />
              </div>

              <div className="mt-1 flex items-center justify-between">
                <label className="text-xs font-medium text-slate-200" htmlFor="password">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  id="password"
                  name="password"
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-10 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-200 hover:bg-white/10"
                  aria-label={showPass ? "Hide password" : "Show password"}
                >
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-4 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Logging in..." : "Login as Master Admin"}
              </button>
            </form>

            <p className="mt-4 text-center text-[11px] text-slate-300">
              Default dev credentials are set in <code className="text-slate-200">server/.env</code> (see{" "}
              <code className="text-slate-200">.env.example</code>).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
