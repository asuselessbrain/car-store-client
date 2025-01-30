import { Link } from "react-router";
import { useDeleteCarMutation } from "../../../../redux/fetchers/cars/carApi";
import { Cars } from "../../../products/Products";
import Swal from "sweetalert2";

interface GetAllProductBodyProps {
  product: Cars;
  index: number;
}

const GetAllProductBody = ({ product, index }: GetAllProductBodyProps) => {
  const [deleteCar] = useDeleteCarMutation();

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async () => {
      await deleteCar(id);
      try {
        await deleteCar(id).unwrap(); // Delete user only if confirmed
        Swal.fire({
          title: "Deleted!",
          text: "User has been deleted.",
          icon: "success",
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "There was a problem deleting the user.",
          icon: "error",
        });
      }
    });
  };
  return (
    //

    <tr
      key={product._id} // Ensure each row has a unique key
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
        {product?.model}
      </th>
      <td className="px-6 py-4">{product?.brand}</td>
      <td className="px-6 py-4">{product?.category}</td>
      <td className="px-6 py-4">{product?.price} Tk</td>
      <td className="px-6 py-4 flex items-center gap-4">
        <Link to={`/admin/update-product/${product?._id}`}>
          <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
            Edit
          </button>
        </Link>
        <button
          onClick={() => handleDelete(product?._id)}
          className="font-medium text-red-600 dark:text-red-500 hover:underline"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default GetAllProductBody;
