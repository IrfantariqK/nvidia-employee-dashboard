import React from "react";
import Link from "next/link";

const HorizontalMenu = () => {
  return (
    <nav>
      <ul className="flex space-x-4">
        <li>
          <Link href="/" className="text-white hover:text-blue-200">
            Home
          </Link>
        </li>
        <li className="relative group">
          <span className="text-white cursor-pointer hover:text-blue-200">
            Employees
          </span>
          <ul className="absolute left-0 hidden w-48 mt-2 bg-white rounded-md shadow-lg group-hover:block">
            <li>
              <Link
                href="/employees/add"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white"
              >
                Add Employee
              </Link>
            </li>
            <li>
              <Link
                href="/employees/manage"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white"
              >
                Manage Employees
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link href="/reports" className="text-white hover:text-blue-200">
            Reports
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default HorizontalMenu;
