import { useGetAllCarsQuery } from "../../redux/fetchers/cars/carApi";
import Loader from "../shared/Loader";
import ProductCard from "./components/ProductCard";
import { FaSortAmountDown } from "react-icons/fa";
import { FieldValues } from "react-hook-form";
import { useEffect, useState } from "react";
import { Pagination } from "antd";

export interface Cars {
  _id: string;
  name: string;
  brand: string;
  model: string;
  releaseYear: Date;
  price: number;
  category: string;
  description: string;
  quantity: number;
  inStock: boolean;
  color: string;
  bodyType: string;
  transmission: string;
  fuelType: string;
  engineSize: string;
  images: [string];
  mileage: string;
  features: [string];
  tags: [string];
  warranty: string;
}

const Products = () => {
  // All hooks at the very top
  const [sort, setSort] = useState("");
  const [searchItem, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [allFilterValues, setAllFilterValues] = useState<{
    brand: string[];
    color: string[];
    transmission: string[];
    fuelType: string[];
    engineSize: string[];
    warranty: string[];
  }>({ brand: [], color: [], transmission: [], fuelType: [], engineSize: [], warranty: [] });

  const limit = 9;

  const searchFields = {
    sort,
    filter: selectedFilters,
    searchItem,
    page,
    limit,
  };

  const { data, isLoading } = useGetAllCarsQuery(searchFields);

  const products: Cars[] = data?.data?.result ?? [];
  console.log(products)
  const metaData = data?.data?.meta;

  // Populate allBrands only once when products arrive
  const getUniqueValues = (field: keyof Cars): string[] => {
    return [...new Set(products.map((product) => String(product[field])))];
  };

  // ✅ New: Load all options from products initially
  useEffect(() => {
    if (products.length > 0 && allFilterValues.brand.length === 0) {
      setAllFilterValues({
        brand: getUniqueValues("brand"),
        color: getUniqueValues("color"),
        transmission: getUniqueValues("transmission"),
        fuelType: getUniqueValues("fuelType"),
        engineSize: getUniqueValues("engineSize"),
        warranty: getUniqueValues("warranty")
      });
    }
  }, [products]);

  // Handlers
  const handleSort = (e: FieldValues) => setSort(e.target.value);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setSelectedFilters((prev) => {
      const currentValues = prev[field] || [];
      const updatedValues = isChecked
        ? [...currentValues, value]
        : currentValues.filter((v) => v !== value);

      return {
        ...prev,
        [field]: updatedValues,
      };
    });
  };

  const handleSearch = (e: FieldValues) => setSearchTerm(e.target.value);

  // Early returns after hooks
  if (isLoading) return <Loader />;


  const renderFilterSection = (title: string, field: keyof Cars, values: string[]) => (
    <div className="collapse collapse-plus bg-base-200 dark:bg-gray-900">
      <input type="radio" name="accordion" defaultChecked />
      <div className="collapse-title text-lg font-medium">{title}</div>
      <div className="collapse-content ml-4">
        <ul className="space-y-2 text-sm">
          {values.map((val, index) => (
            <li key={index} className="flex items-center">
              <input
                id={`${field}-${val}`}
                type="checkbox"
                value={val}
                checked={selectedFilters[field]?.includes(val) || false}
                onChange={(e) => handleFilterChange(e, field)}
                className="w-4 h-4 bg-gray-100 border-gray-300 rounded"
              />
              <label htmlFor={`${field}-${val}`} className="ml-2">
                {val}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>)

  return (
    <section className="bg-gray-50 antialiased dark:bg-gray-900 min-h-[calc(100vh-282px)] pb-6">
      <div>
        <h2 className="mt-3 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl p-6">
          Products
        </h2>
      </div>
      <div className="flex items-start justify-between pl-4">
        <div className="w-96 border border-gray-200 rounded-lg bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800 mt-20">
          <div className="space-y-4">
            {renderFilterSection("Brand", "brand", allFilterValues.brand)}
            {renderFilterSection("Color", "color", allFilterValues.color)}
            {renderFilterSection("Transmission", "transmission", allFilterValues.transmission)}
            {renderFilterSection("Fuel Type", "fuelType", allFilterValues.fuelType)}
            {renderFilterSection("Engine Size", "engineSize", allFilterValues.engineSize)}
            {renderFilterSection("Warranty", "warranty", allFilterValues.warranty)}
          </div>
        </div>
        <div className="w-full mx-4 px-4 2xl:px-0">

          <div className="mb-4 items-center justify-end space-y-4 sm:flex sm:space-y-0 md:mb-8">
            <div className="flex items-center space-x-4">
              <div className="mx-auto max-w-md">
                <form className="relative mx-auto w-max">
                  <input
                    type="search"
                    onChange={handleSearch}
                    className="peer cursor-pointer relative z-10 h-12 w-12 rounded-full border bg-transparent pl-12 outline-none focus:w-full focus:cursor-text focus:border-lime-300 focus:pl-16 focus:pr-4"
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

          {
            products.length === 0 ?
              <div className="flex items-center justify-center min-h-[calc(100vh-450px)]">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                  No products found
                </h2>
              </div> :
              <>
                <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 3xl:grid-cols-4">
                  {products.map((product: Cars) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
                <Pagination
                  align="center"
                  pageSize={metaData?.limit}
                  current={page}
                  onChange={(value) => setPage(value)}
                  total={metaData?.total}
                /></>
          }


        </div>
      </div>
    </section>
  );
};

export default Products;
