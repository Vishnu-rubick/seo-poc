import { Table, Tabs, TabsProps } from "antd";
import React, { useState, useEffect } from "react";
import KeywordsData from "../../../data/keywords/keyordsMerged.json";
import { Link, useNavigate } from "react-router-dom";

import {
  MergedData,
  getMissingKeywords,
  getSharedKeywords,
  getWeakKeywords,
  getAllKeywords,
  getUntappedKeywords,
  getStrongKeywords
} from "../../apis";

import "./style.css"

function KeywordsDetails() {
  const keywordsData = KeywordsData as { [key: string]: MergedData };
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [dataSource, setDataSource] = useState<any[]>([
    {
      key: "1",
      keywords: 0,
      "Text Mercato": 0,
      "Witty Pen": 0,
      "Pepper Content": 0,
      "Search Volume": 0,
      "Keyword Difficulty": 0
    },
  ]);

  const getDataSource = (arr: MergedData[]) => {
    return arr.map((row: MergedData, idx: number) => {
        return {
            key: idx,
            keywords: row.Keyword,
            "Text Mercato": row.textMercatoData?.Position || 0,
            "Witty Pen": row.wittyPenData?.Position || 0,
            "Pepper Content": row.pepperContentData?.Position || 0,
            "Search Volume": row?.textMercatoData?.["Search Volume"] || row?.wittyPenData?.["Search Volume"] || row?.pepperContentData?.["Search Volume"] || 0,
            "Keyword Difficulty": (row.textMercatoData?.Competition || row.wittyPenData?.Competition || row.pepperContentData?.Competition || 0)
        }
    })
  }

  const columns = [
    {
      title: "keywords",
      dataIndex: "keywords",
      key: "1",
    },
    {
      title: "Text Mercato",
      dataIndex: "Text Mercato",
      key: "2",
    },
    {
      title: "Witty Pen",
      dataIndex: "Witty Pen",
      key: "3",
    },
    {
      title: "Pepper Content",
      dataIndex: "Pepper Content",
      key: "4",
    },
    {
      title: "Search Volume",
      dataIndex: "Search Volume",
      key: "5",
    },
    {
      title: "Keyword Difficulty",
      dataIndex: "Keyword Difficulty",
      key: "6",
    },
  ];

  const tabItems: TabsProps["items"] = [
    {
      key: "all",
      label: `All`,
    },
    {
      key: "shared",
      label: `Shared`,
    },
    {
      key: "missing",
      label: `Missing`,
    },
    {
      key: "weak",
      label: `Weak`,
    },
    {
      key: "untapped",
      label: `Untapped`,
    },
    {
      key: "strong",
      label: `Strong`,
    },
  ];

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    localStorage.setItem("keywordsTab", key)
    navigate(`/keywords/details/${key}`)
  };

  const getKeywordDetails = (data: {[key: string]: MergedData}) => {
    let keywordsDetailsArr: MergedData[] = []

    if(activeTab == 'shared'){
      keywordsDetailsArr = getSharedKeywords(keywordsData)
    }
    else if(activeTab == 'missing'){
      keywordsDetailsArr = getMissingKeywords(keywordsData)
    }
    else if(activeTab == 'weak'){
      keywordsDetailsArr = getWeakKeywords(keywordsData)
    }
    else if(activeTab == 'untapped'){
      keywordsDetailsArr = getUntappedKeywords(keywordsData)
    }
    else if(activeTab == 'strong'){
      keywordsDetailsArr = getStrongKeywords(keywordsData)
    }
    else{
      keywordsDetailsArr = getAllKeywords(keywordsData)
    }

    let keywordDetails = getDataSource(keywordsDetailsArr)
    return keywordDetails;
  }

  useEffect(() => {
    let path = location.pathname;
    let tabs = path.split("/");
    setActiveTab(tabs[tabs.length - 1]);

    let keywordDetails = getKeywordDetails(keywordsData)
    setDataSource(keywordDetails);
  }, []);

  useEffect(() => {
    let keywordDetails = getKeywordDetails(keywordsData)
    setDataSource(keywordDetails);
  }, [activeTab]);

  return (
    <>
      <div className="keywords-tabs">
        <Link
          style={{
            margin: "1rem",
            marginLeft: "1.5rem",
            color: "#1677ff",
            textDecoration: "none",
          }}
          to="/keywords"
        >
          Go Back
        </Link>
        <Tabs
          className="details-tab"
          activeKey={activeTab}
          items={tabItems}
          onChange={handleTabChange}
        />
      </div>
      <div className="keywords-details">
        <Table dataSource={dataSource} columns={columns} />
      </div>
    </>
  );
}

export default KeywordsDetails;
