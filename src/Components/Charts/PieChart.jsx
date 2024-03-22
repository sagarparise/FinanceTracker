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
  ArcElement,
} from "chart.js";
import { Pie ,Doughnut} from "react-chartjs-2";

ChartJS.register(
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  ArcElement
);
function PieChart({ transactions }) {
  let food=0 , office=0, education=0, health=0, others=0;
  const expense = transactions && transactions.filter((item)=>item.type === 'expense')

    transactions &&
    transactions.forEach((item) => {
      if (item.type === "expense") {
        if(item.tag === 'Food'){
          food+=Number(item.amount);
        }
        else if(item.tag === 'Office'){
          office+=Number(item.amount);
        }
        else if(item.tag === 'Education'){
          education+=Number(item.amount);
        }
        else if(item.tag === 'Health')
        {
          health+=Number(item.amount);
        }
        else{
          others+=Number(item.amount);
        }
      }
    });


  const data = {
    labels: ["Food", "Education", "Office", "Health", "Others"],
    datasets: [
      {
        label: "Spend Amount",
        data: [food, education, office,health,others],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "orange",
          'green',
          'purple'
        ],
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: true, // Hide legend
      },
    },
  };
  return (
    <>
      <h2 className="stat-head" style={{ marginBottom: "20px" }}>
        Total Spending
      </h2>
      <div className="pie">
      {
        expense.length === 0 ? <h5>There is no expenses till now</h5> :   <Pie data={data} options={options} />
      }
      </div>
    </>
  );
}

export default PieChart;
