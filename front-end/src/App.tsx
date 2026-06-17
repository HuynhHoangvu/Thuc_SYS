import React from "react";
import { Toaster } from "react-hot-toast";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import CrmPage from "./pages/CrmPage";
import DocumentsPage from "./pages/DocumentsPage";
import type { AuthUser } from "./types";

const MOCK_USER: AuthUser = {
  id: "admin",
  name: "Administrator",
  role: "Giám đốc",
  department: "Ban Giám Đốc",
  employeeCode: "ADMIN",
  permissions: ["*"],
};

const PageWrapper: React.FC = () => {
  return (
    <div className="flex-1 overflow-hidden flex flex-col relative z-0 page-fade-in">
      <Outlet />
    </div>
  );
};

const AppLayout: React.FC = () => {
  const [currentUser] = React.useState<AuthUser>(MOCK_USER);

  return (
    <div className="flex h-screen w-full bg-gray-100 font-sans text-gray-900 overflow-hidden">
      <Sidebar currentUser={currentUser} />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <PageWrapper />
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Toaster position="bottom-right" toastOptions={{ duration: 4000 }} />
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/crm" replace />} />
          <Route path="/crm" element={<CrmPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="*" element={<Navigate to="/crm" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
