import { Table, Row } from "antd";
import React, { useState } from "react";
import "./keywords.scss";
import KeywordsData from "../../data/keywords/keyordsMerged.json";
import {
  getAllKeywords,
  getSharedKeywords,
  MergedData,
  getMissingKeywords,
  getWeakKeywords,
  getUntappedKeywords,
  getStrongKeywords
} from "../apis/index";
import { Link } from "react-router-dom";
import AppHeader from "../components/app-header/app-header";
import DomainSubheader from "../components/domain-subheader/domain-subheader";

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
        <Link className="hyperLink" to={`/keywords/details/all`}>{text}</Link>
      ),
    },
    {
      key: "3",
      title: "Shared Keywords",
      dataIndex: "sharedKeywords",
      render: (text: string, record: any) => (
        <Link className="hyperLink" to={`/keywords/details/shared`}>{text}</Link>
      ),
    },
    {
      key: "4",
      title: "Missing Keywords",
      dataIndex: "missingKeywords",
      render: (text: string, record: any) => (
        <Link className="hyperLink" to={`/keywords/details/missing`}>{text}</Link>
      ),
    },
    {
      key: "5",
      title: "Weak Keywords",
      dataIndex: "weakKeywords",
      render: (text: string, record: any) => (
        <Link className="hyperLink" to={`/keywords/details/weak`}>{text}</Link>
      ),
    },
    {
      key: "6",
      title: "Untapped Keywords",
      dataIndex: "untappedKeywords",
      render: (text: string, record: any) => (
        <Link className="hyperLink" to={`/keywords/details/untapped`}>{text}</Link>
      ),
    },
    {
      key: "7",
      title: "Strong Keywords",
      dataIndex: "strongKeywords",
      render: (text: string, record: any) => (
        <Link className="hyperLink" to={`/keywords/details/strong`}>{text}</Link>
      ),
    },
  ];

  return (
    <div className="keywords-dashboard">
      <AppHeader />
      <Row className="domain-header-row">
        <DomainSubheader />
      </Row>

      {/* <Table dataSource={dataSource} columns={columns} pagination={false} /> */}
    </div>
  );
};

export default Keywords;
