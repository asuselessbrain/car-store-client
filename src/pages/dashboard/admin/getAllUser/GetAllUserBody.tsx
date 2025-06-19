// import { useDeleteUserMutation } from "../../../../redux/fetchers/users/userAPi";
import { toast } from "react-toastify";
import { useBlockUserMutation } from "../../../../redux/fetchers/users/userAPi";
import { TUser } from "./GetAllUser";
// import Swal from "sweetalert2";

interface GetAllUserBodyProps {
  user: TUser;
  index: number;
}

const GetAllUserBody = ({ user, index }: GetAllUserBodyProps) => {
  // const [deleteUser] = useDeleteUserMutation();
  const [blockUser] = useBlockUserMutation();

  // console.log(user);

  // const handleDelete = async (id: string) => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then(async () => {
  //     await deleteUser(id);
  //     try {
  //       await deleteUser(id).unwrap(); // Delete user only if confirmed
  //       Swal.fire({
  //         title: "Deleted!",
  //         text: "User has been deleted.",
  //         icon: "success",
  //       });
  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //     } catch (error) {
  //       Swal.fire({
  //         title: "Error!",
  //         text: "There was a problem deleting the user.",
  //         icon: "error",
  //       });
  //     }
  //   });
  // };

  const handleBlock = async (id: string) => {
    try {
      const userInfo = {
        id,
        userStatus: "inactive",
      };
      const res = await blockUser(userInfo).unwrap()
      toast.success(res.message);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Something went wrong while blocking user!");
    }
  };
  return (
    <tr
      key={user._id} // Ensure each row has a unique key
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
        {user?.name}
      </th>
      <td className="px-6 py-4">{user?.email}</td>
      <td className="px-6 py-4">{user?.role}</td>
      <td className="px-6 py-4">{user?.userStatus}</td>
      <td className="px-6 py-4 flex items-center gap-4">
        <button
          onClick={() => handleBlock(user?._id)}
          className="font-medium cursor-pointer text-red-600 dark:text-red-500 hover:underline"
        >
          Block
        </button>
        {/* <button
          onClick={() => handleDelete(user?._id)}
          className="font-medium cursor-pointer text-red-600 dark:text-red-500 hover:underline"
        >
          Delete
        </button> */}
      </td>
    </tr>
  );
};

export default GetAllUserBody;
