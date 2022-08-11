import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./contexts/AuthContext";
import { CompanyContextProvider } from "./contexts/CompanyContext";
import { CompaniesContextProvider } from "./contexts/CompaniesContext";
import { EmployeesContextProvider } from "./contexts/EmployeesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CompanyContextProvider>
        <CompaniesContextProvider>
          <EmployeesContextProvider>
            <App />
          </EmployeesContextProvider>
        </CompaniesContextProvider>
      </CompanyContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
