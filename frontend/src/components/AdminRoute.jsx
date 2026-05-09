import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { isAdminLoggedIn, subscribeAdminAuthState } from "@/api/auth";

const AdminRoute = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(isAdminLoggedIn());

  useEffect(() => {
    const unsubscribe = subscribeAdminAuthState((user) => {
      setIsLoggedIn(Boolean(user));
      setIsReady(true);
    });
    return unsubscribe;
  }, []);

  if (!isReady) {
    return null;
  }

  if (!isLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

export default AdminRoute;
