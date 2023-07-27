import type { TabsProps } from "antd";
import { Table, Tabs } from "antd";
import React, { ReactPropTypes, useEffect, useState } from "react";
import "./details.css";

import campaignDataRubick from "../../data/getCampaign-rubick.json";
import campaignDataTm from "../../data/getCampaign-tm.json";
import totalIssues from "../../data/issues-category_Mapped.json";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

interface TableRow {
  id: number;
  data: string;
}

let issueCategoryMap: any = {};
let key = 0;

totalIssues.forEach((issue: any) => {
  let issueId = issue.id as number;
  key += 1;
  

  issueCategoryMap[issueId] = {
    issueId: issueId,
    title: issue.title,
    category: issue.category,
    key: key,
  };
});

const getData = (type: string, data: any) => {
  let defects = data?.defects as Object;
  if (!defects) return [];
  let allIssues = Object.keys(defects);
  let key = 0;
  if (type != "") {
    let ans = [];
    for (const issueId in allIssues) {
      let issue: any = issueCategoryMap[issueId];
      if (!issue || issue.category != type) continue;
      ans.push(issueId);
    }
    allIssues = ans;
  }

  let snapshot = data.current_snapshot;
  const issueType = {} as any
  
  snapshot.errors.forEach((obj: any) => {
    let id = obj.id as string;
    issueType[id] = 'Error';
  })
  snapshot.warnings.forEach((obj: any) => {
    let id = obj.id as string;
    issueType[id] = 'Warning';
  })
  snapshot.notices.forEach((obj: any) => {
    let id = obj.id as string;
    issueType[id] = 'Notice';
  })

  let res = allIssues.map((issue) => {
    let issueId = parseInt(issue) as number;

    

    return {
      issueId: issue,
      data: issueCategoryMap[issue].title + " --" + issueType[issue],
      subData: data?.issueReports[issueId]?.data || [],
      key: issueCategoryMap[issue].key,
      category: issueCategoryMap[issue].category,
      type: issueType[issue]
    };
  });
  return res;
};

const Details: React.FC = (props: any) => {
  const [domain, setDomain] = useState("");
  const [activeTab, setActiveTab] = useState<string>("1");
  const [data, setData] = useState<any>();
  const location = useLocation();
  const navigate = useNavigate();
  // console.log("domain: ", domain)
  // console.log("data: ", getData("", data))
  // console.log("issueCategoryMap: ", issueCategoryMap)

  useEffect(() => {
    let domain = localStorage.getItem("domain") as string;
    if (!domain) {
      localStorage.setItem("domain", "rubick.ai");
      domain = "rubick.ai";
    }

    if (domain == "textmercato.com") {
      setData(campaignDataTm);
    } else {
      setData(campaignDataRubick);
    }
    setDomain(domain);

    let path = location.pathname;
    let tabs = path.split("/");
    setActiveTab(tabs[tabs.length - 1]);
  }, []);

  const onChange = (key: string) => {
    setActiveTab(key);
    navigate(`/details/issues/${key}`)
  };

  const columns = [
    {
      title: "Column 1",
      dataIndex: "data",
      key: "data",
    },
  ];
   const expandableConfig = {
     expandedRowRender: (record: any) => {
      console.log(record)
      let ans = {} as any;

      record.subData.forEach((row: any) => {
        let url = row.source_url as string;
        if(!ans.hasOwnProperty(url))  ans[url] = {
          data: url,
          count: 0
        };

        ans[url].count++;
      })

      let res = [] as any[];

      const arrayOfObjects = Object.values(ans).map((obj) => obj);
      return arrayOfObjects.map((row: any) => {
        return (
          <div style={{display: "flex", justifyContent: "space-between"}}>
            <p >{row.data}</p>
            <p >{row.count} times</p>
          </div>
        )
      })
     },
     rowExpandable: () => true, // Make all rows expandable
   };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `All`,
      children: (
        <Table
          pagination={false}
          dataSource={getData("", data)}
          columns={columns}
          showHeader={false}
          expandable={expandableConfig}
        />
      ),
    },
    {
      key: "2",
      label: `Crawlablity Issues`,
      children: (
        <Table
          pagination={false}
          showHeader={false}
          dataSource={getData("crawl", data)}
          columns={columns}
          expandable={expandableConfig}
        />
      ),
    },
    {
      key: "3",
      label: `Tech Issues`,
      children: (
        <Table
          pagination={false}
          showHeader={false}
          dataSource={getData("tech", data)}
          columns={columns}
          expandable={expandableConfig}
        />
      ),
    },
    {
      key: "4",
      label: `Link/Url Issues`,
      children: (
        <Table
          pagination={false}
          showHeader={false}
          dataSource={getData("broken", data)}
          columns={columns}
          expandable={expandableConfig}
        />
      ),
    },
    {
      key: "5",
      label: `Text/Image Issues`,
      children: (
        <Table
          pagination={false}
          showHeader={false}
          dataSource={getData("markup", data)}
          columns={columns}
          expandable={expandableConfig}
        />
      ),
    },
  ];
  return (
    <div className="details-wrapper">
      <Link
        style={{
          margin: "1.5rem",
          marginLeft: "1.5rem",
          color: "#1677ff",
          textDecoration: "none",
        }}
        to="/"
      >
        Go back
      </Link>
    <Tabs
      className="details-tab"
      activeKey={activeTab}
      items={items}
      onChange={onChange}
    />
    </div>
  );
};

export default Details;
