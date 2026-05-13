export default function AppointmentFilters({
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
  }) {
    return (
      <div className="bg-white border border-border rounded-3xl p-5 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search client or location..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="input"
        />
  
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          className="input md:w-60"
        >
          <option value="all">
            All Status
          </option>
  
          <option value="scheduled">
            Scheduled
          </option>
  
          <option value="in-progress">
            In Progress
          </option>
  
          <option value="completed">
            Completed
          </option>
  
          <option value="cancelled">
            Cancelled
          </option>
        </select>
      </div>
    );
  }