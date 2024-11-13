import React from "react";
import Link from "next/link";

const HamburgerMenu = () => {
  return (
    <nav className="p-4 bg-blue-500">
      <ul className="space-y-2">
        <li>
          <Link
            href="/"
            className="block px-2 py-1 text-white rounded hover:bg-blue-600"
          >
            Home
          </Link>
        </li>
        <li>
          <details>
            <summary className="px-2 py-1 text-white rounded cursor-pointer hover:bg-blue-600">
              Employees
            </summary>
            <ul className="pl-4 mt-2 space-y-1">
              <li>
                <Link
                  href="/employees/add"
                  className="block px-2 py-1 text-white rounded hover:bg-blue-600"
                >
                  Add Employee
                </Link>
              </li>
              <li>
                <Link
                  href="/employees/manage"
                  className="block px-2 py-1 text-white rounded hover:bg-blue-600"
                >
                  Manage Employees
                </Link>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <Link
            href="/reports"
            className="block px-2 py-1 text-white rounded hover:bg-blue-600"
          >
            Reports
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default HamburgerMenu;
