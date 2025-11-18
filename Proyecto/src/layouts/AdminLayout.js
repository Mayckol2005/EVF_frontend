import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/admin/AdminNavbar";
function AdminLayout() {
  return (
    <div className="admin-layout bg-light min-vh-100">
      {/* --- NAVBAR DEL ADMIN --- */}
      <AdminNavbar />

      {/* --- CONTENIDO VARIABLE (según la ruta del admin) --- */}
      <main className="container-fluid py-4">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
