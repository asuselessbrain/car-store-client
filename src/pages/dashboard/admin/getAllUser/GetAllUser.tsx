import { Pagination } from "antd";
import { useGetAllUserQuery } from "../../../../redux/fetchers/users/userAPi";
import Loader from "../../../shared/Loader";
import GetAllUserBody from "./GetAllUserBody";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { FaSortAmountDown } from "react-icons/fa";
import { CiFilter } from "react-icons/ci";

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

  const [sort, setSort] = useState("");
    const [toggle, setToggle] = useState(false);
    const [filter, setFilter] = useState<string[]>([]);
    const [searchItem, setSearchTerm] = useState("");
    const [page, setPage] = useState(1)
  
    const limit = 2;
  
    const searchFields = {
      sort,
      filter,
      searchItem,
      page,
      limit
    };

  const { data, isLoading } = useGetAllUserQuery(searchFields);

  

  if (isLoading) {
    return <Loader />;
  }

  const user = data?.data?.result;
  const metaData = data?.data?.meta;

  console.log(metaData)

  const handleSort = (e: FieldValues) => {
      setSort(e.target.value);
    };
  
    const handleToggle = () => {
      setToggle(!toggle);
    };
  
    const handelBrandChanged = (e: FieldValues) => {
      const selectedBrand = e.target.value.trim(); // Trim any whitespace
      const isChecked = e.target.checked; // Check if checkbox is checked
  
      setFilter(
        (prevFilter) =>
          isChecked
            ? [...prevFilter, selectedBrand] // Add selected brand
            : prevFilter.filter((brand) => brand !== selectedBrand) // Remove deselected brand
      );
    };
  
    const handleSearch = (e: FieldValues) => {
      setSearchTerm(e.target.value);
    };

  return (
    <div className="relative overflow-x-auto max-h-[80vh] shadow-md sm:rounded-lg">
      <div className="mb-4 items-center justify-between space-y-4 mt-4 sm:flex sm:space-y-0 md:mb-8">
              <div>
                <h2 className="mt-3 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                  Products
                </h2>
              </div>
      
              <div className="flex items-center space-x-4">
                <div className="mx-auto max-w-md">
                  <form className="relative mx-auto w-max">
                    <input
                      type="search"
                      onChange={handleSearch} placeholder="Search by brand and mode"
                      className="peer cursor-pointer relative z-10 h-12 w-12 rounded-full border bg-transparent pl-12 outline-none focus:w-full focus:cursor-text focus:border-lime-300 focus:pl-16 focus:pr-4 dark:text-white"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-lime-300 peer-focus:strokeLime-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </form>
                </div>
      
                <div>
                  <button
                    id="dropdownDefault"
                    onClick={handleToggle}
                    data-dropdown-toggle="dropdown"
                    className="text-black gap-2 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center  dark:focus:ring-primary-800 border border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 group focus:ring-gray-100"
                    type="button"
                  >
                    <CiFilter size={20} />
                    Filter by Brand
                    <svg
                      className="w-4 h-4 ml-2"
                      aria-hidden="true"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </button>
      
                  {/* <!-- Dropdown menu --> */}
                  {toggle && (
                    <div
                      id="dropdown"
                      className="z-10 w-56 p-3 absolute bg-white rounded-lg shadow dark:bg-gray-700"
                    >
                      <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                        Brand
                      </h6>
                      <ul className="space-y-2 text-sm">
                        {["BMW", "Toyota", "Honda"].map((brand) => (
                          <li key={brand} className="flex items-center">
                            <input
                              id={brand}
                              type="checkbox"
                              value={brand}
                              // checked={selectedBrands.includes(brand)}
                              onChange={handelBrandChanged}
                              className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                              htmlFor={brand}
                              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                            >
                              {brand}
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-4 rounded-lg border border-gray-200 px-2 py-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 group focus:ring-gray-100">
                  <FaSortAmountDown size={16} />
                  <select
                    name="sort"
                    id="sort"
                    onChange={handleSort}
                    className="flex w-full items-center justify-center px-3 rounded text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4  dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:group-hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto"
                  >
                    <option value="" defaultChecked>
                      SortBy
                    </option>
                    <option value="asc">Low to High</option>
                    <option value="desc">High to Low</option>
                  </select>
                </div>
              </div>
            </div>
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
      <div className="my-6">
        <Pagination align="center" pageSize={metaData?.limit} current={page} onChange={(value)=> setPage(value)} total={metaData?.total} />
      </div>
    </div>
  );
};

export default GetAllUser;
