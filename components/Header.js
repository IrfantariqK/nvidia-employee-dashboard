import React, { useState } from "react";
import Link from "next/link";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="text-white bg-blue-600">
      <div className="container px-4 py-4 mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">NVIDIA Employee Dashboard</h1>

          {/* Desktop Navigation */}
          <nav className="hidden space-x-6 md:flex">
            <Link href="/" legacyBehavior>
              <a className="hover:text-blue-200">Home</a>
            </Link>

            {/* Employees Dropdown */}
            <div className="relative group">
              <span className="cursor-pointer hover:text-blue-200">
                Employees
              </span>
              <ul className="absolute left-0 hidden w-48 mt-2 bg-white rounded-md shadow-lg group-hover:block group-focus-within:block">
                <li>
                  <Link href="/employees/add" legacyBehavior>
                    <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white">
                      Add Employee
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/employees/manage" legacyBehavior>
                    <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white">
                      Manage Employees
                    </a>
                  </Link>
                </li>
              </ul>
            </div>

            <Link href="/reports" legacyBehavior>
              <a className="hover:text-blue-200">Reports</a>
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <ul className="px-4 pb-4 space-y-2 bg-blue-700">
            <li>
              <Link href="/" legacyBehavior>
                <a className="block py-2 text-white">Home</a>
              </Link>
            </li>
            <li>
              <span className="block py-2 text-white">Employees</span>
              <ul className="pl-4 space-y-2">
                <li>
                  <Link href="/employees/add" legacyBehavior>
                    <a className="block py-2 text-white hover:text-blue-300">
                      Add Employee
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/employees/manage" legacyBehavior>
                    <a className="block py-2 text-white hover:text-blue-300">
                      Manage Employees
                    </a>
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/reports" legacyBehavior>
                <a className="block py-2 text-white hover:text-blue-300">
                  Reports
                </a>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
