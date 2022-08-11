import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./contexts/AuthContext";
import { CompanyContextProvider } from "./contexts/CompanyContext";
import { CompaniesContextProvider } from "./contexts/CompaniesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CompanyContextProvider>
        <CompaniesContextProvider>
          <App />
        </CompaniesContextProvider>
      </CompanyContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
