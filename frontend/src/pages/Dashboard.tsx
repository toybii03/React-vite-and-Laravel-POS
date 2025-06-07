import { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

export default function Dashboard() {
  const [salesData] = useState({
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "Sales (₱)",
        data: [500, 700, 400, 650, 900, 1200, 800],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderRadius: 5,
      },
    ],
  });

  const [topProductsData] = useState({
    labels: ["Iced Latte", "Tuna Sandwich", "Chocolate Cake"],
    datasets: [
      {
        label: "Units Sold",
        data: [35, 22, 18],
        backgroundColor: ["#007bff", "#28a745", "#ffc107"],
      },
    ],
  });

  return (
    <div className="container py-5">
      <h2 className="mb-4">Dashboard</h2>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card shadow rounded-3 p-3">
            <h5 className="card-title">Weekly Sales</h5>
            <Bar data={salesData} options={{ responsive: true }} />
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card shadow rounded-3 p-3">
            <h5 className="card-title">Top Selling Products</h5>
            <Pie data={topProductsData} options={{ responsive: true }} />
          </div>
        </div>
      </div>
    </div>
  );
}
