"use client";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import { useSearchParams } from "next/navigation";
import LeadsPage from "@/components/leads/LeadsPage"; // ✅ NEW

export default function Home() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "dashboard";

  return (
    <div className="flex bg-background min-h-screen">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Navbar />

        <div className="p-6 space-y-6">

          {/* DASHBOARD */}
          {tab === "dashboard" && (
            <> 
              {/* keep your existing dashboard code */}
            </>
          )}

          {/* 🔥 LEADS (UPDATED) */}
          {tab === "leads" && <LeadsPage />}

          {/* ANALYTICS */}
          {tab === "analytics" && (
            <div className="bg-white p-6 rounded-xl border border-border">
              <h1 className="text-xl font-semibold text-primary">
                Analytics
              </h1>
            </div>
          )}

          {/* SETTINGS */}
          {tab === "settings" && (
            <div className="bg-white p-6 rounded-xl border border-border">
              <h1 className="text-xl font-semibold text-primary">
                Settings
              </h1>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}