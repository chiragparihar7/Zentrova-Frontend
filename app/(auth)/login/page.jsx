"use client";

import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [focused, setFocused] = useState(null);

  const handleLogin = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "/";
    } else {
      alert(data.msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      
      <div className="w-full max-w-md">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">
            Zentrova
          </h1>
          <p className="text-muted text-sm mt-2">
            Sign in to continue your workspace
          </p>
        </div>

        {/* Card */}
        <div className="bg-soft border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition">
          
          {/* Floating Input - Email */}
          <div className="relative mb-5">
            <input
              type="email"
              value={form.email}
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused(null)}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="peer w-full px-4 pt-5 pb-2 rounded-xl bg-background border border-border text-foreground placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary transition"
              placeholder="Email"
            />
            <label
              className={`absolute left-4 transition-all text-sm ${
                form.email || focused === "email"
                  ? "top-2 text-xs text-muted"
                  : "top-3 text-muted"
              }`}
            >
              Email address
            </label>
          </div>

          {/* Floating Input - Password */}
          <div className="relative mb-4">
            <input
              type="password"
              value={form.password}
              onFocus={() => setFocused("password")}
              onBlur={() => setFocused(null)}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="peer w-full px-4 pt-5 pb-2 rounded-xl bg-background border border-border text-foreground placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary transition"
              placeholder="Password"
            />
            <label
              className={`absolute left-4 transition-all text-sm ${
                form.password || focused === "password"
                  ? "top-2 text-xs text-muted"
                  : "top-3 text-muted"
              }`}
            >
              Password
            </label>
          </div>

          {/* Row */}
          <div className="flex justify-between items-center text-sm mb-5">
            <label className="flex items-center gap-2 text-muted cursor-pointer">
              <input type="checkbox" className="accent-primary" />
              Remember
            </label>

            <button className="text-muted hover:text-foreground transition">
              Forgot?
            </button>
          </div>

          {/* Button */}
          <button
            onClick={handleLogin}
            className="w-full py-3 rounded-xl bg-primary text-white dark:text-black font-medium tracking-wide hover:scale-[1.02] active:scale-[0.98] transition"
          >
            Sign In
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-border"></div>
            <span className="text-xs text-muted">New here?</span>
            <div className="flex-1 h-px bg-border"></div>
          </div>

          {/* Register */}
          <button
            onClick={() => (window.location.href = "/register")}
            className="w-full py-3 rounded-xl border border-border text-foreground hover:bg-background transition"
          >
            Create an account
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted mt-6">
          Secure login powered by Zentrova
        </p>
      </div>
    </div>
  );
}