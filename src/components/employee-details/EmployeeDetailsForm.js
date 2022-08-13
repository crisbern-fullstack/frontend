import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCompaniesContext } from "../../hooks/useCompaniesContext";
import { useEmployeeContext } from "../../hooks/useEmployeeContext";
import useFetchCompanies from "../../hooks/useFetchCompanies";

const EmployeeDetailsForm = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const { companies } = useCompaniesContext();
  const { employee, dispatch } = useEmployeeContext();
  const { fetchCompanies } = useFetchCompanies();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);

  const handleCheck = () => {
    setIsAdmin(!isAdmin);
  };

  useEffect(() => {
    fetchCompanies();
    setFirstName(employee.first_name);
    setLastName(employee.last_name);
    setEmail(employee.email);
    setPhone(employee.phone);
    setCompany(employee.company);
    setIsAdmin(employee.is_admin);
  }, [employee]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const data = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      company: company,
      phone: phone,
      is_admin: isAdmin,
    };

    const response = await fetch("/api/update-employee/" + id, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    });

    const new_employee = await response.json();

    if (response.ok) {
      setIsLoading(false);
      dispatch({ type: "SET_EMPLOYEE", payload: new_employee });
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 2000);
    }

    if (!response.ok) {
      setIsLoading(false);
      setError(new_employee.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="card-body">
        <div className="form-group">
          <label htmlFor="first-name">ID: {employee._id}</label>
        </div>
        <div className="form-group">
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First Name"
            id="first-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Last Name"
            id="last-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">
            Phone Number <i>(e.g. 09123456789)</i>
          </label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            placeholder="Enter Phone Number"
            pattern="[0-9]{11}"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Company</label>
          <select
            className="form-control select2"
            style={{ width: "100%" }}
            value={company}
            onChange={(e) => {
              setCompany(e.target.value);
            }}
          >
            <option value={""}>Select Company</option>
            {companies &&
              companies.map((company) => (
                <option value={company._id}>{company.name}</option>
              ))}
          </select>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="admin"
            checked={isAdmin}
            onChange={handleCheck}
          />
          <label className="form-check-label" htmlFor="admin">
            Admin
          </label>
        </div>
      </div>
      {/* /.card-body */}
      <div className="card-footer">
        {!isLoading && (
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        )}
        {isLoading && (
          <div>
            <img
              src="/loading.gif"
              style={{ maxWidth: "50px", maxHeight: "50px" }}
              className="img-responsive"
            />
            <h5 style={{ color: "blue" }}>Saving...</h5>
          </div>
        )}
        {isSuccess && (
          <h5 style={{ color: "green", marginTop: "10px" }}>
            Changes are successfuly saved!
          </h5>
        )}
        {error && (
          <div style={{ marginTop: "10px" }} className="alert alert-danger">
            {error}
          </div>
        )}
      </div>
    </form>
  );
};

export default EmployeeDetailsForm;
