"use client";

import { useState } from "react";
import axios from "axios";

export default function AddLead({ fetchLeads }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    source: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/leads", form);
    setForm({ name: "", phone: "", email: "", source: "" });
    fetchLeads();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-5 rounded-xl shadow border">
      <h2 className="font-semibold mb-4">Add Lead</h2>

      <input placeholder="Name" className="input" value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })} />

      <input placeholder="Phone" className="input mt-2"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })} />

      <input placeholder="Email" className="input mt-2"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })} />

      <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded">
        Add Lead
      </button>
    </form>
  );
}