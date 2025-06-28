import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../../../components/ui/button";
import { TUser } from "../../admin/getAllUser/GetAllUser";
import { toast } from "react-toastify";
import { useUpdateUserMutation } from "../../../../redux/fetchers/users/userAPi";
import { TbFidgetSpinner } from "react-icons/tb";

const EditProfile = ({ singleUser, setEditModal }: { singleUser: TUser, setEditModal: (editModal: boolean) => void, }) => {

  const { register, handleSubmit } = useForm();
  const [updateUser, { isLoading }] = useUpdateUserMutation()

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {

    const userData = {
      ...data,
      id: singleUser?._id
    }
    try {
      const res = await updateUser(userData);


      if (res?.data?.success) {
        toast.success(res?.data?.message);
        setEditModal(false)
      }

    } catch (err) {
      const error = err as { data?: { errorMessage?: string } };
      toast.error(error?.data?.errorMessage ?? 'Something went wrong');
    }

  };


  return (
    <div>
      <form
        className="space-y-4 md:space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label
              htmlFor="firstName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="First Name"
              defaultValue={singleUser?.firstName}
              {...register("firstName")}
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Last Name"
              defaultValue={singleUser?.lastName}
              {...register("lastName")}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com"
              defaultValue={singleUser?.email}
              {...register("email")}
            />
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="017xx-xxxxxx"
              defaultValue={singleUser?.phoneNumber}
              {...register("phoneNumber")}
            />
          </div>
          <div>

            <label
              htmlFor="gender"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Gender
            </label>
            <select id="gender" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              defaultValue={singleUser?.gender}
              {...register("gender")}>
              <option value="" disabled>Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="dob"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              defaultValue={
                singleUser?.dob
                  ? new Date(singleUser.dob).toISOString().split("T")[0]
                  : ""
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("dob")}
            />
          </div>
          <div>
            <label
              htmlFor="district"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              District
            </label>
            <input
              type="text"
              id="district"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="District"
              defaultValue={singleUser?.district}
              {...register("district")}
            />
          </div>
          <div>
            <label
              htmlFor="upazila"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Upazila
            </label>
            <input
              type="text"
              id="upazila"
              defaultValue={singleUser?.upazila}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Upazila"
              {...register("upazila")}
            />
          </div>
          <div>
            <label
              htmlFor="postOffice"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Post Office
            </label>
            <input
              type="text"
              id="postOffice"
              defaultValue={singleUser?.postOffice}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Post Office"
              {...register("postOffice")}
            />
          </div>
          <div>
            <label
              htmlFor="postalCode"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Postal Code
            </label>
            <input
              type="text"
              id="postalCode"
              defaultValue={singleUser?.postalCode}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Postal Code"
              {...register("postalCode")}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <label
              htmlFor="about"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              About you
            </label>
            <textarea defaultValue={singleUser?.about} id="about" rows={6} cols={50} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Describe yourself"
              {...register("about")}>
            </textarea>
          </div>
        </div>
        {isLoading ? (
          <button disabled={isLoading} className="w-full">
            <TbFidgetSpinner className="mx-auto animate-spin" size={24} />
          </button>
        ) : (
          <div className="flex items-center gap-6">
            <Button
              type="submit"
              className="w-full"
            >
              Update Profile
            </Button>
            <button
              type="submit"
              onClick={() => setEditModal(false)}
              className="w-full text-black bg-[#dee9ff] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Close
            </button>
          </div>)}
      </form>
    </div>
  );
};

export default EditProfile;
