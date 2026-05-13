"use client";

import { useEffect, useMemo, useState } from "react";

import {
  FiCalendar,
  FiPlus,
  FiTrendingUp,
  FiClock,
  FiCheckCircle,
  FiSearch,
  FiGrid,
} from "react-icons/fi";

import { api } from "@/lib/api";

import AppointmentTable from "./AppointmentTable";
import AppointmentFormModal from "./AppointmentFormModal";
import AppointmentStats from "./AppointmentStats";
import AppointmentFilters from "./AppointmentFilters";
import AppointmentCalendar from "./AppointmentCalendar";

export default function AppointmentPage() {
  const [appointments, setAppointments] =
    useState([]);

  const [openModal, setOpenModal] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  // FETCH APPOINTMENTS
  const fetchAppointments = async () => {
    try {
      const data =
        await api.getAppointments();

      setAppointments(
        data.appointments || []
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // FILTERED DATA
  const filteredAppointments =
    useMemo(() => {
      return appointments.filter(
        (item) => {
          const matchesSearch =
            item.clientName
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||
            item.location
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const matchesStatus =
            statusFilter === "all" ||
            item.status ===
              statusFilter;

          return (
            matchesSearch &&
            matchesStatus
          );
        }
      );
    }, [
      appointments,
      search,
      statusFilter,
    ]);

  // STATS
  const totalAppointments =
    appointments.length;

  const completedAppointments =
    appointments.filter(
      (item) =>
        item.status ===
        "completed"
    ).length;

  const scheduledAppointments =
    appointments.filter(
      (item) =>
        item.status ===
        "scheduled"
    ).length;

  const todayAppointments =
    appointments.filter((item) => {
      const today =
        new Date().toDateString();

      return (
        new Date(
          item.meetingDate
        ).toDateString() === today
      );
    }).length;

  return (
    <div className="space-y-8">
      {/* HERO SECTION */}
      <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#0F0F0F] via-[#1B1B1B] to-[#2A2A2A] p-6 md:p-10 shadow-2xl">
        {/* GLOW EFFECTS */}
        <div className="absolute top-[-120px] right-[-80px] w-[320px] h-[320px] rounded-full bg-white/10 blur-3xl" />

        <div className="absolute bottom-[-120px] left-[-80px] w-[280px] h-[280px] rounded-full bg-white/5 blur-3xl" />

        {/* CONTENT */}
        <div className="relative z-10">
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-10">
            {/* LEFT */}
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-white text-sm mb-6">
                <FiCalendar />

                Smart Appointment
                Management
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                Manage Your
                <br />
                Client Meetings
                <br />
                Like a Pro.
              </h1>

              <p className="text-white/60 text-lg mt-6 max-w-2xl leading-relaxed">
                Organize meetings, site
                visits, inspections,
                reminders and field
                teams with a premium CRM
                workflow experience.
              </p>

              {/* ACTIONS */}
              <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <button
                  onClick={() =>
                    setOpenModal(true)
                  }
                  className="h-14 px-8 rounded-2xl bg-white text-black font-semibold flex items-center justify-center gap-3 shadow-2xl hover:scale-[1.02] transition-all"
                >
                  <FiPlus size={20} />
                  Create Appointment
                </button>

                <button className="h-14 px-8 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md text-white hover:bg-white/15 transition-all">
                  View Schedule
                </button>
              </div>
            </div>

            {/* RIGHT STATS */}
            <div className="grid grid-cols-2 gap-5 min-w-[320px]">
              <GlassCard
                icon={
                  <FiGrid size={24} />
                }
                title="Total"
                value={
                  totalAppointments
                }
              />

              <GlassCard
                icon={
                  <FiClock size={24} />
                }
                title="Today"
                value={
                  todayAppointments
                }
              />

              <GlassCard
                icon={
                  <FiTrendingUp size={24} />
                }
                title="Scheduled"
                value={
                  scheduledAppointments
                }
              />

              <GlassCard
                icon={
                  <FiCheckCircle
                    size={24}
                  />
                }
                title="Completed"
                value={
                  completedAppointments
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white rounded-[30px] border border-border shadow-sm p-5 md:p-6">
        <div className="flex flex-col xl:flex-row gap-5 xl:items-center xl:justify-between">
          {/* SEARCH */}
          <div className="relative flex-1">
            <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-muted text-lg" />

            <input
              type="text"
              placeholder="Search by client, location or meeting..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="w-full h-14 rounded-2xl bg-soft border border-border pl-14 pr-5 outline-none focus:border-primary transition"
            />
          </div>

          {/* FILTERS */}
          <div className="flex flex-col md:flex-row gap-4">
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value
                )
              }
              className="h-14 min-w-[220px] rounded-2xl border border-border bg-soft px-5 outline-none focus:border-primary transition"
            >
              <option value="all">
                All Status
              </option>

              <option value="scheduled">
                Scheduled
              </option>

              <option value="in-progress">
                In Progress
              </option>

              <option value="completed">
                Completed
              </option>

              <option value="cancelled">
                Cancelled
              </option>
            </select>

            <button className="h-14 px-6 rounded-2xl border border-border hover:bg-soft transition font-medium">
              Export Data
            </button>
          </div>
        </div>
      </div>

      {/* ANALYTICS */}
      <AppointmentStats
        appointments={appointments}
      />

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 2xl:grid-cols-[380px_1fr] gap-8">
        {/* LEFT */}
        <div className="space-y-8">
          {/* CALENDAR */}
          <div className="bg-white rounded-[32px] border border-border shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-primary">
                  Calendar
                </h2>

                <p className="text-muted text-sm mt-1">
                  Upcoming schedule
                </p>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-soft flex items-center justify-center">
                <FiCalendar
                  className="text-primary"
                  size={22}
                />
              </div>
            </div>

            <div className="p-6">
              <AppointmentCalendar
                appointments={
                  appointments
                }
              />
            </div>
          </div>

          {/* QUICK SUMMARY */}
          <div className="bg-gradient-to-br from-[#111111] via-[#1B1B1B] to-[#242424] rounded-[32px] p-8 text-white shadow-2xl overflow-hidden relative">
            <div className="absolute top-[-80px] right-[-80px] w-[220px] h-[220px] rounded-full bg-white/10 blur-3xl" />

            <div className="relative z-10">
              <div className="w-16 h-16 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
                <FiTrendingUp
                  size={28}
                />
              </div>

              <h2 className="text-3xl font-bold mt-8 leading-tight">
                Improve Team
                Productivity &
                Meeting Efficiency
              </h2>

              <p className="text-white/60 mt-5 leading-relaxed">
                Keep track of all
                meetings, reminders and
                field staff operations
                from one premium
                dashboard experience.
              </p>

              <button className="mt-8 h-14 px-8 rounded-2xl bg-white text-black font-semibold hover:scale-[1.02] transition-all">
                View Analytics
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT TABLE */}
        <div className="bg-white rounded-[32px] border border-border shadow-sm overflow-hidden">
          {/* HEADER */}
          <div className="p-6 border-b border-border flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h2 className="text-2xl font-semibold text-primary">
                Appointment List
              </h2>

              <p className="text-muted text-sm mt-1">
                Manage all scheduled
                meetings & field visits
              </p>
            </div>

            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-soft border border-border text-sm font-medium">
              <div className="w-3 h-3 rounded-full bg-green-500" />

              {
                filteredAppointments.length
              }{" "}
              Appointments Found
            </div>
          </div>

          {/* TABLE */}
          <div className="p-6">
            <AppointmentTable
              appointments={
                filteredAppointments
              }
              fetchAppointments={
                fetchAppointments
              }
            />
          </div>
        </div>
      </div>

      {/* MODAL */}
      {openModal && (
        <AppointmentFormModal
          setOpenModal={
            setOpenModal
          }
          fetchAppointments={
            fetchAppointments
          }
        />
      )}
    </div>
  );
}

/* GLASS CARD */
function GlassCard({
  icon,
  title,
  value,
}) {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-6 text-white shadow-xl">
      <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-5">
        {icon}
      </div>

      <p className="text-white/60 text-sm">
        {title}
      </p>

      <h2 className="text-4xl font-bold mt-3">
        {value}
      </h2>
    </div>
  );
}