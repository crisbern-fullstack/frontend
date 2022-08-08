import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Companies from "./components/Companies";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>

        <Navbar />
        <Sidebar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/companies" element={<Companies />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
