import "./App.css";

import { Button, Input, Menu, MenuProps, Table } from "antd";

import campaignData from "../testo.json";
import Home from "./Home/home";
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import SiteAudit from "./site-audit";
import Backlinks from "./backlinks";
import Keywords from "./keywords";
import Details from "./Details/Details";
import PagesDetails from "./PagesDetails/pagesDetails";

const NavItems: MenuProps["items"] = [
  {
    label: "Site Audit",
    key: "site-audit",
  },
  {
    label: "Backlinks",
    key: "backlinks",
  },
  {
    label: "Keywords",
    key: "keywords",
  },
];

function App() {
  const [currentMenu, setCurrentMenu] = useState("");
  const navigate = useNavigate();
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    console.log(e.key);
    setCurrentMenu(e.key);
    navigate(`/${e.key}`);
  };

  return (
    <div className="app container">
      <Menu
        className="navbar"
        selectedKeys={[currentMenu]}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
        onClick={handleMenuClick}
        items={NavItems}
        mode="vertical"
      />
      <div className="router-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/site-audit" element={<SiteAudit />} />
          <Route path="/site-audit/details/issues/:id" element={<Details />} />
          <Route path="/site-audit/details/pages" element={<PagesDetails />} />
          <Route path="/backlinks" element={<Backlinks />} />
          <Route path="/keywords" element={<Keywords />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
