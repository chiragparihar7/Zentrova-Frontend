"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import LeadTable from "./LeadTable";
import LeadFormModal from "./LeadFormModal";
import LeadFilters from "./LeadFilters";

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const query = `?search=${search}&status=${status}`;
      const res = await api.getLeads(query);
      setLeads(res.data || []);
    } catch (err) {
      setError("Failed to load leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [search, status]);

  const handleAdd = async (data) => {
    try {
      if (editing) {
        await api.updateLead(editing._id, data);
      } else {
        await api.createLead(data);
      }
      fetchLeads();
    } catch {
      alert("Error saving lead");
    } finally {
      setOpen(false);
      setEditing(null);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Delete this lead?");
    if (!confirmDelete) return;

    await api.deleteLead(id);
    fetchLeads();
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold text-primary">Leads</h1>
          <p className="text-sm text-muted">Manage your pipeline</p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90"
        >
          + Add Lead
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* FILTERS */}
      <LeadFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      {/* TABLE */}
      <LeadTable
        leads={leads}
        loading={loading}
        onDelete={handleDelete}
        onEdit={(lead) => {
          setEditing(lead);
          setOpen(true);
        }}
      />

      {/* MODAL */}
      {open && (
        <LeadFormModal
          onClose={() => {
            setOpen(false);
            setEditing(null);
          }}
          onSubmit={handleAdd}
          defaultData={editing}
        />
      )}
    </div>
  );
}