import React from "react";
import "./chart.scss";
import {
  Chart as ChartJS,
  PointElement,
  LineElement,
  CategoryScale,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip
);
function ChartCompent({ transactions }) {

  const labelArray =
    transactions &&
    transactions
      .filter((item) => item.type === "income")
      .map((item) => item.date);
  console.log(labelArray);

const value =  transactions &&transactions
  .filter((item) => item.type === "income")
  .map((item) => item.amount)

  console.log(value)

  const data = {
    labels: labelArray,
    // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
    datasets: [
      {
        label: "Total Income",
        data: value,
         

        borderWidth: 2,
        fill: true,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.2,
        pointBackgroundColor: "white",
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false, // Hide legend
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hide x-axis grid lines
        },
      },
      y: {
        grid: {
          display: true, // Hide y-axis grid lines
        },
      },
    },
  };

  return (
    <>
      <h2 className="stat-head">Financial Statistics</h2>
      <div className="chart-container">
        <Line data={data} options={options} />
      </div>
    </>
  );
}

export default ChartCompent;
