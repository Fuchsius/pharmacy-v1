import { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ArrowUp,
  ArrowDown,
  DollarSign,
  Package,
  Users,
  ShoppingBag,
} from "lucide-react";

const sampleData = {
  revenue: {
    total: 125000,
    percentage: 12.5,
    isPositive: true,
    data: [
      { month: "Jan", value: 65000 },
      { month: "Feb", value: 85000 },
      { month: "Mar", value: 125000 },
    ],
  },
  orders: {
    total: 842,
    percentage: 8.2,
    isPositive: true,
    data: [
      { month: "Jan", value: 650 },
      { month: "Feb", value: 750 },
      { month: "Mar", value: 842 },
    ],
  },
  customers: {
    total: 1234,
    percentage: -2.5,
    isPositive: false,
  },
  products: {
    total: 384,
    lowStock: 12,
  },
};

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back, Admin</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Revenue Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                LKR {sampleData.revenue.total.toLocaleString()}
              </p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div
            className={`flex items-center mt-4 text-sm ${
              sampleData.revenue.isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {sampleData.revenue.isPositive ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ArrowDown className="h-4 w-4" />
            )}
            <span className="ml-1">
              {Math.abs(sampleData.revenue.percentage)}%
            </span>
            <span className="text-gray-600 ml-1">vs last month</span>
          </div>
        </div>

        {/* ...similar cards for Orders, Customers, Products... */}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Revenue Overview</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sampleData.revenue.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#2563eb"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Orders Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Orders Overview</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sampleData.orders.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        {/* Add recent orders/activities table here */}
      </div>
    </div>
  );
};

export default Dashboard;
