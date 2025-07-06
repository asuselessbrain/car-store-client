import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";

import { useGetMonthlyRevenueQuery } from "../../../../redux/fetchers/revenue/revenueApi";
import Loader from "../../../shared/Loader";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    fill: boolean;
    borderColor: string;
    backgroundColor: string;
  }[];
}

const MonthlyRevenueChart = () => {
  const { data, isLoading } = useGetMonthlyRevenueQuery(undefined);
  const [chartData, setChartData] = useState<ChartData | null>(null);

  useEffect(() => {
    if (Array.isArray(data?.data?.totalRevenue)) {
      const revenueData = data.data.totalRevenue;

      const getMonthName = (month: number) => {
        const monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        return monthNames[month - 1]; // month is 1-indexed
      };

      const labels = revenueData.map(
        (entry: { month: number; year: number }) =>
          `${getMonthName(entry.month)} ${entry.year}`
      );

      const revenueValues = revenueData.map(
        (data: { totalRevenue: number }) => data.totalRevenue
      );

      setChartData({
        labels,
        datasets: [
          {
            fill: true,
            label: "Monthly Revenue (Tk)",
            data: revenueValues,
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
        ],
      });
    }
  }, [data]); // Only run when `data` changes

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Monthly Revenue",
      },
    },
  };

  if (isLoading) return <Loader />;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {chartData ? (
        <Line data={chartData} options={options} />
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default MonthlyRevenueChart;
