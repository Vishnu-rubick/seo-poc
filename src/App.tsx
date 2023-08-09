import "./App.css";

import { Menu, MenuProps } from "antd";

import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Details from "./Details/Details";
import Home from "./Home/home";
//import PagesDetails from "./PagesDetails/pagesDetails";
import Backlinks from "./backlinks";
import Keywords from "./keywords";
import SiteAudit from "./site-audit";
import BacklinksDetails from "./backlinks/backlinks-details/backlinks-details";
import ReferringDomains from "./backlinks/issues-details/issues-details";
import KeywordsDetails from "./keywords/details";
import CompetitorAnalysis from "./competitorAnalysis";
import OutboundDomains from "./backlinks/outbound-domains/outbound-domains";
import MenuItem from "antd/es/menu/MenuItem";

 {
   /* latest-components */
 }
import IssuesDetails from "./backlinks/issues-details/issues-details";
import PagesDetails from "./backlinks/pages-details/pages-details";
const NavItems: MenuProps["items"] = [
  {
    label: "Seo Tools",
    key: ""
  },
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
  {
    label: "Competitor Analysis",
    key: "competitorAnalysis",
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
          margin: "0 auto",
        }}
        onClick={handleMenuClick}
        mode="vertical"
      >
        <MenuItem className="menu-item-header" key="">
          SEO Tools
        </MenuItem>
        <MenuItem key="site-audit">Site Audit</MenuItem>
        <MenuItem key="backlinks">Backlinks</MenuItem>
        <MenuItem key="keywords">Keywords</MenuItem>
        <MenuItem key="competitorAnalysis">Competitor Analysis</MenuItem>
      </Menu>
      <div className="router-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/site-audit" element={<SiteAudit />}></Route>
          <Route path="site-audit/details/pages" element={<PagesDetails />} />
          <Route path="/site-audit/details/issues/:id" element={<Details />} />
          <Route path="/keywords" element={<Keywords />} />
          <Route path="/keywords/details/:type" element={<KeywordsDetails />} />
          <Route path="/competitorAnalysis" element={<CompetitorAnalysis />} />

          {/* backlinks-routes */}
          <Route path="/backlinks" element={<Backlinks />} />
          <Route path="/backlinks/details" element={<BacklinksDetails />} />
          <Route
            path="/referring-domains/details"
            element={<ReferringDomains />}
          />
          <Route
            path="/outbound-domains/details"
            element={<OutboundDomains />}
          />
          
            {/* latest-components */}
          <Route path="/issues-details" element={<IssuesDetails />} />
          <Route path="/pages-details" element={<PagesDetails />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
