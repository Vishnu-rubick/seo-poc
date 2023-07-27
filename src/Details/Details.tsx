import type { TabsProps } from "antd";
import { Table, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import "./details.css";

import campaignDataRubick from "../../data/getCampaign-rubick.json";
import campaignDataTm from "../../data/getCampaign-tm.json";
import totalIssues from "../../data/issues-category_Mapped.json";

interface TableRow {
  id: number;
  data: string;
}

let issueCategoryMap: any = {}
let key = 0;

totalIssues.forEach((issue: any) => {
  let issueId = issue.id as number;
  key += 1;
  issueCategoryMap[issueId] = {
    issueId: issueId,
    title: issue.title,
    category: issue.category,
    key: key,
  }
})

const onChange = (key: string) => {
  console.log(key);
};

const getData = (type: string, data: any) => {
  let defects = data?.defects as Object;
  if(!defects)  return []
  let allIssues = Object.keys(defects);
  let key = 0;
  if(type != ""){
    let ans = []
    for (const issueId in allIssues){
      console.log(issueId)
      let issue: any = issueCategoryMap[issueId];
      if(!issue || issue.category != type) continue;
      ans.push(issueId);
    }
    allIssues = ans;
  }

  let res = allIssues.map((issue) => {
    let issueId = parseInt(issue) as number;
    return {
      issueId: issue,
      data: issueCategoryMap[issue].title,
      subData: data?.issueReports[issueId]?.data || [],
      key: issueCategoryMap[issue].key,
      category: issueCategoryMap[issue].category
    }
  })
  console.log(type, res, allIssues.length)
  return res;
}

const Details: React.FC = () => {
  const [domain, setDomain] = useState("");
  const [data, setData] = useState<any>();
  // console.log("domain: ", domain)
  // console.log("data: ", getData("", data))
  // console.log("issueCategoryMap: ", issueCategoryMap)

  useEffect(()=>{
    console.log("useEFFECT :)")
    let domain = localStorage.getItem("domain") as string;
    if(!domain){
      localStorage.setItem("domain", 'rubick.ai');
      domain = 'rubick.ai';
    }
    
    if(domain == 'textmercato.com'){
      setData(campaignDataTm)
    }
    else {
      setData(campaignDataRubick)
    }
    setDomain(domain);

  },[])

  const columns = [
    {
      title: "Column 1",
      dataIndex: "data",
      key: "data",
    },
  ];
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
      label: `All`,
      children: (
        <Table
          pagination={false}
          dataSource={getData("", data)}
          columns={columns}
          showHeader={false}
          // expandable={expandableConfig}
        />
      ),
    },
    {
      key: "2",
      label: `Crawlablity Issues`,
      children: <Table pagination={false} showHeader={false} dataSource={getData("crawl", data)} columns={columns} />,
    },
    {
      key: "3",
      label: `Tech Issues`,
      children: <Table pagination={false} showHeader={false} dataSource={getData("tech", data)} columns={columns} />,
    },
    {
      key: "4", 
      label: `Link/Url Issues`,
      children: <Table pagination={false} showHeader={false} dataSource={getData("broken", data)} columns={columns} />,
    },
    {
      key: "4",
      label: `Text/Image Issues`,
      children: <Table pagination={false} showHeader={false} dataSource={getData("markup", data)} columns={columns} />,
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
