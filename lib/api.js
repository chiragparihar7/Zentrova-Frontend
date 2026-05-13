const BASE =
  (process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000") + "/api";

// HEADERS
const getHeaders = () => ({
  "Content-Type": "application/json",

  Authorization: `Bearer ${localStorage.getItem(
    "token"
  )}`,
});

export const api = {
  /* =========================
        LEADS APIs
  ========================= */

  getLeads: async (params = "") => {
    const res = await fetch(
      `${BASE}/leads${params}`,
      {
        headers: getHeaders(),
      }
    );

    return res.json();
  },

  createLead: async (data) => {
    const res = await fetch(
      `${BASE}/leads`,
      {
        method: "POST",

        headers: getHeaders(),

        body: JSON.stringify(data),
      }
    );

    return res.json();
  },

  updateLead: async (id, data) => {
    const res = await fetch(
      `${BASE}/leads/${id}`,
      {
        method: "PUT",

        headers: getHeaders(),

        body: JSON.stringify(data),
      }
    );

    return res.json();
  },

  deleteLead: async (id) => {
    const res = await fetch(
      `${BASE}/leads/${id}`,
      {
        method: "DELETE",

        headers: getHeaders(),
      }
    );

    return res.json();
  },

  /* =========================
        PROJECT APIs
  ========================= */

  getProjects: async (params = "") => {
    const res = await fetch(
      `${BASE}/projects${params}`,
      {
        headers: getHeaders(),
      }
    );

    return res.json();
  },

  createProject: async (data) => {
    const res = await fetch(
      `${BASE}/projects`,
      {
        method: "POST",

        headers: getHeaders(),

        body: JSON.stringify(data),
      }
    );

    return res.json();
  },

  updateProject: async (id, data) => {
    const res = await fetch(
      `${BASE}/projects/${id}`,
      {
        method: "PATCH",

        headers: getHeaders(),

        body: JSON.stringify(data),
      }
    );

    return res.json();
  },

  deleteProject: async (id) => {
    const res = await fetch(
      `${BASE}/projects/${id}`,
      {
        method: "DELETE",

        headers: getHeaders(),
      }
    );

    return res.json();
  },

  addProjectNote: async (id, note) => {
    const res = await fetch(
      `${BASE}/projects/${id}/note`,
      {
        method: "POST",

        headers: getHeaders(),

        body: JSON.stringify({ note }),
      }
    );

    return res.json();
  },

  updateProjectStatus: async (
    id,
    status
  ) => {
    const res = await fetch(
      `${BASE}/projects/${id}/status`,
      {
        method: "PATCH",

        headers: getHeaders(),

        body: JSON.stringify({
          status,
        }),
      }
    );

    return res.json();
  },

  updateProjectProgress: async (
    id,
    progress
  ) => {
    const res = await fetch(
      `${BASE}/projects/${id}/progress`,
      {
        method: "PATCH",

        headers: getHeaders(),

        body: JSON.stringify({
          progress,
        }),
      }
    );

    return res.json();
  },

  /* =========================
      APPOINTMENT APIs
  ========================= */

  // GET ALL
  getAppointments: async () => {
    const res = await fetch(
      `${BASE}/appointments`,
      {
        headers: getHeaders(),
      }
    );

    return res.json();
  },

  // CREATE
  createAppointment: async (data) => {
    const res = await fetch(
      `${BASE}/appointments`,
      {
        method: "POST",

        headers: getHeaders(),

        body: JSON.stringify(data),
      }
    );

    return res.json();
  },

  // UPDATE
  updateAppointment: async (
    id,
    data
  ) => {
    const res = await fetch(
      `${BASE}/appointments/${id}`,
      {
        method: "PUT",

        headers: getHeaders(),

        body: JSON.stringify(data),
      }
    );

    return res.json();
  },

  // DELETE
  deleteAppointment: async (id) => {
    const res = await fetch(
      `${BASE}/appointments/${id}`,
      {
        method: "DELETE",

        headers: getHeaders(),
      }
    );

    return res.json();
  },

  // CHECK IN
  checkInAppointment: async (id) => {
    const res = await fetch(
      `${BASE}/appointments/check-in/${id}`,
      {
        method: "PUT",

        headers: getHeaders(),
      }
    );

    return res.json();
  },

  // CHECK OUT
  checkOutAppointment: async (
    id
  ) => {
    const res = await fetch(
      `${BASE}/appointments/check-out/${id}`,
      {
        method: "PUT",

        headers: getHeaders(),
      }
    );

    return res.json();
  },

  // ADD NOTE
  addAppointmentNote: async (
    id,
    text
  ) => {
    const res = await fetch(
      `${BASE}/appointments/add-note/${id}`,
      {
        method: "POST",

        headers: getHeaders(),

        body: JSON.stringify({
          text,
        }),
      }
    );

    return res.json();
  },

  /* =========================
      NOTIFICATION APIs
  ========================= */

  // GET ALL NOTIFICATIONS
  getNotifications: async () => {
    const res = await fetch(
      `${BASE}/notifications`,
      {
        headers: getHeaders(),
      }
    );

    return res.json();
  },

  // MARK AS READ
  markNotificationRead: async (
    id
  ) => {
    const res = await fetch(
      `${BASE}/notifications/read/${id}`,
      {
        method: "PUT",

        headers: getHeaders(),
      }
    );

    return res.json();
  },
};