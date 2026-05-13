"use client";

import { useState } from "react";
import { api } from "@/lib/api";

import {
  FiX,
  FiUser,
  FiPhone,
  FiMail,
  FiMapPin,
  FiDollarSign,
  FiCalendar,
  FiTrendingUp,
  FiUsers,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";

export default function ProjectFormModal({
  open,
  setOpen,
  refresh,
}) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    projectName: "",
    ownerName: "",
    phone: "",
    email: "",

    siteAddress: "",

    assignedTeam: [
      {
        name: "",
        role: "",
        phone: "",
      },
    ],

    leadSource: "google",
    referralName: "",

    dealValue: "",
    advancePaid: "",
    labourCost: "",

    progress: 0,
    status: "not_started",

    startDate: "",
    deadline: "",

    notes: "",
  });

  if (!open) return null;

  // =========================
  // HANDLE CHANGE
  // =========================

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // =========================
  // TEAM HANDLERS
  // =========================

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

  const removeTeamMember = (index) => {
    const updated =
      formData.assignedTeam.filter(
        (_, i) => i !== index
      );

    setFormData({
      ...formData,
      assignedTeam: updated,
    });
  };

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

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        ...formData,
      };

      // Notes Format
      if (formData.notes) {
        payload.notes = [
          {
            text: formData.notes,
          },
        ];
      }

      await api.createProject(payload);

      refresh();

      setOpen(false);
    } catch (err) {
      console.log(err);

      alert("Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl bg-background border border-border rounded-3xl shadow-2xl overflow-hidden">

          {/* HEADER */}

          <div className="flex items-center justify-between px-8 py-6 border-b border-border bg-soft">
            <div>
              <h2 className="text-2xl font-bold text-primary">
                Create New Project
              </h2>

              <p className="text-sm text-muted mt-1">
                Professional CRM Workflow
              </p>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="w-10 h-10 rounded-xl hover:bg-background flex items-center justify-center"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="p-8 space-y-8"
          >

            {/* PROJECT INFO */}

            <div>
              <h3 className="text-lg font-semibold mb-5">
                Project Information
              </h3>

              <div className="grid md:grid-cols-2 gap-5">
                <InputField
                  icon={<FiTrendingUp />}
                  placeholder="Project Name"
                  required
                  value={formData.projectName}
                  onChange={(e) =>
                    handleChange(
                      "projectName",
                      e.target.value
                    )
                  }
                />

                <InputField
                  icon={<FiUser />}
                  placeholder="Owner Name"
                  value={formData.ownerName}
                  onChange={(e) =>
                    handleChange(
                      "ownerName",
                      e.target.value
                    )
                  }
                />

                <InputField
                  icon={<FiPhone />}
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) =>
                    handleChange(
                      "phone",
                      e.target.value
                    )
                  }
                />

                <InputField
                  icon={<FiMail />}
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) =>
                    handleChange(
                      "email",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>

            {/* SITE */}

            <div>
              <h3 className="text-lg font-semibold mb-5">
                Site Information
              </h3>

              <textarea
                placeholder="Enter Site Address"
                value={formData.siteAddress}
                onChange={(e) =>
                  handleChange(
                    "siteAddress",
                    e.target.value
                  )
                }
                className="w-full min-h-[120px] bg-soft border border-border rounded-2xl px-5 py-4 outline-none"
              />
            </div>

            {/* LEAD SOURCE */}

            <div>
              <h3 className="text-lg font-semibold mb-5">
                Lead Source
              </h3>

              <div className="grid md:grid-cols-2 gap-5">

                <select
                  value={formData.leadSource}
                  onChange={(e) =>
                    handleChange(
                      "leadSource",
                      e.target.value
                    )
                  }
                  className="w-full bg-soft border border-border rounded-2xl px-5 py-4 outline-none"
                >
                  <option value="google">
                    Google
                  </option>

                  <option value="referral">
                    Referral
                  </option>

                  <option value="facebook">
                    Facebook
                  </option>

                  <option value="instagram">
                    Instagram
                  </option>

                  <option value="website">
                    Website
                  </option>

                  <option value="whatsapp">
                    WhatsApp
                  </option>

                  <option value="other">
                    Other
                  </option>
                </select>

                {formData.leadSource ===
                  "referral" && (
                  <InputField
                    icon={<FiUser />}
                    placeholder="Referral Person Name"
                    value={
                      formData.referralName
                    }
                    onChange={(e) =>
                      handleChange(
                        "referralName",
                        e.target.value
                      )
                    }
                  />
                )}
              </div>
            </div>

            {/* TEAM */}

            <div>
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-semibold">
                  Assigned Team
                </h3>

                <button
                  type="button"
                  onClick={addTeamMember}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white"
                >
                  <FiPlus />

                  Add Member
                </button>
              </div>

              <div className="space-y-5">
                {formData.assignedTeam.map(
                  (member, index) => (
                    <div
                      key={index}
                      className="grid md:grid-cols-4 gap-4 bg-soft border border-border rounded-2xl p-4"
                    >

                      <InputField
                        icon={<FiUser />}
                        placeholder="Member Name"
                        value={member.name}
                        onChange={(e) =>
                          updateTeamMember(
                            index,
                            "name",
                            e.target.value
                          )
                        }
                      />

                      <InputField
                        icon={<FiUsers />}
                        placeholder="Role"
                        value={member.role}
                        onChange={(e) =>
                          updateTeamMember(
                            index,
                            "role",
                            e.target.value
                          )
                        }
                      />

                      <InputField
                        icon={<FiPhone />}
                        placeholder="Phone"
                        value={member.phone}
                        onChange={(e) =>
                          updateTeamMember(
                            index,
                            "phone",
                            e.target.value
                          )
                        }
                      />

                      <button
                        type="button"
                        onClick={() =>
                          removeTeamMember(
                            index
                          )
                        }
                        className="bg-red-500 text-white rounded-xl flex items-center justify-center"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* FINANCIAL */}

            <div>
              <h3 className="text-lg font-semibold mb-5">
                Financial Information
              </h3>

              <div className="grid md:grid-cols-3 gap-5">

                <InputField
                  icon={<FiDollarSign />}
                  type="number"
                  placeholder="Deal Value"
                  value={formData.dealValue}
                  onChange={(e) =>
                    handleChange(
                      "dealValue",
                      e.target.value
                    )
                  }
                />

                <InputField
                  icon={<FiDollarSign />}
                  type="number"
                  placeholder="Advance Paid"
                  value={
                    formData.advancePaid
                  }
                  onChange={(e) =>
                    handleChange(
                      "advancePaid",
                      e.target.value
                    )
                  }
                />

                <InputField
                  icon={<FiDollarSign />}
                  type="number"
                  placeholder="Labour Cost"
                  value={
                    formData.labourCost
                  }
                  onChange={(e) =>
                    handleChange(
                      "labourCost",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>

            {/* STATUS */}

            <div>
              <h3 className="text-lg font-semibold mb-5">
                Progress & Status
              </h3>

              <div className="grid md:grid-cols-2 gap-5">

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

                <div className="bg-soft border border-border rounded-2xl p-5">
                  <label className="text-sm text-muted block mb-3">
                    Progress ({formData.progress}%)
                  </label>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.progress}
                    onChange={(e) =>
                      handleChange(
                        "progress",
                        Number(
                          e.target.value
                        )
                      )
                    }
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* DATES */}

            <div>
              <h3 className="text-lg font-semibold mb-5">
                Timeline
              </h3>

              <div className="grid md:grid-cols-2 gap-5">

                <InputField
                  icon={<FiCalendar />}
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    handleChange(
                      "startDate",
                      e.target.value
                    )
                  }
                />

                <InputField
                  icon={<FiCalendar />}
                  type="date"
                  value={formData.deadline}
                  onChange={(e) =>
                    handleChange(
                      "deadline",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>

            {/* NOTES */}

            <div>
              <h3 className="text-lg font-semibold mb-5">
                Project Notes
              </h3>

              <textarea
                placeholder="Write important project notes..."
                value={formData.notes}
                onChange={(e) =>
                  handleChange(
                    "notes",
                    e.target.value
                  )
                }
                className="w-full min-h-[140px] bg-soft border border-border rounded-2xl px-5 py-4 outline-none"
              />
            </div>

            {/* FOOTER */}

            <div className="flex justify-end gap-4 pt-5 border-t border-border">

              <button
                type="button"
                onClick={() =>
                  setOpen(false)
                }
                className="px-6 py-3 border border-border rounded-2xl"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-primary text-white rounded-2xl"
              >
                {loading
                  ? "Creating..."
                  : "Create Project"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function InputField({
  icon,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
}) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
        {icon}
      </div>

      <input
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full bg-soft border border-border rounded-2xl pl-12 pr-4 py-4 outline-none"
      />
    </div>
  );
}