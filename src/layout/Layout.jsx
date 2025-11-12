import Sidebar from "../components/Sidebar";
import "@styles/style.css";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="grid grid-cols-12 h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden transition-colors duration-300">
      <Sidebar />
      <main className="col-span-10 overflow-y-auto bg-gray-50 dark:bg-gray-900">
        <Outlet />
      </main>
    </div>
  );
}