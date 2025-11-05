import Sidebar from "../components/Sidebar";
import "@styles/style.css";
import { Outlet } from "react-router";
export default function Layout() {
  return (
    <div className="grid grid-cols-12 h-svh gap-4 bg-gray-100">
      <Sidebar />
      <main className="col-span-10 p-4">
        <Outlet />
      </main>
    </div>
  );
}