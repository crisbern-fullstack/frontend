import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Companies from "./components/Companies";
import Footer from "./components/Footer";
import AddCompany from "./components/AddCompany";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
        </Routes>

        <Navbar />
        <Sidebar />
        <Routes>
          <Route
            path="/"
            element={user ? <Main /> : <Navigate to="/login" />}
          />
          <Route
            path="/companies"
            element={user ? <Companies /> : <Navigate to="/login" />}
          />
          <Route
            path="/companies/add-company"
            element={user ? <AddCompany /> : <Navigate to="/login" />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
