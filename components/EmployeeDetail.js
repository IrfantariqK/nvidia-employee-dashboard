import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";

const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee(
    $id: ID!
    $name: String!
    $age: Int!
    $class: String!
    $subjects: [String!]!
    $attendance: Float!
  ) {
    updateEmployee(
      id: $id
      name: $name
      age: $age
      class: $class
      subjects: $subjects
      attendance: $attendance
    ) {
      id
      name
      age
      class
      subjects
      attendance
    }
  }
`;

const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id)
  }
`;

export default function EmployeeDetail({
  employee,
  onClose,
  onEmployeeUpdate,
  onEmployeeDelete,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(employee);
  const [error, setError] = useState(null);

  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE, {
    onCompleted: (data) => {
      setIsEditing(false);
      onEmployeeUpdate(data.updateEmployee);
      setError(null);
    },
    onError: (error) => {
      console.error("Error updating employee:", error);
      setError("Failed to update employee. Please try again.");
    },
  });

  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
    onCompleted: () => {
      onEmployeeDelete(employee.id);
      onClose();
      setError(null);
    },
    onError: (error) => {
      console.error("Error deleting employee:", error);
      setError("Failed to delete employee. Please try again.");
    },
  });

  const handleEdit = () => {
    setIsEditing(true);
    setError(null);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      deleteEmployee({ variables: { id: employee.id } });
    }
  };

  const handleSave = () => {
    updateEmployee({
      variables: {
        id: formData.id,
        name: formData.name,
        age: parseInt(formData.age),
        class: formData.class,
        subjects: formData.subjects,
        attendance: parseFloat(formData.attendance),
      },
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "subjects" ? value.split(",").map((s) => s.trim()) : value,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg">
        {error && (
          <div className="p-2 mb-4 text-red-700 bg-red-100 rounded">
            {error}
          </div>
        )}
        {isEditing ? (
          <>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 mb-2 border rounded"
              placeholder="Name"
            />
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-2 mb-2 border rounded"
              placeholder="Age"
            />
            <input
              type="text"
              name="class"
              value={formData.class}
              onChange={handleChange}
              className="w-full p-2 mb-2 border rounded"
              placeholder="Class"
            />
            <input
              type="text"
              name="subjects"
              value={formData.subjects.join(", ")}
              onChange={handleChange}
              className="w-full p-2 mb-2 border rounded"
              placeholder="Subjects (comma separated)"
            />
            <input
              type="number"
              name="attendance"
              value={formData.attendance}
              onChange={handleChange}
              className="w-full p-2 mb-2 border rounded"
              placeholder="Attendance"
              step="0.01"
            />
            <div className="flex justify-end mt-6">
              <button
                onClick={handleSave}
                className="px-4 py-2 mr-2 text-white bg-green-500 rounded hover:bg-green-600"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
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
            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={handleEdit}
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
