import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import client from "../../lib/apolloClient";

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

export default function AddEmployee() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [employeeClass, setEmployeeClass] = useState("");
  const [subjects, setSubjects] = useState("");
  const [attendance, setAttendance] = useState("");
  const router = useRouter();

  const [addEmployee, { loading, error }] = useMutation(ADD_EMPLOYEE, {
    client: client,
    onCompleted: () => {
      router.push("/");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addEmployee({
      variables: {
        name,
        age: parseInt(age),
        class: employeeClass,
        subjects: subjects.split(",").map((s) => s.trim()),
        attendance: parseFloat(attendance),
      },
    });
  };

  return (
    <Layout>
      <h1 className="mb-4 text-2xl font-bold">Add New Employee</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="age" className="block mb-1">
            Age:
          </label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="class" className="block mb-1">
            Class:
          </label>
          <input
            type="text"
            id="class"
            value={employeeClass}
            onChange={(e) => setEmployeeClass(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="subjects" className="block mb-1">
            Subjects (comma-separated):
          </label>
          <input
            type="text"
            id="subjects"
            value={subjects}
            onChange={(e) => setSubjects(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="attendance" className="block mb-1">
            Attendance (%):
          </label>
          <input
            type="number"
            id="attendance"
            value={attendance}
            onChange={(e) => setAttendance(e.target.value)}
            required
            step="0.01"
            min="0"
            max="100"
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          {loading ? "Adding..." : "Add Employee"}
        </button>
        {error && <p className="text-red-500">Error: {error.message}</p>}
      </form>
    </Layout>
  );
}
