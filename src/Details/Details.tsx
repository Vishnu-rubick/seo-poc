import React, { useState } from "react";
import type { RadioChangeEvent } from "antd";
import { Radio, Tabs } from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";

const Details: React.FC = () => {
 

  return (
    <div>
   
      <Tabs
        defaultActiveKey="1"
        size="small"
        style={{ marginBottom: 32 }}
        items={new Array(3).fill(null).map((_, i) => {
          const id = String(i + 1);
          return {
            label: `Tab ${id}`,
            key: id,
            children: `Content of tab ${id}`,
          };
        })}
      />
      
    </div>
  );
};

export default Details;
