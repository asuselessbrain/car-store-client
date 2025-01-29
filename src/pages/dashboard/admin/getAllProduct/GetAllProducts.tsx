import { useGetAllCarsQuery } from "../../../../redux/fetchers/cars/carApi";
import { Cars } from "../../../products/Products";
import Loader from "../../../shared/Loader";
import GetAllProductBody from "./GetAllProductBody";

const GetAllProducts = () => {
  const { data, isLoading } = useGetAllCarsQuery(undefined);

  if (isLoading) {
    return <Loader />;
  }

  const products = data.data;
  return (
    <div className="relative overflow-x-auto max-h-[80vh] shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
          <th scope="col" className="px-6 py-3">
              Model
            </th>
            <th scope="col" className="px-6 py-3">
              Brand
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
        {products.map((product: Cars, index: number) => (
          <GetAllProductBody key={product._id} product={product} index={index} />
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetAllProducts;
