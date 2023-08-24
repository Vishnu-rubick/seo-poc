import { Checkbox, Tabs, TabsProps } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ExportLogo from "../../assets/home-module/export-logo.png";
import IssuesDetails from "../../backlinks/issues-details/issues-details";
import PagesDetails from "../../backlinks/pages-details/pages-details";
import { downloadFileFromURL } from "../../utility/fileDownload";
import Dashboard from "../Dashboard";

import axios from "axios";
import domtoimage from "dom-to-image";
import AppHeader from "../app-header/app-header";
import "./style.scss";
import AffectedPages from "../../pages/website-Iq/report/affected-pages";

interface LandingPageProps {
  projectId: string;
}

function SubHeaderCard({
  title = "Sample Text",
  prefix = <></>,
  suffix = "",
  style = {},
}) {
  return (
    <>
      <div
        className="landing-container-sub-header-card"
        style={{ color: "#6B6A6A", fontSize: "15px", ...style }}
      >
        {prefix}
        <p>
          {title} &nbsp; {suffix} &nbsp;
        </p>
      </div>
    </>
  );
}

function LandingPage({ projectId }: LandingPageProps) {
  const [currentTab, setCurrentTab] = useState<string>("overview");
  const Navigate = useNavigate();

  const tabItems: TabsProps["items"] = [
    {
      key: "overview",
      label: `Overview`,
      children: <Dashboard projectId={projectId} />,
    },
    {
      key: "Issues",
      label: `Issues`,
      children: <IssuesDetails projectId={projectId} />,
    },
    {
      key: "audited-pages",
      label: `Audited Pages`,
      children: <PagesDetails projectId={projectId} />,
    },
    {
      key: "affected-pages",
      label: `Affected Pages`,
      children: <AffectedPages/>,
    },
  ];

  const handleTabChange = (e: any) => {
    setCurrentTab(e);
  };
  const downloadOverviewSS = () => {
    const element = document.getElementById("dashboard-container-id"); // Replace with the actual ID of your <div>
    domtoimage
      .toPng(element)
      .then((dataUrl: any) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "overview.png";
        link.click();
      })
      .catch((error: any) => {
        console.error("Error capturing screenshot:", error);
      });
  };
  const handleExport = async () => {
    if (currentTab === "Issues") {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/site-audit/campaign/${projectId}/export/issues`
      );

      downloadFileFromURL(res?.data?.link, "issues-csv");
    } else if (currentTab === "audited-pages") {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/site-audit/campaign/${projectId}/export/pages`
      );

      downloadFileFromURL(res?.data?.link, "pages-csv");
    } else if (currentTab === "overview") {
      downloadOverviewSS();
    }
  };

  return (
    <>
      <div className="landing-container">
        <AppHeader />
        <div className="landing-container-header">
          <h1>Here is your website analysis report!</h1>
        </div>
        <div
          id="landing-container-content-id"
          className="landing-container-content"
        >
          <div className="landing-container-sub-header">
            <SubHeaderCard title="www.rubick.ai" suffix=" | " />
            <SubHeaderCard
              title="Last Updated: Fri, Aug 11, 2023"
              suffix=" | "
            />
            <SubHeaderCard
              prefix={
                <img
                  width="15px"
                  height="15px"
                  src="src/assets/common/desktop.svg"
                />
              }
              title="Desktop"
              suffix=" | "
              style={{ minWidth: "105px" }}
            />
            <SubHeaderCard title="Crawl Limit: 1000" suffix=" | " />
            <SubHeaderCard title="Crawl Frequency: 15 days once" />
            <SubHeaderCard
              prefix={<Checkbox disabled />}
              title="Exculde subdomains"
              style={{ marginLeft: "auto", minWidth: "180px" }}
            />
          </div>
          <div className="landing-container-content-sub">
            <Tabs
              items={tabItems}
              activeKey={currentTab}
              onChange={handleTabChange}
              tabBarExtraContent={
                <span
                  style={{ cursor: "pointer", padding: "5px" }}
                  onClick={handleExport}
                >
                  <img
                    style={{ cursor: "pointer", marginRight: "5px" }}
                    src={ExportLogo}
                    alt="export-logo"
                  />
                  Export
                </span>
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
