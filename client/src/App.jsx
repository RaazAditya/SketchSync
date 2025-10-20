import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout, setCredentials } from "@/features/auth/authSlice";
import { useEffect } from "react";
import axios from "axios";

import Dashboard from "./pages/Dashboard";
import BoardPage from "./pages/CanvasEditorPage"; // 👈 import BoardPage
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/Auth/LoginPage";
import ProtectedRoute from "@/components/ProtectedRoute";
import AppLayout from "./layouts/AppLayout";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // fetch user again securely
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          dispatch(setCredentials({ token, user: res.data.user }));
        })
        .catch(() => {
          dispatch(logout());
        });
    } else {
      dispatch(logout());
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes with shared layout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/board/:id" element={<BoardPage />} /> {/* 👈 Board route */}
          </Route>
        </Route>

        <Route path="*" element={<h1>404 - Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
