import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/foundry_logo.png";

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
    title: "Dashboard",
    icon: "hugeicons:home-02",
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
    link: "/order_management",
    parent: ["order_management", false],
    sublinks: [],
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

  const highlight = (tuple: [string, boolean]): boolean => {
    if (pathname === `/${tuple[0]}`) return true;
    if (pathname.includes(tuple[0]) && !tuple[1]) return true;
    return false;
  };

  return (
    <div className="w-[15%] fixed bg-white h-screen py-4 px-2 border-r border-[#e5e7eb]">
      {/* Logo and title */}
      <div
        onClick={() => navigate("/")}
        className="flex gap-x-2 pt-2 place-items-center hover:cursor-pointer pl-4"
      >
        <img src={logo} className="w-4 h-5" alt="Logo" />
        <div className="flex flex-col mr-auto text-gray-600">
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
                isHighlighted ? "bg-gray-200/40" : "h-12"
              } rounded-xl p-1 overflow-y-hidden duration-300`}
            >
              {/* Parent Menu Item */}
              <button
                onClick={() => navigate(item.link)}
                className={`${
                  isHighlighted
                    ? "text-black"
                    : "hover:bg-gray-200/10 text-gray-500"
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
                          ? "text-black bg-white shadow"
                          : "hover:bg-gray-200/10 text-gray-500"
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
          className="text-standard w-full flex items-center p-2 rounded-lg mt-auto gap-x-2 text-gray-600 hover:text-white transition-all duration-500 hover:bg-red-600"
        >
          <Icon icon="bi:dash-circle" rotate={2} fontSize={20} />
          Log out
        </button>
      </div>
    </div>
  );
};

export default SideBar;
