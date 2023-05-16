import React from "react";
import { useGlobalContext } from "../../context/AppContext";
import { Navigate } from "react-router-dom";
import { Loading } from "../../components/components";
const ProtectedRoute = ({ children }) => {
  const { student, studentLoading } = useGlobalContext();
  if (studentLoading) {
    return <Loading center />;
  }
  if (!student) {
    return <Navigate to="/landing" />;
  }
  return children;
};

export default ProtectedRoute;
