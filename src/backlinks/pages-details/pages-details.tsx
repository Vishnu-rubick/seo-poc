import { Table } from "antd";
import { useState } from "react";
import "./pages-details.css";


interface PageDetailsProps {
  projectId: string;
}

function PagesDetails({projectId}: PageDetailsProps) {
  const dataArray = Array.from({ length: 30 }, (_, index) => ({
    key: index + 1,
    url: `https://example${index + 1}.com`,
    category: index % 2 === 0 ? "text and images" : "url/images",
    priority: "--",
    noOfPages: Math.floor(Math.random() * 10) + 1,
  }));
  const [dataSource, setDataSource] = useState<any[]>(dataArray);

  const rowHeight = 50;
  const columns = [
    {
      title: <span style={{ fontWeight: 400 }}>Issue</span>,
      dataIndex: "url",
      key: "1",
      width: 150,
      className: "typography",
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
      dataIndex: "noOfPages",
      key: "4",
      className: "typography pages-affected-text",
    },
  ];
  return (
    <div className="issues-details-wrapper">
      <div className="issues-header">
        <p className="issues-title">Audited Pages</p>
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

export default PagesDetails;
