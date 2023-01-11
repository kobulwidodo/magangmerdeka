import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import Magang from "../pages/Magang";
import Studi from "../pages/Studi";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/magang" element={<Magang />} />
        <Route path="/studi" element={<Studi />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
