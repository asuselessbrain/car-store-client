import { TUser } from "./GetAllUser";

interface GetAllUserBodyProps {
  user: TUser;
  index: number;
}

const GetAllUserBody = ({ user, index }: GetAllUserBodyProps) => {
    // console.log(user);
    return (
        <tbody>
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
          <td className="px-6 py-4">{user?.userStatus} Tk</td>
          <td className="px-6 py-4 flex items-center gap-4">
            <a
              href="#"
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              Edit
            </a>
            <a
              href="#"
              className="font-medium text-red-600 dark:text-red-500 hover:underline"
            >
              Delete
            </a>
          </td>
        </tr>
      </tbody>
    );
};

export default GetAllUserBody;