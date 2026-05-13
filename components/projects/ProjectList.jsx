"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

import {
  FiPlus,
  FiFolder,
  FiTrendingUp,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";

import ProjectCard from "./ProjectCard";
import ProjectFormModal from "./ProjectFormModal";
import ProjectStats from "./ProjectStats";
import ProjectFilters from "./ProjectFilters";

export default function ProjectList() {
  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] =
    useState(false);

  const [filters, setFilters] = useState({
    search: "",
    status: "",
  });

  // =========================================
  // FETCH PROJECTS
  // =========================================

  const fetchProjects = async () => {
    try {
      setLoading(true);

      let query = `?search=${filters.search}`;

      if (filters.status) {
        query += `&status=${filters.status}`;
      }

      const data =
        await api.getProjects(query);

      setProjects(data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [filters]);

  // =========================================
  // DELETE PROJECT
  // =========================================

  const handleDelete = async (id) => {
    const confirmDelete = confirm(
      "Delete this project permanently?"
    );

    if (!confirmDelete) return;

    await api.deleteProject(id);

    fetchProjects();
  };

  // =========================================
  // STATS
  // =========================================

  const totalProjects = projects.length;

  const completedProjects =
    projects.filter(
      (p) => p.status === "completed"
    ).length;

  const activeProjects =
    projects.filter(
      (p) => p.status === "in_progress"
    ).length;

  const totalRevenue = projects.reduce(
    (acc, item) =>
      acc + Number(item.dealValue || 0),
    0
  );

  // =========================================
  // UI
  // =========================================

  return (
    <div className="space-y-8">

      {/* ===================================== */}
      {/* HERO HEADER */}
      {/* ===================================== */}

      <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-background to-background p-8">

        {/* Glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 blur-3xl rounded-full" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

          {/* LEFT */}

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-5">
              <FiFolder />

              Project Management System
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-primary">
              Manage Construction Projects Professionally
            </h1>

            <p className="text-muted mt-5 text-lg leading-relaxed">
              Track workflow, manage teams,
              monitor progress, handle finances,
              and organize every project in one
              powerful dashboard.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">

              <button
                onClick={() =>
                  setOpenModal(true)
                }
                className="flex items-center gap-2 bg-primary text-white px-6 py-4 rounded-2xl hover:opacity-90 transition shadow-lg shadow-primary/20"
              >
                <FiPlus />

                Create New Project
              </button>

              <button className="px-6 py-4 rounded-2xl border border-border hover:bg-soft transition">
                View Analytics
              </button>
            </div>
          </div>

          {/* RIGHT STATS */}

          <div className="grid grid-cols-2 gap-5 min-w-[320px]">

            <div className="bg-background/70 backdrop-blur border border-border rounded-3xl p-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4">
                <FiFolder size={22} />
              </div>

              <p className="text-muted text-sm">
                Total Projects
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {totalProjects}
              </h2>
            </div>

            <div className="bg-background/70 backdrop-blur border border-border rounded-3xl p-6">
              <div className="w-12 h-12 rounded-2xl bg-green-500/10 text-green-500 flex items-center justify-center mb-4">
                <FiCheckCircle size={22} />
              </div>

              <p className="text-muted text-sm">
                Completed
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {completedProjects}
              </h2>
            </div>

            <div className="bg-background/70 backdrop-blur border border-border rounded-3xl p-6">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center mb-4">
                <FiClock size={22} />
              </div>

              <p className="text-muted text-sm">
                Active Projects
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {activeProjects}
              </h2>
            </div>

            <div className="bg-background/70 backdrop-blur border border-border rounded-3xl p-6">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-4">
                <FiTrendingUp size={22} />
              </div>

              <p className="text-muted text-sm">
                Revenue
              </p>

              <h2 className="text-3xl font-bold mt-2">
                ₹
                {totalRevenue.toLocaleString()}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================== */}
      {/* STATS */}
      {/* ===================================== */}

      <ProjectStats projects={projects} />

      {/* ===================================== */}
      {/* FILTERS */}
      {/* ===================================== */}

      <div className="bg-background border border-border rounded-3xl p-5 shadow-sm">
        <ProjectFilters
          filters={filters}
          setFilters={setFilters}
        />
      </div>

      {/* ===================================== */}
      {/* PROJECTS HEADER */}
      {/* ===================================== */}

      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-2xl font-bold">
            All Projects
          </h2>

          <p className="text-muted mt-1">
            Showing {projects.length} projects
          </p>
        </div>

        <button
          onClick={() =>
            setOpenModal(true)
          }
          className="hidden md:flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-2xl hover:opacity-90 transition"
        >
          <FiPlus />

          Add Project
        </button>
      </div>

      {/* ===================================== */}
      {/* PROJECT GRID */}
      {/* ===================================== */}

      {loading ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {[1, 2, 3, 4, 5, 6].map(
            (item) => (
              <div
                key={item}
                className="h-[280px] rounded-3xl border border-border bg-soft animate-pulse"
              />
            )
          )}
        </div>
      ) : projects.length === 0 ? (
        <div className="border border-dashed border-border rounded-3xl p-16 text-center bg-soft">

          <div className="w-20 h-20 rounded-3xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
            <FiFolder size={34} />
          </div>

          <h2 className="text-2xl font-bold mb-3">
            No Projects Found
          </h2>

          <p className="text-muted max-w-md mx-auto leading-relaxed">
            Start managing your workflow by
            creating your first construction
            project.
          </p>

          <button
            onClick={() =>
              setOpenModal(true)
            }
            className="mt-8 inline-flex items-center gap-2 bg-primary text-white px-6 py-4 rounded-2xl hover:opacity-90 transition"
          >
            <FiPlus />

            Create First Project
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              refresh={fetchProjects}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* ===================================== */}
      {/* MODAL */}
      {/* ===================================== */}

      <ProjectFormModal
        open={openModal}
        setOpen={setOpenModal}
        refresh={fetchProjects}
      />
    </div>
  );
}