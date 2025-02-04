import { toast } from "react-toastify";
import { cn } from "../../../../lib/utils";
import { useCancelOrderMutation } from "../../../../redux/fetchers/orders/orderApi";
import { Order } from "./GetMyOrder";

interface GetAllProductBodyProps {
  order: Order;
  index: number;
}

const OrderBody = ({ order, index }: GetAllProductBodyProps) => {
  const [cancelOrder] = useCancelOrderMutation();

  const handleUpdateOrderStatus = async (id: string) => {
    try {
      if (order?.status === "delivered") {
        toast.info("This order has already been delivered.");
        return;
      }

      if(order?.status === 'cancelled') {
        toast.info("Order already cancelled!")
        return;
      }

      const res = await cancelOrder(id).unwrap();
      if (res.statusCode === 200) {
        toast.success("Order status updated successfully!");
      }

    } catch (err) {
      console.log(err);
      toast.error("Something went wrong while updating order status!");
    }
  };

  return (
    <tr
      key={order._id} // Ensure each row has a unique key
      className={`${
        index % 2 === 0
          ? "bg-gray-50 dark:bg-gray-800"
          : "bg-white dark:bg-gray-900"
      } border-b dark:border-gray-700 border-gray-200`}
    >
      <td className="px-6 py-4">{order?.car?.model}</td>
      <td className="px-6 py-4">{order?.car?.brand}</td>
      <td className="px-6 py-4">{order?.car?.category}</td>
      <td className="px-6 py-4 text-red-600">{order?.car?.price}</td>
      <td className="px-6 py-4">{order?.quantity}</td>
      <td className="px-6 py-4 text-red-600">{order?.totalPrice}</td>
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
          className="font-medium text-red-600 dark:text-red-500 hover:underline"
        >
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default OrderBody;
