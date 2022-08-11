import { useEffect, useState } from "react";
import { useCompanyContext } from "../../hooks/useCompanyContext";

const CompanyDetailsForm = ({ isLoading, id, user }) => {
  const { dispatch, company } = useCompanyContext();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [website, setWebsite] = useState();
  const [logo, setLogo] = useState({
    file: "",
    name: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("website", website);
    formData.append("company-logo", logo.file);

    const response = await fetch("/api/update-company/" + id, {
      method: "PATCH",
      body: formData,
      headers: { Authorization: `Bearer ${user.token}` },
    });

    const updated_company = await response.json();

    if (response.ok) {
      dispatch({ type: "SET_COMPANY", payload: updated_company });
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 2000);
    }

    if (!response.ok) {
      console.log(updated_company.error);
    }
  };

  useEffect(() => {
    setName(company.name);
    setEmail(company.email);
    setWebsite(company.website);
    setLogo({ name: company.logo });
  }, [company]);

  return (
    <form encType="multipart/form-data" onSubmit={handleSubmit}>
      <div className="card-body">
        <div className="form-group">
          <label htmlFor="company-name">Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            id="company-name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="company-email">Email</label>
          <input
            type="email"
            className="form-control"
            id="company-email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="company-website">Website</label>
          <input
            type="text"
            className="form-control"
            placeholder="Website (e.g. http://www.facebook.com)"
            id="company-website"
            value={website}
            onChange={(e) => {
              setWebsite(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="company-logo">Logo</label>
          <div className="input-group">
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="company-logo"
                onChange={(e) => {
                  setLogo({ name: e.target.value, file: e.target.files[0] });
                }}
              />
              <label className="custom-file-label" htmlFor="company-logo">
                {logo.name && logo.name.replace("C:\\fakepath\\", "")}
              </label>
            </div>
          </div>
        </div>
      </div>
      {/* /.card-body */}
      <div className="card-footer">
        <button type="submit" className="btn btn-primary">
          Save Edits
        </button>
        {isSuccess && (
          <h5 style={{ color: "green", marginTop: "10px" }}>
            Changes are successfuly saved!
          </h5>
        )}
      </div>
    </form>
  );
};

export default CompanyDetailsForm;
