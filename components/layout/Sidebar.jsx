"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FiHome, FiUsers, FiBarChart2, FiSettings } from "react-icons/fi";

export default function Sidebar() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "dashboard";

  const menuItems = [
    { name: "Dashboard", icon: <FiHome />, tab: "dashboard" },
    { name: "Leads", icon: <FiUsers />, tab: "leads" },
    { name: "Analytics", icon: <FiBarChart2 />, tab: "analytics" },
    { name: "Settings", icon: <FiSettings />, tab: "settings" },
  ];

  return (
    <div className="hidden md:flex flex-col justify-between w-64 h-screen 
    bg-background border-r border-border p-6">

      <div>
        <h2 className="text-2xl font-semibold text-primary">Zentrova</h2>

        <ul className="mt-10 space-y-2">
          {menuItems.map((item) => {
            const isActive = activeTab === item.tab;

            return (
              <Link key={item.tab} href={`/?tab=${item.tab}`}>
                <li
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
      </div>

      {/* Profile */}
      <div className="border border-border rounded-xl p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
          C
        </div>
        <div>
          <p className="text-sm text-primary">Chirag Parihar</p>
          <p className="text-xs text-muted">Admin</p>
        </div>
      </div>
    </div>
  );
}