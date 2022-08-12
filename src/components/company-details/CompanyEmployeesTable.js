import { useEmployeesContext } from "../../hooks/useEmployeesContext";

const CompanyEmployeesTable = ({ _id }) => {
  const { employees } = useEmployeesContext();

  return (
    <table id="example2" className="table table-bordered table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Number</th>
        </tr>
      </thead>
      <tbody>
        {employees &&
          employees.map((employee) => (
            <tr key={employee._id}>
              <td style={{ wordWrap: "break-word", maxWidth: "200px" }}>
                {employee._id}
              </td>
              <td> {employee.first_name}</td>
              <td>{employee.last_name}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
            </tr>
          ))}
      </tbody>
      <tfoot>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Number</th>
        </tr>
      </tfoot>
    </table>
  );
};

export default CompanyEmployeesTable;
