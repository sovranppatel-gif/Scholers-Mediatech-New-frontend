// src/components/master-admin/MasterAdmin.jsx
import React from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import {
  isMasterAdminTokenValid,
  clearMasterAdminSession,
} from "../../utils/masterAdminAuth.js";

export default function MasterAdmin() {
  const location = useLocation();

  const checkAuth = () => {
    if (!isMasterAdminTokenValid()) {
      clearMasterAdminSession();
      return false;
    }
    return true;
  };

  const isAuthenticated = checkAuth();
  const isLoginPage = location.pathname === "/master-admin";

  if (!isAuthenticated && !isLoginPage) {
    return <Navigate to="/master-admin" replace />;
  }

  if (isAuthenticated && isLoginPage) {
    return <Navigate to="/master-admin/dashboard" replace />;
  }

  return (
    <div className="master-admin-container">
      <Outlet />
    </div>
  );
}
