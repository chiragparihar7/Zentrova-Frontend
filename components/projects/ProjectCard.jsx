"use client";

import { useState } from "react";

import { api } from "@/lib/api";

import {
  FiTrash2,
  FiMapPin,
  FiCalendar,
  FiDollarSign,
  FiTrendingUp,
  FiUsers,
  FiClock,
  FiCheckCircle,
  FiPauseCircle,
  FiPlayCircle,
  FiEdit2,
  FiSave,
  FiX,
  FiPhone,
  FiUser,
} from "react-icons/fi";

export default function ProjectCard({
  project,
  refresh,
  onDelete,
}) {
  // =====================================
  // STATES
  // =====================================

  const [editing, setEditing] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      projectName:
        project.projectName || "",

      ownerName:
        project.ownerName || "",

      phone: project.phone || "",

      email: project.email || "",

      siteAddress:
        project.siteAddress || "",

      progress:
        project.progress || 0,

      status:
        project.status ||
        "not_started",

      dealValue:
        project.dealValue || 0,

      advancePaid:
        project.advancePaid || 0,

      labourCost:
        project.labourCost || 0,

      startDate:
        project.startDate?.split(
          "T"
        )[0] || "",

      deadline:
        project.deadline?.split(
          "T"
        )[0] || "",

      leadSource:
        project.leadSource ||
        "other",

      referralName:
        project.referralName || "",

      assignedTeam:
        project.assignedTeam || [],
    });

  // =====================================
  // STATUS UI
  // =====================================

  const statusConfig = {
    not_started: {
      label: "Not Started",
      color:
        "bg-gray-500/10 text-gray-500",
      icon: <FiClock size={14} />,
    },

    in_progress: {
      label: "In Progress",
      color:
        "bg-blue-500/10 text-blue-500",
      icon: <FiPlayCircle size={14} />,
    },

    on_hold: {
      label: "On Hold",
      color:
        "bg-orange-500/10 text-orange-500",
      icon: (
        <FiPauseCircle size={14} />
      ),
    },

    completed: {
      label: "Completed",
      color:
        "bg-green-500/10 text-green-500",
      icon: (
        <FiCheckCircle size={14} />
      ),
    },
  };

  const currentStatus =
    statusConfig[
      formData.status
    ];

  // =====================================
  // UPDATE FIELD
  // =====================================

  const handleChange = (
    key,
    value
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // =====================================
  // TEAM MEMBER UPDATE
  // =====================================

  const updateTeamMember = (
    index,
    field,
    value
  ) => {
    const updated = [
      ...formData.assignedTeam,
    ];

    updated[index][field] = value;

    setFormData({
      ...formData,
      assignedTeam: updated,
    });
  };

  const addTeamMember = () => {
    setFormData({
      ...formData,

      assignedTeam: [
        ...formData.assignedTeam,

        {
          name: "",
          role: "",
          phone: "",
        },
      ],
    });
  };

  const removeTeamMember = (
    index
  ) => {
    const updated =
      formData.assignedTeam.filter(
        (_, i) => i !== index
      );

    setFormData({
      ...formData,
      assignedTeam: updated,
    });
  };

  // =====================================
  // SAVE PROJECT
  // =====================================

  const saveProject = async () => {
    try {
      setLoading(true);

      await api.updateProject(
        project._id,
        formData
      );

      setEditing(false);

      refresh();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // FORMAT DATE
  // =====================================

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(
      date
    ).toLocaleDateString();
  };

  // =====================================
  // PROGRESS COLOR
  // =====================================

  const progressColor =
    formData.progress === 100
      ? "bg-green-500"
      : formData.progress > 60
      ? "bg-blue-500"
      : formData.progress > 30
      ? "bg-orange-500"
      : "bg-red-500";

  // =====================================
  // UI
  // =====================================

  return (
    <div className="group relative overflow-hidden rounded-[30px] border border-border bg-background hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300">

      {/* TOP BORDER */}

      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-blue-500 to-purple-500" />

      {/* GLOW */}

      <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition" />

      <div className="relative z-10 p-6 space-y-6">

        {/* ================================= */}
        {/* HEADER */}
        {/* ================================= */}

        <div className="flex items-start justify-between gap-4">

          <div className="flex-1">

            {/* STATUS */}

            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4 ${currentStatus.color}`}
            >
              {currentStatus.icon}

              {currentStatus.label}
            </div>

            {/* TITLE */}

            {editing ? (
              <input
                value={
                  formData.projectName
                }
                onChange={(e) =>
                  handleChange(
                    "projectName",
                    e.target.value
                  )
                }
                className="w-full bg-soft border border-border rounded-xl px-4 py-3 text-2xl font-bold outline-none"
              />
            ) : (
              <h2 className="text-2xl font-bold leading-tight">
                {
                  formData.projectName
                }
              </h2>
            )}

            {/* OWNER */}

            <div className="flex items-center gap-2 mt-3 text-muted">

              <FiUser size={15} />

              {editing ? (
                <input
                  value={
                    formData.ownerName
                  }
                  onChange={(e) =>
                    handleChange(
                      "ownerName",
                      e.target.value
                    )
                  }
                  className="bg-transparent outline-none border-b border-border"
                />
              ) : (
                <span>
                  {
                    formData.ownerName
                  }
                </span>
              )}
            </div>
          </div>

          {/* ACTIONS */}

          <div className="flex items-center gap-2">

            {editing ? (
              <>
                <button
                  onClick={
                    saveProject
                  }
                  disabled={
                    loading
                  }
                  className="w-11 h-11 rounded-2xl bg-green-500 text-white flex items-center justify-center"
                >
                  <FiSave />
                </button>

                <button
                  onClick={() =>
                    setEditing(
                      false
                    )
                  }
                  className="w-11 h-11 rounded-2xl bg-gray-500 text-white flex items-center justify-center"
                >
                  <FiX />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() =>
                    setEditing(
                      true
                    )
                  }
                  className="w-11 h-11 rounded-2xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition flex items-center justify-center"
                >
                  <FiEdit2 />
                </button>

                <button
                  onClick={() =>
                    onDelete(
                      project._id
                    )
                  }
                  className="w-11 h-11 rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition flex items-center justify-center"
                >
                  <FiTrash2 />
                </button>
              </>
            )}
          </div>
        </div>

        {/* ================================= */}
        {/* ADDRESS */}
        {/* ================================= */}

        <div className="flex items-start gap-3 text-sm text-muted">

          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <FiMapPin />
          </div>

          {editing ? (
            <textarea
              value={
                formData.siteAddress
              }
              onChange={(e) =>
                handleChange(
                  "siteAddress",
                  e.target.value
                )
              }
              className="w-full bg-soft border border-border rounded-xl p-3 outline-none"
            />
          ) : (
            <p>
              {
                formData.siteAddress
              }
            </p>
          )}
        </div>

        {/* ================================= */}
        {/* PROGRESS */}
        {/* ================================= */}

        <div className="space-y-4">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-2">
              <FiTrendingUp className="text-primary" />

              <span className="font-medium">
                Progress
              </span>
            </div>

            <span className="text-lg font-bold">
              {formData.progress}%
            </span>
          </div>

          <div className="h-4 bg-soft rounded-full overflow-hidden">

            <div
              className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
              style={{
                width: `${formData.progress}%`,
              }}
            />
          </div>

          {editing ? (
            <input
              type="range"
              min="0"
              max="100"
              value={
                formData.progress
              }
              onChange={(e) =>
                handleChange(
                  "progress",
                  Number(
                    e.target.value
                  )
                )
              }
              className="w-full accent-primary"
            />
          ) : null}
        </div>

        {/* ================================= */}
        {/* STATUS */}
        {/* ================================= */}

        {editing ? (
          <select
            value={formData.status}
            onChange={(e) =>
              handleChange(
                "status",
                e.target.value
              )
            }
            className="w-full bg-soft border border-border rounded-2xl px-5 py-4 outline-none"
          >
            <option value="not_started">
              Not Started
            </option>

            <option value="in_progress">
              In Progress
            </option>

            <option value="on_hold">
              On Hold
            </option>

            <option value="completed">
              Completed
            </option>
          </select>
        ) : null}

        {/* ================================= */}
        {/* FINANCIAL */}
        {/* ================================= */}

        <div className="grid grid-cols-3 gap-4">

          <FinancialCard
            label="Deal"
            value={
              formData.dealValue
            }
          />

          <FinancialCard
            label="Advance"
            value={
              formData.advancePaid
            }
          />

          <FinancialCard
            label="Labour"
            value={
              formData.labourCost
            }
          />
        </div>

        {/* ================================= */}
        {/* TEAM MEMBERS */}
        {/* ================================= */}

        <div className="bg-soft border border-border rounded-2xl p-5">

          <div className="flex items-center justify-between mb-5">

            <div className="flex items-center gap-2">
              <FiUsers className="text-primary" />

              <h3 className="font-semibold">
                Team Members
              </h3>
            </div>

            {editing ? (
              <button
                onClick={
                  addTeamMember
                }
                className="text-sm bg-primary text-white px-3 py-2 rounded-xl"
              >
                + Add
              </button>
            ) : null}
          </div>

          {formData.assignedTeam
            ?.length > 0 ? (
            <div className="space-y-4">

              {formData.assignedTeam.map(
                (
                  member,
                  index
                ) => (
                  <div
                    key={index}
                    className="bg-background border border-border rounded-2xl p-4"
                  >

                    {editing ? (
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">

                        <input
                          value={
                            member.name
                          }
                          onChange={(
                            e
                          ) =>
                            updateTeamMember(
                              index,
                              "name",
                              e.target
                                .value
                            )
                          }
                          placeholder="Name"
                          className="bg-soft border border-border rounded-xl px-4 py-3 outline-none"
                        />

                        <input
                          value={
                            member.role
                          }
                          onChange={(
                            e
                          ) =>
                            updateTeamMember(
                              index,
                              "role",
                              e.target
                                .value
                            )
                          }
                          placeholder="Role"
                          className="bg-soft border border-border rounded-xl px-4 py-3 outline-none"
                        />

                        <input
                          value={
                            member.phone
                          }
                          onChange={(
                            e
                          ) =>
                            updateTeamMember(
                              index,
                              "phone",
                              e.target
                                .value
                            )
                          }
                          placeholder="Phone"
                          className="bg-soft border border-border rounded-xl px-4 py-3 outline-none"
                        />

                        <button
                          onClick={() =>
                            removeTeamMember(
                              index
                            )
                          }
                          className="bg-red-500 text-white rounded-xl"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">

                        <div>
                          <p className="font-semibold">
                            {
                              member.name
                            }
                          </p>

                          <p className="text-sm text-muted">
                            {
                              member.role
                            }
                          </p>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted">

                          <FiPhone />

                          {
                            member.phone
                          }
                        </div>
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="text-center py-8">

              <FiUsers
                size={32}
                className="mx-auto text-muted mb-3"
              />

              <p className="text-muted">
                No team members
                assigned
              </p>
            </div>
          )}
        </div>

        {/* ================================= */}
        {/* FOOTER */}
        {/* ================================= */}

        <div className="flex items-center justify-between pt-4 border-t border-border">

          <div className="flex items-center gap-2 text-sm text-muted">

            <FiCalendar />

            {formatDate(
              formData.startDate
            )}
          </div>

          <div className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium capitalize">
            {
              formData.leadSource
            }
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===================================== */
/* FINANCIAL CARD */
/* ===================================== */

function FinancialCard({
  label,
  value,
}) {
  return (
    <div className="rounded-2xl bg-soft border border-border p-4 text-center">

      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
        <FiDollarSign size={18} />
      </div>

      <p className="text-xs text-muted">
        {label}
      </p>

      <h3 className="font-bold mt-1">
        ₹
        {Number(
          value || 0
        ).toLocaleString()}
      </h3>
    </div>
  );
}