//this is api add employees 
import React from "react";
import Layout from "../../components/Layout";
import AddEmployeeForm from "../../components/AddEmployeeForm";

const AddEmployee = () => {
  return (
    <Layout>
      <h1 className="mb-6 text-3xl font-bold">Add New Employee</h1>
      <AddEmployeeForm />
    </Layout>
  );
};

export default AddEmployee;
