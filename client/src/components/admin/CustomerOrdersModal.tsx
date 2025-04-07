import { Customer } from "@/types/customer.types";
import { Order } from "@/types/order.types";

interface CustomerOrdersModalProps {
  customer: Customer;
  onClose: () => void;
}

// Sample order data - replace with actual API call
const getCustomerOrders = (customerId: string): Order[] => {
  return [
    {
      id: "ORD001",
      orderNumber: "ORD-XYZ123ABC",
      customerId,
      customerName: "John Doe",
      customerEmail: "john@example.com",
      customerPhone: "077 110 4103",
      deliveryMethod: "pickup",
      paymentMethod: "branch",
      paymentStatus: "paid",
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
      status: "delivered",
      createdAt: "2024-03-01",
      updatedAt: "2024-03-01",
    },
    // Add more sample orders...
  ];
};

const CustomerOrdersModal = ({
  customer,
  onClose,
}: CustomerOrdersModalProps) => {
  const orders = getCustomerOrders(customer.id);

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

  return (
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Order History</h2>
            <p className="text-gray-600">
              {customer.firstName} {customer.lastName}
            </p>
          </div>
          <button
            onClick={onClose}
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

        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-4 space-y-4 hover:border-blue-200 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">Order #{order.orderNumber}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status.toUpperCase()}
                </span>
              </div>

              <div className="space-y-2">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-600">
                        Quantity: {item.quantity} x LKR{" "}
                        {item.price.toLocaleString()}
                      </div>
                    </div>
                    <div className="font-medium">
                      LKR {(item.quantity * item.price).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-3 flex justify-between items-center">
                <div className="text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.paymentStatus === "paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.paymentStatus === "paid"
                      ? "Paid"
                      : "Payment Pending"}
                  </span>
                  <span className="ml-2 text-gray-600">
                    via {order.paymentMethod}
                  </span>
                </div>
                <div className="font-medium">
                  Total: LKR {order.total.toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerOrdersModal;
