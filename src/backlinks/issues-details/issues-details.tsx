import { Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import ArrowDown from "../../assets/common/arrow-down.svg";
import ArrowUp from "../../assets/common/arrow-up.svg";
import HeaderCard from "./header-card/header-card";
import "./issues-details.scss";

interface IssuesDetailsProps {
  projectId?: string;
}
type DataSourceType = {
  key: number;
  title: string;
  category: string;
  priority: string;
  pagesAffected: number;
  description: string[];
};

function IssuesDetails({ projectId }: IssuesDetailsProps) {
  const dataArray = [
    {
      key: 1,
      title: "Loading...",
      category: "Loading...",
      priority: "--",
      pagesAffected: 1,
    },
  ];
  const [dataSource, setDataSource] = useState<any[]>(dataArray);
  const [expandedRowKeys, setExpandedRowKeys] = useState<number[]>([]);
  const addDescription = (dataItem: any) => {
    return new Promise(function (res, rej) {
      axios
        .get(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/site-audit/campaign/${localStorage.getItem("projectId")}/issues/${
            dataItem.id
          }?page=0`
        )
        .then((response) => {
          const descriptions = response.data.map((des: any) => des.source_url);
          res(descriptions);
        })
        .catch(() => {
          rej();
        });
    });
  };

  useEffect(() => {
    const projectId = localStorage.getItem("projectId");
    if (projectId) {
      axios
        .get(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/site-audit/campaign/${projectId}/issues`
        )
        // .then((response: any) => {
        //   const transeformedData = response.data.map(
        //     (dataItem: any, idx: any) => {

        //       addDescription(dataItem).then((response)=>{
        //          console.log(response, "issue des");

        //       })
        //       const des = ["dd", "ddd"];

        //       return {
        //         ...dataItem,
        //         key: idx,
        //         description: des,
        //       };
        //     }
        //   );
        //   setDataSource(transeformedData);
        // })
        .then(async (response: any) => {
          const transformedDataPromises = response.data.map(
            async (dataItem: any, idx: any) => {
              const description = await addDescription(dataItem);

              return {
                ...dataItem,
                key: idx,
                description: description, // Include the description from addDescription
              };
            }
          );

          const transformedData = await Promise.all(transformedDataPromises);

          setDataSource(transformedData);
        })
        .catch((err) => {
          console.log(`Couldn't fetch Issues Data...`, err);
        });
    }
  }, []);
  if (!localStorage.getItem("projectId")) {
    return <div>Project id not present.</div>;
  }
  const columns = [
    {
      title: <span style={{ fontWeight: 400 }}>Issue</span>,
      dataIndex: "title",
      key: "1",
      // width: 150,
      className: "typography issue-text",
      sorter: (a: DataSourceType, b: DataSourceType) =>
        a.title.localeCompare(b.title),
    },
    {
      title: <span style={{ fontWeight: 400 }}>Category</span>,
      dataIndex: "category",
      // width: 100,
      key: "2",
      className: "typography",
      sorter: (a: DataSourceType, b: DataSourceType) =>
        a.category.localeCompare(b.category),
    },
    {
      title: <span style={{ fontWeight: 400 }}>Priority</span>,
      dataIndex: "priority",
      // width: 100,
      key: "3",
      className: "typography",
      sorter: (a: DataSourceType, b: DataSourceType) =>
        a.priority.localeCompare(b.priority),
    },
    {
      title: <span style={{ fontWeight: 400 }}>Pages Affected</span>,
      // width: 100,
      dataIndex: "pagesAffected",
      key: "4",
      className: "typography",
      sorter: (a: DataSourceType, b: DataSourceType) =>
        a.pagesAffected - b.pagesAffected,
    },
  ];
  const CustomExpandIcon = ({ expanded, onExpand, record }: any) => {
    if (expanded) {
      return (
        <img
          style={{ cursor: "pointer" }}
          src={ArrowUp}
          onClick={(e) => onExpand(record, e)}
        />
      );
    } else {
      return (
        <img
          style={{ cursor: "pointer" }}
          src={ArrowDown}
          onClick={(e) => onExpand(record, e)}
        />
      );
    }
  };
  return (
    <div className="issues-details-wrapper">
      <div className="cards-container">
        <HeaderCard
          variant="P0"
          value={dataSource.filter((el: any) => el.priority == "P0").length}
        />
        <HeaderCard
          variant="P1"
          value={dataSource.filter((el: any) => el.priority == "P1").length}
        />
        <HeaderCard
          variant="P2"
          value={dataSource.filter((el: any) => el.priority == "P2").length}
        />
      </div>
      {/* <div className="issues-header">
        <p className="issues-title">Issues</p>
      </div> */}
      <Table
        style={{ height: "85vh", overflow: "auto" }}
        className="issues-table"
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        expandable={{
          expandedRowRender: (record, idx) => {
            return (
              <div style={{maxHeight: '350px', overflowY: 'auto'}}>
                <ol key={idx} style={{ marginLeft: "25px" }}>
                  {record.description.map((desc, index) => (
                    <li style={{ marginTop: "5px" }} key={index}>
                      {desc}
                    </li>
                  ))}
                </ol>
              </div>
            );
          },
          expandIcon: CustomExpandIcon,
          expandedRowKeys: expandedRowKeys,
          onExpand: (expanded, record) => {
            if (expanded) {
              setExpandedRowKeys([...expandedRowKeys, record.key]);
            } else {
              setExpandedRowKeys(
                expandedRowKeys.filter((key) => key !== record.key)
              );
            }
          },
        }}
        title={() => "Issues"}
        //loading
        // showSorterTooltip={false}
      />
    </div>
  );
}

export default IssuesDetails;
