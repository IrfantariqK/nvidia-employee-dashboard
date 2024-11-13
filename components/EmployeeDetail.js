import React from "react";

const EmployeeDetail = ({ employee, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg">
        <h2 className="mb-4 text-2xl font-bold">{employee.name}</h2>
        <p>
          <strong>Age:</strong> {employee.age}
        </p>
        <p>
          <strong>Class:</strong> {employee.class}
        </p>
        <p>
          <strong>Subjects:</strong> {employee.subjects.join(", ")}
        </p>
        <p>
          <strong>Attendance:</strong> {employee.attendance}%
        </p>
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
