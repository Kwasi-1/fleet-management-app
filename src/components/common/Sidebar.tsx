import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/foundry_logo.png";
import logoWhite from "../../assets/foundry_logo_white.png";
import { useTheme } from "@/context/ThemeContext";

// Define sublink and menu item types
interface SubLink {
  title: string;
  icon: string;
  link: string;
  parent?: [string, boolean];
  sublinks?: SubLink[];
  iconStyle?: string;
}

interface MenuItem {
  title: string;
  icon: string;
  link: string;
  parent: [string, boolean];
  sublinks: SubLink[];
  iconStyle?: string;
}

// Menu items generator
const MenuItems = (): MenuItem[] => [
  {
    title: "Map Dashboard",
    icon: "carbon:map",
    link: "/",
    parent: ["/", true],
    sublinks: [],
  },
  {
    title: "Fleet",
    icon: "hugeicons:truck",
    link: "/fleet",
    parent: ["fleet", false],
    sublinks: [
      {
        title: "Overview",
        icon: "clarity:dashboard-line",
        link: "/fleet",
      },
      {
        title: "Drivers",
        icon: "mdi:drivers-license-outline",
        link: "/fleet/drivers",
      },
      {
        title: "Vehicles",
        icon: "fluent:vehicle-car-20-regular",
        link: "/fleet/vehicle",
        parent: ["Vehicles", false],
      },
      {
        title: "Fuel & Energy",
        icon: "clarity:fuel-line",
        link: "/fleet/fuel",
        parent: ["Fuel & Energy", false],
        sublinks: [],
      },
      {
        title: "Reminders",
        icon: "hugeicons:apple-reminder",
        link: "/fleet/reminders",
        parent: ["reminders", false],
        sublinks: [],
      },
      {
        title: "Issues",
        icon: "iconoir:wifi-issue",
        link: "/fleet/issues",
        parent: ["issues", false],
        sublinks: [],
      },
      {
        title: "Service",
        icon: "fluent-mdl2:service-off",
        link: "/fleet/service",
        parent: ["service", false],
        sublinks: [],
      },
    ],
  },
  {
    title: "Order Management",
    icon: "hugeicons:document-validation",
    link: "/order-management",
    parent: ["order-management", false],
    sublinks: [
      {
        title: "Orders",
        icon: "fluent-mdl2:activate-orders",
        link: "/order-management",
      },
      {
        title: "Inventory",
        icon: "material-symbols:inventory-rounded",
        link: "/order-management/inventory",
      },
      {
        title: "Returns",
        icon: "fluent-mdl2:returns",
        link: "/order-management/returns",
      },
    ],
  },
  {
    title: "Logistics",
    icon: "hugeicons:cashier-02",
    link: "/logistics",
    parent: ["logistics", false],
    sublinks: [
      {
        title: "Overview",
        icon: "clarity:dashboard-line",
        link: "/logistics",
      },
      {
        title: "Shipment",
        icon: "emojione-monotone:package",
        link: "/logistics/shipment",
      },
      {
        title: "Booking",
        icon: "solar:book-broken",
        link: "/logistics/booking",
      },
    ],
  },
  {
    title: "Invoices",
    icon: "hugeicons:wallet-add-01",
    link: "/invoices",
    parent: ["invoices", false],
    sublinks: [],
  },
  {
    title: "Locations",
    icon: "mdi:locations-outline",
    link: "/locations",
    parent: ["locations", false],
    sublinks: [],
  },
];

const SideBar: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const highlight = (tuple: [string, boolean]): boolean => {
    if (pathname === `/${tuple[0]}`) return true;
    if (pathname.includes(tuple[0]) && !tuple[1]) return true;
    return false;
  };

  return (
    <div className="w-[15%] fixed bg-white dark:bg-[#121212] h-screen py-4 px-2 border-r border-[#e5e7eb] dark:border-[#2a2a2a]">
      {/* Logo and title */}
      <div
        onClick={() => navigate("/")}
        className="flex gap-x-2 pt-2 place-items-center hover:cursor-pointer pl-4"
      >
        <img
          src={isDarkMode ? logoWhite : logo}
          className="w-4 h-5"
          alt="Logo"
        />
        <div className="flex flex-col mr-auto text-gray-600 dark:text-[#b0b0b0]">
          <h1 className="font-medium capitalize">Foundry</h1>
        </div>
      </div>

      {/* Sidebar Menu */}
      <div className="flex flex-col w-full h-[calc(100%-1rem)] mx-auto py-8 text-sm">
        {MenuItems().map((item, index) => {
          const isHighlighted = highlight(item.parent);
          const hasAccess = true;

          return hasAccess ? (
            <div
              key={index}
              className={`flex flex-col w-full nav ${
                isHighlighted ? "bg-gray-200/30 dark:bg-[#2a2a2a]" : "h-12"
              } rounded-xl p-1 overflow-y-hidden duration-300`}
            >
              {/* Parent Menu Item */}
              <button
                onClick={() => navigate(item.link)}
                className={`${
                  isHighlighted
                    ? "text-black dark:text-white"
                    : "hover:bg-gray-200/10 dark:hover:bg-[#2a2a2a] text-gray-500 dark:text-[#b0b0b0]"
                } rounded-xl p-2 flex flex-row gap-x-3 items-center`}
              >
                <Icon
                  icon={item.icon}
                  className={`text-[19px] flex-shrink-0 ${
                    item?.iconStyle || ""
                  }`}
                />
                <p className="mt-[2px] whitespace-nowrap">{item.title}</p>
              </button>

              {/* Sublinks */}
              <div className="flex flex-col pl-4 max-h-[calc(100vh-5rem)] overflow-y-auto">
                {item.sublinks.map((sublink, subIndex) => {
                  const isSublinkActive = pathname === sublink.link;
                  const hasAccess = true;

                  return hasAccess ? (
                    <button
                      key={subIndex}
                      onClick={() => navigate(sublink.link)}
                      className={`${
                        isSublinkActive
                          ? "text-black dark:text-white bg-white dark:bg-[#1f1f1f]"
                          : "hover:bg-gray-200/10 dark:hover:bg-[#2a2a2a]   text-gray-500 dark:text-[#a0a0a0]"
                      } rounded-xl scrollbar-hide p-2 flex flex-row gap-x-2 items-center my-1 overflow-auto text-ellipsis`}
                    >
                      <Icon
                        icon={sublink.icon}
                        className={`text-[19px] flex-shrink-0 ${
                          sublink?.iconStyle || ""
                        }`}
                      />
                      <p className="mt-[2px] whitespace-nowrap">
                        {sublink.title}
                      </p>
                    </button>
                  ) : null;
                })}
              </div>
            </div>
          ) : null;
        })}

        {/* Logout Button */}
        <button
          onClick={() => {}}
          className="w-full flex items-center p-2 rounded-lg mt-auto text-gray-600 gap-x-2 dark:text-[#b0b0b0] hover:text-white transition-all duration-500 hover:bg-red-600"
        >
          <Icon icon="bi:dash-circle" rotate={2} fontSize={20} />
          Log out
        </button>
      </div>
    </div>
  );
};

export default SideBar;
