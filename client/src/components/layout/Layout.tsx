// src/components/layout/Layout.tsx
import Header from "./Header";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

const useAuthGuard = () => {
  const navigate = useNavigate();
  const { user, isLoading, fetchUser, logout } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!user) {
          await fetchUser();
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        logout();
        navigate("/signin");
      }
    };

    checkAuth();
  }, []);

  // useEffect(() => {
  //   if (!isLoading && user) {
  //     if (user.roleRelation?.role !== "admin") {
  //       navigate("/unauthorized");
  //     }
  //   }
  // }, [user, isLoading]);

  return { isLoading, user };
};

const Layout = () => {
  const { isLoading } = useAuthGuard();

  if (isLoading) {
    return (
      <div className="w-full min-h-dvh flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-myblue" />
          <p className="text-xl text-myblue font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
