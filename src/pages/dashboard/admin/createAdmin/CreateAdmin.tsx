import { FieldValues, useForm } from "react-hook-form";
import { useCreateAdminMutation } from "../../../../redux/fetchers/users/userAPi";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { ImagePreview } from "../../../../utils/previewImage";
import { ReUsableImageUploder } from "../../../../utils";
import { useState } from "react";
import { TbFidgetSpinner } from "react-icons/tb";

const CreateAdmin = () => {
  const { register, handleSubmit } = useForm();
  const [createAdmin, { isLoading }] = useCreateAdminMutation()
  const navigate = useNavigate()
  const [image, setImage] = useState<File[] | []>([])
  const [preview, setPreview] = useState<string[] | []>([])

  const onSubmit = async (data: FieldValues) => {
    try {
      if (data?.password !== data?.confirmPassword) {
        toast.error("Password and Confirm Password must match")
      }
      const formData = new FormData();

      formData.append("data", JSON.stringify(data))
      formData.append("profileImg", image[0])


      const res = await createAdmin(formData).unwrap()
      if (res?.success) {
        toast.success(res?.message);
        navigate("/admin/get-all-user");
      }
    } catch (err) {
      const error = err as { data?: { errorMessage?: string } };
      toast.error(error?.data?.errorMessage ?? 'Something went wrong');
    }
  };

  return (
    <section className="md:mx-20 lg:mx-40 max-h-[80vh] md:mt-10 rounded-xl bg-gray-200 dark:bg-gray-800 p-10 overflow-auto">
      <h1 className="text-2xl md:text-4xl font-semibold text-center text-gray-900 dark:text-gray-200 mb-16">Create Admin</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <label className="flex  items-center mb-3 text-gray-800 dark:text-gray-200 text-sm font-medium">
              First Name{" "}
              <svg
                width="7"
                height="7"
                className="ml-1"
                viewBox="0 0 7 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                  fill="#EF4444"
                />
              </svg>
            </label>
            <div className="relative  text-gray-500 focus-within:text-gray-900 dark:text-gray-300 mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
                <svg
                  className="stroke-current ml-1"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 21V20.1429C20 19.0805 20 18.5493 19.8997 18.1099C19.5578 16.6119 18.3881 15.4422 16.8901 15.1003C16.4507 15 15.9195 15 14.8571 15H10C8.13623 15 7.20435 15 6.46927 15.3045C5.48915 15.7105 4.71046 16.4892 4.30448 17.4693C4 18.2044 4 19.1362 4 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                    stroke=""
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="firstName"
                className="block w-full h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 dark:text-gray-300 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
                placeholder="Enter First Name" {...register("firstName")}
              />
            </div>
          </div>
          <div className="relative">
            <label className="flex  items-center mb-3 text-gray-800 dark:text-gray-200 text-sm font-medium">
              Last Name{" "}
              <svg
                width="7"
                height="7"
                className="ml-1"
                viewBox="0 0 7 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                  fill="#EF4444"
                />
              </svg>
            </label>
            <div className="relative  text-gray-500 focus-within:text-gray-900 dark:text-gray-300 mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
                <svg
                  className="stroke-current ml-1"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 21V20.1429C20 19.0805 20 18.5493 19.8997 18.1099C19.5578 16.6119 18.3881 15.4422 16.8901 15.1003C16.4507 15 15.9195 15 14.8571 15H10C8.13623 15 7.20435 15 6.46927 15.3045C5.48915 15.7105 4.71046 16.4892 4.30448 17.4693C4 18.2044 4 19.1362 4 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                    stroke=""
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="lastName"
                className="block w-full h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 dark:text-gray-300 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
                placeholder="Enter Last Name" {...register("lastName")}
              />
            </div>
          </div>
          <div className="relative">
            <label className="flex  items-center mb-3 text-gray-800 dark:text-gray-200 text-sm font-medium">
              Email{" "}
              <svg
                width="7"
                height="7"
                className="ml-1"
                viewBox="0 0 7 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                  fill="#EF4444"
                />
              </svg>
            </label>
            <div className="relative  text-gray-500 focus-within:text-gray-900 dark:text-gray-300 mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
                <svg
                  className="stroke-current ml-1"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.54887 6.73325L7.76737 9.36216C9.82591 10.645 10.8552 11.2864 11.9999 11.2863C13.1446 11.2861 14.1737 10.6443 16.2318 9.36081L20.4611 6.72333M11 20H13C16.7712 20 18.6569 20 19.8284 18.8284C21 17.6569 21 15.7712 21 12C21 8.22876 21 6.34315 19.8284 5.17157C18.6569 4 16.7712 4 13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12C3 15.7712 3 17.6569 4.17157 18.8284C5.34315 20 7.22876 20 11 20Z"
                    stroke=""
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <input
                type="email"
                id="email"
                className="block w-full h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 dark:text-gray-300 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
                placeholder="Enter Email" {...register("email")}
              />
            </div>
          </div>
          <div className="relative">
            <label className="flex  items-center mb-3 text-gray-800 dark:text-gray-200 text-sm font-medium">
              Phone Number{" "}
              <svg
                width="7"
                height="7"
                className="ml-1"
                viewBox="0 0 7 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                  fill="#EF4444"
                />
              </svg>
            </label>
            <div className="relative  text-gray-500 focus-within:text-gray-900 dark:text-gray-300 mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
                <svg
                  className="stroke-current ml-1"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.54887 6.73325L7.76737 9.36216C9.82591 10.645 10.8552 11.2864 11.9999 11.2863C13.1446 11.2861 14.1737 10.6443 16.2318 9.36081L20.4611 6.72333M11 20H13C16.7712 20 18.6569 20 19.8284 18.8284C21 17.6569 21 15.7712 21 12C21 8.22876 21 6.34315 19.8284 5.17157C18.6569 4 16.7712 4 13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12C3 15.7712 3 17.6569 4.17157 18.8284C5.34315 20 7.22876 20 11 20Z"
                    stroke=""
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="phoneNumber"
                className="block w-full h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 dark:text-gray-300 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
                placeholder="Enter Phone Number" {...register("phoneNumber")}
              />
            </div>
          </div>
          <div className="relative">
            <label className="flex  items-center mb-3 text-gray-800 dark:text-gray-200 text-sm font-medium">
              Gender{" "}
              <svg
                width="7"
                height="7"
                className="ml-1"
                viewBox="0 0 7 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                  fill="#EF4444"
                />
              </svg>
            </label>
            <div className="relative  text-gray-500 focus-within:text-gray-900 dark:text-gray-300 mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
                <svg
                  className="stroke-current ml-1"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.54887 6.73325L7.76737 9.36216C9.82591 10.645 10.8552 11.2864 11.9999 11.2863C13.1446 11.2861 14.1737 10.6443 16.2318 9.36081L20.4611 6.72333M11 20H13C16.7712 20 18.6569 20 19.8284 18.8284C21 17.6569 21 15.7712 21 12C21 8.22876 21 6.34315 19.8284 5.17157C18.6569 4 16.7712 4 13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12C3 15.7712 3 17.6569 4.17157 18.8284C5.34315 20 7.22876 20 11 20Z"
                    stroke=""
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <select id="gender" className="block w-full h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 dark:text-gray-300 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none" defaultValue="" {...register("gender")}>
                <option value="" disabled>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>
          </div>
          <div className="relative">
            <label className="flex  items-center mb-3 text-gray-800 dark:text-gray-200 text-sm font-medium">
              Date of Birth{" "}
              <svg
                width="7"
                height="7"
                className="ml-1"
                viewBox="0 0 7 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                  fill="#EF4444"
                />
              </svg>
            </label>
            <div className="relative  text-gray-500 focus-within:text-gray-900 dark:text-gray-300 mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
                <svg
                  className="stroke-current ml-1"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.54887 6.73325L7.76737 9.36216C9.82591 10.645 10.8552 11.2864 11.9999 11.2863C13.1446 11.2861 14.1737 10.6443 16.2318 9.36081L20.4611 6.72333M11 20H13C16.7712 20 18.6569 20 19.8284 18.8284C21 17.6569 21 15.7712 21 12C21 8.22876 21 6.34315 19.8284 5.17157C18.6569 4 16.7712 4 13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12C3 15.7712 3 17.6569 4.17157 18.8284C5.34315 20 7.22876 20 11 20Z"
                    stroke=""
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <input
                type="date"
                id="dob"
                className="block w-full h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 dark:text-gray-300 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
                {...register("dob")}
              />
            </div>
          </div>
          <div className="relative">
            <label className="flex  items-center mb-3 text-gray-800 dark:text-gray-200 text-sm font-medium">
              Password{" "}
              <svg
                width="7"
                height="7"
                className="ml-1"
                viewBox="0 0 7 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                  fill="#EF4444"
                />
              </svg>
            </label>
            <div className="relative  text-gray-500 focus-within:text-gray-900 dark:text-gray-300 mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
                <svg
                  className="stroke-current ml-1"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 10H8M17 10V10C17.93 10 18.395 10 18.7765 10.1022C19.8117 10.3796 20.6204 11.1883 20.8978 12.2235C21 12.605 21 13.07 21 14C21 14.6667 21 15.3333 21 16C21 18.8284 21 20.2426 20.1213 21.1213C19.2426 22 17.8284 22 15 22C13.3333 22 11.6667 22 10 22C7.17157 22 5.75736 22 4.87868 21.1213C4 20.2426 4 18.8284 4 16C4 15.3333 4 14.6667 4 14C4 13.07 4 12.605 4.10222 12.2235C4.37962 11.1883 5.18827 10.3796 6.22354 10.1022C6.60504 10 7.07003 10 8 10V10M17 10V6.5C17 4.01472 14.9853 2 12.5 2C10.0147 2 8 4.01472 8 6.5V10M15 15.5C15 16.8807 13.8807 18 12.5 18C11.1193 18 10 16.8807 10 15.5C10 14.1193 11.1193 13 12.5 13C13.8807 13 15 14.1193 15 15.5Z"
                    stroke=""
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <input
                type="password"
                id="password"
                className="block w-full h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 dark:text-gray-300 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
                placeholder="Enter Password" {...register("password")}
              />
            </div>
          </div>
          <div className="relative">
            <label className="flex  items-center mb-3 text-gray-800 dark:text-gray-200 text-sm font-medium">
              Confirm Password{" "}
              <svg
                width="7"
                height="7"
                className="ml-1"
                viewBox="0 0 7 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                  fill="#EF4444"
                />
              </svg>
            </label>
            <div className="relative  text-gray-500 focus-within:text-gray-900 dark:text-gray-300 mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
                <svg
                  className="stroke-current ml-1"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 10H8M17 10V10C17.93 10 18.395 10 18.7765 10.1022C19.8117 10.3796 20.6204 11.1883 20.8978 12.2235C21 12.605 21 13.07 21 14C21 14.6667 21 15.3333 21 16C21 18.8284 21 20.2426 20.1213 21.1213C19.2426 22 17.8284 22 15 22C13.3333 22 11.6667 22 10 22C7.17157 22 5.75736 22 4.87868 21.1213C4 20.2426 4 18.8284 4 16C4 15.3333 4 14.6667 4 14C4 13.07 4 12.605 4.10222 12.2235C4.37962 11.1883 5.18827 10.3796 6.22354 10.1022C6.60504 10 7.07003 10 8 10V10M17 10V6.5C17 4.01472 14.9853 2 12.5 2C10.0147 2 8 4.01472 8 6.5V10M15 15.5C15 16.8807 13.8807 18 12.5 18C11.1193 18 10 16.8807 10 15.5C10 14.1193 11.1193 13 12.5 13C13.8807 13 15 14.1193 15 15.5Z"
                    stroke=""
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <input
                type="password"
                id="confirmPassword"
                className="block w-full h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 dark:text-gray-300 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
                placeholder="Enter Confirm Password" {...register("confirmPassword")}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <label className="flex  items-center mb-3 text-gray-800 dark:text-gray-200 text-sm font-medium">
              Address{" "}
              <svg
                width="7"
                height="7"
                className="ml-1"
                viewBox="0 0 7 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                  fill="#EF4444"
                />
              </svg>
            </label>
            <textarea id="address" rows={6} cols={50} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Address"
              {...register("address")}>
            </textarea>
          </div>
          <div className="mt-8">
            {
              preview?.length > 0 ?
                <ImagePreview setImage={setImage} preview={preview} setPreview={setPreview} /> :
                <ReUsableImageUploder setImage={setImage} setPreview={setPreview} label="Upload Profile Picture" />
            }

          </div>
        </div>
        <div className="flex items-center justify-center mt-6">
          {isLoading ? (
            <button className="w-52 h-12 shadow-sm rounded-full bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 text-white text-base font-semibold leading-7">
              <TbFidgetSpinner className="mx-auto animate-spin" size={24} />
            </button>
          ) : (
            <button disabled={isLoading} className="w-52 h-12 shadow-sm rounded-full bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 text-white text-base font-semibold leading-7">
              Create Admin
            </button>
          )}

        </div>
      </form>
    </section>
  );
};

export default CreateAdmin;
