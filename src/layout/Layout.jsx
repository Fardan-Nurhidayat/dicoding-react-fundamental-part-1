import Sidebar from "../components/Sidebar";
import "@styles/style.css";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="grid grid-cols-12 h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      <main className="col-span-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}