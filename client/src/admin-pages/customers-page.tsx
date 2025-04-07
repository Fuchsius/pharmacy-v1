import { useState } from "react";
import { Order } from "@/types/order.types";
import toast from "react-hot-toast";
import { Customer } from "@/types/customer.types";
import CustomerDetailsModal from "@/components/admin/CustomerDetailsModal";
import CustomerOrdersModal from "@/components/admin/CustomerOrdersModal";

// Sample data - replace with actual API calls
const SAMPLE_CUSTOMERS: Customer[] = [
  {
    id: "CUST001",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "077 110 4103",
    address: "123 Main St",
    city: "Kurunegala",
    postalCode: "60000",
    registeredDate: "2024-01-15",
    lastLoginDate: "2024-03-10",
    status: "active",
    totalOrders: 5,
    totalSpent: 25000,
  },
  // Add more sample customers...
];

const CustomerManagement = () => {
  const [customers, setCustomers] = useState<Customer[]>(SAMPLE_CUSTOMERS);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;

  const handleStatusChange = (
    customerId: string,
    newStatus: "active" | "blocked"
  ) => {
    setCustomers(
      customers.map((customer) =>
        customer.id === customerId
          ? { ...customer, status: newStatus }
          : customer
      )
    );
    toast.success(
      `Customer ${
        newStatus === "blocked" ? "blocked" : "unblocked"
      } successfully`
    );
  };

  const filteredCustomers = customers.filter((customer) =>
    Object.values(customer)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCustomers = filteredCustomers.slice(startIndex, endIndex);

  const exportCustomerData = () => {
    const csvData = [
      [
        "ID",
        "Name",
        "Email",
        "Phone",
        "City",
        "Status",
        "Total Orders",
        "Total Spent",
      ],
      ...customers.map((customer) => [
        customer.id,
        `${customer.firstName} ${customer.lastName}`,
        customer.email,
        customer.phone,
        customer.city,
        customer.status,
        customer.totalOrders,
        customer.totalSpent,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "customers.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Customer Management
        </h1>
        <div className="flex gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <button
            onClick={exportCustomerData}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
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
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Export CSV
          </button>
        </div>
      </div>

      {/* Customer Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Orders
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentCustomers.map((customer) => (
              <tr key={customer.id}>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-lg font-medium text-gray-600">
                          {customer.firstName[0]}
                          {customer.lastName[0]}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="font-medium text-gray-900">
                        {customer.firstName} {customer.lastName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {customer.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{customer.phone}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{customer.city}</div>
                  <div className="text-sm text-gray-500">
                    {customer.postalCode}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {customer.totalOrders} orders
                  </div>
                  <div className="text-sm text-gray-500">
                    LKR {customer.totalSpent.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      customer.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {customer.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        setSelectedCustomer(customer);
                        setIsDetailsModalOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCustomer(customer);
                        setIsOrdersModalOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Orders
                    </button>
                    <button
                      onClick={() =>
                        handleStatusChange(
                          customer.id,
                          customer.status === "active" ? "blocked" : "active"
                        )
                      }
                      className={`${
                        customer.status === "active"
                          ? "text-red-600 hover:text-red-900"
                          : "text-green-600 hover:text-green-900"
                      }`}
                    >
                      {customer.status === "active" ? "Block" : "Unblock"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium
                ${
                  currentPage === page
                    ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                    : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                }`}
            >
              {page}
            </button>
          ))}
        </nav>
      </div>

      {/* Customer Details Modal */}
      {isDetailsModalOpen && selectedCustomer && (
        <CustomerDetailsModal
          customer={selectedCustomer}
          onClose={() => setIsDetailsModalOpen(false)}
        />
      )}

      {/* Customer Orders Modal */}
      {isOrdersModalOpen && selectedCustomer && (
        <CustomerOrdersModal
          customer={selectedCustomer}
          onClose={() => setIsOrdersModalOpen(false)}
        />
      )}
    </div>
  );
};

export default CustomerManagement;
