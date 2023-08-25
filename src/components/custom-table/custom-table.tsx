import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import ArrowDown from "../../assets/common/arrow-down.svg";
import ArrowUp from "../../assets/common/arrow-up.svg";
import "./custom-table.scss";

type DataType = {
  key: number;
  name: string;
  age: number;
  address: string;
  description: string;
};

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    sorter: (a, b) => a.address.localeCompare(b.address),
  },
  {
    title: "Action",
    dataIndex: "",
    key: "x",
    render: () => <a>Delete</a>,
  },
];
const data: DataType[] = [
  {
    key: 1,
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    description:
      "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
  },
  {
    key: 2,
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    description:
      "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
  },
  {
    key: 3,
    name: "Not Expandable",
    age: 29,
    address: "Jiangsu No. 1 Lake Park",
    description: "This not expandable",
  },
  {
    key: 4,
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    description:
      "My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.",
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
    showSorterTooltip={false}
    expandable={{
      expandedRowRender: (record) => (
        <p style={{ margin: 0 }}>{record.description}</p>
      ),
      rowExpandable: (record) => record.name !== "Not Expandable",
      expandIcon: CustomExpandIcon,
    }}
    dataSource={data}
    pagination={false}
  />
);

export default CustomTable;
