import CompanyDetailsForm from "./company-details/CompanyDetailsForm";
import CompanyCard from "./company-details/CompanyCard";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCompanyContext } from "../hooks/useCompanyContext";
import { useFetchCompany } from "../hooks/useFetchCompany";

const CompanyDetails = () => {
  const { id } = useParams();
  const { fetchCompany, isLoading, error } = useFetchCompany();
  const { company, dispatch } = useCompanyContext();
  const { user } = useAuthContext();

  useEffect(() => {
    dispatch({ type: "CLEAR_COMPANY" });
    if (user) {
      fetchCompany(id);
    }
  }, []);

  if (company === undefined) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Edit Company</h1>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <div className="row row-cols-sm-1 row-cols-lg-2">
            {/* left column */}
            <div className="col col-lg-6 d-flex flex-column">
              {/* Company Card */}
              <CompanyCard isLoading={isLoading} props_company={company} />
              {/* /.card */}
            </div>
            <div className="col col-lg-6 d-flex flex-column">
              {/* general form elements */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Company Details</h3>
                </div>
                {/* /.card-header */}
                {/* form start */}
                <CompanyDetailsForm
                  isLoading={isLoading}
                  props_company={company}
                  id={id}
                  user={user}
                />
              </div>
              {/* /.card */}
            </div>
            {/*/.col (left) */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </section>
      {/* /.content */}
    </div>
  );
};

export default CompanyDetails;
