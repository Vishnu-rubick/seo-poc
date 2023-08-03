import { Table } from "antd";
import { useState } from "react";
import  OutboundDomainsData from "../../../backlinks-data/outbound-domains.json"
import { Link } from "react-router-dom";

function OutboundDomains() {
   const [dataSource, setDataSource] = useState<any[]>(OutboundDomainsData);

   const columns = [
     {
       title: "Domain ascore",
       dataIndex: "domain_ascore",
       key: "1",
     },
     {
       title: "Domain",
       dataIndex: "domain",
       key: "2",
     },
     {
       title: "Backlinks",
       dataIndex: "backlinks_num",
       key: "3",
     },
     {
       title: "First Seen",
       dataIndex: "first_seen",
       key: "6",
     },
     {
       title: "Last Seen",
       dataIndex: "last_seen",
       key: "7",
     },
   ];
   return (
     <div>
       <div className="header" style={{ display: "flex"}}>
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
         <p>Outbound Domains Deatails</p>
       </div>
       <Table
         className="issues-table"
         dataSource={dataSource}
         columns={columns}
         pagination={{
           pageSize: 10,
           total: dataSource.length,
         }}
       />
     </div>
   );
}

export default OutboundDomains;
