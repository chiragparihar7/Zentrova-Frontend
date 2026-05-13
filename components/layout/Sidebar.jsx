"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FiFolder,
  FiHome,
  FiUsers,
  FiBarChart2,
  FiSettings,
  FiX,
  FiCalendar,
} from "react-icons/fi";

export default function Sidebar({ isOpen, setIsOpen }) {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "dashboard";

  const [user, setUser] = useState(null);

  // 🔥 Fetch Logged-in User
  useEffect(() => {
    const fetchUser = async () => {
      try {
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
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchUser();
  }, []);

  const menuItems = [
    {
      name: "Dashboard",
      icon: <FiHome />,
      tab: "dashboard",
    },

    {
      name: "Leads",
      icon: <FiUsers />,
      tab: "leads",
    },

    {
      name: "Projects",
      icon: <FiFolder />,
      tab: "projects",
    },

    {
      name: "Appointments",
      icon: <FiCalendar />,
      tab: "appointments",
    },

    {
      name: "Analytics",
      icon: <FiBarChart2 />,
      tab: "analytics",
    },

    {
      name: "Settings",
      icon: <FiSettings />,
      tab: "settings",
    },
  ];

  return (
    <>
      {/* MOBILE OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed md:static z-50 top-0 left-0 h-screen w-64 bg-background border-r border-border p-6 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* MOBILE HEADER */}
        <div className="flex justify-between items-center md:hidden mb-6">
          <h2 className="text-xl font-semibold">Zentrova</h2>
          <FiX onClick={() => setIsOpen(false)} className="cursor-pointer" />
        </div>

        {/* LOGO */}
        <h2 className="hidden md:block text-2xl font-semibold text-primary">
          Zentrova
        </h2>

        {/* MENU */}
        <ul className="mt-6 md:mt-10 space-y-2">
          {menuItems.map((item) => {
            const isActive = activeTab === item.tab;

            return (
              <Link key={item.tab} href={`/?tab=${item.tab}`}>
                <li
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition
                  ${
                    isActive
                      ? "bg-soft text-primary font-medium"
                      : "text-secondary hover:bg-soft hover:text-primary"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </li>
              </Link>
            );
          })}
        </ul>

        {/* PROFILE (Dynamic) */}
        <div className="absolute bottom-6 left-6 right-6 border border-border rounded-xl p-4 flex items-center gap-3 bg-soft">
          <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div className="flex-1">
            <p className="text-sm text-primary truncate">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-muted">{user?.role || "Member"}</p>
          </div>
        </div>
      </div>
    </>
  );
}
