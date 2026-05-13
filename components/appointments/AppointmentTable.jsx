import AppointmentCard from "./AppointmentCard";

export default function AppointmentTable({
  appointments,
  fetchAppointments,
}) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
      {appointments.map((appointment) => (
        <AppointmentCard
          key={appointment._id}
          appointment={appointment}
          fetchAppointments={
            fetchAppointments
          }
        />
      ))}
    </div>
  );
}