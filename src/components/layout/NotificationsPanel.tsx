import { useState } from "react";

const sampleNotifications = [
  {
    id: 1,
    title: "New Order #1234",
    message: "A new order has been placed",
    time: "5 min ago",
    isRead: false,
  },
  {
    id: 2,
    title: "Low Stock Alert",
    message: "Product 'Paracetamol' is running low",
    time: "1 hour ago",
    isRead: false,
  },
  {
    id: 3,
    title: "Payment Received",
    message: "Payment for Order #1233 has been received",
    time: "2 hours ago",
    isRead: true,
  },
];

const NotificationsPanel = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [notifications, setNotifications] = useState(sampleNotifications);

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, isRead: true }))
    );
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[110]"
        aria-hidden="true"
        onClick={onClose}
      />
      <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-[120]">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Notifications</h3>
            <button
              onClick={markAllAsRead}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Mark all as read
            </button>
          </div>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${
                !notification.isRead ? "bg-blue-50" : ""
              }`}
            >
              <div className="flex justify-between">
                <h4 className="font-medium text-gray-900">
                  {notification.title}
                </h4>
                <span className="text-xs text-gray-500">
                  {notification.time}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {notification.message}
              </p>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full text-center text-sm text-blue-600 hover:text-blue-700"
          >
            View all notifications
          </button>
        </div>
      </div>
    </>
  );
};

export default NotificationsPanel;
