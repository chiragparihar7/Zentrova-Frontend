"use client";

import { useState } from "react";

import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiPhone,
  FiUser,
  FiUsers,
  FiFileText,
  FiBell,
  FiCheckCircle,
  FiX,
  FiBriefcase,
} from "react-icons/fi";

import { api } from "@/lib/api";

export default function AppointmentFormModal({
  setOpenModal,
  fetchAppointments,
}) {
  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      title: "",
      clientName: "",
      clientPhone: "",
      appointmentType:
        "client-meeting",
      location: "",
      meetingDate: "",

      status: "scheduled",

      checkInTime: "",
      checkOutTime: "",

      notes: [
        {
          text: "",
        },
      ],

      reminders: [
        {
          minutesBefore: 1440,
        },

        {
          minutesBefore: 60,
        },

        {
          minutesBefore: 15,
        },
      ],

      assignedTeam: [
        {
          name: "",
          role: "",
          phone: "",
        },
      ],
    });

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  // TEAM CHANGE
  const handleTeamChange = (
    index,
    field,
    value
  ) => {
    const updatedTeam = [
      ...formData.assignedTeam,
    ];

    updatedTeam[index][field] =
      value;

    setFormData({
      ...formData,
      assignedTeam: updatedTeam,
    });
  };

  // ADD TEAM MEMBER
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

  // NOTE CHANGE
  const handleNoteChange = (
    index,
    value
  ) => {
    const updatedNotes = [
      ...formData.notes,
    ];

    updatedNotes[index].text = value;

    setFormData({
      ...formData,
      notes: updatedNotes,
    });
  };

  // ADD NOTE
  const addNote = () => {
    setFormData({
      ...formData,

      notes: [
        ...formData.notes,

        {
          text: "",
        },
      ],
    });
  };

  // REMINDER CHANGE
  const handleReminderChange = (
    index,
    value
  ) => {
    const updatedReminders = [
      ...formData.reminders,
    ];

    updatedReminders[
      index
    ].minutesBefore = value;

    setFormData({
      ...formData,
      reminders: updatedReminders,
    });
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.createAppointment(
        formData
      );

      fetchAppointments();

      setOpenModal(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="w-full max-w-7xl bg-white rounded-[40px] overflow-hidden shadow-2xl border border-border max-h-[95vh] overflow-y-auto">
        {/* TOP HEADER */}
        <div className="relative overflow-hidden bg-gradient-to-r from-[#111111] via-[#1B1B1B] to-[#2B2B2B] p-8 md:p-10 text-white">
          {/* GLOW */}
          <div className="absolute top-[-120px] right-[-100px] w-[320px] h-[320px] bg-white/10 rounded-full blur-3xl" />

          <div className="relative z-10 flex items-start justify-between">
            <div>
              <div className="w-20 h-20 rounded-[28px] bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-2xl">
                <FiCalendar size={34} />
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mt-7 leading-tight">
                Schedule
                <br />
                Appointment
              </h1>

              <p className="text-white/60 mt-5 max-w-2xl leading-relaxed">
                Organize premium client
                meetings, inspections,
                site visits and field
                operations with
                intelligent reminder
                management.
              </p>
            </div>

            {/* CLOSE */}
            <button
              onClick={() =>
                setOpenModal(false)
              }
              className="w-14 h-14 rounded-2xl bg-white/10 hover:bg-white/20 transition flex items-center justify-center border border-white/10"
            >
              <FiX size={24} />
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-6 md:p-10 bg-[#FAFAFA]">
          <form
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            {/* BASIC INFO */}
            <div className="bg-white rounded-[32px] border border-border p-8 shadow-sm">
              <SectionHeader
                icon={<FiBriefcase />}
                title="Appointment Information"
                description="Basic client and meeting information"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <Field
                  label="Appointment Title"
                  icon={<FiCalendar />}
                >
                  <input
                    type="text"
                    name="title"
                    placeholder="Factory Site Visit"
                    className="premium-input"
                    onChange={
                      handleChange
                    }
                  />
                </Field>

                <Field
                  label="Appointment Type"
                  icon={
                    <FiBriefcase />
                  }
                >
                  <select
                    name="appointmentType"
                    className="premium-input"
                    onChange={
                      handleChange
                    }
                  >
                    <option value="client-meeting">
                      Client Meeting
                    </option>

                    <option value="site-visit">
                      Site Visit
                    </option>

                    <option value="inspection">
                      Inspection
                    </option>

                    <option value="follow-up">
                      Follow Up
                    </option>

                    <option value="vendor">
                      Vendor Meeting
                    </option>
                  </select>
                </Field>

                <Field
                  label="Client Name"
                  icon={<FiUser />}
                >
                  <input
                    type="text"
                    name="clientName"
                    placeholder="ABC Industries"
                    className="premium-input"
                    onChange={
                      handleChange
                    }
                  />
                </Field>

                <Field
                  label="Client Phone"
                  icon={
                    <FiPhone />
                  }
                >
                  <input
                    type="text"
                    name="clientPhone"
                    placeholder="+91 9876543210"
                    className="premium-input"
                    onChange={
                      handleChange
                    }
                  />
                </Field>

                <Field
                  label="Location"
                  icon={
                    <FiMapPin />
                  }
                  full
                >
                  <input
                    type="text"
                    name="location"
                    placeholder="Naroda GIDC, Ahmedabad"
                    className="premium-input"
                    onChange={
                      handleChange
                    }
                  />
                </Field>

                <Field
                  label="Meeting Date & Time"
                  icon={
                    <FiClock />
                  }
                  full
                >
                  <input
                    type="datetime-local"
                    name="meetingDate"
                    className="premium-input"
                    onChange={
                      handleChange
                    }
                  />
                </Field>
              </div>
            </div>

            {/* STATUS */}
            <div className="bg-white rounded-[32px] border border-border p-8 shadow-sm">
              <SectionHeader
                icon={
                  <FiCheckCircle />
                }
                title="Meeting Status"
                description="Manage appointment progress"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                {[
                  "scheduled",
                  "in-progress",
                  "completed",
                  "cancelled",
                ].map((status) => (
                  <label
                    key={status}
                    className={`border rounded-2xl p-5 cursor-pointer transition ${
                      formData.status ===
                      status
                        ? "border-primary bg-soft"
                        : "border-border"
                    }`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value={status}
                      className="hidden"
                      onChange={
                        handleChange
                      }
                    />

                    <p className="font-medium capitalize">
                      {status}
                    </p>
                  </label>
                ))}
              </div>
            </div>

            {/* TEAM */}
            <div className="bg-white rounded-[32px] border border-border p-8 shadow-sm">
              <SectionHeader
                icon={<FiUsers />}
                title="Assigned Team"
                description="Assign employees for this appointment"
              />

              <div className="space-y-5 mt-8">
                {formData.assignedTeam.map(
                  (
                    member,
                    index
                  ) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-soft/50 p-5 rounded-3xl border border-border"
                    >
                      <input
                        type="text"
                        placeholder="Team Member Name"
                        className="premium-input"
                        onChange={(e) =>
                          handleTeamChange(
                            index,
                            "name",
                            e.target.value
                          )
                        }
                      />

                      <input
                        type="text"
                        placeholder="Role"
                        className="premium-input"
                        onChange={(e) =>
                          handleTeamChange(
                            index,
                            "role",
                            e.target.value
                          )
                        }
                      />

                      <input
                        type="text"
                        placeholder="Phone"
                        className="premium-input"
                        onChange={(e) =>
                          handleTeamChange(
                            index,
                            "phone",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  )
                )}

                <button
                  type="button"
                  onClick={
                    addTeamMember
                  }
                  className="h-14 px-8 rounded-2xl border border-border hover:bg-soft transition font-medium"
                >
                  + Add Team Member
                </button>
              </div>
            </div>

            {/* NOTES */}
            <div className="bg-white rounded-[32px] border border-border p-8 shadow-sm">
              <SectionHeader
                icon={
                  <FiFileText />
                }
                title="Meeting Notes"
                description="Add important discussion notes"
              />

              <div className="space-y-5 mt-8">
                {formData.notes.map(
                  (note, index) => (
                    <textarea
                      key={index}
                      rows={4}
                      placeholder="Write meeting notes..."
                      className="premium-input resize-none"
                      onChange={(e) =>
                        handleNoteChange(
                          index,
                          e.target.value
                        )
                      }
                    />
                  )
                )}

                <button
                  type="button"
                  onClick={addNote}
                  className="h-14 px-8 rounded-2xl border border-border hover:bg-soft transition font-medium"
                >
                  + Add Note
                </button>
              </div>
            </div>

            {/* REMINDERS */}
            <div className="bg-white rounded-[32px] border border-border p-8 shadow-sm">
              <SectionHeader
                icon={<FiBell />}
                title="Reminder Settings"
                description="Configure automatic reminders"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
                {formData.reminders.map(
                  (
                    reminder,
                    index
                  ) => (
                    <div
                      key={index}
                      className="bg-soft/50 rounded-3xl border border-border p-6"
                    >
                      <p className="text-sm text-muted mb-3">
                        Reminder{" "}
                        {index + 1}
                      </p>

                      <input
                        type="number"
                        className="premium-input"
                        value={
                          reminder.minutesBefore
                        }
                        onChange={(e) =>
                          handleReminderChange(
                            index,
                            e.target.value
                          )
                        }
                      />

                      <p className="text-xs text-muted mt-3">
                        Minutes before
                        meeting
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col md:flex-row justify-end gap-4">
              <button
                type="button"
                onClick={() =>
                  setOpenModal(false)
                }
                className="h-14 px-8 rounded-2xl border border-border hover:bg-soft transition font-medium"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="h-14 px-10 rounded-2xl bg-[#111111] text-white font-semibold shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50"
              >
                {loading
                  ? "Creating..."
                  : "Create Appointment"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

/* SECTION HEADER */
function SectionHeader({
  icon,
  title,
  description,
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-14 h-14 rounded-2xl bg-soft flex items-center justify-center text-primary text-xl">
        {icon}
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-primary">
          {title}
        </h3>

        <p className="text-muted text-sm mt-1">
          {description}
        </p>
      </div>
    </div>
  );
}

/* FIELD */
function Field({
  label,
  icon,
  children,
  full,
}) {
  return (
    <div
      className={`space-y-2 ${
        full ? "md:col-span-2" : ""
      }`}
    >
      <label className="text-sm font-medium text-secondary flex items-center gap-2">
        <span className="text-muted">
          {icon}
        </span>

        {label}
      </label>

      {children}
    </div>
  );
}