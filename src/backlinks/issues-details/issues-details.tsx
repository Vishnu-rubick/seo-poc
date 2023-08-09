import { Table } from "antd";
import { useState } from "react";
import "./issues-details.css";
import HeaderCard from "./header-card/header-card";

function IssuesDetails() {
  const dataArray = Array.from({ length: 30 }, (_, index) => ({
    key: index + 1,
    issue: `Issue ${index + 1}.This is a sample issue description.`,
    category: index % 2 === 0 ? "text and images" : "url/images",
    priority: "--",
    pagesAffected: Math.floor(Math.random() * 10) + 1,
  }));
  const [dataSource, setDataSource] = useState<any[]>(dataArray);

  const rowHeight = 50;
  const columns = [
    {
      title: <span style={{ fontWeight: 400 }}>Issue</span>,
      dataIndex: "issue",
      key: "1",
      width: 150,
      className: "typography issue-text",
    },
    {
      title: <span style={{ fontWeight: 400 }}>Category</span>,
      dataIndex: "category",
      width: 100,
      key: "2",
      className: "typography",
    },
    {
      title: <span style={{ fontWeight: 400 }}>Priority</span>,
      dataIndex: "priority",
      width: 100,
      key: "3",
      className: "typography",
    },
    {
      title: <span style={{ fontWeight: 400 }}>Pages Affected</span>,
      width: 100,
      dataIndex: "pagesAffected",
      key: "4",
      className: "typography",
    },
  ];
  return (
    <div className="issues-details-wrapper">
      <div className="cards-container">
        <HeaderCard variant="p0"/>
        <HeaderCard variant="p1"/>
        <HeaderCard variant="p2"/>
        
      </div>
      <div className="issues-header">
        <p className="issues-title">Issues</p>
      </div>
      <Table
        style={{ height: "85vh", overflow: "auto" }}
        className="issues-table"
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        //loading
      />
    </div>
  );
}

export default IssuesDetails;
