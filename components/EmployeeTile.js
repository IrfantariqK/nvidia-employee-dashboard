import React from "react";

const EmployeeTile = ({ employee, onSelect }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="mb-2 text-lg font-semibold">{employee.name}</h3>
      <p className="text-sm text-gray-600">Age: {employee.age}</p>
      <p className="text-sm text-gray-600">Class: {employee.class}</p>
      <button
        onClick={() => onSelect(employee)}
        className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        View Details
      </button>
    </div>
  );
};

export default EmployeeTile;
