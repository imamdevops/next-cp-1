import React from "react";
import AppBar from "../AppBar";

const LayoutDefault = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main className="min-h-screen">
      <AppBar />
      {children}
    </main>
  );
};

export default LayoutDefault;
