import { Table, Row, Col } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import AppHeader from "../components/app-header/app-header";
import ModuleHeader from "../components/module-header/module-header";
import DomainSubheader from "../components/domain-subheader/domain-subheader";
import OverviewCard from "../components/overview-card/overview-card";

// import backlinksOverview from "../../backlinks-data/backlinks-overview.json";
import referringDomainsData from "../../backlinks-data/referring-domains.json";
import backlinksList from "../../backlinks-data/backlinks-details.json";
import outboundDomainsData from "../../backlinks-data/outbound-domains.json";


//assets
import DominAuthorityArrow from "../assets/seo-overview/cards/domain-auth-arrow.png";
import PaidSearchTrafficArrow from "../assets/seo-overview/cards/paid-search-traffic-arrow.png";
import UniqueVisitorsArrow from "../assets/seo-overview/cards/unique-visitors-arrow.png";
import VisitDurationArrow from "../assets/seo-overview/cards/visit-duration-arrow.png";
import OrangicSearchTrafficArrow from "../assets/seo-overview/cards/organic-search-traffic-arrow.png";
import PinkArrow from "../assets/seo-overview/cards/bounce-rate-arrow.png"

import BlueIcon from "../assets/keywords/cards/blueIcon.svg"
import OrangeIcon from "../assets/keywords/cards/orange.svg"
import GreenIcon from "../assets/keywords/cards/green.svg"
import LightgreenIcon from "../assets/keywords/cards/lightgreen.svg";
import PurpleIcon from "../assets/keywords/cards/purple.svg"
import PinkIcon from "../assets/keywords/cards/pink.svg"

import "./backlinks.scss";

const Backlinks: React.FC = () => {
  const [dataSource, setDataSource] = useState<any[]>([
    {
      key: "1",
      rowHeader: "Total",
      backlinks: backlinksList.length,
      referringDomains: referringDomainsData.length,
      monthlyVisits: '?',
      organicTraffic: '?',
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
        val: "26",
        title: "All Keywords",
        linkTo: "/keywords/details/all",
      },
      {
        id: 3,
        img: OrangeIcon,
        arrow: OrangicSearchTrafficArrow,
        val: "1.9k",
        title: "Shared Keywords",
        linkTo: "/keywords/details/shared",
      },
      {
        id: 4,
        img: GreenIcon,
        arrow: PaidSearchTrafficArrow,
        val: "116",
        title: "Missing Keywords",
        linkTo: "/keywords/details/missing",
      },
      {
        id: 6,
        img: PurpleIcon,
        arrow: VisitDurationArrow,
        val: "0",
        title: "Strong Keywords",
        linkTo: "/keywords/details/strong",
      },
      {
        id: 1,
        img: PinkIcon,
        arrow: PinkArrow,
        val: "26",
        title: "Weak Keywords",
        linkTo: "/keywords/details/weak",
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
          <Row justify="start" className="overview-cards">
            {overviewCards?.map(({ id, img, arrow, title, val, linkTo }) => (
              <Col span={5} key={id}>
                <OverviewCard
                  id={id}
                  img={img}
                  arrow={arrow}
                  title={title}
                  val={val}
                  linkTo={linkTo}
                />
              </Col>
            ))}
          </Row>
        </div>
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
