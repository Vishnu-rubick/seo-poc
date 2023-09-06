import { Col, Row } from "antd";
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
     },
     {
       id: 3,
       img: OrangeIcon,
       arrow: OrangicSearchTrafficArrow,
       val: "1.9k",
       title: "Shared Keywords",
     },
     {
       id: 4,
       img: GreenIcon,
       arrow: PaidSearchTrafficArrow,
       val: "116",
       title: "Missing Keywords",
     },
     {
       id: 5,
       img: LightgreenIcon,
       arrow: UniqueVisitorsArrow,
       val: "26",
       title: "Untapped Keywords",
     },
     {
       id: 6,
       img: PurpleIcon,
       arrow: VisitDurationArrow,
       val: "0",
       title: "Strong Keywords",
     },
     {
       id: 1,
       img: PinkIcon,
       arrow: PinkArrow,
       val: "26",
       title: "Weak Keywords",
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
            {overviewCards?.map(({id, img, arrow, title, val}) => (
              <Col span={8} key={id}>
                <OverviewCard id={id} img={img} arrow={arrow} title={title} val={val} />
              </Col>
            ))}
          </Row>
        </div>
      </Col>
    </div>
  );
};

export default Keywords;
