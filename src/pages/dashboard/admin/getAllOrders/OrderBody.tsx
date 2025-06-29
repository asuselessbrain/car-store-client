import { toast } from "sonner";
import { cn } from "../../../../lib/utils";
import { useUpdateOrderStatusMutation } from "../../../../redux/fetchers/orders/orderApi";
import { Order } from "./GetAllOrder";
import { useEffect } from "react";


interface GetAllProductBodyProps {
  order: Order;
  index: number;
}

const OrderBody = ({ order, index }: GetAllProductBodyProps) => {
  const [updateOrderStatus, {data, isLoading, isError, isSuccess, error}] = useUpdateOrderStatusMutation();


  const handleUpdateOrderStatus = async (id: string) => {
    const orderId = 'status'
    if (order?.status === "delivered") {
      toast.info("This order has already been delivered.", {id: orderId});
      return;
    }
    if (order?.status === "cancelled") {
      toast.info("This order has cancelled.", {id: orderId});
      return;
    }
    await updateOrderStatus(id).unwrap();
  };

  useEffect(()=>{
    const orderId = 'order'
    if(isError){
      toast.error(JSON.stringify(error), {id: orderId});
    }
    if(isLoading){
      toast.loading("Processing..", {id: orderId})
    }
    if(isSuccess){
      toast.success(data?.message, {id: orderId})
    }
  },[data?.message, isSuccess, isError, error, isLoading])

  return (
    <tr
      key={order._id} // Ensure each row has a unique key
      className={`${
        index % 2 === 0
          ? "bg-gray-50 dark:bg-gray-800"
          : "bg-white dark:bg-gray-900"
      } border-b dark:border-gray-700 border-gray-200`}
    >
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {order?.user?.firstName} {order?.user?.lastName}
      </th>
      <td className="px-6 py-4">{order?.user?.email}</td>
      <td className="px-6 py-4">{order?.car?.model}</td>
      <td className="px-6 py-4">{order?.car?.brand}</td>
      <td className="px-6 py-4">{order?.car?.category}</td>
      <td className="px-6 py-4 text-red-600">{order?.car?.price}</td>
      <td className="px-6 py-4">{order?.quantity}</td>
      <td className="px-6 py-4 text-red-600">{order?.totalPrice}</td>
      <td
        className={cn("px-6 py-4", {
          "text-green-600": order?.paymentStatus === "paid",
          "text-yellow-600": order?.paymentStatus === "pending",
          "text-red-600": order?.paymentStatus === "cancelled",
        })}
      >
        {order?.paymentStatus}
      </td>
      <td
        className={cn("px-6 py-4", {
          "text-green-600": order?.status === "delivered",
          "text-yellow-600": order?.status === "in-progress",
          "text-red-600": order?.status === "cancelled",
        })}
      >
        {order?.status}
      </td>
      <td className="px-6 py-4 flex items-center gap-4">
        <button
          onClick={() => handleUpdateOrderStatus(order?._id)}
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Delevered
        </button>
      </td>
    </tr>
  );
};

export default OrderBody;
