import { Button, Input, Table } from "antd";
import campaignData from "../../testo.json";
import { ReactNode } from "react";
import "./home.css"

const Home: React.FC = (): ReactNode => {
  const totalIssues =
    campaignData["errors"] + campaignData["warnings"] + campaignData["notices"];
  const crawlability =
    campaignData["current_snapshot"]["thematicScores"]["crawlability"]["value"];

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

  const pagesAudited = campaignData["pages_crawled"];
  const pagesWithIssues = campaignData["haveIssues"];
  const notCrawlable = campaignData["blocked"];
  const brokenOrRedirects = campaignData["broken"] + campaignData["redirected"];
  const healthyPages = campaignData["healthy"];

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

  return (
    <>
      <div className="input-conatiner">
        <Input
          className="domain-input"
          placeholder="Please enter domain name"
        />
        <Input className="limit-input" placeholder="Enter page limit" />
        <Button>Validating ...</Button>
        <Button>Refetech</Button>
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