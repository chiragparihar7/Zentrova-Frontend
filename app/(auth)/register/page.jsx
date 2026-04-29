"use client";

import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    if (res.ok) {
      window.location.href = "/login";
    } else {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      
      <div className="w-full max-w-md">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">
            Create your account
          </h1>
          <p className="text-muted text-sm mt-2">
            Start managing your projects with Zentrova
          </p>
        </div>

        {/* Card */}
        <div className="bg-soft border border-border rounded-2xl p-6 shadow-sm">
          
          {/* Inputs */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary transition"
            />

            <input
              type="email"
              placeholder="Email address"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary transition"
            />

            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2 mt-4 text-sm text-muted">
            <input type="checkbox" className="mt-1 accent-primary" />
            <p>
              I agree to the{" "}
              <span className="text-foreground cursor-pointer hover:underline">
                Terms
              </span>{" "}
              and{" "}
              <span className="text-foreground cursor-pointer hover:underline">
                Privacy Policy
              </span>
            </p>
          </div>

          {/* Button */}
          <button
            onClick={handleRegister}
            className="w-full mt-6 py-3 rounded-xl bg-primary text-white dark:text-black font-medium hover:opacity-90 transition"
          >
            Create Account
          </button>

          {/* Login Redirect */}
          <p className="text-center text-sm text-muted mt-6">
            Already have an account?{" "}
            <span
              onClick={() => (window.location.href = "/login")}
              className="text-foreground font-medium cursor-pointer hover:underline"
            >
              Sign in
            </span>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted mt-6">
          © {new Date().getFullYear()} Zentrova
        </p>
      </div>
    </div>
  );
}