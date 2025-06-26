import { ShoppingCart, Star, Wallet } from "lucide-react";
import { Link } from "react-router";
import Loader from "../../../shared/Loader";
import { useGetSingleUserQuery } from "../../../../redux/fetchers/users/userAPi";
import { useGetIndividualOrderQuery } from "../../../../redux/fetchers/orders/orderApi";
import { useGetSingleUserReviewsQuery } from "../../../../redux/fetchers/review/reviewApi";
import { Order } from "../getMyOrders/GetMyOrder";

const UserDashboard = () => {
  const { data, isLoading } = useGetSingleUserQuery(undefined);
  const { data: orderData, isLoading: orderLoading } =
    useGetIndividualOrderQuery(undefined);
  const { data: userReview, isLoading: reviewLoading } =
    useGetSingleUserReviewsQuery(undefined);

  if (reviewLoading) {
    return <Loader />;
  }

  if (orderLoading) {
    return <Loader />;
  }

  if (isLoading) {
    return <Loader />;
  }
  const transaction = (orderData?.data || []).filter(
    (data: Order) => data.transaction.sp_message === "Success"
  );

  const orders = orderData?.data?.length;
  const totalReview = userReview?.data?.length;

  const user = data?.data;

  return (
    <div className="relative overflow-x-auto max-h-[80vh] flex items-center justify-center p-10">
      <div>
        <h1 className="text-3xl font-semibold dark:text-white font-cinzel mb-4">
          Welcome Back !
        </h1>
        <section className="bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <div className="flex border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden shadow-lg">
            {/* <!-- Left Section --> */}
            <div className="bg-[#FFEDD5] px-[170px] py-[90px] flex flex-col items-center justify-center">
              <img
                src={user?.profileImg}
                className="w-40 h-40 bg-white dark:bg-gray-800 rounded-full border-2 border-orange-500"
                alt="profile image"
              />
              <h2 className="mt-4 text-3xl font-semibold text-black font-cinzel drop-shadow-lg">
                {user?.firstName} {user?.lastName}
              </h2>
            </div>

            {/* <!-- Right Section --> */}
            <div className="px-[150px] py-[90px] bg-[#FEF9C3] border-l-2 border-red-300">
              <h3 className="text-4xl font-semibold font-cinzel text-black">
                Your Activities
              </h3>
              <ul className="mt-4 space-y-2">
                <li className="flex gap-2 items-center text-[#0088FE]">
                  <ShoppingCart size={24} />
                  <Link
                    to="/user/order"
                    className="hover:underline text-[24px] font-semibold"
                  >
                    Orders: {orders}
                  </Link>
                </li>
                <li className="flex gap-2 items-center text-[#00C4A1]">
                  <Star size={24} />
                  <Link
                    to=""
                    className="hover:underline text-[24px] font-semibold"
                  >
                    Reviews: {totalReview}
                  </Link>
                </li>
                <li className="flex gap-2 items-center text-[#FF8042]">
                  <Wallet size={24} />
                  <Link
                    to=""
                    className="hover:underline text-[24px] font-semibold"
                  >
                    Payment: {transaction?.length}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserDashboard;
