import { Link } from "react-router";
import { Order } from "./getAllOrder";

interface GetAllProductBodyProps {
  order: Order;
  index: number;
}

const OrderBody = ({order, index} : GetAllProductBodyProps) => {

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
      <td className="px-6 py-4">{order?.car?.price}</td>
      <td className="px-6 py-4">{order?.quantity}</td>
      <td className="px-6 py-4">{order?.totalPrice}</td>
      <td className="px-6 py-4">In progress</td>
      <td className="px-6 py-4 flex items-center gap-4">
        <button
        //   onClick={() => handleDelete(product?._id)}
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Delivered
        </button>
      </td>
    </tr>
    );
};

export default OrderBody;