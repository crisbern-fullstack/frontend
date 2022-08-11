import { useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Companies from "./Companies";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

const Main = () => {
  return (
    <div className="wrapper">
      <Navbar />
      <Sidebar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
