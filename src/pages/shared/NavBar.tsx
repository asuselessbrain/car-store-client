import { Link } from "react-router";
import { cn } from "../../lib/utils";
import { useState } from "react";
import { ThemeToggle } from "../component/themeToggle";
import logo from "../../assets/logo.png";
import { Button } from "../../components/ui/button";
import { useSelector } from "react-redux";
import {
  currentToken,
  logOut,
  user,
} from "../../redux/fetchers/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import { toast } from "react-toastify";

const NavBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const userToken = useSelector(currentToken);
  const userInfo = useSelector(user);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logOut());
    toast.success("Logout Successfully!");
  };

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  const menuItems = [
    {
      id: 1,
      label: "Home",
      path: "/",
    },
    {
      id: 2,
      label: "Products",
      path: "/products",
    },
    {
      id: 3,
      label: "Contact",
      path: "/contact",
    },
  ];
  return (
    <nav className="bg-[#1515157F] max-w-[1440px] fixed w-full z-50 border-gray-200 dark:bg-[#1515157F]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={logo} className="h-16" alt="Flowbite Logo" />
          <span className="self-center text-2xl text-white font-semibold whitespace-nowrap dark:text-white">
            Car Store
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          onClick={handleToggle}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-200 rounded-lg md:hidden hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={cn("hidden w-full md:block md:w-auto", {
            block: isVisible === true,
          })}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 space-y-2 md:space-y-0 border bg-gray-100 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
            {menuItems.map((menuItem) => (
              <li key={menuItem.id}>
                <Link
                  to={menuItem.path}
                  className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-[#EEFF25] md:p-0 dark:text-white md:dark:text-[#EEFF25]"
                  aria-current="page"
                >
                  {menuItem.label}
                </Link>
              </li>
            ))}
            {userToken && (
              <li>
                <Link
                  to={`/${userInfo?.role}/dashboard`}
                  className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-[#EEFF25] md:p-0 dark:text-white md:dark:text-[#EEFF25]"
                  aria-current="page"
                >
                  Dashboard
                </Link>
              </li>
            )}
            {!userToken ? (
              <li>
                <Link to="/login">
                  <Button>Login</Button>
                </Link>
              </li>
            ) : (
              <li>
                <Button onClick={handleLogout}>LogOut</Button>
              </li>
            )}
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
