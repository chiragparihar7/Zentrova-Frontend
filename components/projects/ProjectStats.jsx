export default function ProjectStats({
    projects,
  }) {
    const totalProjects = projects.length;
  
    const completedProjects = projects.filter(
      (p) => p.status === "completed"
    ).length;
  
    const totalRevenue = projects.reduce(
      (acc, item) =>
        acc + Number(item.dealValue || 0),
      0
    );
  
    return (
      <div className="grid md:grid-cols-3 gap-5">
        <div className="bg-background border border-border rounded-2xl p-5">
          <p className="text-muted text-sm">
            Total Projects
          </p>
  
          <h2 className="text-3xl font-bold mt-2">
            {totalProjects}
          </h2>
        </div>
  
        <div className="bg-background border border-border rounded-2xl p-5">
          <p className="text-muted text-sm">
            Completed
          </p>
  
          <h2 className="text-3xl font-bold mt-2">
            {completedProjects}
          </h2>
        </div>
  
        <div className="bg-background border border-border rounded-2xl p-5">
          <p className="text-muted text-sm">
            Revenue
          </p>
  
          <h2 className="text-3xl font-bold mt-2">
            ₹{totalRevenue}
          </h2>
        </div>
      </div>
    );
  }