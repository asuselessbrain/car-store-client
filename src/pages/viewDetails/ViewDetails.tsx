import { useParams } from "react-router";
import Loader from "../shared/Loader";
import { cn } from "../../lib/utils";
import img from "../../assets/bannerImage/650.png";
import { useGetSingleCarQuery } from "../../redux/fetchers/cars/carApi";

const ViewDetails = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetSingleCarQuery(id as string);

  if (isLoading) {
    return <Loader />;
  }

  const product = data.data;

  console.log(data);

  return (
    <div className="max-w-7xl mx-auto px-6 min-h-[calc(100vh-280px)] pt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="flex justify-center">
          <img
            src={img}
            alt="Product"
            className="rounded-lg shadow-lg w-full max-w-md dark:shadow-gray-800"
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4 dark:text-white">
            Product Name
          </h1>
          <p className="dark:text-gray-300 mb-2">{product.description}</p>
          <div className="text-sm text-gray-500 mb-2 dark:text-gray-400">
            RATING :
          </div>

          {/* Price Section */}
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-2xl font-semibold text-red-600">
              {product.price}{" "}
              <span className="text-gray-900 dark:text-gray-300">Tk</span>
            </span>
          </div>

          <div className="flex items-center justify-start mb-4 gap-6">
            {/* Availability */}
            <div>
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                Available:
              </span>
              <span
                className={cn(
                  "ml-2 font-semibold",
                  {
                    "text-green-500": product.inStock === true,
                  },
                  { "text-red-500": !product.inStock }
                )}
              >
                {product.inStock ? (
                  <>
                    <span>IN STOCK ✅</span>
                  </>
                ) : (
                  <>
                    <span>Out of Stock</span> <span>❌</span>
                  </>
                )}
              </span>
            </div>
            <div>
            <p className="dark:text-gray-300">
              <span className="font-semibold">Release:</span> {product.year}
            </p>
            </div>
          </div>

          {/* Product Info */}
          <div className="mb-4 space-y-1">
            <p className="dark:text-gray-300">
              <span className="font-semibold">Brand:</span> {product.brand}
            </p>
            <p className="dark:text-gray-300">
              <span className="font-semibold">Category:</span>{" "}
              {product.category}
            </p>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center border rounded-lg dark:border-gray-600">
              <button className="px-3 py-1 text-gray-600 dark:text-gray-300">
                -
              </button>
              <input
                type="number"
                defaultValue="1"
                className="w-12 text-center border-l border-r dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
              />
              <button className="px-3 py-1 text-gray-600 dark:text-gray-300">
                +
              </button>
            </div>
            <button className="bg-black text-white px-6 py-2 rounded-lg shadow-lg hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:shadow-gray-800">
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
