import { Col, Row } from "antd";
import React from "react";
import { DashboardDataType } from "../../interfaces";

import "./style.scss";

interface SiteAnalyticsProps {
  data?: DashboardDataType | undefined;
}

interface CardProps {
  title?: string;
  count?: number;
  total?: number;
  backgroundColor?: string;
}

function Card({ title, count, backgroundColor = '#fff' }: CardProps) {
  return (
    <>
      <div style={{backgroundColor: backgroundColor}} className="site-analytics-card">
        <div className="site-analytics-card-title">{title}</div>
        <div className="site-analytics-card-count">{count} <span>Issues</span></div>
      </div>
    </>
  );
}

function SiteAnalytics({ data }: SiteAnalyticsProps) {
  return (
    <>
    <div className="site-analytics">
      <div className="site-analytics-content">
        <div className="site-analytics-content-cards">
          <Row>
            <Col span={12}><Card title="Crawlability" count={data?.crawlIssues} backgroundColor='#E5F7FC' /></Col>
            <Col span={12}><Card title="Text/Image" count={data?.markupIssues} backgroundColor='#FFF5E6' /></Col>
          </Row>
          <Row>
            <Col span={12}><Card title="HTML, HREFLANG & HTML" count={data?.techIssues} backgroundColor='#FFEBEB' /></Col>
            <Col span={12}><Card title="Links/URLs" count={data?.brokenIssues} backgroundColor='#FEF8EB' /></Col>
          </Row>
        </div>
        <div className="site-analytics-content-chart"></div>
      </div>
    </div>
    </>
  );
}

export default SiteAnalytics;
