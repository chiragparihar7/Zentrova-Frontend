"use client";

import LeadRow from "./LeadRow";

export default function LeadTable({ leads, loading, onDelete, onEdit }) {

  // 🔄 Loading Skeleton
  if (loading) {
    return (
      <div className="border border-border rounded-xl overflow-hidden">
        <div className="p-6 space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-10 bg-soft animate-pulse rounded-lg"
            />
          ))}
        </div>
      </div>
    );
  }

  // 🚫 Empty State
  if (!leads.length) {
    return (
      <div className="border border-border rounded-xl p-10 text-center bg-white">
        <p className="text-muted text-sm">No leads found</p>
        <p className="text-xs text-muted mt-1">
          Try adjusting filters or add a new lead
        </p>
      </div>
    );
  }

  return (
    <div className="border border-border rounded-xl bg-white overflow-hidden">

      {/* HEADER BAR */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-border bg-soft">
        <p className="text-sm text-secondary">
          Total Leads: <span className="text-primary font-medium">{leads.length}</span>
        </p>

        <p className="text-xs text-muted">
          Updated just now
        </p>
      </div>

      {/* TABLE WRAPPER */}
      <div className="overflow-x-auto max-h-[500px]">

        <table className="w-full text-sm">

          {/* TABLE HEAD */}
          <thead className="bg-soft text-secondary sticky top-0 z-10">
            <tr>
              <th className="p-3 text-left font-medium">Lead</th>
              <th className="text-left font-medium">Phone</th>
              <th className="text-left font-medium">Status</th>
              <th className="text-right pr-4 font-medium">Actions</th>
            </tr>
          </thead>

          {/* TABLE BODY */}
          <tbody>
            {leads.map((lead) => (
              <LeadRow
                key={lead._id}
                lead={lead}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}