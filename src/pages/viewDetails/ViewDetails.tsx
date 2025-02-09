import { useNavigate, useParams } from "react-router";
import Loader from "../shared/Loader";
import { cn } from "../../lib/utils";
import img from "../../assets/bannerImage/650.png";
import { useGetSingleCarQuery } from "../../redux/fetchers/cars/carApi";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { useCreateOrderMutation } from "../../redux/fetchers/orders/orderApi";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";

const ViewDetails = () => {
  const { id } = useParams();
  const [quantitySell, setQuantity] = useState(1);
  const navigate = useNavigate()

  const { data, isLoading } = useGetSingleCarQuery(id as string);
  const [createOrder] = useCreateOrderMutation();

  if (isLoading) {
    return <Loader />;
  }

  const product = data.data;

  // console.log(data);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1)); // Prevent negative values
  };

  const handleChange = (e: FieldValues) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(isNaN(value) || value < 1 ? 1 : value);
  };

  const handleOrder = async () => {
    const car = product?._id;
    const quantity = quantitySell;

    const orderInfo = {
      car,
      quantity,
    };
    try {
      const res = await createOrder(orderInfo).unwrap();
      if (res?.success) {
        toast.success(res?.message);
        navigate('/user/order')
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else if (typeof err === "object" && err !== null && "data" in err && typeof err.data === "object" && err.data !== null && "errorMessage" in err.data) {
        toast.error((err.data as { errorMessage: string }).errorMessage);
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 min-h-[calc(100vh-288px)] flex items-center justify-center w-full pt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-8">
            <div className="flex items-center justify-center w-full">
              <button
                onClick={handleDecrement}
                className="group py-4 px-6 border border-gray-400 dark:border-gray-700 rounded-l-full shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-300 dark:hover:shadow-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <MinusIcon />
              </button>
              <input
                type="number"
                onChange={handleChange}
                className="font-semibold text-gray-900 dark:text-gray-100 text-lg py-[13px] px-6 w-full lg:max-w-[118px] border-y border-gray-400 dark:border-gray-700 bg-transparent placeholder:text-gray-900 dark:placeholder:text-gray-400 text-center hover:bg-gray-50 dark:hover:bg-gray-800 focus-within:bg-gray-50 dark:focus-within:bg-gray-800 outline-0"
                value={quantitySell}
              />
              <button
                onClick={handleIncrement}
                className="group py-4 px-6 border border-gray-400 dark:border-gray-700 rounded-r-full shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-300 dark:hover:shadow-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <PlusIcon />
              </button>
            </div>
            <button
              onClick={handleOrder}
              className="bg-black text-white px-6 py-2 rounded-lg shadow-lg hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:shadow-gray-800"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
