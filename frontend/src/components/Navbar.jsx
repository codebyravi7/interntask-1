import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { removeToken } from "../utils/authUtils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  // Mock user role - in real app, get this from auth context
  const { user, setUser } = useAuthContext() || {};
  const userRole = user?.role || ""; // Replace with actual user role logic
 
  const navigation = [
    { name: "Dashboard", path: "/", roles: ["Admin", "Manager", "Employee"] },
    {
      name: "Add Employee",
      path: "/addemployee",
      roles: ["Admin", "Manager", "Employee"],
    },
    { name: "Employees", path: "/employees", roles: ["Admin", "Manager"] },
    { name: "Audit Logs", path: "/audit-logs", roles: ["Admin"] },
  ];
  const handleLogout = () => {
    removeToken();
    setUser(null);
    navigate("/login");
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-lg mb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between h-16">
          {/* Desktop Menu */}
          <div className=" flex justify-between items-center">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-gray-800">EMS</h1>
            </div>

            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              {navigation.map(
                (item) =>
                  item.roles.includes(userRole) && (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`${
                        isActiveLink(item.path)
                          ? "bg-blue-500 text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      } px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`}
                    >
                      {item.name}
                    </Link>
                  )
              )}
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center">
            {user ? (
              <button type="button" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {/* Menu Icon */}
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navigation.map(
              (item) =>
                item.roles.includes(userRole) && (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`${
                      isActiveLink(item.path)
                        ? "bg-blue-500 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    } block px-3 py-2 text-base font-medium transition-colors duration-200`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
