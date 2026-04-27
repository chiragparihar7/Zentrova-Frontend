export default function LeadFilters({ search, setSearch, status, setStatus }) {
    const tabs = ["", "pending", "contacted", "quotation", "converted", "lost"];
  
    return (
      <div className="flex flex-col md:flex-row gap-4">
  
        <input
          placeholder="Search leads..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-border p-2 rounded-lg w-full"
        />
  
        <div className="flex gap-2 flex-wrap">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setStatus(t)}
              className={`px-3 py-1 rounded-full text-sm border
                ${status === t ? "bg-primary text-white" : "bg-soft text-secondary"}`}
            >
              {t || "All"}
            </button>
          ))}
        </div>
      </div>
    );
  }