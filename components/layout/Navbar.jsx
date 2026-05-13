"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  FiBell,
  FiSearch,
  FiMenu,
} from "react-icons/fi";

import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Navbar({
  setIsOpen,
}) {
  const [user, setUser] =
    useState(null);

  useEffect(() => {
    const fetchUser =
      async () => {
        const token =
          localStorage.getItem(
            "token"
          );

        if (!token) return;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data =
          await res.json();

        setUser(data);
      };

    fetchUser();
  }, []);

  return (
    <div
      className="
      sticky top-0 z-40
      w-full h-20
      border-b border-border
      bg-background/80
      backdrop-blur-xl
      px-4 md:px-8
      flex items-center justify-between
      transition-all
    "
    >
      {/* LEFT */}
      <div className="flex items-center gap-4">
        {/* MOBILE MENU */}
        <button
          onClick={() =>
            setIsOpen(true)
          }
          className="md:hidden w-11 h-11 rounded-2xl border border-border bg-card flex items-center justify-center"
        >
          <FiMenu size={20} />
        </button>

        {/* TITLE */}
        <div>
          <h2 className="text-xl font-semibold text-primary">
            Dashboard
          </h2>

          <p className="text-xs text-muted mt-1">
            Smart CRM Management
          </p>
        </div>
      </div>

      {/* SEARCH */}
      <div
        className="
        hidden lg:flex
        items-center
        w-[40%]
        h-14
        rounded-2xl
        border border-border
        bg-soft/70
        px-5
      "
      >
        <FiSearch className="text-muted mr-3 text-lg" />

        <input
          type="text"
          placeholder="Search leads, projects, meetings..."
          className="w-full bg-transparent outline-none text-sm"
        />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* THEME TOGGLE */}
        <ThemeToggle />

        {/* NOTIFICATION */}
        <button
          className="
          relative
          w-11 h-11
          rounded-2xl
          border border-border
          bg-card
          hover:bg-soft
          transition-all
          flex items-center justify-center
        "
        >
          <FiBell size={19} />

          {/* BADGE */}
          <span
            className="
            absolute -top-1 -right-1
            w-5 h-5 rounded-full
            bg-primary text-background
            text-[10px]
            flex items-center justify-center
            font-medium
          "
          >
            3
          </span>
        </button>

        {/* USER */}
        <div
          className="
          flex items-center gap-3
          bg-card border border-border
          rounded-2xl
          px-3 py-2
        "
        >
          {/* AVATAR */}
          <div
            className="
            w-11 h-11 rounded-2xl
            bg-primary text-background
            flex items-center justify-center
            font-semibold
            text-sm
          "
          >
            {user?.name
              ?.charAt(0)
              ?.toUpperCase() ||
              "U"}
          </div>

          {/* INFO */}
          <div className="hidden md:block">
            <p className="text-sm font-medium text-primary">
              {user?.name ||
                "User"}
            </p>

            <p className="text-xs text-muted mt-0.5">
              {user?.role ||
                "Member"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}