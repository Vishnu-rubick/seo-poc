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
        <div className="card-content">{child}</div>
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

  return (
    <>
      <div className="dashboard-container">
        <Row style={{ height: "40%" }}>
          <Col span={15} style={{ margin: "5px 10px 0 0" }}>
            <Card
              data={data}
              title="Audited Pages"
              child={<AuditedPages data={data} />}
            />
          </Col>
          <Col span={8} style={{ margin: "5px 10px 0 0" }}>
            <Card 
              data={data}
              title="Issues Trend"
              child={
                <>
                  <h2>Coming Soon...</h2>
                </>
              }
            />
          </Col>
        </Row>
        <Row style={{ height: "60%" }}>
          <Col span={15} style={{ margin: "5px 10px 0 0" }}>
            <Card
              data={data}
              title="Site Analytics"
              child={<SiteAnalytics data={data} />}
            />
          </Col>
          <Col span={8} style={{ margin: "5px 10px 0 0" }}>
            <Card 
              data={data}
              title="Analytics Trend"
              child={
                <>
                  <h2>Coming Soon...</h2>
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