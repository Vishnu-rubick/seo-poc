import { Line } from "@ant-design/plots";
import "./line-chart.scss";
const LineChart = () => {
  const data = [
    {
      year: "Jan",
      value: 60,
    },
    {
      year: "Feb",
      value: 45,
    },
    {
      year: "Mar",
      value: 50,
    },
    {
      year: "Apr",
      value: 47,
    },
    {
      year: "May",
      value: 58,
    },
    {
      year: "Jun",
      value: 58,
    },
    {
      year: "Jul",
      value: 49,
    },
    {
      year: "Aug",
      value: 59,
    },
    {
      year: "Sep",
      value: 70,
    },
    {
      year: "Oct",
      value: 76,
    },
    {
      year: "Nov",
      value: 60,
    },
    {
      year: "Dec",
      value: 65,
    },
  ];
  const config = {
    data,
    xField: "year",
    yField: "value",
    color: "#D4B8FF",
    xAxis: {
      grid: {
        line: {
          style: {
            lineDash: [4, 4], // Array representing the dash pattern [dash length, gap length]
            stroke: "#CCCCCC",
          },
        },
      },
    },
    yAxis: {
      grid: {
        line: {
          style: {
            lineDash: [4, 4],
            stroke: "#CCCCCC",
          },
        },
      },
    },
    label: {},

    point: {
      size: 2,
      shape: "circle",
      style: {
        fill: "#D4B8FF",
        stroke: "#D4B8FF",
        lineWidth: 2,
      },
    },
    tooltip: {
      showMarkers: false,
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: "#000",
          fill: "red",
        },
      },
    },
    // interactions: [
    //   {
    //     type: "marker-active",
    //   },
    // ],
  };
  return (
    <div className="line-chart-wrapper">
      <Line {...config} />
    </div>
  );
};

export default LineChart;
