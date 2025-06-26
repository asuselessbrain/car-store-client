import { useGetSingleUserReviewsQuery } from "../../../../redux/fetchers/review/reviewApi";
import Loader from "../../../shared/Loader";
import ReactStars from "react-rating-stars-component";

interface Review {
    _id: string;
    userId: {
        _id: string;
        firstName: string;
        lastName: string;
    };
    ratting: number;
    comment: string;
    createdAt: string;
}

const ShowReview = () => {

    const { data: userReview, isLoading: reviewLoading } =
        useGetSingleUserReviewsQuery(undefined);

        if(reviewLoading){
            return <Loader />
        }

    const reviews = userReview?.data;
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                    <tr>
                        <th className="px-4 py-2 border">#</th>
                        <th className="px-4 py-2 border">Rating</th>
                        <th className="px-4 py-2 border">Comment</th>
                        <th className="px-4 py-2 border">Date</th>
                        <th className="px-4 py-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="text-center py-4 text-gray-500">
                                No reviews found.
                            </td>
                        </tr>
                    ) : (
                        reviews.map((review: Review, index: number) => (
                            <tr key={review._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 text-center">
                                <td className="px-4 py-2 border">{index + 1}</td>
                                <td className="px-4 py-2 border"><div className="flex items-center justify-center">
                                    <ReactStars
                                            count={5}
                                            value={review?.ratting}
                                            size={24}
                                            isHalf={true}
                                            edit={false}
                                            activeColor="#ffd700"
                                          />
                                    </div></td>

                                <td className="px-4 py-2 border cursor-pointer text-left" title={review?.comment}>
                                    {review?.comment?.length > 60
                                        ? `${review?.comment?.substring(0, 80)}...`
                                        : review?.comment}
                                </td>
                                <td className="px-4 py-2 border">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-2 border space-x-2">
                                    <button
                                        // onClick={() => onEdit(review._id)}
                                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        // onClick={() => onDelete(review._id)}
                                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ShowReview;
