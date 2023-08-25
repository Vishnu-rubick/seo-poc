import { Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import HeaderCard from "./header-card/header-card";
import "./issues-details.scss";

interface IssuesDetailsProps {
  projectId: string;
}
type DataSourceType = {
  key: number;
  title: string;
  category: string;
  priority: string;
  pagesAffected: number;
};

function IssuesDetails({ projectId }: IssuesDetailsProps) {
  const dataArray = Array.from({ length: 30 }, (_, index) => ({
    key: index + 1,
    title: `Issue ${index + 1}.This is a sample issue description.`,
    category: index % 2 === 0 ? "text and images" : "url/images",
    priority: "--",
    pagesAffected: Math.floor(Math.random() * 10) + 1,
  }));
  const [dataSource, setDataSource] = useState<any[]>(dataArray);

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/site-audit/campaign/${projectId}/issues`
      )
      .then((response: any) => {
        setDataSource(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(`Couldn't fetch Issues Data...`, err);
      });
  }, []);

  const columns = [
    {
      title: <span style={{ fontWeight: 400 }}>Issue</span>,
      dataIndex: "title",
      key: "1",
      width: 150,
      className: "typography issue-text",
      sorter: (a: DataSourceType, b: DataSourceType) =>
        a.title.localeCompare(b.title),
    },
    {
      title: <span style={{ fontWeight: 400 }}>Category</span>,
      dataIndex: "category",
      width: 100,
      key: "2",
      className: "typography",
      sorter: (a: DataSourceType, b: DataSourceType) =>
        a.category.localeCompare(b.category),
    },
    {
      title: <span style={{ fontWeight: 400 }}>Priority</span>,
      dataIndex: "priority",
      width: 100,
      key: "3",
      className: "typography",
      sorter: (a: DataSourceType, b: DataSourceType) =>
        a.priority.localeCompare(b.priority),
    },
    {
      title: <span style={{ fontWeight: 400 }}>Pages Affected</span>,
      width: 100,
      dataIndex: "pagesAffected",
      key: "4",
      className: "typography",
      sorter: (a: DataSourceType, b: DataSourceType) =>
        a.pagesAffected - b.pagesAffected,
    },
  ];
  return (
    <div className="issues-details-wrapper">
      <div className="cards-container">
        <HeaderCard
          variant="P0"
          value={dataSource.filter((el: any) => el.priority == "P0").length}
        />
        <HeaderCard
          variant="P1"
          value={dataSource.filter((el: any) => el.priority == "P1").length}
        />
        <HeaderCard
          variant="P2"
          value={dataSource.filter((el: any) => el.priority == "P2").length}
        />
      </div>
      {/* <div className="issues-header">
        <p className="issues-title">Issues</p>
      </div> */}
      <Table
        style={{ height: "85vh", overflow: "auto" }}
        className="issues-table"
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        title={() => "Issues"}
        //loading
        showSorterTooltip={false}
      />
    </div>
  );
}

export default IssuesDetails;
