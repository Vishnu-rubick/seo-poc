import { VennDiagramChart } from "chartjs-chart-venn";
import { useEffect, useRef } from "react";
import "./venn-chart.scss";

const ChartVenn = () => {
  const canvasRef = useRef(null);

  // const config = {
  //   type: "venn",
  //   data: extractSets(
  //     [
  //       {
  //         label: "Soccer",
  //         values: ["a", "b", "c", "d", "e"],
  //       },
  //       { label: "Tennis", values: ["f", "g", "h"] },
  //       { label: "Volleyball", values: ["drew", "glen", "jade", "hunter"] },
  //     ],
  //     {
  //       label: "Sports dỉagram",
  //     }
  //   ),
  //   options: {
  //     borderWidth: 1,
  //     backgroundColor: [
  //       "rgba(255, 26, 104, 0.2)",
  //       "rgba(54, 162, 235, 0.2)",
  //       "rgba(255, 206, 86, 0.2)",
  //       "rgba(75, 192, 192, 0.2)",
  //       "rgba(153, 102, 255, 0.2)",
  //       "rgba(255, 159, 64, 0.2)",
  //     ],
  //     borderColor: [
  //       "rgba(255, 26, 104, 1)",
  //       "rgba(54, 162, 235, 1)",
  //       "rgba(255, 206, 86, 1)",
  //       "rgba(75, 192, 192, 1)",
  //       "rgba(153, 102, 255, 1)",
  //       "rgba(255, 159, 64, 1)",
  //     ],
  //   },
  // };

  const config = {
    type: "venn",
    data: {
      labels: ["", "", "", "", "", "", ""],
      datasets: [
        {
          // label: "Sports",
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
      backgroundColor: [
        "rgba(161, 197, 93, 0.8)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "#7FB800",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
    },
  };

   useEffect(() => {
     if (canvasRef.current) {
       new VennDiagramChart(canvasRef.current, config);
     }
   }, []);

  return (
    <div className="venn-chart-wrapper">
      <canvas ref={canvasRef} id="canvas"></canvas>
    </div>
  );
};

export default ChartVenn;
