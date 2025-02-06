import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useGetProductSellByBrandQuery } from "../../../../redux/fetchers/revenue/revenueApi";
import Loader from "../../../shared/Loader";

ChartJS.register(ArcElement, Tooltip, Legend);



const SellByBrand = () => {
    const {data, isLoading, error} = useGetProductSellByBrandQuery(undefined)

    const products = data?.data

    const label = products?.map(product => product?.brand)
    const orderCount = products?.map(product => product?.orderCount)

    const orderData = {
        labels: label,
        datasets: [
          {
            data: orderCount,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      };

      if(isLoading) {
        return <Loader />
      }
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <Pie data={orderData} />
      <h1 className="font-semibold text-center mt-2">Sell By Brand</h1>
    </div>
  );
};

export default SellByBrand;
