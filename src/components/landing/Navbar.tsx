import { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import logo from "../../assets/foundry_logo.png";
import logoWhite from "../../assets/foundry_logo_white.png";
import { NavLink } from "react-router";

// Navigation links array (easier to edit)
// const navLinks = ["Dashboard", ["Fleet", "/fleet" ], "Order Management", "Logistics", "Invoices"];

const navLinks = [
  { to: "/", label: "Dashboard" },
  { to: "/fleet", label: "Fleet" },
  { to: "/order_Managementg", label: "Order Management" },
  { to: "/logistics", label: "Logistics" },
  { to: "/invoices", label: "Invoices" },
];

interface NavbarProps {
  onSearchClick: () => void;
  onToggleTheme: () => void;
  isDarkMode: boolean;
}

const Navbar = ({ onSearchClick, onToggleTheme, isDarkMode }: NavbarProps) => {
  return (
    <nav className=" h-[10vh] px-8 py-4 w-[90%] mx-auto flex items-center justify-between ">
      {/* Left - Navigation Links */}
      <div className="flex items-center space-x-10">
        <img
          src={isDarkMode ? logoWhite : logo}
          alt="logo"
          className="w-4 h-5"
        />
        <ul className="flex space-x-10 text-sm font-medium ">
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

      {/* Right - Icons */}
      <div className="flex space-x-4">
        <button
          onClick={onSearchClick}
          className={`p-3 rounded-md transition duration-300 ${
            isDarkMode ? "hover:bg-white" : "hover:bg-gray-100"
          }`}
        >
          <Icon
            icon="carbon:search"
            className="text-lg cursor-pointer  hover:text-gray-500"
          />
        </button>

        <button
          onClick={onToggleTheme}
          className={`p-3 rounded-md group transition duration-300 ${
            isDarkMode ? "hover:bg-white" : "group-hover:bg-gray-100"
          }`}
        >
          <Icon
            icon={isDarkMode ? "mynaui:moon" : "iconoir:sun-light"}
            className="text-lg cursor-pointer  group-hover:text-gray-500"
          />
        </button>
      </div>
      {/* </div> */}
    </nav>
  );
};

export default Navbar;
