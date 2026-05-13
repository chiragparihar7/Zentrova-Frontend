"use client";

import { useState, useEffect } from "react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

// LAYOUT
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

// LEADS
import LeadsPage from "@/components/leads/LeadsPage";

// PROJECTS
import ProjectList from "@/components/projects/ProjectList";

// APPOINTMENTS
import AppointmentPage from "@/components/appointments/AppointmentPage";

export default function HomeContent() {
  const router = useRouter();

  const searchParams =
    useSearchParams();

  const tab =
    searchParams.get("tab") ||
    "dashboard";

  // MOBILE SIDEBAR
  const [isOpen, setIsOpen] =
    useState(false);

  // LOADING STATE
  const [loading, setLoading] =
    useState(true);

  // AUTH CHECK
  useEffect(() => {
    const token =
      localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  // PREVENT FLASH
  if (loading) return null;

  return (
    <div className="flex bg-background min-h-screen">
      {/* SIDEBAR */}
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      {/* RIGHT SIDE */}
      <div className="flex-1 flex flex-col w-full">
        {/* NAVBAR */}
        <Navbar
          setIsOpen={setIsOpen}
        />

        {/* CONTENT */}
        <div className="p-4 md:p-6 space-y-6">
          {/* DASHBOARD */}
          {tab === "dashboard" && (
            <div className="space-y-6">
              {/* HERO */}
              <div className="bg-gradient-to-r from-[#1E1E1E] to-[#2B2B2B] rounded-3xl p-6 md:p-10 text-white shadow-xl">
                <h1 className="text-3xl md:text-4xl font-bold">
                  Welcome to Zentrova 🚀
                </h1>

                <p className="text-white/70 mt-3 max-w-2xl">
                  Manage leads,
                  projects, appointments
                  and client workflows
                  from one premium CRM
                  dashboard.
                </p>
              </div>

              {/* QUICK STATS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-white border border-border rounded-3xl p-6 shadow-sm">
                  <p className="text-muted text-sm">
                    Total Leads
                  </p>

                  <h2 className="text-4xl font-bold mt-3 text-primary">
                    24
                  </h2>
                </div>

                <div className="bg-white border border-border rounded-3xl p-6 shadow-sm">
                  <p className="text-muted text-sm">
                    Active Projects
                  </p>

                  <h2 className="text-4xl font-bold mt-3 text-primary">
                    8
                  </h2>
                </div>

                <div className="bg-white border border-border rounded-3xl p-6 shadow-sm">
                  <p className="text-muted text-sm">
                    Appointments
                  </p>

                  <h2 className="text-4xl font-bold mt-3 text-primary">
                    12
                  </h2>
                </div>
              </div>
            </div>
          )}

          {/* LEADS */}
          {tab === "leads" && (
            <LeadsPage />
          )}

          {/* PROJECTS */}
          {tab === "projects" && (
            <ProjectList />
          )}

          {/* APPOINTMENTS */}
          {tab ===
            "appointments" && (
            <AppointmentPage />
          )}

          {/* ANALYTICS */}
          {tab === "analytics" && (
            <div className="bg-white p-6 rounded-3xl border border-border shadow-sm">
              <h1 className="text-2xl font-semibold text-primary">
                Analytics
              </h1>

              <p className="text-muted mt-2">
                Analytics dashboard
                coming soon.
              </p>
            </div>
          )}

          {/* SETTINGS */}
          {tab === "settings" && (
            <div className="bg-white p-6 rounded-3xl border border-border shadow-sm">
              <h1 className="text-2xl font-semibold text-primary">
                Settings
              </h1>

              <p className="text-muted mt-2">
                Manage application
                settings and preferences.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}