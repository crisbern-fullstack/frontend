import { Link } from "react-router-dom";
import CompanyTable from "./companies/CompanyTable";
import { useEffect, useState } from "react";
import useFetchCompanies from "../hooks/useFetchCompanies";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCompaniesContext } from "../hooks/useCompaniesContext";

const Companies = () => {
  const { fetchCompanies } = useFetchCompanies();
  const [showOverlay, setShowOverLay] = useState(false);
  const [company, setCompany] = useState("");
  const [id, setId] = useState("");
  const { user } = useAuthContext();
  const { dispatch } = useCompaniesContext();

  const handleDelete = async (_id) => {
    const response = await fetch(`/api/delete-company/${_id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${user.token}` },
    });

    const deleted_company = await response.json();

    if (response.ok) {
      setShowOverLay(false);
      dispatch({ type: "DELETE_COMPANIES", payload: deleted_company });
    }
  };

  useEffect(() => {
    console.log(user);
    fetchCompanies();
  }, []);

  return (
    <div>
      {showOverlay && (
        <div class="card text-center card-confirmation position-fixed card-danger">
          <div class="card-header">
            <strong>Confirm Deletion</strong>
          </div>
          <div class="card-body">
            <h5 class="card-title">
              <strong>Warning</strong>
            </h5>
            <p class="card-text">
              You are about to delete data related to <strong>{company}</strong>
              . Take note that this process is irreversible. How would you like
              to proceed?
            </p>
            <Link
              onClick={(e) => {
                handleDelete(id);
              }}
              style={{ margin: "10px" }}
              to=""
            >
              Delete
            </Link>
            <button onClick={(e) => setShowOverLay(false)} class="btn btn-info">
              Cancel
            </button>
          </div>
        </div>
      )}
      {showOverlay && (
        <div
          onClick={(e) => setShowOverLay(false)}
          className="delete-overlay d-flex align-items-center justify-content-center"
        ></div>
      )}
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
                {user.isAdmin && (
                  <Link to="add-company" className="btn btn-success">
                    <i className="bi bi-plus-circle-fill"></i>Add New Company
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card card-info">
                  <div className="card-header">
                    <h3 className="card-title">Company Details</h3>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body ">
                    <div className="table-responsive">
                      <CompanyTable
                        setShowOverLay={setShowOverLay}
                        setCompany={setCompany}
                        setId={setId}
                      />
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
    </div>
  );
};

export default Companies;
