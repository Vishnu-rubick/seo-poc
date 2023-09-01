import axios from "axios";
import { useEffect, useState } from "react";

import { Col, Row, Modal, Spin } from "antd";

import { DashboardDataType } from "../../interfaces";
import AuditedPages from "../AuditedPages";
import SiteAnalytics from "../SiteAnalytics";
import "./style.scss";

interface DashboardProps {
  type?: "default" | "textArea" | "password"; // Add more types if needed
  height?: string;
  width?: string;
  backgroundColor?: string;
  projectId?: string;
}

interface CardProps {
  data?: DashboardDataType;
  title?: string;
  child?: any;
  subTitle?: string;
}

interface AuditedPagesProps {
  data?: DashboardDataType | undefined;
}

function Card({ data, title, subTitle, child }: CardProps) {
  let subComponent;
  if (subTitle)
    subComponent = (
      <h2>
        {data?.pagesWithIssues}/{data?.crawledPages}
      </h2>
    );
  return (
    <>
      <div className="dashboard-card">
        <div className="dashboard-card-header">
          <div className="title">
            <img src="src/assets/common/info.svg" alt="" />
            <h4>{title}</h4>
            {subComponent}
          </div>
        </div>
        <div className="dashboard-card-content">{child}</div>
      </div>
    </>
  );
}

function Dashboard({ projectId }: DashboardProps) {
  const [data, setData] = useState<DashboardDataType | undefined>();
   const [isModalOpen, setIsModalOpen] = useState(true);
  useEffect(() => {
    if (localStorage.getItem("projectId")) {
      axios
        .get(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/site-audit/dashboard/${localStorage.getItem("projectId")}`
        )
        .then((res) => {
          setData(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  // API FOR FETCHING DASHBOARD DATA EVERY 15 MINS

  useEffect(() => {
    const projectId = localStorage.getItem("projectId");
    if (projectId) {
      const fetchData = async () => {
        axios
          .get(
            `${
              import.meta.env.VITE_API_BASE_URL
            }/site-audit/campaign/${projectId}`
          )
          .then((response) => {
            if (response?.data) {
              console.log(response?.data);
            }
            if (response?.data?.status === "FINISHED") {
              // delete the interval
              clearInterval(interval);
              setIsModalOpen(false);
            }
            console.log(response, "res of dasboard refetcg api");
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      };

      fetchData();
      const interval = setInterval(fetchData, 15 * 60 * 1000);
    }
  }, []);

  return (
    <>
      <div
        style={{ backgroundColor: "white" }}
        id="dashboard-container-id"
        className={`dashboard-container overlay-container`}
      >
        <Modal
          title="Please wait. Audit is running..."
          open={isModalOpen}
          footer={null}
          closeIcon={null}
          style={{ top: 0, left: 0 }}
        >
         <Spin />
        </Modal>

        <Row>
          <Col span={15} style={{ border: "1px solid #D9D9D9" }}>
            <Card
              data={data}
              title="Audited Pages"
              child={<AuditedPages data={data} />}
            />
          </Col>
          <Col span={8} style={{ border: "1px solid #D9D9D9" }}>
            <Card
              data={data}
              title="Issues Trend"
              child={
                <>
                  <div className="hash">
                    <p>N/A</p>
                  </div>
                </>
              }
            />
          </Col>
        </Row>
        <Row>
          <Col span={15} style={{ border: "1px solid #D9D9D9" }}>
            <Card
              data={data}
              title="Site Analytics"
              child={<SiteAnalytics data={data} />}
            />
          </Col>
          <Col span={8} style={{ border: "1px solid #D9D9D9" }}>
            <Card
              data={data}
              title="Analytics Trend"
              child={
                <>
                  <div className="hash">
                    <p>N/A</p>
                  </div>
                </>
              }
            />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
