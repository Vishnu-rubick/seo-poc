import { Breadcrumb, Tabs, TabsProps } from "antd";
import { useEffect, useState } from "react";
import BacklinksDetailsData from "../../../backlinks-data/backlinks-details.json";
import BreadcrumbArrow from "../../assets/keywords/breadcrumb-arrow.svg";
import AppHeader from "../../components/app-header/app-header";
import TableComponent from "../../components/table-component/table-component";
import "./backlinks-details.scss";

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
      noFollow: "",
    },
  ]);

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
