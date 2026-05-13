export default function AppointmentCalendar({
    appointments,
  }) {
    return (
      <div className="bg-white border border-border rounded-3xl p-6">
        <h2 className="text-xl font-semibold">
          Upcoming Appointments
        </h2>
  
        <div className="mt-5 space-y-4">
          {appointments
            .slice(0, 5)
            .map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between border border-border rounded-2xl p-4"
              >
                <div>
                  <p className="font-medium">
                    {item.clientName}
                  </p>
  
                  <p className="text-sm text-muted">
                    {item.location}
                  </p>
                </div>
  
                <p className="text-sm">
                  {new Date(
                    item.meetingDate
                  ).toLocaleDateString()}
                </p>
              </div>
            ))}
        </div>
      </div>
    );
  }