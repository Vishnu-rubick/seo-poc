import { Breadcrumb, Tabs, TabsProps } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import KeywordsData from "../../../data/keywords/keyordsMerged.json";

import {
  MergedData,
  getAllKeywords,
  getMissingKeywords,
  getSharedKeywords,
  getStrongKeywords,
  getUntappedKeywords,
  getWeakKeywords,
} from "../../apis";

import BreadcrumbArrow from "../../assets/keywords/breadcrumb-arrow.svg";
import TableComponent from "../../components/table-component/table-component";

import AppHeader from "../../components/app-header/app-header";
import "./keywords-detials..scss";

type DataType = {
  key: string;
  keywords: string;
  "Text Mercato": number;
  "Witty Pen": number;
  "Pepper Content": number;
  "Search Volume": number;
  "Keyword Difficulty": number;
};

const data: DataType[] = [
  {
    key: "1",
    keywords: "",
    "Text Mercato": 0,
    "Witty Pen": 0,
    "Pepper Content": 0,
    "Search Volume": 0,
    "Keyword Difficulty": 0,
  },
];

function KeywordsDetails() {
  const keywordsData = KeywordsData as { [key: string]: MergedData };
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [dataSource, setDataSource] = useState(data);

  const getDataSource = (arr: MergedData[]) => {
    return arr.map((row: MergedData, idx: number) => {
      return {
        key: idx,
        keywords: row.Keyword,
        "Text Mercato": row.textMercatoData?.Position || 0,
        "Witty Pen": row.wittyPenData?.Position || 0,
        "Pepper Content": row.pepperContentData?.Position || 0,
        "Search Volume":
          row?.textMercatoData?.["Search Volume"] ||
          row?.wittyPenData?.["Search Volume"] ||
          row?.pepperContentData?.["Search Volume"] ||
          0,
        "Keyword Difficulty":
          row.textMercatoData?.Competition ||
          row.wittyPenData?.Competition ||
          row.pepperContentData?.Competition ||
          0,
      };
    });
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Keywords",
      dataIndex: "keywords",
      key: "1",
      sorter: (a, b) => a.keywords.localeCompare(b.keywords),
    },
    {
      title: "Text Mercato",
      dataIndex: "Text Mercato",
      key: "2",
      sorter: (a, b) => a["Text Mercato"] - b["Text Mercato"],
    },
    {
      title: "Witty Pen",
      dataIndex: "Witty Pen",
      key: "3",
      sorter: (a, b) => a["Witty Pen"] - b["Witty Pen"],
    },
    {
      title: "Pepper Content",
      dataIndex: "Pepper Content",
      key: "4",
      sorter: (a, b) => a["Pepper Content"] - b["Pepper Content"],
    },
    {
      title: "Search Volume",
      dataIndex: "Search Volume",
      key: "5",
      sorter: (a, b) => a["Witty Pen"] - b["Witty Pen"],
    },
    {
      title: "Keyword Difficulty",
      dataIndex: "Keyword Difficulty",
      key: "6",
      sorter: (a, b) => a["Keyword Difficulty"] - b["Keyword Difficulty"],
    },
  ];

  const tabItems: TabsProps["items"] = [
    {
      key: "all",
      label: `All Keywords`,
    },
    {
      key: "shared",
      label: `Shared Keywords`,
    },
    {
      key: "missing",
      label: `Missing Keywords`,
    },
    {
      key: "untapped",
      label: `Untapped Keywords`,
    },
    {
      key: "strong",
      label: `Strong Keywords`,
    },
    {
      key: "weak",
      label: `Weak keywords`,
    },
  ];

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    localStorage.setItem("keywordsTab", key);
    navigate(`/keywords/details/${key}`);
  };

  const getKeywordDetails = (data: { [key: string]: MergedData }) => {
    let keywordsDetailsArr: MergedData[] = [];

    if (activeTab == "shared") {
      keywordsDetailsArr = getSharedKeywords(keywordsData);
    } else if (activeTab == "missing") {
      keywordsDetailsArr = getMissingKeywords(keywordsData);
    } else if (activeTab == "weak") {
      keywordsDetailsArr = getWeakKeywords(keywordsData);
    } else if (activeTab == "untapped") {
      keywordsDetailsArr = getUntappedKeywords(keywordsData);
    } else if (activeTab == "strong") {
      keywordsDetailsArr = getStrongKeywords(keywordsData);
    } else {
      keywordsDetailsArr = getAllKeywords(keywordsData);
    }

    let keywordDetails = getDataSource(keywordsDetailsArr);
    return keywordDetails;
  };

  useEffect(() => {
    let path = location.pathname;
    let tabs = path.split("/");
    setActiveTab(tabs[tabs.length - 1]);

    let keywordDetails = getKeywordDetails(keywordsData);
    setDataSource(keywordDetails);
  }, []);

  useEffect(() => {
    let keywordDetails = getKeywordDetails(keywordsData);
    setDataSource(keywordDetails);
  }, [activeTab]);

  return (
    <div className="keywords-details-wrapper">
      <AppHeader title="Keywords" />
      <div className="keywords-details-contents">
        <div className="breadcrumbs-wrapper">
          <Breadcrumb
            separator={<img src={BreadcrumbArrow} alt="" />}
            items={[
              {
                title: "KEYWORD OVERVIEW",
                className: "breadcrumbs-title",
                // href:""
              },
              {
                title: `${activeTab}`.toUpperCase() + " KEYWORDS",
                // href: "",
              },
            ]}
          />
          <p>
            <span style={{ color: "#818181" }}>Last Update:</span>02 Aug 2023
          </p>
        </div>
        <div className="keywords-tabs">
          <Tabs
            className=""
            activeKey={activeTab}
            items={tabItems}
            onChange={handleTabChange}
          />
        </div>
        <div className="keywords-details">
          <TableComponent
            dataSource={dataSource}
            columns={columns}
            expandable={false}
            pagination={true}
            scroll={{ y: 410 }}
          />
        </div>
      </div>
    </div>
  );
}

export default KeywordsDetails;
