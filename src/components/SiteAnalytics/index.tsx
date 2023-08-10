import { Col, Row } from "antd";
import React from "react";
import { DashboardDataType } from "../../interfaces";
import { Pie } from '@ant-design/plots';

import "./style.scss";

interface SiteAnalyticsProps {
  data?: DashboardDataType | undefined;
}

interface CardProps {
  title?: string;
  count?: number;
  total?: number;
  backgroundColor?: string;
  badgeColor?: string;
}

interface PieDataType {
  type: string;
  value: number;
}

function Card({ title, count, backgroundColor = '#fff', badgeColor = '#fff' }: CardProps) {
  return (
    <>
      <div style={{backgroundColor: backgroundColor}} className="site-analytics-card">
        <div className="site-analytics-card-title">
          <div style={{backgroundColor: badgeColor}} className="site-analytics-card-title-badge"></div>
          <div className="site-analytics-card-title-text">{title}</div>
        </div>
        <div className="site-analytics-card-count">{count} <span>Issues</span></div>
      </div>
    </>
  );
}

function SiteAnalytics({ data }: SiteAnalyticsProps) {

  const pieData: PieDataType[] = [
    {
      type: 'Crawl',
      value: data?.crawlIssues || 0,
    },
    {
      type: 'Tech/Image',
      value: data?.markupIssues || 0,
    },
    {
      type: 'HTML, HREFLANG & HTML',
      value: data?.techIssues || 0,
    },  
    {
      type: 'Links/URLs',
      value: data?.brokenIssues || 0,
    },
  ]

  const config = {
    appendPadding: 10,
    data: pieData,
    angleField: 'value',
    colorField: 'type',
    seriesField: 'type',
    color: ['#2CBEFC', '#FEC233', '#FF9416', '#FF6C71'],
    radius: 0.8,
    label: {
      type: 'outer',
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };

  return (
    <>
    <div className="site-analytics">
      <div className="site-analytics-content">
        <div className="site-analytics-content-cards">
          <Row>
            <Col span={11}><Card title="Crawlability" count={data?.crawlIssues} backgroundColor='#E5F7FC' badgeColor="#00A6ED" /></Col>
            <Col span={11}><Card title="Text/Image" count={data?.markupIssues} backgroundColor='#FFF5E6' badgeColor="#FF9416" /></Col>
          </Row>
          <Row>
            <Col span={11}><Card title="HTML, HREFLANG & HTML" count={data?.techIssues} backgroundColor='#FFEBEB' badgeColor="#FD343A" /></Col>
            <Col span={11}><Card title="Links/URLs" count={data?.brokenIssues} backgroundColor='#FEF8EB' badgeColor="#FEC233" /></Col>
          </Row>
        </div>
        <div className="site-analytics-content-chart" >
          <Pie {...config} />
        </div>
      </div>
    </div>
    </>
  );
}

export default SiteAnalytics;
