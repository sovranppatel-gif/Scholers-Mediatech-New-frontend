import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./components/Landingpage/LandingPage";
import BuildingCreativityLanding from "./components/community/BuildingCreativityLanding.jsx";
import CommunityJoinFormPage from "./components/community/CommunityJoinFormPage.jsx";
import { AuthProvider } from "./context/auth.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";
import NavigationWrapper from "./components/NavigationWrapper.jsx";


// Master Admin Components
import MasterAdmin from "./components/master-admin/MasterAdmin.jsx";
import MasterAdminLogin from "./components/master-admin/pages/Login.jsx";
import MasterAdminDashboard from "./components/master-admin/MasterDashboard.jsx";
import LandingPageManage from "./components/master-admin/landing/ManageLandingPage.jsx";

const router = createBrowserRouter([
  {
    element: <NavigationWrapper />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/building-creativity", element: <BuildingCreativityLanding /> },
      // Google Forms–style standalone form link
      { path: "/CommunityJoinForm", element: <CommunityJoinFormPage /> },

      // Master Admin Routes
      {
        path: "/master-admin",
        element: <MasterAdmin />,
        children: [
          { index: true, element: <MasterAdminLogin /> },
          { path: "dashboard", element: <MasterAdminDashboard /> },
          { path: "landing-page", element: <LandingPageManage /> },
        ],
      },

      // optional: 404
      { path: "*", element: <div style={{ padding: 24 }}>Not Found</div> },
    ],
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-white text-gray-800">
        <RouterProvider router={router} fallbackElement={<LoadingScreen />} />
      </div>
    </AuthProvider>
  );
}
