import { useState } from "react";
import { Link, useLocation } from "react-router";

interface AdminSidebarProps {
  isCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

const menuItems = [
  {
    title: "Dashboard",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
        />
      </svg>
    ),
    path: "/dashboard",
  },
  {
    title: "Products",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    ),
    path: "/admin/products",
  },
  {
    title: "Orders",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
    ),
    path: "/admin/orders",
  },
  {
    title: "Customers",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
    path: "/admin/customers",
  },
  {
    title: "Settings",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    path: "/admin/settings",
  },
];

const AdminSidebar = ({
  isCollapsed,
  onCollapsedChange,
}: AdminSidebarProps) => {
  const [localCollapsed, setLocalCollapsed] = useState(false);
  const location = useLocation();

  const collapsed = isCollapsed ?? localCollapsed;
  const handleCollapsedChange = (value: boolean) => {
    setLocalCollapsed(value);
    onCollapsedChange?.(value);
  };

  return (
    <aside
      className={`bg-white border-r border-gray-200 transition-[width] duration-300 ease-in-out ${
        collapsed ? "w-20" : "w-64"
      } min-h-screen fixed left-0 top-0 z-[100]`}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div
          className={`flex items-center gap-3 p-4 border-b ${
            collapsed ? "justify-center" : "px-6"
          }`}
        >
          <img src="/logo.svg" alt="PNM Logo" className="h-10 w-10" />
          {!collapsed && (
            <span className="font-bold text-xl text-gray-900">Admin</span>
          )}
        </div>

        {/* Toggle button */}
        <button
          onClick={() => handleCollapsedChange(!collapsed)}
          className="absolute -right-3 top-16 bg-white border border-gray-200 rounded-full p-1.5 hover:bg-gray-50"
        >
          <svg
            className={`w-4 h-4 text-gray-600 transform transition-transform ${
              collapsed ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors ${
                    location.pathname === item.path
                      ? "text-blue-600 bg-blue-50 border-r-4 border-blue-600"
                      : ""
                  } ${collapsed ? "justify-center px-4" : ""}`}
                >
                  {item.icon}
                  {!collapsed && <span>{item.title}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Profile */}
        <div
          className={`border-t p-4 ${
            collapsed ? "flex justify-center" : "px-6"
          }`}
        >
          <Link
            to="/admin/profile"
            className="flex items-center gap-3 text-gray-600 hover:text-blue-600"
          >
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            {!collapsed && (
              <div className="flex-1">
                <p className="font-medium">Admin User</p>
                <p className="text-sm text-gray-500">admin@pnm.com</p>
              </div>
            )}
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
