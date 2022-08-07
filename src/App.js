import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Main from "./components/Main";
import Login from "./components/Login";

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* <Navbar />
          <Sidebar />
          <Main />
          <Footer /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
