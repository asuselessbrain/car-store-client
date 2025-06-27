import { FieldValues, useForm } from "react-hook-form";
import { useCreateContactMutation } from "../../redux/fetchers/orders/orderApi";
import { useEffect } from "react";
import { toast } from "sonner";

class CustomError extends Error {
  data?: { message?: string };
  constructor(message: string, data?: { message?: string }) {
    super(message);
    this.data = data;
  }
}

const Contact = () => {
  const { register, handleSubmit, reset } = useForm();

  const [createContact, { data, isLoading, isSuccess, error }] =
    useCreateContactMutation();

  const onSubmit = async (data: FieldValues) => {
    await createContact(data);
    reset();
  };

  useEffect(() => {
    const loaderKey = "contact";
    if (isLoading) {
      toast.loading("processing ...", { id: loaderKey });
    }
    if (isSuccess) {
      toast.success(data?.message, { id: loaderKey });
    }
    if (error) {
      toast.error((error as CustomError)?.data?.message, {
        id: loaderKey,
      });
    }
  }, [data?.message, error, isLoading, isSuccess]);
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-[calc(100vh-265px)] flex items-center justify-center text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row items-center gap-8">
        <div className="w-full md:w-3/4 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Contact Us
          </h2>
          <h3 className="text-2xl font-bold mb-6">Reach Out To Us</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Name"
              {...register("name")}
              className="w-full p-3 mb-4 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-full p-3 mb-4 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
            <textarea
              placeholder="Message"
              {...register("message")}
              className="w-full p-3 mb-4 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            ></textarea>
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold">
              Submit
            </button>
          </form>
        </div>
        <div className="w-full md:w-1/2 relative justify-center hidden lg:flex">
          <div className="absolute w-80 h-80 -mt-16 bg-indigo-300 dark:bg-indigo-600 rounded-lg transform rotate-45"></div>
          <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg z-10">
            <div className="flex items-center mb-4">
              <span className="text-xl font-bold">AutoSphere</span>
            </div>
            <p className="flex items-center mb-2">
              <span className="mr-2">📞</span> 017XX-XXXXXX
            </p>
            <p className="flex items-center mb-2">
              <span className="mr-2">✉️</span>carstore@gmail.com
            </p>
            <p className="flex items-center mb-4">
              <span className="mr-2">📍</span> 12/B, Dhanmondi, Dhaka 1209,
              Bangladesh
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
