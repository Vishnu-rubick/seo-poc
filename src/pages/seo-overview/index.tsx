import { Col, Row, Table } from "antd";
import AppHeader from "../../components/app-header/app-header";
import OverviewCard from "../../components/overview-card/overview-card";
import "./seo-overview.scss";

import type { ColumnsType } from "antd/es/table";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import DomainSubheader from "../../components/domain-subheader/domain-subheader";
import ModuleHeader from "../../components/module-header/module-header";

interface SeoOverviewProps {
  projectId?: string;
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
    render: (text: string) => <span style={{ color: "#ADB0B8" }}>{text}</span>,
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
  const [tableColumns, setTableColumns] = useState<any[]>([]);
  const [domainTitle, setDomainTitle] = useState<string | null>("");
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("projectId")) {
      axios
        .get(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/site-audit/competitorAnalysis/${localStorage.getItem("projectId")}`
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
              industryBenchmark: "Coming Soon",
            } as any;
            data.forEach((domainObj: any) => {
              if (column == "Traffic Share")
                obj[domainObj.Domain] = domainObj[column].toPrecision(4);
              else obj[domainObj.Domain] = parseInt(domainObj[column]);
              if (isNaN(obj[domainObj.Domain])) {
                obj[domainObj.Domain] = "N/A";
              }
            });
            res.push(obj);
          });
          setOverviewData(res);
          const dynamicColumns = data.map((item: any) => ({
            title: item.Domain,
            dataIndex: item.Domain,
            width: 20,
          }));
          const tablecols = [
            {
              title: "Metric",
              dataIndex: "metric",
              width: 30,
            },
            {
              title: "Industry Benchmark",
              dataIndex: "industryBenchmark",
              width: 20,
              render: (text: string) => (
                <span style={{ color: "#ADB0B8" }}>{text}</span>
              ),
            },
            ...dynamicColumns, // Spread the dynamic columns here
          ];
          setTableColumns(tablecols);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      //navigate("/");
    }
    if (localStorage.getItem("domain")) {
      setDomainTitle(localStorage.getItem("domain"));
    }
  }, []);
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
          <ModuleHeader
            lastUpdatedAt={`${overviewData[0]?.lastUpdatedAt || `01 Oct 2023`}`}
          />
        </Row>
        <Row className="seo-overview-subheader-row">
          <DomainSubheader />
        </Row>
        <div className="overview-cards-container">
          <h2 className="subheading">Your key SEO Metrics</h2>
          <Row justify="start" className="overview-cards">
            {domainTitle?.length !==0 &&
              overviewData?.map(
                ({ metric: title, [domainTitle]: val }: any, idx) => (
                  <Col span={6} key={idx}>
                    <OverviewCard
                      id={idx}
                      img={overviewCards[idx]?.img}
                      arrow={overviewCards[idx]?.arrow}
                      title={title}
                      val={Number.isNaN(val) ? "--" : val}
                    />
                  </Col>
                )
              )}
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
            columns={tableColumns}
            dataSource={overviewData}
            // bordered
            showHeader
            title={() => "Competitor Analysis"}
            // footer={() => "Footer"}
            pagination={false}
            scroll={{ y: "30vh" }}
          />
        </Row>
      </Col>
    </div>
  );
}

export default SeoOverview;
