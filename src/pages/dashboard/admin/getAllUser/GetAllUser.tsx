import { useGetAllUserQuery } from "../../../../redux/fetchers/users/userAPi";
import Loader from "../../../shared/Loader";
import GetAllUserBody from "./GetAllUserBody";

export type TUser = {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  gender: 'male' | 'female' | 'others';
  dob: Date;
  district: string;
  upazila: string;
  postOffice: string;
  postalCode: string;
  about: string;
  profileImg: string | null;
  role: 'user' | 'admin';
  userStatus: 'active' | 'blocked';
  verified: boolean;
};

const GetAllUser = () => {
  const { data, isLoading } = useGetAllUserQuery(undefined);

  if (isLoading) {
    return <Loader />;
  }

  const user = data?.data;

  return (
    <div className="relative overflow-x-auto max-h-[80vh] shadow-md sm:rounded-lg">
      <h1 className="text-2xl md:text-4xl font-semibold text-center text-gray-900 dark:text-gray-200 mb-16">Users</h1>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Image
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Phone Number
            </th>
            <th scope="col" className="px-6 py-3">
              Gender
            </th>
            <th scope="col" className="px-6 py-3">
              Date of Birth
            </th>
            <th scope="col" className="px-6 py-3">
              Address
            </th>
            <th scope="col" className="px-6 py-3">
              Role
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Verified
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
