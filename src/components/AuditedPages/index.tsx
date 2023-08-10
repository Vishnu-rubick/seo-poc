import React from "react";
import { DashboardDataType } from "../../interfaces";

import "./style.scss";
import { Bar } from '@ant-design/plots';

interface AuditedPagesProps {
  data: DashboardDataType | undefined;
}

interface CardProps {
  title?: string;
  count?: number;
  className?: string; 
}

interface BarDataItem {
  id: string;
  value: number;
  type: string;
}

function Card({ title, count, className }: CardProps) {
  return (
    <>
      <div className={`card ${className}`}>
        <div className="card-title">{title}</div>
        <hr />
        <div className="card-count">{count}</div>
      </div>
    </>
  );
}

function AuditedPages({ data }: AuditedPagesProps) {
  const barData: BarDataItem[] = [
    {
      id: '',
      value: data?.healthyPages || 0,
      type: 'Healthy',
    },
    {
      id: '',
      value: data?.brokenPages || 0,
      type: 'Broken',
    },
    {
      id: '',
      value: data?.redirectedPages || 0,
      type: 'Redirected',
    },
    {
      id: '',
      value: data?.pagesWithIssues || 0,
      type: 'With Issues',
    },
    {
      id: '',
      value: data?.blockedPages || 0,
      type: 'Blocked Pages',
    },
    
  ];

  const config = {
    data: barData,
    isStack: true,
    xField: 'value',
    yField: 'id',
    seriesField: 'type',
    colorField: 'type',
    color: ['#84D149', '#FE6060', '#FD8E0C', '#FFB400', '#F5F5F5'],
    
    label: {
      position: 'top',
      layout: [
        {
          type: 'interval-adjust-position',
        }, 
        {
          type: 'interval-hide-overlap',
        },
        {
          type: 'adjust-color',
        },
      ],
    },
  };


  return (
    <>
      <div className="audited-pages">
        <div className="audited-pages-content">
          <div className="bar-chart">
            <Bar {...config} />
          </div>
          <div className="number-cards">
            <Card className="healthy" title="Healthy" count={data?.healthyPages} />
            <Card className="broken" title="Broken" count={data?.brokenPages} />
            <Card className="redirected" title="Redirected" count={data?.redirectedPages} />
            <Card className="with-issues" title="With Issues" count={data?.pagesWithIssues} />
            <Card className="blocked" title="Blocked" count={data?.blockedPages} />
          </div>
        </div>
      </div>
    </>
  );
}

export default AuditedPages;
