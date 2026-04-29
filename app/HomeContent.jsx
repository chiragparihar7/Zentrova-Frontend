"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import LeadsPage from "@/components/leads/LeadsPage";

export default function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tab = searchParams.get("tab") || "dashboard";

  // ✅ Mobile sidebar state
  const [isOpen, setIsOpen] = useState(false);

  // ✅ Prevent UI flash
  const [loading, setLoading] = useState(true);

  // ✅ Auth check
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  // ⛔ Prevent rendering until auth checked
  if (loading) return null;

  return (
    <div className="flex bg-background min-h-screen">

      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex-1 flex flex-col w-full">

        {/* Navbar */}
        <Navbar setIsOpen={setIsOpen} />

        {/* Main Content */}
        <div className="p-4 md:p-6 space-y-6">

          {/* DASHBOARD */}
          {tab === "dashboard" && (
            <div className="bg-white p-4 md:p-6 rounded-xl border border-border">
              <h1 className="text-lg md:text-xl font-semibold text-primary">
                Dashboard
              </h1>
              <p className="text-sm text-muted mt-2">
                Welcome to your CRM dashboard 🚀
              </p>
            </div>
          )}

          {/* LEADS */}
          {tab === "leads" && <LeadsPage />}

          {/* ANALYTICS */}
          {tab === "analytics" && (
            <div className="bg-white p-4 md:p-6 rounded-xl border border-border">
              <h1 className="text-lg md:text-xl font-semibold text-primary">
                Analytics
              </h1>
            </div>
          )}

          {/* SETTINGS */}
          {tab === "settings" && (
            <div className="bg-white p-4 md:p-6 rounded-xl border border-border">
              <h1 className="text-lg md:text-xl font-semibold text-primary">
                Settings
              </h1>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}