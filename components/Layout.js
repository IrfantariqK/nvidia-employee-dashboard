// components/Layout.js
import React from "react";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container px-4 py-8 mx-auto">{children}</main>
    </div>
  );
};

export default Layout;
