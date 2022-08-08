import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const Companies = () => {
  const { user } = useAuthContext();
  const [companies, setCompanies] = useState([]);

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
              <h1>DataTables</h1>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Companies</h3>
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
                            <tr>
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
                              <td></td>
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
//
