import React from "react";
import { Outlet } from "react-router-dom";

export default function HomepageLayout() {
  return (
    <div className="transition dark:text-white dark:bg-secondary  font-Bungee  h-screen flex items-center justify-center">
      <Outlet />
    </div>
  );
}
