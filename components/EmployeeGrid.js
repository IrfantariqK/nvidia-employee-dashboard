import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import EmployeeTile from "./EmployeeTile";
import EmployeeDetail from "./EmployeeDetail";

const GET_EMPLOYEES = gql`
  query GetEmployees($page: Int, $limit: Int, $sortBy: String) {
    employees(page: $page, limit: $limit, sortBy: $sortBy) {
      id
      name
      age
      class
      subjects
      attendance
    }
  }
`;

const EmployeeGrid = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const { loading, error, data } = useQuery(GET_EMPLOYEES, {
    variables: { page: 1, limit: 10, sortBy: "name" },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className="mb-4">
        <button
          onClick={() => setViewMode("grid")}
          className={`mr-2 px-4 py-2 rounded ${
            viewMode === "grid" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Grid View
        </button>
        <button
          onClick={() => setViewMode("tile")}
          className={`px-4 py-2 rounded ${
            viewMode === "tile" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Tile View
        </button>
      </div>
      {viewMode === "grid" ? (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Age</th>
              <th className="px-4 py-2">Class</th>
              <th className="px-4 py-2">Subjects</th>
              <th className="px-4 py-2">Attendance</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.employees.map((employee) => (
              <tr key={employee.id}>
                <td className="px-4 py-2 border">{employee.name}</td>
                <td className="px-4 py-2 border">{employee.age}</td>
                <td className="px-4 py-2 border">{employee.class}</td>
                <td className="px-4 py-2 border">
                  {employee.subjects.join(", ")}
                </td>
                <td className="px-4 py-2 border">{employee.attendance}%</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => setSelectedEmployee(employee)}
                    className="px-2 py-1 text-white bg-blue-500 rounded"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.employees.map((employee) => (
            <EmployeeTile
              key={employee.id}
              employee={employee}
              onSelect={setSelectedEmployee}
            />
          ))}
        </div>
      )}
      {selectedEmployee && (
        <EmployeeDetail
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}
    </div>
  );
};

export default EmployeeGrid;
