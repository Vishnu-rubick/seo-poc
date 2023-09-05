import "./App.scss";

import { Menu, MenuProps } from "antd";

import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate, } from "react-router-dom";
import Details from "./Details/Details";
import Home from "./Home/home";
//import PagesDetails from "./PagesDetails/pagesDetails";
import MenuItem from "antd/es/menu/MenuItem";
import Backlinks from "./backlinks";
import BacklinksDetails from "./backlinks/backlinks-details/backlinks-details";
import ReferringDomains from "./backlinks/issues-details/issues-details";
import OutboundDomains from "./backlinks/outbound-domains/outbound-domains";
import PagesDetails from "./backlinks/pages-details/pages-details";
import CompetitorAnalysis from "./competitorAnalysis";
import Keywords from "./keywords";
import KeywordsDetails from "./keywords/details";
import HomeModule from "./pages/home";
import LandingPage from "./pages/landingPage";
import ModuleDetails from "./pages/module-details";
import WebsiteIq from "./pages/website-Iq";

import HonmeIcon from "./assets/common/HomeIcon.svg";
import HonmeIconSelected from "./assets/common/homeIcon-selected.svg";
import WebsiteIqIconSelected from "./assets/common/website-iq-selected.svg";
import WebsiteIqIcon from "./assets/common/website-iq.svg";
import TMLogo from "./assets/common/company-logo.svg";
import RubickLogo from "./assets/common/rubick-logo.svg";

import SeoOverview from "./pages/seo-overview";
import SiteAudit from "./site-audit";

{
  /* latest-components */
}
const NavItems: MenuProps["items"] = [
  {
    label: "Seo Tools",
    key: "seo-tools",
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

const siderStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#00235B",
  height: 1080,
};

function App() {
  const [currentMenu, setCurrentMenu] = useState("");
  const navigate = useNavigate();
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    setCurrentMenu(e.key);
    navigate(`/${e.key}`);
  };
  const [projectId, setProjectId] = useState("");
  useEffect(() => {
    const projectId = localStorage.getItem("projectId");
    setProjectId(projectId || "");
  }, []);
  return (
    <div className="app container">
      <Menu
        className="navbar"
        selectedKeys={[currentMenu]}
        style={{
          ...siderStyle,
          // display: "flex",
          // flexDirection: "column",
          // justifyContent: "flex-start",
          // alignItems: "center",
          // margin: "0 auto",
        }}
        onClick={handleMenuClick}
        mode="vertical"
      >
        <MenuItem disabled className="menu-item-header" key="">
          <img height="35px" src={RubickLogo} />
        </MenuItem>
        {/* <MenuItem className="menu-item-header" key="seo-overview">
          {currentMenu === "seo-overview" ? (
            <div className="menu-icon">
              <img src={DashboardIconSelected} alt="" />
            </div>
          ) : (
            <div className="menu-icon">
              <img src={DashboardIconSelected} alt="" />
            </div>
          )}
        </MenuItem> */}
        <MenuItem className="menu-item-header" key="home">
          {currentMenu === "home" ? (
            <div className="menu-icon">
              <img src={HonmeIconSelected} alt="" />
            </div>
          ) : (
            <div className="menu-icon">
              <img src={HonmeIcon} alt="" />
            </div>
          )}
        </MenuItem>
        <MenuItem key="seo-tools">
          {currentMenu === "seo-tools" ? (
            <div className="menu-icon">
              <img src={WebsiteIqIconSelected} alt="" />
            </div>
          ) : (
            <div className="menu-icon">
              <img src={WebsiteIqIcon} alt="" />
            </div>
          )}
        </MenuItem>
        {/* <MenuItem disabled key="key-metrics">
          <img
            src={`src/assets/common/key-metrics${
              currentMenu == "key-metrics" ? "-selected" : ""
            }.svg`}
            alt=""
          />
        </MenuItem>
        <MenuItem disabled key="keywords">
          <img
            src={`src/assets/common/keywords${
              currentMenu == "keywords" ? "-selected" : ""
            }.svg`}
            alt=""
          />
        </MenuItem>
        <MenuItem disabled key="backlinks">
          <img
            src={`src/assets/common/backlinks${
              currentMenu == "backlinks" ? "-selected" : ""
            }.svg`}
            alt=""
          />
        </MenuItem>
        <MenuItem disabled key="industry-benchmarking">
          <img
            src={`src/assets/common/industry-benchmarking${
              currentMenu == "industry-benchmarking" ? "-selected" : ""
            }.svg`}
            alt=""
          />
        </MenuItem>
        <MenuItem disabled key="content-planner">
          <img
            src={`src/assets/common/content-planner${
              currentMenu == "content-planner" ? "-selected" : ""
            }.svg`}
            alt=""
          />
        </MenuItem>
        <MenuItem disabled key="task-manager">
          <img
            src={`src/assets/common/task-manager${
              currentMenu == "task-manager" ? "-selected" : ""
            }.svg`}
            alt=""
          />
        </MenuItem>
        <MenuItem disabled key="faqs">
          <img
            src={`src/assets/common/faqs${
              currentMenu == "faqs" ? "-selected" : ""
            }.svg`}
            alt=""
          />
        </MenuItem> */}
        {/* <MenuItem disabled key="keywords">Keywords</MenuItem>
        <MenuItem disabled key="competitorAnalysis">Competitor Analysis</MenuItem> */}
      </Menu>
      {/* <AppSider /> */}
      <div className="router-container">
        <Routes>
          <Route path="/" element={<Navigate to="/configure" />} />
       
          <Route path="/configure" element={<HomeModule />} />
          <Route
            path="/configure-domain"
            element={<HomeModule redirect={false} />}
          />
          <Route path="/site-audit" element={<SiteAudit />}></Route>
          <Route
            path="site-audit/details/pages"
            element={<PagesDetails projectId="12808182" />}
          />
          <Route path="/site-audit/details/issues/:id" element={<Details />} />
          <Route path="/keywords" element={<Keywords />} />
          <Route path="/keywords/details/:type" element={<KeywordsDetails />} />
          <Route path="/competitorAnalysis" element={<CompetitorAnalysis />} />

          {/* backlinks-routes */}
          <Route path="/backlinks" element={<Backlinks />} />
          <Route path="/backlinks/details" element={<BacklinksDetails />} />
          <Route
            path="/referring-domains/details"
            element={<ReferringDomains projectId={projectId} />}
          />
          <Route
            path="/outbound-domains/details"
            element={<OutboundDomains />}
          />

          {/* latest-components of home and website-Iq */}
          <Route path="/seo-tools" element={<LandingPage />} />
          <Route path="/website-iq" element={<WebsiteIq />} />
          <Route path="/module-details" element={<ModuleDetails />} />
          <Route path="/home" element={<SeoOverview />} />
          <Route path="/seo-overview" element={<SeoOverview />} />

          {/* keywords */}
          <Route path="/keywords" element={<Keywords />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
