import { FaEdit } from "react-icons/fa";
import { useGetSingleUserQuery } from "../../../../redux/fetchers/users/userAPi";
import Loader from "../../../shared/Loader";
import { Button } from "../../../../components/ui/button";
import { useState } from "react";
import ChangePasswordModal from "./ChangePasswordModal";
const UserProfile = () => {
  const { data, isLoading } = useGetSingleUserQuery(undefined);
  const [changePasswordModal, setChangePasswordModal] = useState(false);

  if (isLoading) return <Loader />;

  const profile = data?.data;

  return (
    <section className="relative overflow-x-auto max-h-[80vh] px-10 shadow-xl rounded-lg text-gray-900 dark:text-gray-200">
      <h3 className="text-3xl font-semibold px-10">User Profile</h3>
      <div className="absolute max-w-full w-1/3 rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {changePasswordModal && (
        <ChangePasswordModal setIsOpen={setChangePasswordModal} profile={profile} />
      )}
      </div>
      <div className="rounded-lg p-6 mt-6">
        <div className="flex items-center gap-10 px-10 bg-white dark:bg-gray-700 rounded-lg py-6">
          <img src={profile?.profileImg} alt={profile?.firstName} className="rounded-full w-44" />
          <div>
            <p className="text-3xl font-bold">{profile?.firstName} {profile?.lastName}</p>
            <p className="capitalize font-medium">{profile?.role}</p>
            <p className="text-base">{profile?.upazila}, {profile?.district} - {profile?.postalCode}</p>
          </div>
        </div>
        <div className="my-8 bg-white dark:bg-gray-700 rounded-lg py-6">
          <div className="text-2xl font-semibold flex items-center justify-between border-b-2 dark:border-b-white py-4 mx-10">
            <p>Personal Information</p>
            <Button className="flex items-center gap-4">Edit <FaEdit /></Button>
          </div>
          <div className="grid grid-cols-3 gap-8 px-10 pt-8">

            <div>
              <p className="text-gray-700 font-semibold dark:text-gray-300">Firsr Name</p>
              <p className="text-lg font-semibold dark:text-gray-200">{profile?.firstName}</p>
            </div>
            <div>
              <p className="text-gray-700 font-semibold dark:text-gray-300">Last Name</p>
              <p className="text-lg font-semibold dark:text-gray-200">{profile?.lastName}</p>
            </div>
            <div>
              <p className="text-gray-700 font-semibold dark:text-gray-300">Date Of Birth</p>
              <p className="text-lg font-semibold dark:text-gray-200">{new Date(profile?.dob).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-gray-700 font-semibold dark:text-gray-300">Email Address</p>
              <p className="text-lg font-semibold dark:text-gray-200">{profile?.email}</p>
            </div>
            <div>
              <p className="text-gray-700 font-semibold dark:text-gray-300">Phone Number</p>
              <p className="text-lg font-semibold dark:text-gray-200">{profile?.phoneNumber}</p>
            </div>
            <div>
              <p className="text-gray-700 font-semibold dark:text-gray-300">Gender</p>
              <p className="text-lg font-semibold dark:text-gray-200 capitalize">{profile?.gender}</p>
            </div>
          </div>
        </div>
        <div className="mt-8 bg-white dark:bg-gray-700 rounded-lg py-6">
          <div className="text-2xl font-semibold border-b-2 flex items-center justify-between dark:border-b-white py-4 mx-10">
            <p>Address</p>
            <Button onClick={() => setChangePasswordModal(true)} className="flex items-center gap-4">Change Password <FaEdit /></Button>
          </div>
          <div className="grid grid-cols-3 gap-8 px-10 pt-8">

            <div>
              <p className="text-gray-700 font-semibold dark:text-gray-300">District</p>
              <p className="text-lg font-semibold dark:text-gray-200">{profile?.district}</p>
            </div>
            <div>
              <p className="text-gray-700 font-semibold dark:text-gray-300">Upazila</p>
              <p className="text-lg font-semibold dark:text-gray-200">{profile?.upazila}</p>
            </div>
            <div>
              <p className="text-gray-700 font-semibold dark:text-gray-300">Postal Office</p>
              <p className="text-lg font-semibold dark:text-gray-200">{profile?.postOffice}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UserProfile;