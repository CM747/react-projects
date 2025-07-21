import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import styles from "./InvestmentPieChart.module.css";

// Register required chart types
ChartJS.register(ArcElement, Tooltip, Legend);

export default function InvestmentPieChart({ totalInvested, totalAmount }) {
  const data = {
    labels: ["Total Invested", "Total Profit"],
    datasets: [
      {
        data: [totalInvested, totalAmount - totalInvested],
        backgroundColor: ["#FF6384", "#36A2EB"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#6b7280",
          font: {
            family: "Inter, sans-serif",
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Investment Allocation</h3>
      <Pie data={data} options={options} />
    </div>
  );
}
