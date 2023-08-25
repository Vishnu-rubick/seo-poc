import { Col, Row, Select, Table } from "antd";
import CalenderLogo from "../../assets/seo-overview/calender.svg";
import AppHeader from "../../components/app-header/app-header";
import OverviewCard from "./overview-card/overview-card";
import "./seo-overview.scss";

import type { ColumnsType } from "antd/es/table";
import axios from "axios";
import { useEffect, useState } from "react";
import BounceRateArrow from "../../assets/seo-overview/cards/bounce-rate-arrow.png";
import BounceRateLogo from "../../assets/seo-overview/cards/bounce-rate.svg";
import DominAuthorityArrow from "../../assets/seo-overview/cards/domain-auth-arrow.png";
import DominAuthorityLogo from "../../assets/seo-overview/cards/domain-authority.svg";
import OrganicKeywordsArrow from "../../assets/seo-overview/cards/organic-keywords-arrow.png";
import OrganicKeywordsLogo from "../../assets/seo-overview/cards/organic-keywords.svg";
import OrangicSearchTrafficArrow from "../../assets/seo-overview/cards/organic-search-traffic-arrow.png";
import OrangicSearchTrafficLogo from "../../assets/seo-overview/cards/organic-search-traffic.svg";
import PaidSearchTrafficArrow from "../../assets/seo-overview/cards/paid-search-traffic-arrow.png";
import PaidSearchTrafficLogo from "../../assets/seo-overview/cards/paid-search-traffic.svg";
import TrafficShareArrow from "../../assets/seo-overview/cards/traffic-share-arrow.png";
import TrafficShareLogo from "../../assets/seo-overview/cards/traffic-share.svg";
import UniqueVisitorsArrow from "../../assets/seo-overview/cards/unique-visitors-arrow.png";
import UniqueVisitorsLogo from "../../assets/seo-overview/cards/unique-visitors.svg";
import VisitDurationArrow from "../../assets/seo-overview/cards/visit-duration-arrow.png";
import VisitDurationLogo from "../../assets/seo-overview/cards/visit-duration.svg";

interface SeoOverviewProps {
  projectId: string;
}

interface DataType {
  key: React.Key;
  metric: string;

  industryBenchmark: string;
  "rubick.ai": string;
  "peppercontent.io": string;
  "wittypen.com": string;
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

function SeoOverview({ projectId }: SeoOverviewProps) {
  const [overviewData, setOverviewData] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/site-audit/competitorAnalysis/${projectId}`
      )
      .then((response) => {
        let data = response.data;
        let res: any[] = [];
        const columns = [
          "Domain Authority",
          "Organic Search Traffic",
          "Paid Search Traffic",
          "Visitors",
          "Unique Visitors",
          "Avg. Visit Duration",
          "Bounce Rate",
          "Traffic Share",
        ];
        columns.forEach((column, idx) => {
          let obj = {
            key: idx,
            metric: column,
            industryBenchmark: "--",
          } as any;
          data.forEach((domainObj: any) => {
            if (column == "Traffic Share")
              obj[domainObj.Domain] = domainObj[column].toPrecision(4);
            else obj[domainObj.Domain] = parseInt(domainObj[column]);
          });
          res.push(obj);
        });
        setOverviewData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log('data: ', overviewData)
  const overviewCards = [
    {
      id: 1,
      img: DominAuthorityLogo,
      arrow: DominAuthorityArrow,
      val: "12%",
      title: "Domain Authority",
    },
    {
      id: 2,
      img: OrangicSearchTrafficLogo,
      arrow: OrangicSearchTrafficArrow,
      val: "45",
      title: "Oraganic Search traffic",
    },
    {
      id: 3,
      img: PaidSearchTrafficLogo,
      arrow: PaidSearchTrafficArrow,
      val: "44",
      title: "Paid Search Traffic",
    },
    {
      id: 4,
      img: OrganicKeywordsLogo,
      arrow: OrganicKeywordsArrow,
      val: "44",
      title: "Organic Keywords",
    },
    {
      id: 5,
      img: UniqueVisitorsLogo,
      arrow: UniqueVisitorsArrow,
      val: "33",
      title: "Unique Visitors",
    },
    {
      id: 6,
      img: VisitDurationLogo,
      arrow: VisitDurationArrow,
      val: "33",
      title: "Visit Duration",
    },
    {
      id: 7,
      img: BounceRateLogo,
      val: "50%",
      arrow: BounceRateArrow,
      title: "Bounce rate",
    },
    {
      id: 8,
      val: "1%",
      img: TrafficShareLogo,
      arrow: TrafficShareArrow,
      title: "Traffic Share",
    },
  ];

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
              {/* <a href="https://www.textmercato.com/">www.textmercato.com</a> */}
              Domain - rubick.ai
            </span>
            <div className="update-freq-container">
              <img className="history-logo" src={CalenderLogo} alt="" />
              {/* <span>Update Frequency:</span> */}
              <Select
                defaultValue="monthly"
                style={{ width: 120 }}
                //  onChange={handleChange}
                className="custom-select"
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
        <div className="overview-cards-container">
          <h2 className="subheading">Your key SEO Metrics</h2>
          <Row justify="start" className="overview-cards">
            {overviewData?.map(({ metric: title, ['rubick.ai']: val }: any, idx) => (
              <Col span={6} key={idx}>
                <OverviewCard id={idx} img={overviewCards[idx]?.img} arrow={overviewCards[idx]?.arrow} title={title} val={Number.isNaN(val) ? "--" : val} />
              </Col>
            ))}
          </Row>
        </div>

        {/* <Row className="charts-row">
          <Col span={12} style={{ height: "200px" }}>
            <div>
              <h4>Competitors Positioning Map</h4>
              <hr style={{ border: "0.5px solid #D9D9D9" }} />
            </div>
          </Col>
          <Col span={12}>
            <div className="line-chart-container">
              <h4>Domain Authority</h4>
              <hr style={{ border: "0.5px solid #D9D9D9" }} />
              <LineChart />
            </div>
          </Col>
        </Row> */}
        <Row className="table-row">
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
