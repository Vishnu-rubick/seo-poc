import { Button, Select, Table } from "antd";
import { ReactNode, useState } from "react";
import campaignData from "../../testo.json";
// import {getCampaign, runAudit} from "../apis/index"

import "./home.css";

const Home: React.FC = (): ReactNode => {
  const [domain,setDomain] = useState('');
  const [data, setData] = useState(campaignData);
  const [projectId, setProjectId] = useState('');
  const totalIssues =
    data["errors"] + data["warnings"] + data["notices"];
  const crawlability =
    data["current_snapshot"]["thematicScores"]["crawlability"]["value"];

  const dataSource = [
    {
      key: "1",
      rowHeader: "All Issues",
      totalIssues: totalIssues,
      crawlability: crawlability,
      techIssues: "40",
      linkIssues: "50",
      textIssues: "60",
    },
  ];

  const view_1 = [
    {
      title: "",
      dataIndex: "rowHeader",
      key: "1",
    },
    {
      title: "Total Issues",
      dataIndex: "totalIssues",
      key: "2",
    },
    {
      title: "Crawlability",
      dataIndex: "crawlability",
      key: "3",
    },
    {
      title: "Tech issues",
      dataIndex: "techIssues",
      key: "4",
    },
    {
      title: "Link/Url issues",
      dataIndex: "linkIssues",
      key: "5",
    },
    {
      title: "Text/Image issues",
      dataIndex: "textIssues",
      key: "6",
    },
  ];

  const pagesAudited = data["pages_crawled"];
  const pagesWithIssues = data["haveIssues"];
  const notCrawlable = data["blocked"];
  const brokenOrRedirects = data["broken"] + data["redirected"];
  const healthyPages = data["healthy"];

  const view_2_dataSource = [
    {
      key: "1",
      rowHeader: "All Pages",
      pagesAudited: pagesAudited,
      pagesWithIssues: pagesWithIssues,
      notCrawlable: notCrawlable,
      brokenOrRedirects: brokenOrRedirects,
      healthyPages: healthyPages,
    },
  ];

  const view_2 = [
    {
      title: "",
      dataIndex: "rowHeader",
      key: "1",
    },
    {
      title: "Pages Audited",
      dataIndex: "pagesAudited",
      key: "2",
    },
    {
      title: "Pages with issus",
      dataIndex: "pagesWithIssues",
      key: "3",
    },
    {
      title: "Not Crawlable",
      dataIndex: "notCrawlable",
      key: "4",
    },
    {
      title: "Broken/Redirects",
      dataIndex: "brokenOrRedirects",
      key: "5",
    },
    {
      title: "Healthy Pages",
      dataIndex: "healthyPages",
      key: "6",
    },
  ];
  
  // const handleValidateClick = () => {
  //   if(projectId){
  //     runAudit(projectId);
  //   }   
  // };

  const handleRefetchClick = async() => {
      
  };
  interface selectProp{
     key:  string,
     value: string

  }
  const handleSelect = (selectedValue: string, e: selectProp)=>{
     setDomain(e.value);
     setProjectId(e.key);
  }

  return (
    <>
      <div className="input-conatiner">
        <Select
          onSelect={handleSelect}
          className="select-wrapper"
          placeholder="Select domain"
        >
          <Select.Option key={12793985} value="textmercato.com">
            textmercato.com
          </Select.Option>
          <Select.Option key={12808182} value="rubick.ai">
            rubick.ai
          </Select.Option>
        </Select>
        {/* <Button onClick={handleValidateClick}>Validate</Button> */}
        <Button onClick={handleRefetchClick}>Refetch</Button>
      </div>
      <hr />
      <div className="table-container">
        <div>
          <div className="issues-wrapper">
            <p>Report By Issues</p>
            <Table
              className="issues-table"
              dataSource={dataSource}
              columns={view_1}
              pagination={false}
            />
          </div>
          <div className="pages-wrapper">
            <p>Report By Pages</p>
            <Table
              className="pages-table"
              dataSource={view_2_dataSource}
              columns={view_2}
              pagination={false}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
