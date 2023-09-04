import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import axios from "axios";
import { useEffect, useState } from "react";
import ArrowDown from "../../assets/common/arrow-down.svg";
import ArrowUp from "../../assets/common/arrow-up.svg";
import "./custom-table.scss";

type DataType = {
  key: number;
  description: string[];
  pageURL: string;
  totalIssues: string;
};

const columns: ColumnsType<DataType> = [
  {
    title: "Page URL",
    dataIndex: "pageURL",
    key: "pageUrl",
    sorter: (a, b) => a.pageURL.localeCompare(b.pageURL),
  },
  {
    title: "Total Issues",
    dataIndex: "totalIssues",
    key: "totalIssues",
    sorter: (a, b) => a.totalIssues.localeCompare(b.totalIssues),
  },
];
const data: DataType[] = [
  {
    key: 1,
    pageURL: "",
    totalIssues: "",
    description: [""],
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

const CustomTable = () => {
  const [dataSource, setDataSource] = useState(data);
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
          const transeformedData = response?.data?.map((item: any) => ({
            pageURL: item.pageUrl,
            totalIssues: item.noOfIssues,
            description: item.issues.map((issue: any) => issue.data.title),
          }));
          setDataSource(transeformedData);
        })
        .catch((err) => {
          console.log(`Couldn't fetch Pages Data...`, err);
        });
    }
  }, []);

  return (
    <Table
      className="custom-Table"
      columns={columns}
      // showSorterTooltip={false}
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
      dataSource={dataSource}
      pagination={false}
    />
  );
};

export default CustomTable;
