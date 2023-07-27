import type { TabsProps } from "antd";
import { Button, Table, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import "../Details/details.css";

import campaignDataRubick from "../../data/getCampaign-rubick.json";
import campaignDataTm from "../../data/getCampaign-tm.json";
import totalIssues from "../../data/issues-category_Mapped.json";
import { appendFileSync } from "fs";
import { Link } from "react-router-dom";

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
  if(!data || !(data.issueReports)) return [];
  let reports = data.issueReports;
  let res = [], ans = {} as any;

  for(const issueId in reports){
    for (const rep in reports[issueId].data){
      let obj = reports[issueId].data[rep] as any
      console.log(issueCategoryMap[issueId].category, type, issueCategoryMap[issueId].category==type)
      if(type != "" && issueCategoryMap[issueId].category != type)  continue;
      if(!ans.hasOwnProperty(obj.source_url)) ans[obj.source_url] = []
      let issueReport = {
        ...obj,
        data: issueCategoryMap[issueId].title,
        key: issueCategoryMap[issueId].key
      }
      ans[obj.source_url].push(issueReport)
    }
  }

  for (const key in ans){
    res.push({
      data: key,
      subData: ans[key]
    }); 
  }

  return res;
}

const PagesDetails: React.FC = () => {
  const [domain, setDomain] = useState("");
  const [data, setData] = useState<any>();

  // console.log("data: ", getData("", data))
  // console.log("issueCategoryMap: ", issueCategoryMap)

  const columns = [
    {
      title: "Column 1",
      dataIndex: "data",
      key: "data",
    },
  ];

  useEffect(()=>{
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

   const expandableConfig = {
     expandedRowRender: (record: any) => {
        let ans = {} as any;

        record.subData.forEach((row: any) => {
          let url = record.data as string;
          if(!ans.hasOwnProperty(url))  ans[url] = {
            url: url,
            data: row.data,
            count: 0
          };

          ans[url].count++;
        })

        let res = [] as any[];

        const arrayOfObjects = Object.values(ans).map((obj) => obj);
        console.log(ans)        
        return arrayOfObjects.map((row: any) => {
          return (
            <p>{row.data} occured {row.count} times</p>
          )
        })
      //   // Replace this with the content you want to display in the expanded row.
      //   // For example, you can return another table or any custom content.
      //   <p>{record.subData.title} - Details</p>
      // )
     },
     rowExpandable: () => true, // Make all rows expandable
   };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Pages with Issues`,
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
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
      />
    </div>
  );
};

export default PagesDetails;
