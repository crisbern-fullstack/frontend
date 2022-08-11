import { useState } from "react";
import useFetchEmployees from "../hooks/useFetchEmployees";

const Employees = () => {
  const { fetchEmployees } = useFetchEmployees();

  useState(() => {
    fetchEmployees();
  });
  return (
    <div className="content-wrapper">
      <h1>Employees</h1>
    </div>
  );
};

export default Employees;
