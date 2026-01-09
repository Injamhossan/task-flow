"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/auth/firebase.config.js";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setUser as setReduxUser } from "@/redux/slices/authSlice";

const AuthContext = createContext({
  user: null,
  loading: true,
  userData: null,
  refetchUser: () => {},
});

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const { data: userData = null, isLoading: isUserDataLoading, refetch: refetchUser } = useQuery({
    queryKey: ['userData', user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await fetch(`/api/users?email=${user.email}`);
      if (!res.ok) return null;
      return res.json();
    },
    enabled: !!user?.email,
  });

  // Sync with Redux
  useEffect(() => {
    if (user && userData) {
       dispatch(setReduxUser({
           user: { email: user.email, displayName: user.displayName, photoURL: user.photoURL },
           role: (user.email === "admin@taskflow.com") ? "admin" : userData.role,
           coins: userData.coin || 0
       }));
    }
  }, [user, userData, dispatch]);

  const loading = authLoading || (!!user?.email && isUserDataLoading);
  const role = (user?.email === "admin@taskflow.com") ? "admin" : userData?.role;

  return (
      <AuthContext.Provider value={{ user, userData, role, loading, refetchUser }}>
          {children}
      </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
