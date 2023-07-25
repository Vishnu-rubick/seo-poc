import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Table } from "antd";

const issuesDict = require("../issues.json");
const campaignData = require("../testo.json");

function App() {

  const dataSource = [
    {
      rowHeader: '1',
      totalIssues: '20',
      crawlability: '30',
      tech_issues: '40',
      link_issues: '50',
      text_issues: '60'
    },
  ];

  const columns_1 = [
    {
      title: '',
      dataIndex: 'rowHeader',
      key: 'rowHeader',
    },  
    {
      title: 'Total Issues',
      dataIndex: 'total_issues',
      key: 'total_issues',
    },  
    {
      title: 'Crawlability',
      dataIndex: 'crawlability',
      key: 'crawlability',
    },
    {
      title: 'Tech issues',
      dataIndex: 'tech_issues',
      key: 'tech_issues',
    },
    {
      title: 'Link/Url issues',
      dataIndex: 'link_issues',
      key: 'link_issues',
    },
    { 
      title: 'Text/Image issues',
      dataIndex: 'text_issues',
      key: 'text_issues',
    },
  ];
  
  return (
    <>
      <Table dataSource={dataSource} columns={columns_1} pagination={false} />;
    </>
  );
}

export default App;
