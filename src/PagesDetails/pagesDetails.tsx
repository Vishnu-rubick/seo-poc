import type { TabsProps } from "antd";
import { Table, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import "../Details/details.css";

interface TableRow {
  id: number;
  data: string;
}

const onChange = (key: string) => {
  console.log(key);
};

const PagesDetails: React.FC = () => {
  const [allData, setAllData] = useState<TableRow[]>([
    { id: 1, data: "Row 1" },
    { id: 2, data: "Row 2" },
    { id: 3, data: "Row 3" },
    // Add more rows as needed
  ]);

  const columns = [
    {
      title: "Column 1",
      dataIndex: "data",
      key: "data",
    },
  ];
  useEffect(() => {
    console.log("domain is", localStorage.getItem("domain"));
  }, []);

  //  const expandableConfig = {
  //    expandedRowRender: (record: TableRow) => (
  //      // Replace this with the content you want to display in the expanded row.
  //      // For example, you can return another table or any custom content.
  //      <p>{record.data} - Details</p>
  //    ),
  //    rowExpandable: () => true, // Make all rows expandable
  //  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Pages Audited`,
      children: (
        <Table
          pagination={false}
          dataSource={allData}
          columns={columns}
          showHeader={false}
          // expandable={expandableConfig}
        />
      ),
    },
    {
      key: "2",
      label: `Pages with issues`,
      children: <Table pagination={false} showHeader={false} />,
    },
    {
      key: "3",
      label: `Not Crawlable`,
      children: <Table pagination={false} showHeader={false} />,
    },
    {
      key: "4",
      label: `Broken/Redirects`,
      children: <Table pagination={false} showHeader={false} />,
    },
    {
      key: "5",
      label: `Healthy Pages`,
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

export default PagesDetails;
