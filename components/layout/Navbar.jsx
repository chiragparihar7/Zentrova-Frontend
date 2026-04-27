"use client";

import { FiBell, FiSearch } from "react-icons/fi";

export default function Navbar() {
  return (
    <div className="w-full h-16 flex items-center justify-between px-6 
    bg-background border-b border-border sticky top-0 z-50">

      {/* LEFT */}
      <div>
        <h2 className="text-lg font-semibold text-primary">
          Dashboard
        </h2>
        <p className="text-xs text-muted">
          Smart Lead Management
        </p>
      </div>

      {/* SEARCH */}
      <div className="hidden md:flex items-center w-[40%] 
      bg-soft border border-border rounded-full px-4 py-2 focus-within:ring-1 focus-within:ring-primary/20 transition">
        <FiSearch className="text-muted mr-2" />
        <input
          type="text"
          placeholder="Search leads, clients..."
          className="w-full bg-transparent outline-none text-sm text-primary placeholder:text-muted"
        />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* NOTIFICATION */}
        <div className="relative cursor-pointer group">
          <div className="p-2 rounded-full bg-soft border border-border hover:bg-muted/20 transition">
            <FiBell className="text-secondary group-hover:text-primary" />
          </div>

          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
        </div>

        {/* PROFILE */}
        <div className="flex items-center gap-3 cursor-pointer group">

          <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
            C
          </div>

          <div className="hidden md:block leading-tight">
            <p className="text-sm font-medium text-primary group-hover:opacity-80">
              Chirag Parihar
            </p>
            <p className="text-xs text-muted">
              Admin Panel
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}