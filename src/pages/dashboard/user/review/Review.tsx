import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import ReactStars from "react-rating-stars-component";
import { useCreateReviewsMutation } from "../../../../redux/fetchers/review/reviewApi";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export class CustomError extends Error {
  data?: { errorMessage?: string };
  constructor(message: string, data?: { errorMessage?: string }) {
    super(message);
    this.data = data;
  }
}
const Review = ({id}: {id: string}) => {
  const [ratting, setRatting] = useState(0);
  const [createRating, { isError, data, isSuccess, isLoading }] =
    useCreateReviewsMutation();

  const navigate = useNavigate();

  const ratingChanged = (newRating: number) => {
    setRatting(newRating);
  };

  const handleReview = async (e: FieldValues) => {
    e.preventDefault();
    const review = e.target.review.value;

    const reviewInfo = {
      carId: id,
      comment: review,
      ratting: ratting,
    };

    await createRating(reviewInfo);
  };

  const toastId = "rating";

  useEffect(() => {
    if (isLoading) {
      toast.loading("processing.....", { id: toastId });
    }
    if (isSuccess) {
      toast.success(data?.message, { id: toastId });
      navigate("/");
    }
  }, [
    data?.message,
    isError,
    isLoading,
    isSuccess,
    navigate,
  ]);
  return (
    <div className="p-4 mx-auto bg-gray-200 dark:bg-gray-800 rounded-lg mt-6 shadow-md w-full sm:p-6">
      <div>
        <form className="space-y-4" onSubmit={handleReview}>
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Write a review
          </h2>
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={24}
            activeColor="#ffd700"
          />
          <textarea
            id="review"
            name="review"
            rows={4}
            required
            className="block w-full p-3 text-sm text-gray-900 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400"
            placeholder="Write your review"
          ></textarea>
          <div className="text-right py-4">
            <button
              type="submit"
              className="text-white bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-400 font-semibold rounded-lg text-sm px-5 py-3"
            >
              Post Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Review;
