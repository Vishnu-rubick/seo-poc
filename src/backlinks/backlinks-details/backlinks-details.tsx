import { Breadcrumb, Tabs, TabsProps } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import BacklinksDetailsData from "../../../backlinks-data/backlinks-details.json";
import BreadcrumbArrow from "../../assets/keywords/breadcrumb-arrow.svg";
import AppHeader from "../../components/app-header/app-header";
import TableComponent from "../../components/table-component/table-component";
import "./backlinks-details.scss";

type DataType = {
  key: number;
  pageAuthority: number;
  sourceTitle: string;
  sourceUrl: string;
  targetUrl: string;
  anchorText: string;
  externalLinks: number;
  internalLinks: number;
  noFollow: string;
};

const data: DataType[] = [
  {
    key: 0,
    pageAuthority: 0,
    sourceTitle: "",
    sourceUrl: "",
    targetUrl: "",
    anchorText: "",
    externalLinks: 0,
    internalLinks: 0,
    noFollow: "",
  },
];

function BacklinksDetails() {
  const [dataSource, setDataSource] = useState(data);

  const [activeTab, setActiveTab] = useState("all");
  useEffect(() => {
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
  }, []);

  const columns: ColumnsType<DataType> = [
    {
      title: "Page Authority Score",
      dataIndex: "pageAuthority",
      key: "1",
      sorter: (a, b) => a.pageAuthority - b.pageAuthority,
    },
    {
      title: "Source title",
      dataIndex: "sourceTitle",
      key: "2",
      sorter: (a, b) => a.sourceTitle.localeCompare(b.sourceTitle),
    },
    {
      title: "Source url",
      dataIndex: "sourceUrl",
      key: "3",
      sorter: (a, b) => a.sourceUrl.localeCompare(b.sourceUrl),
    },
    {
      title: "Target url",
      dataIndex: "targetUrl",
      key: "4",
      sorter: (a, b) => a.targetUrl.localeCompare(b.targetUrl),
    },
    {
      title: "Anchor Text",
      dataIndex: "anchorText",
      key: "5",
      sorter: (a, b) => a.anchorText.localeCompare(b.anchorText),
    },
    {
      title: "External links",
      dataIndex: "externalLinks",
      key: "6",
      sorter: (a, b) => a.externalLinks - b.externalLinks,
    },
    {
      title: "Internal links",
      dataIndex: "internalLinks",
      key: "7",
      sorter: (a, b) => a.internalLinks - b.internalLinks,
    },
    {
      title: "Nofollow",
      dataIndex: "noFollow",
      key: "8",
      sorter: (a, b) => a.noFollow.localeCompare(b.noFollow),
    },
  ];

  const tabItems: TabsProps["items"] = [
    {
      key: "all",
      label: `All Backlinks`,
      children: (
        <TableComponent
          dataSource={dataSource}
          columns={columns}
          expandable={false}
          pagination={true}
          scroll={{ y: 410 }}
        />
      ),
    },
    {
      key: "referring",
      label: `Referring Domains`,
      children: (
        <TableComponent
          dataSource={dataSource}
          columns={columns}
          expandable={false}
          pagination={true}
          scroll={{ y: 410 }}
        />
      ),
    },
    {
      key: "outbound",
      label: `Outbound Domains`,
      children: (
        <TableComponent
          dataSource={dataSource}
          columns={columns}
          expandable={false}
          pagination={true}
          scroll={{ y: 410 }}
        />
      ),
    },
  ];

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };
  return (
    <div className="backlinks-details">
      <AppHeader />
      <div className="backlinks-details-contents">
        <div className="breadcrumbs-wrapper">
          <Breadcrumb
            separator={<img src={BreadcrumbArrow} alt="" />}
            items={[
              {
                title: "BACKLINKS OVERVIEW",
                className: "breadcrumbs-title",
                // href:""
              },
              {
                title: `${activeTab}`.toUpperCase() + " DOMAINS",
                // href: "",
              },
            ]}
          />
          <p>
            <span style={{ color: "#818181" }}>Last Update:</span>02 Aug 2023
          </p>
        </div>
        <div className="custom-tabs">
          <Tabs
            className=""
            activeKey={activeTab}
            items={tabItems}
            onChange={handleTabChange}
          />
        </div>
      </div>
      {/* <TableComponent dataSource={dataSource} columns={columns} expandable={false}/> */}
    </div>
  );
}

export default BacklinksDetails;
