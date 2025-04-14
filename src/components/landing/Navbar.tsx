import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import logo from "../../assets/foundry_logo.png";
import logoWhite from "../../assets/foundry_logo_white.png";
import { NavLink, useLocation, useNavigate } from "react-router";

// Define the type for the navLinks array
interface NavLinkItem {
  to: string;
  label: string;
}

const navLinks: NavLinkItem[] = [
  { to: "/", label: "Dashboard" },
  { to: "/fleet", label: "Fleet" },
  { to: "/order_Management", label: "Order Management" },
  { to: "/logistics", label: "Logistics" },
  { to: "/invoices", label: "Invoices" },
  { to: "/locations", label: "Locations" },
];

// Define props for the Navbar component
interface NavbarProps {
  onSearchClick: () => void;
  onToggleTheme: () => void;
  isDarkMode: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  onSearchClick,
  onToggleTheme,
  isDarkMode,
}) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const location = useLocation();
  const isOnMapPage = location.pathname === "/map";
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <nav className="px-4 py-3 w-[95%] h-[10vh] md:w-[90%] mx-auto flex items-center justify-between dark:border-white/10 relative z-50">
      {isOnMapPage ? (
        <button
          type="button"
          title="Go back"
          className="text-sm border rounded-lg px-3 py-[7px] flex items-center gap-1 text-gray-400 border-gray-200 hover:text-gray-600 hover:border-gray-300 transition duration-300 mb-1"
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

      {/* Right - Icons & Mobile Toggle */}
      <div className="flex items-center space-x-4">
        {/* Search */}
        <button
          type="button"
          title="Search"
          onClick={onSearchClick}
          className={`p-3 rounded-md transition duration-300 group ${
            isDarkMode ? "hover:bg-white/10" : "hover:bg-gray-100"
          }`}
        >
          <Icon
            icon="carbon:search"
            className="text-lg cursor-pointer hover:text-gray-500 transition"
          />
        </button>

        {/* Theme Toggle */}
        <button
          type="button"
          title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          onClick={onToggleTheme}
          className={`p-3 rounded-md transition duration-300 group ${
            isDarkMode ? "hover:bg-white/10" : "hover:bg-gray-100"
          }`}
        >
          <Icon
            icon={isDarkMode ? "mynaui:moon" : "iconoir:sun-light"}
            className="text-lg group-hover:text-gray-500 transition"
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
