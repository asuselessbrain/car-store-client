import Loader from "../../../shared/Loader";
import { useGetAllCarsQuery } from "../../../../redux/fetchers/cars/carApi";
import { useGetAllOrdersQuery } from "../../../../redux/fetchers/orders/orderApi";
import { useGetTotalRevenueQuery } from "../../../../redux/fetchers/revenue/revenueApi";
import {
  useGetAllUserQuery,
  useGetSingleUserQuery,
} from "../../../../redux/fetchers/users/userAPi";
import { ShoppingCart, Truck, PackageCheck, Box, Users } from "lucide-react";

const AdminDashboardHeader = () => {
    const { data, isLoading } = useGetSingleUserQuery(undefined);
    const { data: totalRevenue, isLoading: Loading } =
      useGetTotalRevenueQuery(undefined);
    const { data: orderData, isLoading: orderLoading } =
      useGetAllOrdersQuery(undefined);
  
    const { data: users, isLoading: userLoading } = useGetAllUserQuery(undefined);
    const { data: productS, isLoading: productLoading } =
      useGetAllCarsQuery(undefined);

    if (productLoading) {
        return <Loader />;
      }
    
      if (userLoading) {
        return <Loader />;
      }
    
      if (orderLoading) {
        return <Loader />;
      }
    
      if (Loading) {
        return <Loader />;
      }
    
      if (isLoading) {
        return <Loader />;
      }
    
      const orders = orderData?.data;
    
      const needToDelivery = orders.filter(
        (order: { status: string }) => order?.status === "in-progress"
      );
      const delivered = orders.filter((order: { status: string }) => order?.status === "delivered");
    
      const revenue = totalRevenue?.data?.totalRevenue?.totalRevenue;
  return (
    <div>
      <h1 className="text-3xl font-semibold dark:text-white font-cinzel mb-3">
        Welcome Back{" "}
        <span className="text-red-500 font-bold text-4xl">
          {" "}
          {data?.data?.name}!
        </span>
      </h1>
      <p className="text-lg font-medium dark:text-white">
        Total Revenue:{" "}
        <span className="text-green-600 font-bold text-2xl"> {revenue} </span>
        Taka
      </p>

      <div className="flex items-center justify-between gap-4 mt-10 mb-6">
        <div className="text-white bg-gradient-to-r from-[#6BAAFC] to-[#305FEC] px-[26px] py-[28px] rounded-xl flex items-start justify-between flex-1">
          <div className="flex items-center gap-2">
            <ShoppingCart size={28} />
            <p className="font-bold text-lg">Orders</p>
          </div>
          <h3 className="font-semibold text-6xl">{orderData?.data?.length}</h3>
        </div>
        <div className="text-white bg-gradient-to-r from-[#D623FE] to-[#A530F2] px-[26px] py-[28px] rounded-xl flex items-start justify-between flex-1">
          <div className="flex items-start gap-2">
            <Truck size={28} />
            <p className="font-bold text-lg">To Ship</p>
          </div>
          <h3 className="font-semibold text-6xl">{needToDelivery?.length}</h3>
        </div>
        <div className="text-white bg-gradient-to-r from-[#EF5E7A] to-[#D35385] px-[26px] py-[28px] rounded-xl flex items-start justify-between flex-1">
          <div className="flex items-start gap-2">
            <PackageCheck size={28} />
            <p className="font-bold text-lg">Delivered</p>
          </div>
          <h3 className="font-semibold text-6xl">{delivered?.length}</h3>
        </div>
        <div className="text-white bg-gradient-to-r from-[#73d4e0] to-[#6AAEFF] px-[26px] py-[28px] rounded-xl flex items-start justify-between flex-1">
          <div className="flex items-start gap-2">
            <Box size={28} />
            <p className="font-bold text-lg">Products</p>
          </div>
          <h3 className="font-semibold text-6xl">{productS?.data?.length}</h3>
        </div>
        <div className="text-white bg-gradient-to-r from-[#d3b57d] to-[#D3A256] px-[26px] py-[28px] rounded-xl flex items-start justify-between flex-1">
          <div className="flex items-start gap-2">
            <Users size={28} />
            <p className="font-bold text-lg">Users</p>
          </div>
          <h3 className="font-semibold text-6xl">{users?.data?.length}</h3>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHeader;
