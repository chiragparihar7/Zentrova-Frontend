export default function AppointmentStats({
    appointments,
  }) {
    const total = appointments.length;
  
    const completed = appointments.filter(
      (item) => item.status === "completed"
    ).length;
  
    const scheduled = appointments.filter(
      (item) => item.status === "scheduled"
    ).length;
  
    const inProgress =
      appointments.filter(
        (item) =>
          item.status === "in-progress"
      ).length;
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <Card
          title="Total"
          value={total}
        />
  
        <Card
          title="Scheduled"
          value={scheduled}
        />
  
        <Card
          title="In Progress"
          value={inProgress}
        />
  
        <Card
          title="Completed"
          value={completed}
        />
      </div>
    );
  }
  
  function Card({ title, value }) {
    return (
      <div className="bg-white border border-border rounded-3xl p-6 shadow-sm hover:shadow-md transition">
        <p className="text-sm text-muted">
          {title}
        </p>
  
        <h2 className="text-4xl font-bold text-primary mt-3">
          {value}
        </h2>
      </div>
    );
  }