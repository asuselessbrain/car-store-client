import { useGetAllCarsQuery } from "../../redux/fetchers/cars/carApi";
import Loader from "../shared/Loader";
import ProductCard from "./components/ProductCard";
import { CiFilter } from "react-icons/ci";
import { FieldValues } from "react-hook-form";
import { useState } from "react";
import PaginationDesign from "./components/PaginationDesign";

export interface Cars {
  _id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  category: string;
  description: string;
  quantity: number;
  inStock: boolean;
}

const Products = () => {
  const [sort, setSort] = useState("");
  const { data, isLoading } = useGetAllCarsQuery(sort);

  if (isLoading) return <Loader />;

  const products = data;

  const handleSort = (e: FieldValues) => {
    setSort(e.target.value);
  };

  return (
    <section className="bg-gray-50 antialiased dark:bg-gray-900 flex items-center justify-center min-h-[calc(100vh-282px)]">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        {/* <!-- Heading & Filters --> */}
        <div className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
          <div>
            <h2 className="mt-3 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Products
            </h2>
          </div>
          <div className="flex items-center space-x-4">
            <button
              data-modal-toggle="filterModal"
              data-modal-target="filterModal"
              type="button"
              className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto"
            >
              <svg
                className="-ms-0.5 me-2 h-4 w-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                  d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z"
                />
              </svg>
              Filters
              <svg
                className="-me-0.5 ms-2 h-4 w-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 9-7 7-7-7"
                />
              </svg>
            </button>
            <div className="flex items-center space-x-4 rounded-lg border border-gray-200 px-2 py-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 group focus:ring-gray-100">
              <CiFilter size={24} />
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
        <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
          {products.data.map((product: Cars) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        <PaginationDesign />
      </div>
    </section>
  );
};
export default Products;
