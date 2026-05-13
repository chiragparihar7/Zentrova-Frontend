export default function ProjectFilters({
    filters,
    setFilters,
  }) {
    return (
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search Project..."
          value={filters.search}
          onChange={(e) =>
            setFilters({
              ...filters,
              search: e.target.value,
            })
          }
          className="flex-1 border border-border rounded-xl px-4 py-3 bg-background outline-none"
        />
  
        <select
          value={filters.status}
          onChange={(e) =>
            setFilters({
              ...filters,
              status: e.target.value,
            })
          }
          className="border border-border rounded-xl px-4 py-3 bg-background outline-none"
        >
          <option value="">All Status</option>
  
          <option value="not_started">
            Not Started
          </option>
  
          <option value="in_progress">
            In Progress
          </option>
  
          <option value="on_hold">
            On Hold
          </option>
  
          <option value="completed">
            Completed
          </option>
        </select>
      </div>
    );
  }