import { cn } from "../../../../lib/utils";
import { Order } from "./getAllOrder";

interface GetAllProductBodyProps {
  order: Order;
  index: number;
}

const OrderBody = ({order, index} : GetAllProductBodyProps) => {
  console.log(order);

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
        {order?.userId?.name}
      </th>
      <td className="px-6 py-4">{order?.userId?.email}</td>
      <td className="px-6 py-4">{order?.car?.model}</td>
      <td className="px-6 py-4">{order?.car?.brand}</td>
      <td className="px-6 py-4">{order?.car?.category}</td>
      <td className="px-6 py-4 text-red-600">{order?.car?.price}</td>
      <td className="px-6 py-4">{order?.quantity}</td>
      <td className="px-6 py-4 text-red-600">{order?.totalPrice}</td>
      <td className={cn("px-6 py-4", {
        "text-green-600": order?.status === "delivered",
        "text-yellow-600": order?.status === "in-progress",
        "text-red-600": order?.status === "cancelled",
      })}>{order?.status}</td>
      <td className="px-6 py-4 flex items-center gap-4">
        <button
        //   onClick={() => handleDelete(product?._id)}
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Update Status
        </button>
      </td>
    </tr>
    );
};

export default OrderBody;