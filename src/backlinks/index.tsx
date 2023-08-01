import { Table } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import backlinksOverview from "../../backlinks-data/backlinks-overview.json";
import "./backlinks.css";

const Backlinks: React.FC = () => {
  const [dataSource, setDataSource] = useState<any[]>([
    {
      key: "1",
      rowHeader: "Total",
      backlinks: backlinksOverview[0].total,
      referringDomains: backlinksOverview[0].domains_num,
      monthlyVisits: 0,
      organicTraffic: 0,
      outboundDomains: 0,
    },
  ]);
  const columns = [
    {
      title: "",
      dataIndex: "rowHeader",
      key: "1",
    },
    {
      title: "Backlinks",
      dataIndex: "backlinks",
      key: "2",
      render: (text: string, record: any) => <Link to={`details`}>{text}</Link>,
    },
    {
      title: "Referring Domains",
      dataIndex: "referringDomains",
      key: "3",
      render: (text: string, record: any) => (
        <Link to={`/referring-domains/details`}>{text}</Link>
      ),
    },
    {
      title: "Monthly Visits",
      dataIndex: "monthlyVisits",
      key: "4",
    },
    {
      title: "Organic Traffic",
      dataIndex: "organicTraffic",
      key: "5",
    },
    {
      title: "Outbound Domains",
      dataIndex: "outboundDomains",
      key: "6",
    },
  ];
  return (
    <div className="backlinks-dashboard">
      <div>
        <p>Backlink Analysis Report</p>
        <Table
          // className="issues-table"
          dataSource={dataSource}
          columns={columns}
          pagination={false}
        />
      </div>
    </div>
  );
};

export default Backlinks;
