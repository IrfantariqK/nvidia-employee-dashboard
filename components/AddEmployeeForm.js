import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";

const ADD_EMPLOYEE = gql`
  mutation AddEmployee(
    $name: String!
    $age: Int!
    $class: String!
    $subjects: [String!]!
    $attendance: Float!
  ) {
    addEmployee(
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

const AddEmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    class: "",
    subjects: "",
    attendance: "",
  });

  const [addEmployee, { data, loading, error }] = useMutation(ADD_EMPLOYEE);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addEmployee({
        variables: {
          ...formData,
          age: parseInt(formData.age),
          subjects: formData.subjects
            .split(",")
            .map((subject) => subject.trim()),
          attendance: parseFloat(formData.attendance),
        },
      });
      alert("Employee added successfully!");
      setFormData({
        name: "",
        age: "",
        class: "",
        subjects: "",
        attendance: "",
      });
    } catch (err) {
      console.error("Error adding employee:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-bold text-gray-700"
        >
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="age"
          className="block mb-2 text-sm font-bold text-gray-700"
        >
          Age:
        </label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="class"
          className="block mb-2 text-sm font-bold text-gray-700"
        >
          Class:
        </label>
        <input
          type="text"
          id="class"
          name="class"
          value={formData.class}
          onChange={handleChange}
          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="subjects"
          className="block mb-2 text-sm font-bold text-gray-700"
        >
          Subjects (comma-separated):
        </label>
        <input
          type="text"
          id="subjects"
          name="subjects"
          value={formData.subjects}
          onChange={handleChange}
          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="attendance"
          className="block mb-2 text-sm font-bold text-gray-700"
        >
          Attendance (%):
        </label>
        <input
          type="number"
          id="attendance"
          name="attendance"
          value={formData.attendance}
          onChange={handleChange}
          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          required
          step="0.01"
          min="0"
          max="100"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Employee"}
        </button>
      </div>
      {error && (
        <p className="mt-4 text-xs italic text-red-500">
          Error: {error.message}
        </p>
      )}
    </form>
  );
};

export default AddEmployeeForm;
