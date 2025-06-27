import { useParams } from "react-router";
import Loader from "../shared/Loader";
import { cn } from "../../lib/utils";
import { useGetSingleCarQuery } from "../../redux/fetchers/cars/carApi";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useCreateOrderMutation } from "../../redux/fetchers/orders/orderApi";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import Review from "../dashboard/user/review/Review";
import { useGetSingleCarReviewQuery } from "../../redux/fetchers/review/reviewApi";
import ReactStars from "react-rating-stars-component";

export interface IReview {
  _id: string,
  carId: string,
  userId: { _id: string, firstName: string, lastName: string },
  ratting: number,
  comment: string,
  createdAt: string
}


const ViewDetails = () => {
  const { id } = useParams();
  const [quantitySell, setQuantity] = useState(1);
  const [imageIndex, setImageIndex] = useState(0);

  const { data, isLoading } = useGetSingleCarQuery(id as string);
  const { data: review, isLoading: reviewLoading } = useGetSingleCarReviewQuery(id as string);

  const [
    createOrder,
    {
      isLoading: createOrderLoading,
      isSuccess,
      data: createOrderData,
      isError,
      error,
    },
  ] = useCreateOrderMutation();



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
    await createOrder(orderInfo);
  };

  const toastId = "cart";

  useEffect(() => {
    if (createOrderLoading) {
      toast.loading("Processing ........", { id: toastId });
    }
    if (isSuccess) {
      toast.success(createOrderData?.message, { id: toastId });
      if (createOrderData?.data) {
        setTimeout(() => {
          window.location.href = createOrderData.data;
        }, 1000);
      }
    }
    if (isError) {
      const err = error as { data?: { errorMessage?: string } };
      toast.error(err?.data?.errorMessage ?? 'Something went wrong', { id: toastId });
    }
  }, [createOrderData?.data, createOrderData?.message, error, isError, createOrderLoading, isSuccess]);

  if (isLoading) {
    return <Loader />;
  }
  if (reviewLoading) {
    return <Loader />
  }

  const product = data?.data;

  const reviews = (review?.data)

  const averageRatting = reviews.length > 0
  ? reviews.reduce((sum:number, review:IReview) => sum + review.ratting, 0) / reviews.length
  : 0;


  return (
    <div className="flex justify-center flex-col max-w-full mx-auto px-6 min-h-[calc(100vh-288px)] w-full pt-10">
      <div className="flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1 items-center">
          {/* Product Image */}
          <div className="flex flex-col space-y-4">
            <img
              src={product?.images[imageIndex]}
              alt="Product"
              className="rounded-lg shadow-lg w-full h-96 object-cover dark:shadow-gray-800"
            />
            <div className="flex items-center gap-6 justify-between">
              {
                product?.images?.map((image: string, index: number) =>
                  <img key={index} src={image} alt="Product" onClick={() => setImageIndex(index)}
                    className={index === imageIndex ? "rounded-lg border-2 border-blue-500 w-full max-w-36 h-20 shadow-lg shadow-gray-800" : "rounded-lg shadow-lg w-full max-w-36 h-20 dark:shadow-gray-800"} />
                )
              }
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold mb-4 dark:text-white">
              {product?.name}
            </h1>
            <p className="dark:text-gray-300 mb-2">{product?.description}</p>

            {/* Price Section */}
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-2xl font-semibold text-red-600">
                {product?.price.toLocaleString()}{" "}
                <span className="text-gray-900 dark:text-gray-300">Tk</span>
              </span>
            </div>

            <div className="my-2">
              <p className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300">Average Review: <ReactStars
            count={5}
            value={averageRatting}
            size={24}
            isHalf={true}
            edit={false}
            activeColor="#ffd700"
          /><span className="text-sm">({reviews?.length})</span></p>
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
                      "text-green-500": product?.inStock === true,
                    },
                    { "text-red-500": !product?.inStock }
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
                <p className="dark:text-gray-300 text-gray-700">
                  <span className="font-semibold">Release:</span> {new Date(product?.releaseYear).getFullYear()}
                </p>
              </div>
            </div>

            {/* Product Info */}
            <div className="mb-4 space-y-3">
              <p className="dark:text-gray-300 text-gray-700">
                <span className="font-semibold">Brand:</span> {product?.brand}
              </p>
              <p className="dark:text-gray-300">
                <span className="font-semibold text-gray-700">Model:</span>{" "}
                {product?.model}
              </p>
            </div>

            <div>
              <p className="dark:text-gray-300 font-semibold text-gray-700 flex items-center gap-2">Tags: 
              {
                product?.tags?.map((tag:string, index:number)=><span key={index} className="mr-3 font-medium">#{tag} </span>)
              }</p>
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
      <div className="mt-10 border-b-2 border-solid border-gray-800 dark:border-gray-200">
        <p className="dark:text-black text-xl bg-black dark:bg-white text-white font-semibold inline-block border-2 border-solid border-gray-800 dark:border-gray-200 p-2 border-b-0 rounded-t-sm">Specification</p>
      </div>
      <div className="max-w-full bg-gray-100 dark:bg-gray-900 shadow rounded-md mt-6">
        <div className="flex justify-between border-b text-gray-800 dark:text-gray-300 border-gray-800 dark:border-gray-500 px-4 py-4 mx-2 text-left">
          <div className="font-semibold min-w-52">Brand</div>
          <div className="flex-1">{product?.brand}</div>
        </div>
        <div className="flex justify-between border-b text-gray-800 dark:text-gray-300 border-gray-800 dark:border-gray-500 px-4 py-4 mx-2 text-left">
          <div className="font-semibold min-w-52">Model</div>
          <div className="flex-1">{product?.model}</div>
        </div>
        <div className="flex justify-between border-b text-gray-800 dark:text-gray-300 border-gray-800 dark:border-gray-500 px-4 py-4 mx-2 text-left">
          <div className="font-semibold min-w-52">Release Year</div>
          <div className="flex-1">{new Date(product?.releaseYear).getFullYear()}</div>
        </div>
        <div className="flex justify-between border-b text-gray-800 dark:text-gray-300 border-gray-800 dark:border-gray-500 px-4 py-4 mx-2 text-left">
          <div className="font-semibold min-w-52">Body Type</div>
          <div className="flex-1">{product?.bodyType}</div>
        </div>
        <div className="flex justify-between border-b text-gray-800 dark:text-gray-300 border-gray-800 dark:border-gray-500 px-4 py-4 mx-2 text-left">
          <div className="font-semibold min-w-52">Color</div>
          <div className="flex-1">{product?.color}</div>
        </div>
        <div className="flex justify-between border-b text-gray-800 dark:text-gray-300 border-gray-800 dark:border-gray-500 px-4 py-4 mx-2 text-left">
          <div className="font-semibold min-w-52">Transmission</div>
          <div className="flex-1">{product?.transmission}</div>
        </div>
        <div className="flex justify-between border-b text-gray-800 dark:text-gray-300 border-gray-800 dark:border-gray-500 px-4 py-4 mx-2 text-left">
          <div className="font-semibold min-w-52">Fuel Type</div>
          <div className="flex-1">{product?.fuelType}</div>
        </div>
        <div className="flex justify-between border-b text-gray-800 dark:text-gray-300 border-gray-800 dark:border-gray-500 px-4 py-4 mx-2 text-left">
          <div className="font-semibold min-w-52">Engine Size</div>
          <div className="flex-1">{product?.engineSize}</div>
        </div>
        <div className="flex justify-between border-b text-gray-800 dark:text-gray-300 border-gray-800 dark:border-gray-500 px-4 py-4 mx-2 text-left">
          <div className="font-semibold min-w-52">Mileage</div>
          <div className="flex-1">{product?.mileage}</div>
        </div>
        <div className="flex justify-between border-b text-gray-800 dark:text-gray-300 border-gray-800 dark:border-gray-500 px-4 py-4 mx-2 text-left">
          <div className="font-semibold min-w-52">Category</div>
          <div className="flex-1">{product?.category}</div>
        </div>
        <div className="flex justify-between border-b text-gray-800 dark:text-gray-300 border-gray-800 dark:border-gray-500 px-4 py-4 mx-2 text-left">
          <div className="font-semibold min-w-52">Features</div>
          <div className="flex flex-col gap-2 w-full pl-2">
            {
              product?.features.map((item: string, index: number) => <li key={index} className="flex-1">{item}</li>)
            }
          </div>
        </div>
        <div className="flex justify-between px-4 py-4 mx-2 text-left">
          <div className="font-semibold min-w-52">
            Warranty Details
          </div>
          <div className="flex-1">{product?.warranty}</div>
        </div>
      </div>
      <div className="mt-10 border-b-2 border-solid border-gray-800 dark:border-gray-200">
        <p className="dark:text-black text-xl bg-black dark:bg-white text-white font-semibold inline-block border-2 border-solid border-gray-800 dark:border-gray-200 p-2 border-b-0 rounded-t-sm">Reviews</p>
      </div>
      <div className="my-4">
        <p className="font-semibold dark:tect-gray-800">Customer Reviews</p>
        {reviews?.slice(0,10)?.map((review: IReview, index: number) => <div key={index} className="p-4 w-full rounded-md bg-gray-200 dark:bg-gray-800 mt-4">
          <ReactStars
            count={5}
            value={review?.ratting}
            size={24}
            isHalf={true}
            edit={false}
            activeColor="#ffd700"
          />
          <p className="dark:text-gray-100">{review?.comment}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">by {review?.userId?.firstName} {review?.userId?.lastName}, {new Date(review?.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
          })}</p>
        </div>)

        }
      </div>
      <p className="font-semibold dark:tect-gray-800 mt-2">Your Review</p>
      <Review id={product?._id} />
    </div>
  );
};

export default ViewDetails;
