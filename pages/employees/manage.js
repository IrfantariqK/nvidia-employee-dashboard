//this is api manage employees
import React from "react";
import Layout from "../../components/Layout";
import EmployeeGrid from "../../components/EmployeeGrid";

const ManageEmployees = () => {
  return (
    <Layout>
      <h1 className="mb-6 text-3xl font-bold">Manage Employees</h1>
      <EmployeeGrid />
    </Layout>
  );
};

export default ManageEmployees;
