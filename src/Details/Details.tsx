import React from "react";
import { Tabs, Table } from "antd";
import type { TabsProps } from "antd";
import './details.css';

const onChange = (key: string) => {
  console.log(key);
};

const Details: React.FC = () => {
  const data = [
    "Row 1",
    "Row 2",
    "Row 3",
    "Row 4",
  ];
  const columns = [
    {
      dataIndex: "data",
      key: "data",
      render: () => <span>2 issue with duplicate tag</span>,
    },
  ];
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `All`,
      children: (
        <Table
          pagination={false}
          dataSource={data.map((item, index) => ({ key: index, data: item }))}
          columns={columns}
        />
      ),
    },
    {
      key: "2",
      label: `Errors`,
      children: (
        <Table
          pagination={false}
          dataSource={data.map((item, index) => ({ key: index, data: item }))}
          columns={columns}
        />
      ),
    },
    {
      key: "3",
      label: `Warnings`,
      children: (
        <Table
          pagination={false}
          dataSource={data.map((item, index) => ({ key: index, data: item }))}
          columns={columns}
        />
      ),
    },
    {
      key: "4",
      label: `Notices`,
      children: (
        <Table
          pagination={false}
          dataSource={data.map((item, index) => ({ key: index, data: item }))}
          columns={columns}
        />
      ),
    },
  ];
  return <Tabs className="details-tab" defaultActiveKey="1" items={items} onChange={onChange} />;
}

export default Details;
