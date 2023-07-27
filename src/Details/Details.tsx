import type { TabsProps } from "antd";
import { Table, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import "./details.css";

interface TableRow {
  id: number;
  data: string;
}

const onChange = (key: string) => {
  console.log(key);
};

const Details: React.FC = () => {
  const [allData, setAllData] = useState<TableRow[]>([
    { id: 1, data: "Row 1" },
    { id: 2, data: "Row 2" },
    { id: 3, data: "Row 3" },
    // Add more rows as needed
  ]);
  
  useEffect(()=>{
    console.log('domain is',localStorage.getItem("domain"));
  },[])
  const columns = [
    {
      title: "Column 1",
      dataIndex: "data",
      key: "data",
    },
  ];

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `All`,
      children: (
        <Table
          pagination={false}
          dataSource={allData}
          columns={columns}
          showHeader={false}
        />
      ),
    },
    {
      key: "2",
      label: `Errors`,
      children: <Table pagination={false} showHeader={false} />,
    },
    {
      key: "3",
      label: `Warnings`,
      children: <Table pagination={false} showHeader={false} />,
    },
    {
      key: "4",
      label: `Notices`,
      children: <Table pagination={false} showHeader={false} />,
    },
  ];
  return (
    <Tabs
      className="details-tab"
      defaultActiveKey="1"
      items={items}
      onChange={onChange}
    />
  );
};

export default Details;
