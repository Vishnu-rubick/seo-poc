import { Col, Row, Select } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import KeywordsData from "../../data/keywords/keyordsMerged.json";
import {
  MergedData,
  getAllKeywords,
  getMissingKeywords,
  getSharedKeywords,
  getStrongKeywords,
  getUntappedKeywords,
  getWeakKeywords,
} from "../apis/index";
import AppHeader from "../components/app-header/app-header";
import DomainSubheader from "../components/domain-subheader/domain-subheader";
import ModuleHeader from "../components/module-header/module-header";
import OverviewCard from "../components/overview-card/overview-card";

//assets
import PinkArrow from "../assets/seo-overview/cards/bounce-rate-arrow.png";
import DominAuthorityArrow from "../assets/seo-overview/cards/domain-auth-arrow.png";
import OrangicSearchTrafficArrow from "../assets/seo-overview/cards/organic-search-traffic-arrow.png";
import PaidSearchTrafficArrow from "../assets/seo-overview/cards/paid-search-traffic-arrow.png";
import UniqueVisitorsArrow from "../assets/seo-overview/cards/unique-visitors-arrow.png";
import VisitDurationArrow from "../assets/seo-overview/cards/visit-duration-arrow.png";

import BlueIcon from "../assets/keywords/cards/blueIcon.svg";
import GreenIcon from "../assets/keywords/cards/green.svg";
import LightgreenIcon from "../assets/keywords/cards/lightgreen.svg";
import OrangeIcon from "../assets/keywords/cards/orange.svg";
import PinkIcon from "../assets/keywords/cards/pink.svg";
import PurpleIcon from "../assets/keywords/cards/purple.svg";

import VennChart from "../components/charts/veen-chart/venn-chart";
import "./keywords.scss";

const Keywords: React.FC = () => {
  const keywordsData = KeywordsData as { [key: string]: MergedData };
  const [dataSource, setDataSource] = useState<any[]>([
    {
      key: "1",
      allKeywords: getAllKeywords(keywordsData).length,
      sharedKeywords: getSharedKeywords(keywordsData).length,
      missingKeywords: getMissingKeywords(keywordsData).length,
      weakKeywords: getWeakKeywords(keywordsData).length,
      untappedKeywords: getUntappedKeywords(keywordsData).length,
      strongKeywords: getStrongKeywords(keywordsData).length,
    },
  ]);

  const columns = [
    {
      key: "1",
      title: "",
      dataIndex: "rowHeader",
    },
    {
      key: "2",
      title: "All Keywords",
      dataIndex: "allKeywords",
      render: (text: string, record: any) => (
        <Link className="hyperLink" to={`/keywords/details/all`}>
          {text}
        </Link>
      ),
    },
    {
      key: "3",
      title: "Shared Keywords",
      dataIndex: "sharedKeywords",
      render: (text: string, record: any) => (
        <Link className="hyperLink" to={`/keywords/details/shared`}>
          {text}
        </Link>
      ),
    },
    {
      key: "4",
      title: "Missing Keywords",
      dataIndex: "missingKeywords",
      render: (text: string, record: any) => (
        <Link className="hyperLink" to={`/keywords/details/missing`}>
          {text}
        </Link>
      ),
    },
    {
      key: "5",
      title: "Weak Keywords",
      dataIndex: "weakKeywords",
      render: (text: string, record: any) => (
        <Link className="hyperLink" to={`/keywords/details/weak`}>
          {text}
        </Link>
      ),
    },
    {
      key: "6",
      title: "Untapped Keywords",
      dataIndex: "untappedKeywords",
      render: (text: string, record: any) => (
        <Link className="hyperLink" to={`/keywords/details/untapped`}>
          {text}
        </Link>
      ),
    },
    {
      key: "7",
      title: "Strong Keywords",
      dataIndex: "strongKeywords",
      render: (text: string, record: any) => (
        <Link className="hyperLink" to={`/keywords/details/strong`}>
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
      id: 5,
      img: LightgreenIcon,
      arrow: UniqueVisitorsArrow,
      val: "26",
      title: "Untapped Keywords",
      linkTo: "/keywords/details/untapped",
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
    <div className="keywords-dashboard">
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
              <Col span={8} key={id}>
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

        <Row className="chart-row">
          <Col className="venn-col" span={12}>
            <div className="chart-header">
              <h2>Keyword Overlap Map</h2>
              <Select
                defaultValue="Organic Keywords"
                options={[
                  { value: "organic-keywords", label: "Organic Keywords" },
                  // { value: "monthly", label: "Monthly" },
                  // { value: "quarterly", label: "Quarterly" },
                  // { value: "halfyearly", label: "Half Yearly" },
                  // { value: "yearly", label: "Yearly" },
                ]}
              />
            </div>
            <div className="chart-container">
              <VennChart />
              {/* <div>
                <li>
                  <ul>ddmdm</ul>
                  <ul>ddmdm</ul>
                  <ul>ddmdm</ul>
                </li>
              </div> */}
            </div>
          </Col>
          <Col span={12}>{/* bar-chart */}</Col>
        </Row>
      </Col>
    </div>
  );
};

export default Keywords;
