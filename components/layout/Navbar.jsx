"use client";

import { useEffect, useState } from "react";
import { FiBell, FiSearch, FiMenu } from "react-icons/fi";

export default function Navbar({ setIsOpen }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setUser(data);
    };

    fetchUser();
  }, []);

  return (
    <div className="w-full h-16 flex items-center justify-between px-4 md:px-6 
    bg-background border-b border-border sticky top-0 z-40">

      {/* LEFT */}
      <div className="flex items-center gap-3">
        <FiMenu
          className="md:hidden text-xl cursor-pointer"
          onClick={() => setIsOpen(true)}
        />

        <div>
          <h2 className="text-base md:text-lg font-semibold text-primary">
            Dashboard
          </h2>
          <p className="text-[10px] md:text-xs text-muted">
            Smart Lead Management
          </p>
        </div>
      </div>

      {/* SEARCH */}
      <div className="hidden md:flex items-center w-[40%] 
      bg-soft border border-border rounded-full px-4 py-2">
        <FiSearch className="text-muted mr-2" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-transparent outline-none text-sm"
        />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2 md:gap-4">

        <div className="p-2 rounded-full bg-soft border border-border">
          <FiBell />
        </div>

        {/* USER */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary text-white flex items-center justify-center">
            {user?.name?.charAt(0) || "U"}
          </div>

          <div className="hidden md:block">
            <p className="text-sm">{user?.name || "User"}</p>
            <p className="text-xs text-muted">
              {user?.role || "Member"}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}