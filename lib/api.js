const BASE =
  (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000") + "/api";

export const api = {
  getLeads: async (params = "") => {
    const res = await fetch(`${BASE}/leads${params}`);
    return res.json();
  },

  createLead: async (data) => {
    const res = await fetch(`${BASE}/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  updateLead: async (id, data) => {
    const res = await fetch(`${BASE}/leads/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  deleteLead: async (id) => {
    const res = await fetch(`${BASE}/leads/${id}`, {
      method: "DELETE",
    });
    return res.json();
  },
};