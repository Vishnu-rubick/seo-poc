import { Table } from 'antd';
import React, { useState } from 'react'

import KeywordsData from "../../data/keywords/keyordsMerged.json";
import { getDomainKeyords, MergedData } from '../apis';

function CompetitorAnalysis() {
  const keywordsData = KeywordsData as { [key: string]: MergedData };
  const [dataSource, setDataSource] = useState<any[]>([
    {
      key: 0,
      metric: "Domain Authority",
      textMercato: 0,
      pepperContent: 0,
      wittyPen: 0,
    },
    {
      key: 0,
      metric: "Organic Search Traffic",
      textMercato: 0,
      pepperContent: 0,
      wittyPen: 0,
    },
    {
      key: 0,
      metric: "Organic Keywords",
      textMercato: getDomainKeyords("textMercato", keywordsData).length,
      pepperContent: getDomainKeyords("pepperContent", keywordsData).length,
      wittyPen: getDomainKeyords("wittyPen", keywordsData).length,
    },
    {
      key: 0,
      metric: "Paid Search Traffic",
      textMercato: 0,
      pepperContent: 0,
      wittyPen: 0,
    },
    {
      key: 0,
      metric: "Visitors",
      textMercato: 0,
      pepperContent: 0,
      wittyPen: 0,
    },
    {
      key: 0,
      metric: "Unique Visitors",
      textMercato: 0,
      pepperContent: 0,
      wittyPen: 0,
    },
    {
      key: 0,
      metric: "Avg. Visit Duration",
      textMercato: 0,
      pepperContent: 0,
      wittyPen: 0,
    },
    {
      key: 0,
      metric: "Bounce Rate",
      textMercato: 0,
      pepperContent: 0,
      wittyPen: 0,
    },
    {
      key: 0,
      metric: "Traffic Share",
      textMercato: 0,
      pepperContent: 0,
      wittyPen: 0,
    },
  ]);

  const columns = [
    {
      key: "1",
      title: "Metric",
      dataIndex: "metric",
    },
    {
      key: "2",
      title: "Text Mercato",
      dataIndex: "textMercato",
    },
    {
      key: "3",
      title: "Pepper Content",
      dataIndex: "pepperContent",
    },
    {
      key: "4",
      title: "Witty Pen",
      dataIndex: "wittyPen",
    },
  ];

  return (
    <div className="keywords-dashboard">
      <div className="keywords-dashboard-header">
        <h4>Competitor Analysis</h4>
      </div>
      <hr />
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </div>
  );
}

export default CompetitorAnalysis