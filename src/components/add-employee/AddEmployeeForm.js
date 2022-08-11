import { useEffect, useState } from "react";
import { useCompaniesContext } from "../../hooks/useCompaniesContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import useFetchCompanies from "../../hooks/useFetchCompanies";

const AddEmployeeForm = () => {
  const { companies } = useCompaniesContext();
  const { fetchCompanies } = useFetchCompanies();
  const { user } = useAuthContext();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchCompanies();
    console.log(companies);
  }, []);

  const handleCheck = () => {
    setIsAdmin(!isAdmin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let company_name = await companies.find(
      (fetched_company) => fetched_company._id === company
    );

    console.log(company);

    const data = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      company: {
        name: company_name.name,
        id: company,
      },
      is_admin: isAdmin,
    };

    const response = await fetch("/signup", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    });

    const new_employee = await response.json();

    console.log(new_employee);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="card-body">
        <div className="form-group">
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
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
            placeholder="Name"
            id="last-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="company-email">Email Address</label>
          <input
            type="email"
            className="form-control"
            id="company-email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddEmployeeForm;
