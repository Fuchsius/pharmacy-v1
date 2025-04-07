import { useState } from "react";
import { Order } from "@/types/order.types";
import toast from "react-hot-toast";

// Sample data - replace with actual API calls
const SAMPLE_ORDERS: Order[] = [
  {
    id: "ORD001",
    orderNumber: "ORD-XYZ123ABC",
    customerId: "CUST001",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    customerPhone: "077 110 4103",
    deliveryMethod: "pickup",
    paymentMethod: "branch",
    paymentStatus: "pending",
    branchId: "main",
    branchName: "Main Branch - Polpithigama",
    shippingAddress: {
      street: "123 Main St",
      city: "Polpithigama",
      state: "North Western",
      postalCode: "60170",
    },
    items: [
      {
        id: 1,
        productId: 1,
        name: "RESPIREFAST",
        price: 2500,
        quantity: 2,
        image: "/assets/products/01.png",
      },
    ],
    subtotal: 5000,
    shipping: 0,
    total: 5000,
    status: "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const OrderManagement = () => {
  const [orders, setOrders] = useState<Order[]>(SAMPLE_ORDERS);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const itemsPerPage = 10;

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders(
      orders.map((order) => {
        if (order.id === orderId) {
          return {
            ...order,
            status: newStatus,
            updatedAt: new Date().toISOString(),
          };
        }
        return order;
      })
    );
    toast.success(`Order status updated to ${newStatus}`);
  };

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getOrderTypeLabel = (order: Order) => {
    if (order.deliveryMethod === "delivery") {
      return "Delivery (Card Payment)";
    }
    return `Pickup (${
      order.paymentMethod === "card" ? "Paid Online" : "Pay at Branch"
    })`;
  };

  const getPaymentBadgeColor = (order: Order) => {
    if (order.paymentStatus === "paid") return "bg-green-100 text-green-800";
    if (order.paymentMethod === "branch") return "bg-blue-100 text-blue-800";
    return "bg-yellow-100 text-yellow-800";
  };

  // Calculate pagination
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = orders.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Order Management</h1>
        <div className="flex gap-4">
          <select className="px-4 py-2 border rounded-lg">
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Order Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Total
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
            {currentOrders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.orderNumber}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium">
                      {order.deliveryMethod === "delivery"
                        ? "Home Delivery"
                        : "Branch Pickup"}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full inline-flex w-fit ${getPaymentBadgeColor(
                        order
                      )}`}
                    >
                      {order.paymentMethod === "branch"
                        ? "Pay at Branch"
                        : order.paymentStatus === "paid"
                        ? "Paid"
                        : "Payment Pending"}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">{order.customerName}</td>
                <td className="px-6 py-4">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  LKR {order.total.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setIsDetailsModalOpen(true);
                    }}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    View Details
                  </button>
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

      {/* Order Details Modal */}
      {isDetailsModalOpen && selectedOrder && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Order Details
              </h2>
              <button
                onClick={() => setIsDetailsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              {/* Order Type Badge */}
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {getOrderTypeLabel(selectedOrder)}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedOrder.paymentStatus === "paid"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {selectedOrder.paymentStatus === "paid"
                    ? "Paid"
                    : "Payment Pending"}
                </span>
              </div>

              {/* Order Info */}
              <div className="grid grid-cols-2 gap-4 border p-4 rounded-lg bg-gray-50">
                <div>
                  <p className="text-sm text-gray-500">Order Number</p>
                  <p className="font-semibold">{selectedOrder.orderNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-semibold">
                    {new Date(selectedOrder.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Order Type</p>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold capitalize">
                      {selectedOrder.deliveryMethod}
                    </span>
                    {selectedOrder.deliveryMethod === "pickup" && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {selectedOrder.branchName}
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Payment Method</p>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold capitalize">
                      {selectedOrder.paymentMethod}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        selectedOrder.paymentStatus === "paid"
                          ? "bg-green-100 text-green-800"
                          : selectedOrder.paymentStatus === "failed"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {selectedOrder.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Customer Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-semibold">
                      {selectedOrder.customerName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold">
                      {selectedOrder.customerEmail}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-semibold">
                      {selectedOrder.customerPhone}
                    </p>
                  </div>
                  {selectedOrder.deliveryMethod === "delivery" &&
                    selectedOrder.shippingAddress && (
                      <div className="col-span-2">
                        <p className="text-sm text-gray-500">
                          Shipping Address
                        </p>
                        <p className="font-semibold">
                          {selectedOrder.shippingAddress.street},{" "}
                          {selectedOrder.shippingAddress.city},{" "}
                          {selectedOrder.shippingAddress.state}{" "}
                          {selectedOrder.shippingAddress.postalCode}
                        </p>
                      </div>
                    )}
                </div>
              </div>

              {/* Order Items */}
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Order Items</h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          Quantity: {item.quantity} x LKR{" "}
                          {item.price.toLocaleString()}
                        </p>
                      </div>
                      <p className="font-semibold">
                        LKR {(item.quantity * item.price).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-end">
                    <div className="w-48 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal:</span>
                        <span>
                          LKR {selectedOrder.subtotal.toLocaleString()}
                        </span>
                      </div>
                      {selectedOrder.shipping > 0 && (
                        <div className="flex justify-between text-sm">
                          <span>Shipping:</span>
                          <span>
                            LKR {selectedOrder.shipping.toLocaleString()}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm font-semibold">
                        <span>Total:</span>
                        <span>LKR {selectedOrder.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="border-t pt-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <select
                    value={selectedOrder.status}
                    onChange={(e) =>
                      updateOrderStatus(
                        selectedOrder.id,
                        e.target.value as Order["status"]
                      )
                    }
                    className="px-3 py-2 border rounded-lg"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      selectedOrder.status
                    )}`}
                  >
                    {selectedOrder.status.toUpperCase()}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsDetailsModalOpen(false)}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      updateOrderStatus(selectedOrder.id, selectedOrder.status);
                      setIsDetailsModalOpen(false);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Update Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
