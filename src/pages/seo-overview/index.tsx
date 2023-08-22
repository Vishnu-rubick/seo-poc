import { Col, Row, Select, Table } from "antd";
import HistoryLogo from "../../assets/seo-overview/clock.svg";
import AppHeader from "../../components/app-header/app-header";
import OverviewCard from "./overview-card/overview-card";
import "./seo-overview.scss";

import type { ColumnsType } from "antd/es/table";

interface DataType {
  key: React.Key;
  metric: string;

  industryBenchmark: number;
  textmercato: number;
  peppercontent: number;
  wittypen: number;
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
    title: "textmercato.com",
    dataIndex: "textmercato",
    width: 20,
  },
  {
    title: "peppercontent.io",
    dataIndex: "peppercontent",
    width: 20,
  },
  {
    title: "wittypen.com",
    dataIndex: "wittypen",
    width: 20,
  },
];

const data: DataType[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    metric: `metric ${i}`,
    industryBenchmark: 32,
    textmercato: 2,
    peppercontent: 3,
    wittypen: 2,
  });
}

function SeoOverview() {
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
                  { value: "fortnight", label: "Fortnight" },
                  { value: "monthly", label: "Monthly" },
                  { value: "quarterly", label: "Quarterly" },
                  { value: "halfyearly", label: "Half Yearly" },
                  { value: "yearly", label: "Yearly" },
                ]}
              />
            </div>
          </div>
        </Row>
        <Row  justify="start" className="overview-cards">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(() => (
            <Col span={3}>
              <OverviewCard />
            </Col>
          ))}
        </Row>
        <Row className="charts-row">
          <Col span={11} style={{ height: "200px" }}>
            <div>
              <h4>Competitors Positioning Map</h4>
            </div>
          </Col>
          <Col span={11} style={{ height: "200px" }}>
            <div>
              <h4>Domain Authority</h4>
            </div>
          </Col>
        </Row>
        <Row>
          <Table
            className="competitors-table"
            columns={columns}
            dataSource={data}
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
