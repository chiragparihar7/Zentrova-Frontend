"use client";

import { useState, useEffect } from "react";

export default function LeadFormModal({ onClose, onSubmit, defaultData }) {
  const [form, setForm] = useState(
    defaultData || {
      name: "",
      phone: "",
      email: "",
      address: "",
      status: "pending",
      source: "",
      assignedTo: "",
      dealValue: "",
      labourValue: "",
      followUpDate: "",
      note: "",
    }
  );

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const payload = {
      ...form,
      dealValue: Number(form.dealValue) || 0,
      labourValue: Number(form.labourValue) || 0,
      note: form.note,
    };

    onSubmit(payload);
  };
  useEffect(() => {
    if (defaultData) {
      setForm({
        ...defaultData,
        dealValue: defaultData.dealValue || "",
        labourValue: defaultData.labourValue || "",
        followUpDate: defaultData.followUpDate
          ? defaultData.followUpDate.slice(0, 10)
          : "",
        note: "",
      });
    }
  }, [defaultData]);
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div
        className="bg-white w-[500px] max-h-[90vh] overflow-y-auto 
      p-6 rounded-2xl shadow-lg space-y-5"
      >
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-primary">
            {defaultData ? "Edit Lead" : "Add New Lead"}
          </h2>
          <button onClick={onClose} className="text-muted">
            ✕
          </button>
        </div>

        {/* BASIC INFO */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-secondary">Basic Info</p>

          <input
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full border border-border p-2 rounded-lg"
          />

          <input
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="w-full border border-border p-2 rounded-lg"
          />

          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full border border-border p-2 rounded-lg"
          />
        </div>

        {/* ADDRESS */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-secondary">Address</p>
          <textarea
            placeholder="Full address..."
            value={form.address}
            onChange={(e) => handleChange("address", e.target.value)}
            className="w-full border border-border p-2 rounded-lg"
          />
        </div>

        {/* STATUS & SOURCE */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-sm text-secondary mb-1">Status</p>
            <select
              value={form.status}
              onChange={(e) => handleChange("status", e.target.value)}
              className="w-full border border-border p-2 rounded-lg"
            >
              <option value="pending">Pending</option>
              <option value="contacted">Contacted</option>
              <option value="quotation">Quotation</option>
              <option value="converted">Converted</option>
              <option value="lost">Lost</option>
            </select>
          </div>

          <div>
            <p className="text-sm text-secondary mb-1">Source</p>
            <input
              placeholder="Facebook / Website"
              value={form.source}
              onChange={(e) => handleChange("source", e.target.value)}
              className="w-full border border-border p-2 rounded-lg"
            />
          </div>
        </div>

        {/* ASSIGN + VALUE */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-sm text-secondary mb-1">Assigned To</p>
            <input
              placeholder="Employee name"
              value={form.assignedTo}
              onChange={(e) => handleChange("assignedTo", e.target.value)}
              className="w-full border border-border p-2 rounded-lg"
            />
          </div>

          <div>
            <p className="text-sm text-secondary mb-1">Deal Value (₹)</p>
            <input
              type="number"
              placeholder="5000"
              value={form.dealValue}
              onChange={(e) => handleChange("dealValue", e.target.value)}
              className="w-full border border-border p-2 rounded-lg"
            />
          </div>
          <div>
            <p className="text-sm text-secondary mb-1">Labour Value (₹)</p>
            <input
              type="number"
              placeholder="1500"
              value={form.labourValue || ""}
              onChange={(e) => handleChange("labourValue", e.target.value)}
              className="w-full border border-border p-2 rounded-lg"
            />
          </div>
        </div>

        {/* FOLLOW UP */}
        <div>
          <p className="text-sm text-secondary mb-1">Follow-up Date</p>
          <input
            type="date"
            value={form.followUpDate}
            onChange={(e) => handleChange("followUpDate", e.target.value)}
            className="w-full border border-border p-2 rounded-lg"
          />
        </div>

        {/* NOTES */}
        <div>
          <p className="text-sm text-secondary mb-1">Notes</p>
          <textarea
            placeholder="Add notes..."
            value={form.note}
            onChange={(e) => handleChange("note", e.target.value)}
            className="w-full border border-border p-2 rounded-lg"
          />
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-border rounded-lg text-secondary"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-primary text-white px-5 py-2 rounded-lg hover:opacity-90"
          >
            {defaultData ? "Update Lead" : "Add Lead"}
          </button>
        </div>
      </div>
    </div>
  );
}
