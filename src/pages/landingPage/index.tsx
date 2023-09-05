import { Checkbox, Tabs, TabsProps } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ExportLogo from "../../assets/home-module/export-logo.png";
import IssuesDetails from "../../backlinks/issues-details/issues-details";
import PagesDetails from "../../backlinks/pages-details/pages-details";
import Dashboard from "../../components/Dashboard";
import { downloadFileFromURL } from "../../utility/fileDownload";

import Alert from "antd/es/alert/Alert";
import axios from "axios";
import domtoimage from "dom-to-image";
import AppHeader from "../../components/app-header/app-header";
import AffectedPages from "../website-Iq/report/affected-pages";
import "./style.scss";

interface LandingPageProps {
  projectId?: string;
}

function SubHeaderCard({
  title = "",
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
  const [campaignData, setCampaignData] = useState<any>({});
  const Navigate = useNavigate();

  useEffect(() => {
    axios
        .get(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/site-audit/campaign/${localStorage.getItem('projectId')}`
        )
        .then((response: any) => {
          let campaignData = response?.data;
          setCampaignData(campaignData);
        })
        .catch((err) => {
          console.log(`Couldn't fetch Campaign Data...`, err);
        });
  }, [])

  const tabItems: TabsProps["items"] = [
    {
      key: "overview",
      label: `Overview`,
      children: <Dashboard />,
    },
    {
      key: "Issues",
      label: `Issues`,
      children: <IssuesDetails />,
    },
    {
      key: "audited-pages",
      label: `Audited Pages`,
      children: <PagesDetails />,
    },
    {
      key: "affected-pages",
      label: `Affected Pages`,
      children: <AffectedPages />,
    },
  ];

  const handleTabChange = (e: any) => {
    setCurrentTab(e);
  };
  const downloadOverviewSS = () => {
    const element = document.getElementById("dashboard-container-id"); // Replace with the actual ID of your <div>
    if (element) {
      domtoimage
        .toPng(element)
        .then((dataUrl: any) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "overview.png";
          link.click();
        })
        .catch((error: any) => {
          <Alert message={`Error capturing screenshot:${error}`} type="error" />;
          console.error("Error capturing screenshot:", error);
        });
    }
  };
  const handleExport = async () => {
    const projectId = localStorage.getItem("projectId");
    if (projectId) {
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
      } else if (currentTab === "affected-pages") {
           const res = await axios.get(
             `${
               import.meta.env.VITE_API_BASE_URL
             }/site-audit/campaign/${projectId}/export/pages`
           );

           downloadFileFromURL(res?.data?.link, "pages-csv");
      }
    } else {
      <Alert message="Project id not present." type="error" />;
    }
  };

  const getDate = (val: string) => {
    let date = new Date(val);
    return date.toLocaleDateString();
  }

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
            <SubHeaderCard title={campaignData?.url || ""} suffix=" | " />
            <SubHeaderCard
              title={`Last Updated: ${getDate(campaignData?.last_audit) || ""}`}
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
            <SubHeaderCard title={`Crawl Limit: ${campaignData?.pages_limit || 0}`} suffix=" | " />
            <SubHeaderCard title="Crawl Frequency: 15 days once" />
            <SubHeaderCard
              prefix={<Checkbox disabled checked={campaignData?.crawlSubdomains || false} />}
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
