import { Table } from "antd";
import { useState } from "react";
import ArrowDown from "../../assets/common/arrow-down.svg";
import ArrowUp from "../../assets/common/arrow-up.svg";
import "./table-component.scss";

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
type TableComponentProps = {
  columns: any;
  dataSource: any;
  pagination?: boolean;
  expandable: boolean;
  scroll?: {};
};
const TableComponent = ({
  columns,
  dataSource,
  pagination,
  expandable,
  scroll,
}: TableComponentProps) => {
  const [expandedRowKeys, setExpandedRowKeys] = useState<number[]>([]);

  return (
    <Table
      className="custom-Table"
    
      columns={columns}
      showSorterTooltip={true}
      scroll={scroll ? scroll : {}}
      expandable={
        expandable
          ? {
              expandedRowRender: (record) => {
                return (
                  <ol style={{ marginLeft: "25px" }}>
                    {record.description.map((desc: string, index: number) => (
                      <li style={{ marginTop: "5px" }} key={index}>
                        {desc}
                      </li>
                    ))}
                  </ol>
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
            }
          : {}
      }
      dataSource={dataSource}
      pagination={
        pagination ? { defaultPageSize: 10, showSizeChanger: false } : false
      }
    />
  );
};

export default TableComponent;
