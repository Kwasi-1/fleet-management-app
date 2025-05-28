import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import logo from "../../assets/foundry_logo.png";
import logoWhite from "../../assets/foundry_logo_white.png";
import { NavLink, useLocation, useNavigate } from "react-router";
import { useTheme } from "@/context/ThemeContext";

interface NavLinkItem {
  to: string;
  label: string;
}

const navLinks: NavLinkItem[] = [
  { to: "/", label: "Dashboard" },
  { to: "/fleet", label: "Fleet" },
  { to: "/order-management", label: "Order Management" },
  { to: "/logistics", label: "Logistics" },
  { to: "/invoices", label: "Invoices" },
  { to: "/locations", label: "Locations" },
];

interface NotificationItem {
  id: string;
  message: string;
  time: string;
  read: boolean;
  type: "info" | "warning" | "success" | "error";
}

interface NavbarProps {
  onSearchClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearchClick }) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const location = useLocation();
  const isOnMapPage = location.pathname === "/map";
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === "dark";

  const handleBackClick = () => {
    navigate(-1);
  };

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "1",
      message: "New shipment arrived at warehouse",
      time: "10 mins ago",
      read: false,
      type: "info",
    },
    {
      id: "2",
      message: "Delivery delayed due to traffic",
      time: "1 hour ago",
      read: false,
      type: "warning",
    },
    {
      id: "3",
      message: "Delivery #MAT-MR-2025-00315 completed",
      time: "3 hours ago",
      read: true,
      type: "success",
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "info":
        return "ri:information-line";
      case "warning":
        return "ri:error-warning-line";
      case "success":
        return "ri:check-double-line";
      case "error":
        return "ri:close-circle-line";
      default:
        return "ri:notification-line";
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "info":
        return "text-blue-500";
      case "warning":
        return "text-yellow-500";
      case "success":
        return "text-green-500";
      case "error":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  // Your existing navbar code would go here, with the notification button added
  return (
    <nav
      className={`px-4 py-3 w-[95%] h-[7vh] ${
        isOnMapPage ? " h-[7vh]" : "h-[8vh]"
      } md:w-[90%] mx-auto flex items-center justify-between dark:border-white/10 relative z-50
        ${isDarkMode ? "border-gray-700" : "border-gray-200"}
      }`}
    >
      {/* Logo and left side items */}
      {isOnMapPage ? (
        <button
          type="button"
          title="Go back"
          className="text-sm border rounded-lg px-3 py-[7px] flex items-center gap-1 text-gray-400 border-gray-200 hover:text-gray-600 hover:border-gray-300 transition duration-300"
          onClick={handleBackClick}
        >
          <Icon icon="weui:back-outlined" className="text-sm" />
        </button>
      ) : (
        <div>
          {/* Left - Logo */}
          <div className="flex items-center space-x-4">
            <img
              src={isDarkMode ? logoWhite : logo}
              alt="logo"
              className="w-4 h-5"
            />
            {/* Desktop Links */}
            <ul className="hidden lg:flex space-x-6 text-sm font-medium">
              {navLinks.map((link, index) => (
                <NavLink
                  to={link.to}
                  key={index}
                  className="hover:text-gray-500 dark:hover:text-gray-400 cursor-pointer"
                >
                  {link.label}
                </NavLink>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Right side items */}
      <div className="flex items-center space-x-4">
        {/* Search button */}
        <button
          type="button"
          title="Search"
          onClick={onSearchClick}
          className={`p-3 rounded-md transition duration-300 group ${
            isDarkMode ? "hover:bg-white/10" : "hover:bg-gray-100"
          }`}
        >
          <Icon icon="ri:search-line" className="w-5 h-5" />
        </button>

        {/* Notification button */}
        <div className="relative">
          <button
            onClick={toggleNotifications}
            className={`p-2 rounded-md transition duration-300 group ${
              isDarkMode ? "hover:bg-white/10" : "hover:bg-gray-100"
            }`}
          >
            <Icon icon="ri:notification-line" className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white text-[9px] rounded-full w-[14px] h-[14px] flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notification dropdown */}
          {showNotifications && (
            <div
              className={`absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto rounded-lg shadow-lg ${
                isDarkMode ? "bg-[#333333]" : "bg-white"
              } z-50`}
            >
              <div
                className={`flex justify-between items-center p-3 border-b ${
                  isDarkMode ? "border-gray-700" : "border-gray-200"
                } `}
              >
                <h3 className="font-semibold">Notifications</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-blue-500 hover:text-blue-700"
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  No notifications
                </div>
              ) : (
                <div>
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 border-b ${
                        isDarkMode ? "border-gray-700" : "border-gray-100"
                      } last:border-b-0 `}
                    >
                      <div className="flex">
                        <div
                          className={`mr-3 ${getNotificationColor(
                            notification.type
                          )}`}
                        >
                          <Icon
                            icon={getNotificationIcon(notification.type)}
                            className="w-5 h-5"
                          />
                        </div>
                        <div className="flex-1">
                          <p
                            className={`text-sm ${
                              notification.read
                                ? "text-gray-600 dark:text-gray-400"
                                : "font-medium"
                            }`}
                          >
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {notification.time}
                          </p>
                        </div>
                        <div className="flex flex-col space-y-1">
                          {!notification.read && (
                            <button
                              type="button"
                              title="Mark as read"
                              onClick={() => markAsRead(notification.id)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <Icon icon="ri:check-line" className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            type="button"
                            title="Delete notification"
                            onClick={() => deleteNotification(notification.id)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <Icon
                              icon="ri:delete-bin-line"
                              className="w-4 h-4"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Theme toggle button */}
        <button
          type="button"
          title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          onClick={toggleTheme}
          className={`p-3 rounded-md transition duration-300 group ${
            isDarkMode ? "hover:bg-white/10" : "hover:bg-gray-100"
          }`}
        >
          <Icon
            icon={isDarkMode ? "iconoir:sun-light" : "mynaui:moon"}
            className="w-5 h-5"
          />
        </button>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          title={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-white/10"
        >
          <Icon
            icon={menuOpen ? "ic:round-close" : "ci:hamburger-md"}
            className="text-2xl"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className={`absolute top-[100%] h-sc left-0 w-full ${
            isDarkMode ? "bg-[#333333]" : "bg-white"
          } lg:hidden py-4 px-6 space-y-4`}
        >
          {navLinks.map((link, index) => (
            <NavLink
              to={link.to}
              key={index}
              onClick={() => setMenuOpen(false)}
              className="block hover:text-gray-500 dark:hover:text-gray-400 cursor-pointer"
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
