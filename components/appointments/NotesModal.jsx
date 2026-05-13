"use client";

import { useState } from "react";

import {
  FiFileText,
  FiSave,
  FiX,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";

import { api } from "@/lib/api";

export default function NotesModal({
  appointmentId,
  setOpenNotes,
}) {
  const [note, setNote] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // SUBMIT NOTE
  const handleSubmit = async () => {
    if (!note.trim()) return;

    try {
      setLoading(true);

      await api.addAppointmentNote(
        appointmentId,
        note
      );

      setOpenNotes(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xl flex items-center justify-center p-4">
      {/* MODAL */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-[36px] bg-white shadow-2xl border border-border">
        {/* TOP PREMIUM HEADER */}
        <div className="relative overflow-hidden bg-gradient-to-r from-[#111111] via-[#1B1B1B] to-[#2A2A2A] px-8 py-10 text-white">
          {/* GLOW */}
          <div className="absolute top-[-120px] right-[-100px] w-[260px] h-[260px] rounded-full bg-white/10 blur-3xl" />

          {/* CONTENT */}
          <div className="relative z-10 flex items-start justify-between gap-5">
            <div className="flex items-start gap-5">
              {/* ICON */}
              <div className="w-20 h-20 rounded-[28px] bg-white/10 border border-white/10 backdrop-blur-md flex items-center justify-center shadow-xl">
                <FiFileText size={34} />
              </div>

              {/* TEXT */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-xs uppercase tracking-[2px] text-white/70 mb-5">
                  <FiClock size={14} />

                  Meeting Notes
                </div>

                <h2 className="text-4xl font-bold leading-tight">
                  Add Appointment
                  <br />
                  Notes & Discussion
                </h2>

                <p className="text-white/60 mt-4 max-w-xl leading-relaxed">
                  Save important meeting
                  summaries, client
                  requirements, follow-up
                  discussions and field
                  updates for future
                  tracking.
                </p>
              </div>
            </div>

            {/* CLOSE */}
            <button
              onClick={() =>
                setOpenNotes(false)
              }
              className="w-14 h-14 rounded-2xl bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center border border-white/10"
            >
              <FiX size={24} />
            </button>
          </div>
        </div>

        {/* BODY */}
        <div className="bg-[#FAFAFA] p-8">
          {/* NOTE CARD */}
          <div className="bg-white rounded-[32px] border border-border shadow-sm overflow-hidden">
            {/* TOP */}
            <div className="px-8 py-6 border-b border-border flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-primary">
                  Meeting Summary
                </h3>

                <p className="text-muted text-sm mt-2">
                  Add detailed discussion
                  points and important
                  client information.
                </p>
              </div>

              <div className="hidden md:flex w-16 h-16 rounded-3xl bg-soft items-center justify-center">
                <FiCheckCircle
                  size={28}
                  className="text-primary"
                />
              </div>
            </div>

            {/* TEXTAREA */}
            <div className="p-8">
              <div className="relative">
                <textarea
                  rows={10}
                  placeholder="Write detailed meeting notes here...

• Client requirements
• Discussion summary
• Site inspection details
• Material discussions
• Budget information
• Next follow-up tasks
• Important observations"
                  value={note}
                  onChange={(e) =>
                    setNote(
                      e.target.value
                    )
                  }
                  className="w-full rounded-[28px] border border-border bg-soft/40 p-6 outline-none resize-none focus:border-primary transition-all text-[15px] leading-relaxed placeholder:text-muted"
                />

                {/* CHARACTER COUNT */}
                <div className="absolute bottom-5 right-5 px-4 py-2 rounded-full bg-white border border-border text-xs text-muted shadow-sm">
                  {note.length} Characters
                </div>
              </div>

              {/* QUICK TAGS */}
              <div className="mt-6">
                <p className="text-sm font-medium text-secondary mb-4">
                  Quick Tags
                </p>

                <div className="flex flex-wrap gap-3">
                  {[
                    "Follow Up",
                    "Inspection",
                    "Quotation",
                    "Approved",
                    "Pending",
                    "Urgent",
                  ].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() =>
                        setNote(
                          (prev) =>
                            prev +
                            `#${tag} `
                        )
                      }
                      className="px-5 py-3 rounded-2xl bg-white border border-border hover:bg-soft transition-all text-sm font-medium"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col md:flex-row justify-end gap-4 mt-8">
            <button
              onClick={() =>
                setOpenNotes(false)
              }
              className="h-14 px-8 rounded-2xl border border-border hover:bg-white transition-all font-medium"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="h-14 px-10 rounded-2xl bg-[#111111] text-white font-semibold shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              <FiSave size={18} />

              {loading
                ? "Saving..."
                : "Save Notes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}