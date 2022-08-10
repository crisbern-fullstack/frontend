import { Link } from "react-router-dom";
import CompanyTable from "./companies/CompanyTable";
import { useCompanyContext } from "../hooks/useCompanyContext";
import { useEffect } from "react";

const Companies = () => {
  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Companies</h1>
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
              <Link to="/companies/add-company" className="btn btn-success">
                <i className="bi bi-plus-circle-fill"></i>Add New Company
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
                  <h3 className="card-title">Company Details</h3>
                </div>
                {/* /.card-header */}
                <div className="card-body ">
                  <div className="table-responsive">
                    <CompanyTable />
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

export default Companies;
