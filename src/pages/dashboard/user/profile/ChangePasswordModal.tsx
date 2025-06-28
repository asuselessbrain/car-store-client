import { FieldValues } from "react-hook-form";
import { useChangePasswordMutation } from "../../../../redux/fetchers/users/userAPi";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../../../../components/ui/button";

type Profile = {
  _id: string,
  name: string,
  email: string,
  password: string,
  role: string,
  status: string,
}

type Props = {
  setIsOpen: (isOpen: boolean) => void,
  profile: Profile,
}

const ChangePasswordModal = ({ setIsOpen, profile } : Props) => {
  const [changePassword] = useChangePasswordMutation();

  const { register, handleSubmit } = useForm();

  const onSubmit = async(data: FieldValues) => {
    const { oldPassword, newPassword } = data

    const id = profile?._id;

    const changePasswordInfo = {
        id,
        oldPassword,
        newPassword
    }
    try{
        const res = await changePassword(changePasswordInfo).unwrap();

        if(res?.success) {
            toast.success(res?.message)
            setIsOpen(false)
        }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }catch(err) {
        toast.error("Something went wrong try again!")
  
    }
    
  }
  return (
    <div className="bg-white rounded-lg border-2 border-gray-300 dark:border-gray-500 shadow-sm dark:bg-gray-700">
      {/* <!-- Modal header --> */}
      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Change Password
        </h3>
        <button
          onClick={() => setIsOpen(false)}
          type="button"
          className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-hide="authentication-modal"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
      </div>
      {/* <!-- Modal body --> */}
      <div className="p-4 md:p-5">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="oldPassword"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Old Password
            </label>
            <input
              type="password"
              {...register("oldPassword")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Old Password"
              required
            />
          </div>
          <div>
            <label
              htmlFor="newPassword"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              New password
            </label>
            <input
              type="password"
              {...register("newPassword")}
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full"
          >
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
