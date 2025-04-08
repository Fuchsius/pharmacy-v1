import { Routes, Route } from "react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Toaster } from "react-hot-toast";

import Layout from "@/components/layout/Layout";
import ContactUsPage from "@/pages/contact-page";
import Home from "@/pages/home-page";
import AboutPage from "@/pages/about-page"; // Fixed typo from AbooutPage
import ProductsPage from "@/pages/products-page";
import SigninPage from "@/pages/signin-page";
import SignupPage from "@/pages/signup-page";
import CartPage from "@/pages/cart-page";
import CheckoutPage from "@/pages/checkout-page";
import ProfilePage from "@/pages/profile-page";
import SingleProductView from "@/pages/single-product-view"; // Import SingleProductView
import AdminLayout from "@/components/layout/AdminLayout";
import Dashboard from "@/admin-pages/dashboard";
import ProductsManagement from "@/admin-pages/products-page";
import OrderManagement from "@/admin-pages/order-page";
import CustomerManagement from "@/admin-pages/customers-page";
import Settings from "@/admin-pages/setting";
import Categories from "./admin-pages/categories";
import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";
import { ProtectedRoute } from "./components/ProtectedRoute";
import UnauthorizedPage from "@/pages/unauthorized-page"; // Import UnauthorizedPage

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const App = () => {
  const { fetchUser, logout } = useAuthStore();

  useEffect(() => {
    try {
      fetchUser();
    } catch (error) {
      logout();
    }
  }, []);

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            // theme: {
            //   primary: "#4CAF50",
            // },
          },
          error: {
            duration: 4000,
            // theme: {
            //   primary: "#E53E3E",
            // },
          },
        }}
      />
      <Routes>
        <Route path="unauthorized" element={<UnauthorizedPage />} />
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactUsPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:productId" element={<SingleProductView />} />

          <Route path="signin" element={<SigninPage />} />
          <Route path="signup" element={<SignupPage />} />

          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />

          <Route path="profile" element={<ProfilePage />} />
        </Route>

        <Route path="/dashboard" element={<AdminLayout />}>
          <Route
            index
            element={
              // <ProtectedRoute allowedRoles={["admin"]}>
              <Dashboard />
              // {/* </ProtectedRoute> */}
            }
          />
          <Route path="products" element={<ProductsManagement />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="customers" element={<CustomerManagement />} />
          <Route path="settings" element={<Settings />} />
          <Route path="categories" element={<Categories />} />
        </Route>

        <Route
          path="*"
          element={
            <div className=" min-w-dvh min-h-dvh flex items-center justify-center">
              <h1 className=" text-4xl font-black text-myblue text-center">
                404 Not Found
              </h1>
            </div>
          }
        />
      </Routes>
    </>
  );
};

export default App;
