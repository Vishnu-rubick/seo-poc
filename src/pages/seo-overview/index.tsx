import { Col, Row, Select, Table } from "antd";
import HistoryLogo from "../../assets/seo-overview/clock.svg";
import AppHeader from "../../components/app-header/app-header";
import OverviewCard from "./overview-card/overview-card";
import "./seo-overview.scss";

import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import axios from "axios";

interface SeoOverviewProps {
  projectId: string;
}

interface DataType {
  key: React.Key;
  metric: string;

  industryBenchmark: string;
  'rubick.ai': string;
  'peppercontent.io': string;
  'wittypen.com': string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Metric",
    dataIndex: "metric",
    width: 30,
  },
  {
    title: "Industry Benchmark",
    dataIndex: "industryBenchmark",
    width: 20,
  },
  {
    title: "Rubick.ai",
    dataIndex: "rubick.ai",
    width: 20,
  },
  {
    title: "peppercontent.io",
    dataIndex: "peppercontent.io",
    width: 20,
  },
  {
    title: "wittypen.com",
    dataIndex: "wittypen.com",
    width: 20,
  },
];

const data: DataType[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    metric: `metric ${i}`,
    industryBenchmark: '--',
    'rubick.ai': '2',
    'peppercontent.io': '3', 
    'wittypen.com': '2',
  });
}

function SeoOverview({ projectId }: SeoOverviewProps) {

  const [overviewData, setOverviewData] = useState<any[]>([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/site-audit/competitorAnalysis/${projectId}`).then((response) => {
      let data = response.data;
      let res: any[] = [];
      const columns = ['Domain Authority', 'Organic Search Traffic', 'Paid Search Traffic', 'Visitors', 'Unique Visitors', 'Avg. Visit Duration', 'Bounce Rate', 'Traffic Share'];
      columns.forEach((column, idx) => {
        let obj = {key: idx, metric: column, industryBenchmark: '--'} as any;
        data.forEach((domainObj: any) => {
          if(column == 'Traffic Share') obj[domainObj.Domain] = domainObj[column].toPrecision(4);
          else obj[domainObj.Domain] = parseInt(domainObj[column])
        })
        res.push(obj);
      })
      setOverviewData(res);
    }).catch((err) => {
      console.log(err);
    });
  }, [])
  
  return (
    <div className="seo-overview-wrapper">
      <AppHeader />
      <Col className="seo-overview-col" span={24}>
        <Row className="seo-overview-header-row">
          <div className="seo-overview-header">
            <h1>SEO Overview</h1>
            <p>Last Update: 02 Aug 2023</p>
          </div>
        </Row>
        <Row className="seo-overview-subheader-row">
          <div className="seo-overview-subheader">
            <span className="website-name">
              <a href="https://www.textmercato.com/">www.textmercato.com</a>
            </span>
            <div className="update-freq-container">
              <img className="history-logo" src={HistoryLogo} alt="" />
              <span>Update Frequency:</span>
              <Select
                defaultValue="monthly"
                style={{ width: 120 }}
                //  onChange={handleChange}
                options={[
                  { value: "15days", label: "15 Days" },
                  { value: "monthly", label: "Monthly" },
                  { value: "quarterly", label: "Quarterly" },
                  { value: "halfyearly", label: "Half Yearly" },
                  { value: "yearly", label: "Yearly" },
                ]}
              />
            </div>
          </div>
        </Row>
        <Row gutter={[1, 1]} className="overview-cards">
          {[1, 2, 3, 4, 5, 6, 7].map(() => (
            <Col span={3}>
              <OverviewCard />
            </Col>
          ))}
        </Row>
        <Row className="charts-row">
          <Col span={8} style={{ height: "200px" }}>
            <div>
              <h4>Competitors Positioning Map</h4>
            </div>
          </Col>
          <Col span={8} style={{ height: "200px" }}>
            <div>
              <h4>Domain Authority</h4>
            </div>
          </Col>
        </Row>
        <Row>
          <Table
            className="competitors-table"
            columns={columns}
            dataSource={overviewData}
            // bordered
            showHeader
            title={() => "Competitor Analysis"}
            // footer={() => "Footer"}
            pagination={false}
            scroll={{ y: 240 }}
          />
        </Row>
      </Col>
    </div>
  );
}

export default SeoOverview;
