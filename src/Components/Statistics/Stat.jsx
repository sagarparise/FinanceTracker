import React from "react";
import ChartComponent from "../Charts/Chart";
import PieChart from "../Charts/PieChart";
import "./stat.scss";
function Stat({ transactions }) {
  return (
    <div className="stat-container">
      {transactions.length === 0 ? (
        <div className="stat-card">
          <img
            src="https://financely-finance-tracker.netlify.app/static/media/transactions.004d9f02317991455e50b36d9dae2a26.svg"
            alt=""
          />
          <p>You have no transactions currently</p>
        </div>
      ) : (
        <>
          <div className="financial-stat">
            <ChartComponent  transactions={ transactions } />
          </div>
          <div className="pie-chart">
            <PieChart transactions={ transactions } />
          </div>
        </>
      )}
   
    </div>
  );
}

export default Stat;
