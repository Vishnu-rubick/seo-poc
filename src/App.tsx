import "./App.css";

import { Menu, MenuProps } from "antd";

import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Details from "./Details/Details";
import Home from "./Home/home";
import PagesDetails from "./PagesDetails/pagesDetails";
import Backlinks from "./backlinks";
import Keywords from "./keywords";
import SiteAudit from "./site-audit";

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
          <Route path="/site-audit" element={<SiteAudit />}>
            <Route
              path="details/pages"
              element={<PagesDetails />}
            />
          </Route>

          <Route path="/site-audit/details/issues/:id" element={<Details />} />

          <Route path="/backlinks" element={<Backlinks />} />
          <Route path="/keywords" element={<Keywords />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
