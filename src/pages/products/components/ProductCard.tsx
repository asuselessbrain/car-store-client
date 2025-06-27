import { useGetSingleCarReviewQuery } from "../../../redux/fetchers/review/reviewApi";
import { IReview } from "../../viewDetails/ViewDetails";
import { Cars } from "../Products";
import { Link } from "react-router";
import ReactStars from "react-rating-stars-component";
import Loader from "../../shared/Loader";

export interface Car {
  product: Cars;
}


const ProductCard = ({ product }: Car) => {
  const { data: review, isLoading: reviewLoading } = useGetSingleCarReviewQuery(product?._id as string);

  const reviews = (review?.data)

  const averageRatting = reviews?.length > 0 ? reviews.reduce((sum: number, review: IReview) => sum+review?.ratting, 0) / reviews?.length : 0;

  if(reviewLoading){
    return <Loader />
  }

  return (
    <Link to={`/view-details/${product?._id}`} className="rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="h-40 w-full">
        <Link to={`/view-details/${product?._id}`}>
          <img
            className="mx-auto w-full rounded-sm h-full shadow-md"
            src={product?.images[0]}
            alt=""
          />
        </Link>
      </div>

      <div className="pt-6">
        <div className="flex items-center gap-1">
          <ReactStars
                    count={5}
                    value={averageRatting}
                    size={24}
                    isHalf={true}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p className="text-xs">({averageRatting.toFixed(1)})</p>
        </div>
        <Link to={`/view-details/${product?._id}`}
          className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
        >
          {product?.name}
        </Link>

        <div className="mt-4 flex items-center justify-between gap-2">
          <p className="text-xl font-bold leading-tight text-red-600 dark:text-red-600">
            {product?.price.toLocaleString()} Tk
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
