const BASE =
  (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000") + "/api";

// ✅ ADD THIS
const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const api = {
  getLeads: async (params = "") => {
    const res = await fetch(`${BASE}/leads${params}`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  createLead: async (data) => {
    const res = await fetch(`${BASE}/leads`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  updateLead: async (id, data) => {
    const res = await fetch(`${BASE}/leads/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  deleteLead: async (id) => {
    const res = await fetch(`${BASE}/leads/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    return res.json();
  },
};