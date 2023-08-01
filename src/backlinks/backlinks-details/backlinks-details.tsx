import { Table } from 'antd';
import React, { useState, useEffect} from 'react'
import BacklinksDetailsData from "../../../backlinks-data/backlinks-details.json"
import { Link } from 'react-router-dom';
import './backlinks-details.css'

function BacklinksDetails() {
   const [dataSource, setDataSource] = useState<any[]>([
     {
       key: "1",
       pageAuthority: 0,
       sourceTitle: 0,
       sourceUrl: 0,
       targetUrl: 0,
       anchorText: 0,
       externalLinks: 0,
       internalLinks: 0,
       noFollow:'',
     },
   ]);
    
   useEffect(()=>{
         const backlinksDetailsArr = BacklinksDetailsData.map((cur) => ({
           key: Date.now(),
           pageAuthority: cur.page_ascore,
           sourceTitle: cur.source_title,
           sourceUrl: cur.source_url,
           targetUrl: cur.target_url,
           anchorText: cur.anchor,
           externalLinks: cur.external_num,
           internalLinks: cur.internal_num,
           noFollow: cur.nofollow.toString(),
         }));

         setDataSource(backlinksDetailsArr);
   },[])
 
  useEffect(()=>{
    console.log(dataSource)
  },[dataSource])


   const columns = [
     {
       title: "Page Authority Score",
       dataIndex: "pageAuthority",
       key: "1",
     },
     {
       title: "Source title",
       dataIndex: "sourceTitle",
       key: "2",
     },
     {
       title: "Source url",
       dataIndex: "sourceUrl",
       key: "3",
     },
     {
       title: "Target url",
       dataIndex: "targetUrl",
       key: "4",
     },
     {
       title: "Anchor Text",
       dataIndex: "anchorText",
       key: "5",
     },
     {
       title: "External links",
       dataIndex: "externalLinks",
       key: "6",
     },
     {
       title: "Internal links",
       dataIndex: "internalLinks",
       key: "7",
     },
     {
       title: "Nofollow",
       dataIndex: "noFollow",
       key: "8",
     },
   ];
  return (
    <div className="backlinks-details">
      <div className='header'>
        <Link
          style={{
            margin: "1rem",
            marginLeft: "1.5rem",
            color: "#1677ff",
            textDecoration: "none",
          }}
          to="/backlinks"
        >
          Go Back
        </Link>
        <p>Backlinks Deatails</p>
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  );
}

export default BacklinksDetails