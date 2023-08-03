import { Table } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
// import backlinksOverview from "../../backlinks-data/backlinks-overview.json";
import referringDomainsData from "../../backlinks-data/referring-domains.json";
import backlinksList from "../../backlinks-data/backlinks-details.json";
import outboundDomainsData from "../../backlinks-data/outbound-domains.json"

import "./backlinks.css";

const Backlinks: React.FC = () => {
  const [dataSource, setDataSource] = useState<any[]>([
    {
      key: "1",
      rowHeader: "Total",
      backlinks: backlinksList.length,
      referringDomains: referringDomainsData.length,
      monthlyVisits: 0,
      organicTraffic: 0,
      outboundDomains: outboundDomainsData.length,
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
      render: (text: string, record: any) => <Link className="hyperLink" to={`details`}>{text}</Link>,
    },
    {
      title: "Referring Domains",
      dataIndex: "referringDomains",
      key: "3",
      render: (text: string, record: any) => (
        <Link className="hyperLink" to={`/referring-domains/details`}>{text}</Link>
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
      render: (text: string, record: any) => (
        <Link className="hyperLink" to={`/outbound-domains/details`}>{text}</Link>
      ),
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
