import { useState } from "react";
import { Link } from "react-router-dom";
import useFetchEmployees from "../hooks/useFetchEmployees";
import EmployeeTable from "./employees/EmployeeTable";
import { useEmployeesContext } from "../hooks/useEmployeesContext";

const Employees = () => {
  const { fetchEmployees } = useFetchEmployees();
  const { employees } = useEmployeesContext();

  useState(() => {
    fetchEmployees();
  }, [employees]);

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Employees</h1>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      {/* Main content */}
      <section className="content" style={{ marginBottom: "20px" }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col col-5">
              <Link to="add-employee" className="btn btn-success">
                <i className="bi bi-plus-circle-fill"></i>Add New Employee
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Employees Details</h3>
                </div>
                {/* /.card-header */}
                <div className="card-body ">
                  <div className="table-responsive">
                    {/* <EmployeeTable /> */}
                    <EmployeeTable />
                  </div>
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </section>
      {/* /.content */}
    </div>
  );
};

export default Employees;
