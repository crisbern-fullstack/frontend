import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Login from "./components/Login";
import Companies from "./components/Companies";
import AddCompany from "./components/AddCompany";
import CompanyDetails from "./components/CompanyDetails";
import Employees from "./components/Employees";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/" element={user ? <Main /> : <Navigate to="login" />}>
          <Route
            path="companies"
            element={user ? <Companies /> : <Navigate to="login" />}
          />
          <Route
            path="companies/add-company"
            element={user ? <AddCompany /> : <Navigate to="login" />}
          />
          <Route
            path="companies/:id"
            element={user ? <CompanyDetails /> : <Navigate to="login" />}
          />
          <Route
            path="employees"
            element={user ? <Employees /> : <Navigate to="login" />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
