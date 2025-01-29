import { useGetAllUserQuery } from "../../../../redux/fetchers/users/userAPi";
import Loader from "../../../shared/Loader";
import GetAllUserBody from "./GetAllUserBody";

export type TUser = {
  _id: string;
  name: string;
  email: string;
  photo?: string;
  role: "admin" | "user";
  userStatus: "inactive" | "active";
};

const GetAllUser = () => {
  const { data, isLoading } = useGetAllUserQuery(undefined);

  if (isLoading) {
    return <Loader />;
  }

  const user = data.data;


  return (
    <div className="relative overflow-x-auto max-h-[80vh] shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Role
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
        {user.map((user: TUser, index: number) => (
          <GetAllUserBody key={user._id} user={user} index={index} />
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetAllUser;
