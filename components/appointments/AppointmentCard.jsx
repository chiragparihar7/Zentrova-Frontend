"use client";

import { api } from "@/lib/api";

export default function AppointmentCard({
  appointment,
  fetchAppointments,
}) {
  const handleCheckIn = async () => {
    await api.checkInAppointment(
      appointment._id
    );

    fetchAppointments();
  };

  const handleCheckOut =
    async () => {
      await api.checkOutAppointment(
        appointment._id
      );

      fetchAppointments();
    };

  return (
    <div className="bg-white border border-border rounded-3xl p-6 shadow-sm hover:shadow-md transition">
      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold text-primary">
            {appointment.clientName}
          </h2>

          <p className="text-sm text-muted mt-1">
            {appointment.location}
          </p>
        </div>

        <span className="px-3 py-1 rounded-full text-xs bg-soft border border-border">
          {appointment.status}
        </span>
      </div>

      {/* INFO */}
      <div className="mt-5 space-y-2">
        <p className="text-sm">
          <span className="font-medium">
            Type:
          </span>{" "}
          {appointment.appointmentType}
        </p>

        <p className="text-sm">
          <span className="font-medium">
            Date:
          </span>{" "}
          {new Date(
            appointment.meetingDate
          ).toLocaleString()}
        </p>
      </div>

      {/* TEAM */}
      <div className="mt-5">
        <h3 className="font-medium text-sm mb-3">
          Assigned Team
        </h3>

        <div className="space-y-3">
          {appointment.assignedTeam?.map(
            (member, index) => (
              <div
                key={index}
                className="bg-soft rounded-2xl p-3 border border-border"
              >
                <p className="font-medium">
                  {member.name}
                </p>

                <p className="text-sm text-muted">
                  {member.role}
                </p>

                <p className="text-sm">
                  {member.phone}
                </p>
              </div>
            )
          )}
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-3 mt-6">
        {appointment.status ===
          "scheduled" && (
          <button
            onClick={handleCheckIn}
            className="flex-1 bg-primary text-white py-3 rounded-2xl"
          >
            Check In
          </button>
        )}

        {appointment.status ===
          "in-progress" && (
          <button
            onClick={handleCheckOut}
            className="flex-1 bg-green-600 text-white py-3 rounded-2xl"
          >
            Check Out
          </button>
        )}
      </div>
    </div>
  );
}