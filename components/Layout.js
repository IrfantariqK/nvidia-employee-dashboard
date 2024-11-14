import React from "react";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="container mx-auto mt-8">{children}</main>
    </div>
  );
};

export default Layout;
