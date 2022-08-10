import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Link } from "react-router-dom";

const CompanyTable = () => {
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
    <table id="example2" className="table table-bordered table-hover">
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
                <Link
                  to={`${company._id}`}
                  className="btn btn-block btn-warning"
                >
                  Edit
                </Link>
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
  );
};

export default CompanyTable;
