import React from "react";
import { DashboardDataType } from "../../interfaces";

import "./style.scss";


interface AuditedPagesProps {
  data: DashboardDataType | undefined;
}

interface CardProps {
  title?: string;
  count?: number;
}

function Card({ title, count }: CardProps) {
  return (
    <>
      <div className="card">
        <div className="card-title">{title}</div>
        <hr />
        <div className="card-count">{count}</div>
      </div>
    </>
  );
}

function AuditedPages({ data }: AuditedPagesProps) {
  return (
    <>
      <div className="audited-pages-container">
        <div className="bar-chart"></div>
        <div className="number-cards">
          <Card title="Healthy" count={data?.healthyPages} />
          <Card title="Broken" count={data?.brokenPages} />
          <Card title="Redirected" count={data?.redirectedPages} />
          <Card title="With Issues" count={data?.pagesWithIssues} />
          <Card title="Blocked" count={data?.blockedPages} />
        </div>
      </div>
    </>
  );
}

export default AuditedPages;
