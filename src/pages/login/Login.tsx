import { Link, useNavigate } from "react-router";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useLoginMutation } from "../../redux/fetchers/auth/authApi";
import { toast } from "react-toastify";
import { TbFidgetSpinner } from "react-icons/tb";
import logo from "/logo.png";
import logo2 from "/logo2.png";
import { useState } from "react";
import { Button } from "../../components/ui/button";
const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("")

  const handleAutoInput = (email: string, pass: string) => {
    setUserEmail(email),
    setUserPass(pass)
  }


  const [login, { isLoading }] = useLoginMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    try {
      const res = await login(formData).unwrap();

      if (res?.success) {
        toast.success(res?.message);
        navigate("/verify-otp", { state: { email: formData.email, context: "login" } });
      }

    } catch (err) {
      const error = err as { data?: { errorMessage?: string } };
      toast.error(error?.data?.errorMessage ?? 'Something went wrong');
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          to="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-20 h-20 mr-2 dark:hidden"
            src={logo}
            alt="logo"
          />
          <img
            className="w-20 h-20 mr-2 hidden dark:block"
            src={logo2}
            alt="logo"
          />
          AutoSphere
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <div className="flex items-center justify-around">
              <Button onClick={()=>handleAutoInput("arfan18@cse.pstu.ac.bd", "arfanahmed")}>User Credential</Button>
              <Button onClick={()=>handleAutoInput("anomious31@gmail.com", "arfanahmed")}>Admin Credential</Button>
            </div>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
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
                  defaultValue={userEmail}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  {...register("email")}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  defaultValue={userPass}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("password")}
                />
              </div>
              {isLoading ? (
                <Button className="w-full">
                  <TbFidgetSpinner className="mx-auto animate-spin" size={24} />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full"
                >
                  Sign in
                </Button>
              )}

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  to="/registration"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
