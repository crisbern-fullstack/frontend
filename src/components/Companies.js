import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";

const Companies = () => {
  const { user } = useAuthContext();
  const [companies, setCompanies] = useState([]);

  const handleDelete = async (_id) => {
    const response = await fetch(`/api/delete-company/${_id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${user.token}` },
    });

    const deleted_company = await response.json();

    if (response.ok) {
      setCompanies(
        companies.filter((company) => company._id !== deleted_company._id)
      );
    }
  };

  useEffect(() => {
    const fetchCompanies = async () => {
      const response = await fetch("api/all-companies", {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      const fetchedCompanies = await response.json();

      if (response.ok) {
        setCompanies(fetchedCompanies);
      }
    };

    if (user) {
      fetchCompanies();
    }
  }, [user]);

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
                <i class="bi bi-plus-circle-fill"></i>Add New Company
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
                    <table
                      id="example2"
                      className="table table-bordered table-hover"
                    >
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Website</th>
                          <th>Logo</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {companies &&
                          companies.map((company) => (
                            <tr key={company._id}>
                              <td>{company._id}</td>
                              <td>{company.name}</td>
                              <td>{company.email}</td>
                              <td>{company.website}</td>
                              <td className="d-flex align-items-center justify-content-center">
                                <img
                                  src={company.logo}
                                  style={{
                                    maxWidth: "100px",
                                    maxHeight: "100px",
                                  }}
                                  alt={`${company.name} logo`}
                                />
                              </td>
                              <td className="">
                                <button className="btn btn-block btn-warning">
                                  Edit
                                </button>
                                <button
                                  onClick={(e) => {
                                    handleDelete(company._id);
                                  }}
                                  className="btn btn-block btn-danger"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Website</th>
                          <th>Logo</th>
                          <th>Actions</th>
                        </tr>
                      </tfoot>
                    </table>
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
