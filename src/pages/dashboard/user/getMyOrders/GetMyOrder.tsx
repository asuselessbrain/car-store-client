import { useGetIndividualOrderQuery } from "../../../../redux/fetchers/orders/orderApi";
import OrderBody from "./OrderBody";
import { Cars } from "../../../products/Products";
import Loader from "../../../shared/Loader";
import { TUser } from "../../admin/getAllUser/GetAllUser";

type Transaction = {
  id: string;
  transactionStatus: string;
  bank_status: string;
  date_time: string;
  method: string;
  sp_code: string;
  sp_message: string;
};

export type Order = {
  _id: string;
  car: Cars;
  userId: TUser;
  quantity: number;
  paymentStatus: string;
  status: string;
  totalPrice: number;
  transaction: Transaction;
};

const GetMyOrder = () => {
  const { data, isLoading } = useGetIndividualOrderQuery(undefined);


  if (isLoading) return <Loader />;
  const orders = data.data;
  return (
    <div className="relative overflow-x-auto max-h-[80vh] shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Model
            </th>
            <th scope="col" className="px-6 py-3">
              Brand
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Unit Price
            </th>
            <th scope="col" className="px-6 py-3">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3">
              Total Price
            </th>
            <th scope="col" className="px-6 py-3">
              Payment Status
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order: Order, index: number) => (
            <OrderBody key={order._id} order={order} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetMyOrder;
