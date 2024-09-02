import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { useRef } from "react";

const EnergyCharts = ({data, label,y}) => {
  const chartRef = useRef();

  return (
    <Bar
      ref={chartRef}
      data={{
        labels: label, // x axis
        datasets: data,
      }}
      options={{
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
          title: {
            display: false,
          },
          tooltip: {},
        },
        scales: {
          x: {
            display: true,
            stacked: true,
            grid: {
              display: false,
            },
          },
          y: {
            stacked: true,
            display: true,
            grid: {
              display: true,
              borderDash: [10],
              borderDashOffset: 20,
              borderWidth: 0,
              color: "#F6F6F6",
            },
          },
        },
      }}
    />
  );
};

export default EnergyCharts;
