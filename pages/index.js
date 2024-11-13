import React from "react";
import Layout from "../components/Layout";
import EmployeeGrid from "../components/EmployeeGrid";

const Home = () => {
  return (
    <Layout>
      <h1 className="mb-6 text-3xl font-bold">Employee Dashboard</h1>
      <EmployeeGrid />
    </Layout>
  );
};

export default Home;
