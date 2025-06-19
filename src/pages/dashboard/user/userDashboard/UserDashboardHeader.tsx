import { Box, PackageCheck, ShoppingCart, Truck, Users } from "lucide-react";
import { useGetSingleUserQuery } from "../../../../redux/fetchers/users/userAPi";
import Loader from "../../../shared/Loader";

const UserDashboardHeader = () => {

    const { data, isLoading } = useGetSingleUserQuery(undefined);

    if(isLoading) {
        return <Loader />
    }

  return (
    <div>
      <h1 className="text-3xl font-semibold dark:text-white font-cinzel mb-3">
        Welcome Back{" "}
        <span className="text-red-500 font-bold text-4xl">
          {" "}
          {data?.data?.name}!
        </span>
      </h1>

      <div className="flex items-center justify-between gap-4 mt-10 mb-6">
        <div className="text-white bg-gradient-to-r from-[#6BAAFC] to-[#305FEC] px-[26px] py-[28px] rounded-xl flex items-start justify-between flex-1">
          <div className="flex items-center gap-2">
            <ShoppingCart size={28} />
            <p className="font-bold text-lg">Orders</p>
          </div>
          <h3 className="font-semibold text-6xl">6</h3>
        </div>
        <div className="text-white bg-gradient-to-r from-[#D623FE] to-[#A530F2] px-[26px] py-[28px] rounded-xl flex items-start justify-between flex-1">
          <div className="flex items-start gap-2">
            <Truck size={28} />
            <p className="font-bold text-lg">To Ship</p>
          </div>
          <h3 className="font-semibold text-6xl">4</h3>
        </div>
        <div className="text-white bg-gradient-to-r from-[#EF5E7A] to-[#D35385] px-[26px] py-[28px] rounded-xl flex items-start justify-between flex-1">
          <div className="flex items-start gap-2">
            <PackageCheck size={28} />
            <p className="font-bold text-lg">Delivered</p>
          </div>
          <h3 className="font-semibold text-6xl">4</h3>
        </div>
        <div className="text-white bg-gradient-to-r from-[#73d4e0] to-[#6AAEFF] px-[26px] py-[28px] rounded-xl flex items-start justify-between flex-1">
          <div className="flex items-start gap-2">
            <Box size={28} />
            <p className="font-bold text-lg">Products</p>
          </div>
          <h3 className="font-semibold text-6xl">4</h3>
        </div>
        <div className="text-white bg-gradient-to-r from-[#d3b57d] to-[#D3A256] px-[26px] py-[28px] rounded-xl flex items-start justify-between flex-1">
          <div className="flex items-start gap-2">
            <Users size={28} />
            <p className="font-bold text-lg">Users</p>
          </div>
          <h3 className="font-semibold text-6xl">4</h3>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardHeader;
