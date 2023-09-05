import { Button, Select, Table } from "antd";
import { ReactNode, useEffect, useState } from "react";
import campaignDataRubick from "../../data/getCampaign-rubick.json";
import campaignDataTm from "../../data/getCampaign-tm.json";
import issueCategoryMap from "../../data/issues-category_Mapped.json";
// import {getCampaign, runAudit} from "../apis/index"

import { Link, Outlet } from "react-router-dom";
import "./style.css";
interface SiteAuditProps {}
const SiteAudit: React.FC<SiteAuditProps> = () => {
  const [domain, setDomain] = useState<string>();
  const [data, setData] = useState<any>();
  const [dataSourceOne, setDataSourceOne] = useState<any[]>([
    {
      key: "1",
      rowHeader: "All Issues",
      totalIssues: 0,
      crawlability: 0,
      techIssues: 0,
      linkIssues: 0,
      textIssues: 0,
    },
  ]);
  const [dataSourceTwo, setDataSourceTwo] = useState<any[]>([
    {
      key: "1",
      rowHeader: "All Issues",
      pagesAudited: 0,
      pagesWithIssues: 0,
      notCrawlable: 0,
      brokenOrRedirects: 0,
      healthyPages: 0,
    },
  ]);
  const [projectId, setProjectId] = useState("");

  const getIssueCount = (data: any) => {
    const issueFreq = data?.defects;

    let res: any = {
      tech: 0,
      crawl: 0,
      broken: 0,
      markup: 0,
    };

    for (const key in issueFreq) {
      const idx = issueCategoryMap.find((issue) => issue.id == parseInt(key));
      if (idx == undefined) continue;

      res[idx["category"]] += issueFreq[key];
    }

    setDataSourceOne([
      {
        key: "1",
        rowHeader: "All Issues",
        totalIssues: data?.errors + data?.warnings + data?.notices || 0,
        crawlability: res.crawl,
        techIssues: res.tech,
        linkIssues: res.broken,
        textIssues: res.markup,
      },
    ]);
  };

  useEffect(() => {
    setDomain("rubick.ai");
    localStorage.setItem("domain", "rubick.ai");
    setData(campaignDataRubick);
    getIssueCount(data);
    setDataSourceTwo([
      {
        key: "1",
        rowHeader: "All Pages",
        pagesAudited: data?.pages_crawled || 0,
        pagesWithIssues: data?.haveIssues || 0,
        notCrawlable: data?.blocked || 0,
        brokenOrRedirects: data?.broken + data?.redirected || 0,
        healthyPages: data?.healthy || 0,
      },
    ]);
  }, []);

  useEffect(() => {
    getIssueCount(data);
    setDataSourceTwo([
      {
        key: "1",
        rowHeader: "All Pages",
        pagesAudited: data?.pages_crawled || 0,
        pagesWithIssues: data?.haveIssues || 0,
        notCrawlable: data?.blocked || 0,
        brokenOrRedirects: data?.broken + data?.redirected || 0,
        healthyPages: data?.healthy || 0,
      },
    ]);
  }, [data]);

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
      render: (text: string, record: any) => (
        <Link className="hyperLink" to={`/site-audit/details/issues/1`}>
          {text}
        </Link>
      ),
    },
    {
      title: "Crawlability",
      dataIndex: "crawlability",
      key: "3",
      render: (text: string, record: any) => (
        <Link className="hyperLink" to={`/site-audit/details/issues/2`}>
          {text}
        </Link>
      ),
    },
    {
      title: "Tech issues",
      dataIndex: "techIssues",
      key: "4",
      render: (text: string, record: any) => (
        <Link className="hyperLink" to={`/site-audit/details/issues/3`}>
          {text}
        </Link>
      ),
    },
    {
      title: "Link/Url issues",
      dataIndex: "linkIssues",
      key: "5",
      render: (text: string, record: any) => (
        <Link className="hyperLink" to={`/site-audit/details/issues/4`}>
          {text}
        </Link>
      ),
    },

    {
      title: "Text/Image issues",
      dataIndex: "textIssues",
      key: "6",
      render: (text: string, record: any) => (
        <Link className="hyperLink" to={`/site-audit/details/issues/5`}>
          {text}
        </Link>
      ),
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
      // render: (text: string, record: any) => (
      //   <Link to={`/site-audit/details/pages`}>{text}</Link>
      // ),
    },
    {
      title: "Pages with issues",
      dataIndex: "pagesWithIssues",
      key: "3",
      render: (text: string, record: any) => (
        <Link className="hyperLink" to={`details/pages`}>
          {text}
        </Link>
      ),
    },
    {
      title: "Not Crawlable",
      dataIndex: "notCrawlable",
      key: "4",
      // render: (text: string, record: any) => (
      //   <Link to={`/site-audit/details/pages`}>{text}</Link>
      // ),
    },
    {
      title: "Broken/Redirects",
      dataIndex: "brokenOrRedirects",
      key: "5",
      // render: (text: string, record: any) => (
      //   <Link to={`/site-audit/details/pages`}>{text}</Link>
      // ),
    },
    {
      title: "Healthy Pages",
      dataIndex: "healthyPages",
      key: "6",
      // render: (text: string, record: any) => (
      //   <Link to={`/site-audit/details/pages`}>{text}</Link>
      // ),
    },
  ];

  const handleRefetchClick = async () => {
    if (domain == "textmercato.com") {
      setData(campaignDataTm);
      localStorage.setItem("domain", "textmercato.com");
    } else if (domain == "rubick.ai") {
      setData(campaignDataRubick);
      localStorage.setItem("domain", "rubick.ai");
    }
  };
  interface selectProp {
    key: string;
    value: string;
  }
  const handleSelect = (selectedValue: string, e: selectProp) => {
    setDomain(e.value);
    setProjectId(e.key);
  };
  return (
    <>
      <div className="home-container">
        <div className="input-conatiner">
          <Select
            onSelect={handleSelect}
            className="select-wrapper"
            placeholder="Select domain"
            value={domain}
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
                dataSource={dataSourceOne}
                // onRow={() => ({
                //   onClick: () => {
                //     window.location.href = `/site-audit/details/issues`;
                //   },
                // })}
                columns={view_1}
                pagination={false}
              />
            </div>
            <div className="pages-wrapper">
              <p>Report By Pages</p>
              <Table
                // onRow={() => ({
                //   onClick: () => {
                //     window.location.href = `/site-audit/details/pages`;
                //   },
                // })}
                className="pages-table"
                dataSource={dataSourceTwo}
                columns={view_2}
                pagination={false}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SiteAudit;
