import AdminDashboardHeader from "./AdminDashboardHeader";
import MonthlyRevenueChart from "./AreaChartForshowRevinew";
import SellByBrand from "./SellByBrand";

const AdminDashboard = () => {
  return (
    <div className="relative overflow-x-auto max-h-[80vh] shadow-md p-4 rounded-xl">
      <AdminDashboardHeader />
      <div className="flex sm:rounded-lg p-4 flex-col lg:flex-row items-center justify-between w-full">
        <div className="w-full lg:w-1/2">
          <MonthlyRevenueChart />
          <h1 className="font-semibold text-center mt-2 dark:text-white">
            Monthly Revenue
          </h1>
        </div>
        <div className="w-full lg:w-1/3">
          <SellByBrand />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
