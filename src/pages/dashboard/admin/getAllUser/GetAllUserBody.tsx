import { toast } from "react-toastify";
import { useBlockUserMutation } from "../../../../redux/fetchers/users/userAPi";
import { TUser } from "./GetAllUser";
import { cn } from "../../../../lib/utils";

interface GetAllUserBodyProps {
  user: TUser;
  index: number;
}

const GetAllUserBody = ({ user, index }: GetAllUserBodyProps) => {
  const [blockUser] = useBlockUserMutation();


  const handleBlock = async (id: string) => {
    try {
      const userInfo = {
        id,
        userStatus: "blocked",
      };
      const res = await blockUser(userInfo).unwrap()
      toast.success(res?.message);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Something went wrong while blocking user!");
    }
  };
  return (
    <tr
      key={user._id} // Ensure each row has a unique key
      className={`${index % 2 === 0
          ? "bg-gray-50 dark:bg-gray-800"
          : "bg-white dark:bg-gray-900"
        } border-b dark:border-gray-700 border-gray-200`}
    >
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <img src={user?.profileImg as string} alt={`${user?.firstName + user?.lastName}Profile Image`} height={60} width={60} className="rounded-md" />
      </th>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {user?.firstName + user?.lastName}
      </th>
      <td className="px-6 py-4">{user?.email}</td>
      <td className="px-6 py-4">{user?.phoneNumber}</td>
      <td className="px-6 py-4 capitalize">{user?.gender}</td>
      <td className="px-6 py-4">{user?.dob ? new Date(user?.dob).toLocaleDateString() : ''}</td>
      <td className="px-6 py-4">{user?.address}</td>
      <td className="px-6 py-4 capitalize">{user?.role}</td>
      <td className={cn("px-6 py-4 capitalize", {
        "text-red-500": user?.userStatus === 'blocked',
        "text-green-500": user?.userStatus === 'active',
      })}>{user?.userStatus}</td>
      <td className={cn("px-6 py-4 capitalize", {
        "text-green-500": user?.verified,
        "text-red-500": !user?.verified
      })}>{user?.verified ? 'Verified' : 'Not Verified'}</td>
      <td className="px-6 py-4 flex items-center justify-cente">
        <button
          onClick={() => handleBlock(user?._id as string)}
          className="font-medium cursor-pointer text-red-600 mt-5 dark:text-red-500 hover:underline"
        >
          Block
        </button>
      </td>
    </tr>
  );
};

export default GetAllUserBody;
