import React, { ReactNode, useEffect, useState } from "react";
import axios from "axios";

import { Col, Input, Row } from "antd";
import { UserOutlined } from "@ant-design/icons";

import "./style.scss";
import AuditedPages from "../AuditedPages";
import { DashboardDataType } from "../../interfaces";
import SiteAnalytics from "../SiteAnalytics";

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
  if(subTitle)  subComponent = <h2>{data?.pagesWithIssues}/{data?.crawledPages}</h2>
  return (
    <>
      <div className="dashboard-card">
        <div className="dashboard-card-header">
          <div className="title">
            <img src="src/assets/common/info.svg" alt="" />
            <h4>{title}</h4>
            { subComponent } 
          </div>
        </div>
        <div className="dashboard-card-content">{child}</div>
      </div>
    </>
  );
}

function Dashboard({ projectId }: DashboardProps) {
  const [data, setData] = useState<DashboardDataType | undefined>();
  useEffect(() => {
    console.log(import.meta.env.VITE_API_BASE_URL)
    axios
      .get(
        `${import.meta.env.VITE_API_BASE_URL}/site-audit/dashboard/${projectId}`
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  // useEffect(() => {
  //   console.log(import.meta.env.VITE_API_BASE_URL);
  //   axios
  //     .get(
  //       `${
  //         import.meta.env.VITE_API_BASE_URL
  //       }/site-audit/campaign/:${projectId}`
  //     )
  //     .then((res) => {
  //       // setData(res.data);
  //       console.log(res);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);
  return (
    <>
      <div
        style={{ backgroundColor: "white" }}
        id="dashboard-container-id"
        className="dashboard-container"
      >
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
