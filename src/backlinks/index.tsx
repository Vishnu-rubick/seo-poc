import { Col, Row } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import AppHeader from "../components/app-header/app-header";
import DomainSubheader from "../components/domain-subheader/domain-subheader";
import ModuleHeader from "../components/module-header/module-header";
import OverviewCard from "../components/overview-card/overview-card";

// import backlinksOverview from "../../backlinks-data/backlinks-overview.json";
import backlinksList from "../../backlinks-data/backlinks-details.json";
import outboundDomainsData from "../../backlinks-data/outbound-domains.json";
import referringDomainsData from "../../backlinks-data/referring-domains.json";

//assets
import PinkArrow from "../assets/seo-overview/cards/bounce-rate-arrow.png";
import DominAuthorityArrow from "../assets/seo-overview/cards/domain-auth-arrow.png";
import OrangicSearchTrafficArrow from "../assets/seo-overview/cards/organic-search-traffic-arrow.png";
import PaidSearchTrafficArrow from "../assets/seo-overview/cards/paid-search-traffic-arrow.png";
import VisitDurationArrow from "../assets/seo-overview/cards/visit-duration-arrow.png";

import BlueIcon from "../assets/keywords/cards/blueIcon.svg";
import GreenIcon from "../assets/keywords/cards/green.svg";
import OrangeIcon from "../assets/keywords/cards/orange.svg";
import PinkIcon from "../assets/keywords/cards/pink.svg";
import PurpleIcon from "../assets/keywords/cards/purple.svg";

import "./backlinks.scss";
import ReportCard from "./report-card/report-card";

const Backlinks: React.FC = () => {
  const [dataSource, setDataSource] = useState<any[]>([
    {
      key: "1",
      rowHeader: "Total",
      backlinks: backlinksList.length,
      referringDomains: referringDomainsData.length,
      monthlyVisits: "?",
      organicTraffic: "?",
      outboundDomains: outboundDomainsData.length,
    },
  ]);
  const columns = [
    {
      title: "",
      dataIndex: "rowHeader",
      key: "1",
    },
    {
      title: "Backlinks",
      dataIndex: "backlinks",
      key: "2",
      render: (text: string, record: any) => (
        <Link className="hyperLink" to={`details`}>
          {text}
        </Link>
      ),
    },
    {
      title: "Referring Domains",
      dataIndex: "referringDomains",
      key: "3",
      render: (text: string, record: any) => (
        <Link className="hyperLink" to={`/referring-domains/details`}>
          {text}
        </Link>
      ),
    },
    {
      title: "Monthly Visits",
      dataIndex: "monthlyVisits",
      key: "4",
    },
    {
      title: "Organic Traffic",
      dataIndex: "organicTraffic",
      key: "5",
    },
    {
      title: "Outbound Domains",
      dataIndex: "outboundDomains",
      key: "6",
      render: (text: string, record: any) => (
        <Link className="hyperLink" to={`/outbound-domains/details`}>
          {text}
        </Link>
      ),
    },
  ];
  const overviewCards = [
    {
      id: 2,
      img: BlueIcon,
      arrow: DominAuthorityArrow,
      val: "1.4k",
      title: "Backlinks",
      linkTo: "/backlinks/details",
    },
    {
      id: 3,
      img: OrangeIcon,
      arrow: OrangicSearchTrafficArrow,
      val: "263",
      title: "Referring Domains",
      linkTo: "/backlinks/details",
    },
    {
      id: 4,
      img: GreenIcon,
      arrow: PaidSearchTrafficArrow,
      val: "116",
      title: "Monthly Visits",
      linkTo: "/backlinks/details",
    },
    {
      id: 6,
      img: PurpleIcon,
      arrow: VisitDurationArrow,
      val: "217",
      title: "Organic Traffic",
      linkTo: "/backlinks/details",
    },
    {
      id: 1,
      img: PinkIcon,
      arrow: PinkArrow,
      val: "26",
      title: "Outbound Domains",
      linkTo: "/backlinks/details",
    },
  ];
  const reportCards = [
    {
      key: 1,
      value: 245,
      title: "Referring Domains",
      color: "#00A6ED",
    },
    {
      key: 2,
      value: 45,
      title: "Toxic Links",
      color: "#FFB400",
    },
    {
      key: 3,
      value: 24,
      title: "Potentially Toxic",
      color: "#FF595E",
    },
    {
      key: 4,
      value: 245,
      title: "Healthy",
      color: "#7FB800",
    },
  ];
  return (
    <div className="backlinks-dashboard">
      <AppHeader />
      <Col className="dashboard-col" span={24}>
        <Row>
          <ModuleHeader title="" lastUpdatedAt={"02 Aug 2023"} />
        </Row>
        <Row className="domain-header-row">
          <DomainSubheader />
        </Row>
        <div className="overview-cards-container">
          <h2 className="subheading">Your key SEO Metrics</h2>
          <Row justify="start" className="overview-cards-custom">
            {overviewCards?.map(({ id, img, arrow, title, val, linkTo }) => (
              // <Col span={8} key={id}>
                <OverviewCard
                  id={id}
                  img={img}
                  arrow={arrow}
                  title={title}
                  val={val}
                  linkTo={linkTo}
                />
              // </Col>
            ))}
          </Row>
        </div>
        <Row className="bottom-row">
          <Col span={12}>
            <h2>Backlink Audit Report</h2>
            <Row className="cards-row">
              {reportCards.map(({key, value, title, color}) => (
                <Col className="card-col" span={12} key={key}>
                  <ReportCard  color={color} value={value} title={title}/>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Col>
      {/* <div>
        <p>Backlink Analysis Report</p>
        <Table
          // className="issues-table"
          dataSource={dataSource}
          columns={columns}
          pagination={false}
        />
      </div> */}
    </div>
  );
};

export default Backlinks;
