"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import { useSearchParams } from "next/navigation";
import LeadsPage from "@/components/leads/LeadsPage";

export default function HomeContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "dashboard";

  // ✅ ADD THIS (controls mobile sidebar)
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex bg-background min-h-screen">

      {/* ✅ PASS STATE TO SIDEBAR */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex-1 flex flex-col w-full">

        {/* ✅ PASS TO NAVBAR */}
        <Navbar setIsOpen={setIsOpen} />

        {/* ✅ RESPONSIVE PADDING */}
        <div className="p-4 md:p-6 space-y-6">

          {tab === "dashboard" && (
            <>
              {/* dashboard content */}
            </>
          )}

          {tab === "leads" && <LeadsPage />}

          {tab === "analytics" && (
            <div className="bg-white p-4 md:p-6 rounded-xl border border-border">
              <h1 className="text-lg md:text-xl font-semibold text-primary">
                Analytics
              </h1>
            </div>
          )}

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