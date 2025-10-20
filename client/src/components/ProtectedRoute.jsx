import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { useState } from "react";

const ProtectedRoute = () => {
  // const { token } = useSelector((state) => state.auth);
  const [token,setToken] =useState(localStorage.getItem("token"));
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
