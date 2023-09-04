import { Table, Alert } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import ArrowDown from "../../assets/common/arrow-down.svg";
import ArrowUp from "../../assets/common/arrow-up.svg";
import "./pages-details.scss";

interface PageDetailsProps {
  projectId? : string;
}
type DataSourceType = {
  key: number;
  pageUrl: string;
  category: string;
  priority: string;
  noOfIssues: number;
  description: string[];
};

function PagesDetails({ projectId }: PageDetailsProps) {
  const dataArray = [
    {
      key: "Loading...",
      pageUrl: "Loading...",
      category: "Loading...",
      priority: "Loading...",
      noOfIssues: "Loading...",
    },
  ];
  const [dataSource, setDataSource] = useState<any[]>(dataArray);
  const [expandedRowKeys, setExpandedRowKeys] = useState<number[]>([]);
  useEffect(() => {
    const projectId = localStorage.getItem("projectId");
    if (projectId) {
      axios
        .get(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/site-audit/campaign/${projectId}/pages?page=0`
        )
        .then((response: any) => {
          const transeformedData = response?.data?.map(
            (item: any) => ({
              pageUrl: item.pageUrl,
              noOfIssues: item.noOfIssues,
              category: item.category[0],
              priority: item.priority[0],
              description: item.issues.map((issue: any) => issue.data.title),
            })
          );
          setDataSource(transeformedData);
        })
        .catch((err) => {
          console.log(`Couldn't fetch Pages Data...`, err);
        });
    }
  }, []);
 
  if(!localStorage.getItem("projectId")){
    return <Alert message="Project id not present." type="error" />
  }
  const rowHeight = 50;
  const columns = [
    {
      title: <span style={{ fontWeight: 400 }}>Issue</span>,
      dataIndex: "pageUrl",
      key: "1",
      width: 150,
      className: "typography",
      sorter: (a: DataSourceType, b: DataSourceType) =>
        a.pageUrl.localeCompare(b.pageUrl),
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
      dataIndex: "noOfIssues",
      key: "4",
      className: "typography pages-affected-text",
      sorter: (a: DataSourceType, b: DataSourceType) =>
        a.noOfIssues - b.noOfIssues,
    },
  ];

  const CustomExpandIcon = ({ expanded, onExpand, record }: any) => {
    if (expanded) {
      return (
        <img
          style={{ cursor: "pointer" }}
          src={ArrowUp}
          onClick={(e) => onExpand(record, e)}
        />
      );
    } else {
      return (
        <img
          style={{ cursor: "pointer" }}
          src={ArrowDown}
          onClick={(e) => onExpand(record, e)}
        />
      );
    }
  };
  return (
    <div className="issues-details-wrapper">
      <Table
        style={{ height: "85vh", overflow: "auto" }}
        className="issues-table"
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        expandable={{
          expandedRowRender: (record) => {
            return (
              <ol>
                {record.description.map((desc, index) => (
                  <li style={{ marginTop: "5px" }} key={index}>
                    {desc}
                  </li>
                ))}
              </ol>
            );
          },
          expandIcon: CustomExpandIcon,
          expandedRowKeys: expandedRowKeys,
          onExpand: (expanded, record) => {
            if (expanded) {
              setExpandedRowKeys([...expandedRowKeys, record.key]);
            } else {
              setExpandedRowKeys(
                expandedRowKeys.filter((key) => key !== record.key)
              );
            }
          },
        }}
        //loading
        title={() => "Audited Analysis"}
        // showSorterTooltip={false}
      />
    </div>
  );
}

export default PagesDetails;
