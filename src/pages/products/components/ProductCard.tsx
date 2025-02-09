// import { Cars } from "../Products";

import { FaCircleArrowRight } from "react-icons/fa6";
import { Cars } from "../Products";
import { Link } from "react-router";

export interface Car {
  product: Cars;
}

const ProductCard = ({ product }: Car) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="h-56 w-full">
        <a href="#">
          <img
            className="mx-auto h-full"
            src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
            alt=""
          />
        </a>
      </div>
      <div className="pt-6">
        <a
          href="#"
          className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
        >
          {/* TO DO */}
          Product Name
        </a>

        <div className="mt-4 flex items-center gap-2 justify-between">
          <h2 className="text-sm">
            Brand: <span className="font-semibold">{product.brand}</span>
          </h2>
          <h2 className="text-sm">
            Model: <span className="font-semibold">{product.model}</span>
          </h2>
        </div>

        <div className="mt-2 flex items-center gap-2 justify-between">
          <h2 className="text-sm">
            Category: <span className="font-semibold">{product.category}</span>
          </h2>
        </div>

        <div className="mt-4 flex items-center justify-between gap-2">
          <p className="text-xl font-bold leading-tight text-red-600 dark:text-red-600">
            <span className="font-medium text-gray-900 dark:text-white text-base">
              Price:{" "}
            </span>
            {product?.price}
          </p>

          <Link to={`/view-details/${product._id}`}>
            <button
              type="button"
              className="inline-flex gap-2 items-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-black dark:text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              View Details
              <FaCircleArrowRight size={16} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
