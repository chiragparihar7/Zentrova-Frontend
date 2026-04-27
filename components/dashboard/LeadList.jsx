"use client";

export default function LeadList({ leads, deleteLead }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow border mt-6">
      <h2 className="font-semibold mb-4">Leads</h2>

      {leads.map((lead) => (
        <div key={lead._id} className="flex justify-between border-b py-2">
          <div>
            <p className="font-medium">{lead.name}</p>
            <p className="text-sm text-gray-500">{lead.phone}</p>
          </div>

          <button
            onClick={() => deleteLead(lead._id)}
            className="text-red-500"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}