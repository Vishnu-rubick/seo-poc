import { VennDiagramChart } from "chartjs-chart-venn";
import React, { useEffect, useRef } from "react";

import "./venn-chart.scss";

const ChartVenn: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const config = {
    type: "venn",
    data: {
      labels: ["", "", "", "", "", "", ""],
      datasets: [
        {
          data: [
            { sets: ["Soccer"], value: "23K" },
            { sets: ["Tennis"], value: "22K" },
            { sets: ["Volleyball"], value: "12K" },
            { sets: ["Soccer", "Tennis"], value: "" },
            { sets: ["Soccer", "Volleyball"], value: "" },
            { sets: ["Tennis", "Volleyball"], value: "" },
            { sets: ["Soccer", "Tennis", "Volleyball"], value: "" },
          ],
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Chart.js Venn Diagram Chart",
      },
      borderWidth: 1,
      backgroundColor: (ctx: any, options: any) => [
        "rgba(255, 180, 0, 0.3)",
        "rgba(127, 184, 0, 0.2)",
        "rgba(0, 166, 237, 0.2)",
        "#CDDBBF",
        "#B7E3D3",
        "rgba(255, 159, 64, 0.2)",
      ],

      borderColor: [
        "#B0B0B0",
        "#B0B0B0",
        "#B0B0B0",
        "#B0B0B0",
        "#B0B0B0",
        "#B0B0B0",
      ],
    },
  };

  useEffect(() => {
    if (canvasRef.current) {
      // below line gives build issue.
      new VennDiagramChart(canvasRef.current, config as any);
    }
  }, []);

  return (
    <div className="venn-chart-wrapper">
      <canvas ref={canvasRef} id="canvas"></canvas>
    </div>
  );
};

export default ChartVenn;
