import { useEmployeesContext } from "../../hooks/useEmployeesContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCompaniesContext } from "../../hooks/useCompaniesContext";
import useFetchCompanies from "../../hooks/useFetchCompanies";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const EmployeeTable = () => {
  const { employees, dispatch } = useEmployeesContext();
  const { user } = useAuthContext();
  const { companies } = useCompaniesContext();
  const { fetchCompanies } = useFetchCompanies();

  const handleDelete = async (_id) => {
    const response = await fetch(`/api/delete-employee/${_id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${user.token}` },
    });

    const deleted_employee = await response.json();

    if (response.ok) {
      console.log(deleted_employee);
      dispatch({ type: "DELETE_EMPLOYEES", payload: deleted_employee });
    }
  };

  useEffect(() => {
    fetchCompanies();
    console.log(companies);
  }, []);

  return (
    <table id="example2" className="table table-bordered table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Password</th>
          <th>Company</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees &&
          employees.map((employee) => (
            <tr key={employee.id}>
              <td style={{ wordWrap: "break-word", maxWidth: "200px" }}>
                {employee._id}
              </td>
              <td> {employee.first_name}</td>
              <td>{employee.last_name}</td>
              <td>{employee.email}</td>
              <td style={{ wordWrap: "break-word", maxWidth: "300px" }}>
                {employee.password}
              </td>
              <td>{employee.company.name}</td>
              <td className="">
                <Link to="" className="btn btn-block btn-warning">
                  Edit
                </Link>
                <button
                  onClick={(e) => handleDelete(employee._id)}
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
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Password</th>
          <th>Company</th>
          <th>Actions</th>
        </tr>
      </tfoot>
    </table>
  );
};

export default EmployeeTable;
