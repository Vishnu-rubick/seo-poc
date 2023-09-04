import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import ArrowDown from "../../assets/common/arrow-down.svg";
import ArrowUp from "../../assets/common/arrow-up.svg";
import "./custom-table.scss";

type DataType = {
  key: number;
  description: string;
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
    pageURL: "https://www.textmercato.com/homepage/",
    totalIssues: "27",
    description: "issue-1",
  },
  {
    key: 2,
    pageURL:
      "https://rubick.ai/product/product-information-management/?data-sourcing",
    totalIssues: "20",
    description: "issue-2",
  },
  {
    key: 3,
    pageURL: "https://rubick.ai/blog-post/",
    totalIssues: "36",
    description: "issue-3",
  },
  {
    key: 4,
    pageURL: "https://rubick.ai/products/pim-solutions/",
    totalIssues: "87",
    description: "issue-4",
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

const CustomTable: React.FC = () => (
  <Table
    className="custom-Table"
    columns={columns}
    // showSorterTooltip={false}
    expandable={{
      expandedRowRender: (record) => (
        <p style={{ margin: 0 }}>{record.description}</p>
      ),
      expandIcon: CustomExpandIcon,
    }}
    dataSource={data}
    pagination={false}
  />
);

export default CustomTable;
// import React, { useState } from "react";
// import { Table } from "antd";

// interface Item {
//   key: number;
//   name: string;
//   descriptions: string[];
// }

// interface ExpandableRowProps {
//   descriptions: string[];
// }

// const ExpandableRow: React.FC<ExpandableRowProps> = ({ descriptions }) => (
//   <ul>
//     {descriptions.map((desc, index) => (
//       <li key={index}>{desc}</li>
//     ))}
//   </ul>
// );

// const CustomTable: React.FC = () => {
//   const [expandedRowKeys, setExpandedRowKeys] = useState<number[]>([]);

//   const handleRowExpand = (expanded: boolean, record: Item) => {
//     if (expanded) {
//       setExpandedRowKeys([...expandedRowKeys, record.key]);
//     } else {
//       setExpandedRowKeys(expandedRowKeys.filter((key) => key !== record.key));
//     }
//   };

//   const expandedRowRender = (record: Item) => (
//     <ExpandableRow descriptions={record.descriptions} />
//   );

//   const columns = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//     },
//   ];

//   const data: Item[] = [
//     {
//       key: 1,
//       name: "Item 1",
//       descriptions: ["Description 1a", "Description 1b"],
//     },
//     {
//       key: 2,
//       name: "Item 2",
//       descriptions: ["Description 2a", "Description 2b", "Description 2c"],
//     },
//     // ... other data
//   ];

//   return (
//     <Table
//       dataSource={data}
//       columns={columns}
//       expandable={{
//         expandedRowRender,
//         expandedRowKeys,
//         onExpand: handleRowExpand,
//       }}
//     />
//   );
// };

// export default CustomTable;
