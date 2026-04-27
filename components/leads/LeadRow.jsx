"use client";

import { useState } from "react";
import StatusBadge from "./StatusBadge";

export default function LeadRow({ lead, onDelete, onEdit }) {
  const [open, setOpen] = useState(false);

  const profit = (lead.dealValue || 0) - (lead.labourValue || 0);

  return (
    <>
      {/* TABLE ROW */}
      <tr
        className="border-t hover:bg-soft transition cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <td className="p-3">
          <div className="flex flex-col">
            <span className="font-medium text-primary">{lead.name}</span>
            <span className="text-xs text-muted">
              {lead.email || "No email"}
            </span>
          </div>
        </td>

        <td className="text-secondary">{lead.phone}</td>

        <td>
          <StatusBadge status={lead.status} />
        </td>

        <td className="text-right pr-4 space-x-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(lead);
            }}
            className="text-sm text-primary hover:underline"
          >
            Edit
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(lead._id);
            }}
            className="text-sm text-red-500 hover:underline"
          >
            Delete
          </button>
        </td>
      </tr>

      {/* DRAWER */}
      {open && (
        <div className="fixed inset-0 z-50 flex">

          {/* BACKDROP */}
          <div
            className="flex-1 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* DRAWER */}
          <div className="w-[440px] bg-white h-full shadow-2xl p-6 overflow-y-auto">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6 sticky top-0 bg-white z-10 pb-3 border-b">

              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white font-semibold shadow">
                  {lead.name?.charAt(0)}
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-primary">
                    {lead.name}
                  </h2>
                  <p className="text-xs text-muted">{lead.email}</p>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="text-muted text-lg"
              >
                ✕
              </button>
            </div>

            {/* STATUS */}
            <div className="mb-6">
              <StatusBadge status={lead.status} />
            </div>

            {/* INFO GRID */}
            <div className="grid grid-cols-2 gap-4 text-sm">

              <Info label="Phone" value={lead.phone} />
              <Info label="Source" value={lead.source} />
              <Info label="Assigned" value={lead.assignedTo} />
              <Info
                label="Follow-up"
                value={
                  lead.followUpDate
                    ? new Date(lead.followUpDate).toLocaleDateString()
                    : "-"
                }
              />
              <Info label="Address" value={lead.address || "-"} full />
            </div>

            {/* VALUE CARDS */}
            <div className="mt-6 grid grid-cols-3 gap-3">

              <ValueCard title="Deal" value={lead.dealValue} />

              <ValueCard title="Labour" value={lead.labourValue} />

              <div className="bg-soft rounded-xl p-3 shadow-sm">
                <p className="text-xs text-muted">Profit</p>
                <p
                  className={`text-lg font-semibold ${
                    profit > 0 ? "text-green-600" : "text-red-500"
                  }`}
                >
                  ₹{profit}
                </p>
              </div>

            </div>

            {/* NOTES */}
            {lead.notes?.length > 0 && (
              <div className="mt-6">
                <p className="text-sm font-medium text-primary mb-3">
                  Notes
                </p>

                <div className="space-y-2">
                  {lead.notes.map((n, i) => (
                    <div
                      key={i}
                      className="bg-soft p-3 rounded-lg text-sm"
                    >
                      {n.text}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ACTIONS */}
            <div className="mt-8 flex gap-3 sticky bottom-0 bg-white pt-3 border-t">

              <button
                onClick={() => onEdit(lead)}
                className="flex-1 border border-border py-2 rounded-lg hover:bg-soft"
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(lead._id)}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:opacity-90"
              >
                Delete
              </button>

            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* 🔥 Small reusable components */

function Info({ label, value, full }) {
  return (
    <div className={full ? "col-span-2" : ""}>
      <p className="text-muted text-xs">{label}</p>
      <p className="text-primary">{value || "-"}</p>
    </div>
  );
}

function ValueCard({ title, value }) {
  return (
    <div className="bg-soft rounded-xl p-3 shadow-sm">
      <p className="text-xs text-muted">{title}</p>
      <p className="text-lg font-semibold text-primary">
        ₹{value || 0}
      </p>
    </div>
  );
}