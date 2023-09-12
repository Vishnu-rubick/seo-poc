import { Col, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import KeywordsData from "../../data/keywords/keyordsMerged.json";
import { MergedData } from "../apis/index";
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

import axios from "axios";
import VennChart from "../components/charts/veen-chart/venn-chart";
import "./keywords.scss";
import CustomProgress from "./custom-progress/custom-progress";

type overviewcardsType = {
  id: number;
  img: string;
  arrow: string;
  val: any;
  title: string;
  linkTo: string;
}[];

const Keywords: React.FC = () => {
  const keywordsData = KeywordsData as { [key: string]: MergedData };
  const [overviewcards, setoverviewcards] = useState<overviewcardsType>();
  const [topKeywordsList, setTopKeywordssList] = useState<any[]>();
  const navigate = useNavigate();
  // const overviewCards = [
  //   {
  //     id: 2,
  //     img: BlueIcon,
  //     arrow: DominAuthorityArrow,
  //     val: "26",
  //     title: "All Keywords",
  //     linkTo: "/keywords/details/all",
  //   },
  //   {
  //     id: 3,
  //     img: OrangeIcon,
  //     arrow: OrangicSearchTrafficArrow,
  //     val: "1.9k",
  //     title: "Shared Keywords",
  //     linkTo: "/keywords/details/shared",
  //   },
  //   {
  //     id: 4,
  //     img: GreenIcon,
  //     arrow: PaidSearchTrafficArrow,
  //     val: "116",
  //     title: "Missing Keywords",
  //     linkTo: "/keywords/details/missing",
  //   },
  //   {
  //     id: 5,
  //     img: LightgreenIcon,
  //     arrow: UniqueVisitorsArrow,
  //     val: "26",
  //     title: "Untapped Keywords",
  //     linkTo: "/keywords/details/untapped",
  //   },
  //   {
  //     id: 6,
  //     img: PurpleIcon,
  //     arrow: VisitDurationArrow,
  //     val: "0",
  //     title: "Strong Keywords",
  //     linkTo: "/keywords/details/strong",
  //   },
  //   {
  //     id: 1,
  //     img: PinkIcon,
  //     arrow: PinkArrow,
  //     val: "26",
  //     title: "Weak Keywords",
  //     linkTo: "/keywords/details/weak",
  //   },
  // ];
  // const competitorsList = [
  //   { title: "Information literacy", percent: 40, value: "24,333" },
  //   { title: "Digit", percent: 60, value: "24,333" },
  //   { title: "Media", percent: 70, value: "24,333" },
  //   { title: "Information literacy", percent: 80, value: "24,333" },
  //   { title: "Digit", percent: 40, value: "24,333" },
  //   { title: "Media", percent: 30, value: "24,333" },
  //   { title: "Information literacy", percent: 20, value: "24,333" },
  //   { title: "Digit", percent: 30, value: "24,333" },
  //   { title: "Media", percent: 40, value: "24,333" },
  //   { title: "Information literacy", percent: 70, value: "24,333" },
  // ];
  const getOverviewCardData = () => {
    if (localStorage.getItem("projectId")) {
      axios
        .get(
          `${import.meta.env.VITE_API_BASE_URL}/keywords/${localStorage.getItem(
            "projectId"
          )}/dashboard`
        )
        .then((response) => {
          const overviewCards = [
            {
              id: 2,
              img: BlueIcon,
              arrow: DominAuthorityArrow,
              val: response.data.data.allKeywords, // Update the val property
              title: "All Keywords",
              linkTo: "/keywords/details/all",
            },
            {
              id: 3,
              img: OrangeIcon,
              arrow: OrangicSearchTrafficArrow,
              val: response.data.data.sharedKeywords, // Update the val property
              title: "Shared Keywords",
              linkTo: "/keywords/details/shared",
            },
            {
              id: 4,
              img: GreenIcon,
              arrow: PaidSearchTrafficArrow,
              val: response.data.data.missingKeywords, // Update the val property
              title: "Missing Keywords",
              linkTo: "/keywords/details/missing",
            },
            {
              id: 5,
              img: LightgreenIcon,
              arrow: UniqueVisitorsArrow,
              val: response.data.data.untappedKeywords, // Update the val property
              title: "Untapped Keywords",
              linkTo: "/keywords/details/untapped",
            },
            {
              id: 6,
              img: PurpleIcon,
              arrow: VisitDurationArrow,
              val: response.data.data.strongKeywords, // Update the val property
              title: "Strong Keywords",
              linkTo: "/keywords/details/strong",
            },
            {
              id: 1,
              img: PinkIcon,
              arrow: PinkArrow,
              val: response.data.data.weakKeywords, // Update the val property
              title: "Weak Keywords",
              linkTo: "/keywords/details/weak",
            },
          ];
          setoverviewcards(overviewCards);
        })
        .catch((error) => {
          console.error(error);
          //  navigate("/");
        });
    } else {
      navigate("/");
    }
  };
  function findMaxSearchVolume(data: any) {
    if (!Array.isArray(data) || data.length === 0) {
      return null; // Return null for empty or non-array input
    }

    let maxSearchVolume = -Infinity;

    for (const item of data) {
      const searchVolume = parseInt(item.searchVolume, 10); // Convert searchVolume to an integer

      if (!isNaN(searchVolume) && searchVolume > maxSearchVolume) {
        maxSearchVolume = searchVolume;
      }
    }

    return maxSearchVolume !== -Infinity ? maxSearchVolume : null;
  }
  const getTopCompetitorsList = () => {
    if (localStorage.getItem("projectId")) {
      axios
        .get(
          `${import.meta.env.VITE_API_BASE_URL}/keywords/${localStorage.getItem(
            "projectId"
          )}?offset=0&limit=10&type=all`
        )
        .then((response) => {
          const maxSearchVolume = findMaxSearchVolume(response?.data?.data);
          if (maxSearchVolume) {
            const keywordsList = response?.data?.data.map((comp: any) => {
              return {
                title: comp.name,
                percent: (comp.searchVolume / maxSearchVolume) * 100,
                value: comp.searchVolume,
              };
            });

            setTopKeywordssList(keywordsList);
          }
        })
        .catch((error) => {
          console.error(error);
          //  navigate("/");
        });
    } else {
      navigate("/");
    }
  };
  useEffect(() => {
    getOverviewCardData();
    getTopCompetitorsList();
  }, []);

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
            {overviewcards?.map(({ id, img, arrow, title, val, linkTo }) => (
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

        <Row className="chart-row" gutter={16}>
          <Col className="venn-col">
            <div className="chart-header">
              <h2>Keyword Overlap Map</h2>
              <Select
                defaultValue="Organic Keywords"
                className="custom-select"
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
              <div className="competitors-list">
                <p>
                  <span
                    className="circle"
                    style={{ background: "#7FB800" }}
                  ></span>{" "}
                  <p>wittypen.com</p>
                </p>
                <p>
                  <span
                    className="circle"
                    style={{ background: "#FFB400" }}
                  ></span>{" "}
                  <p>peppercontent.io</p>
                </p>
                <p>
                  <span
                    className="circle"
                    style={{ background: "#00A6ED" }}
                  ></span>{" "}
                  <p>textmercato.com</p>
                </p>
              </div>
            </div>
          </Col>
          <Col className="progress-col">
            <h2>Top 10 keywords</h2>
            <div className="competitors-progress-list">
              {topKeywordsList?.map(({ title, value, percent }:any) => (
                <CustomProgress title={title} value={value} percent={percent} />
              ))}
            </div>
          </Col>
        </Row>
      </Col>
    </div>
  );
};

export default Keywords;
