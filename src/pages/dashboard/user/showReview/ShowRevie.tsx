import { useState } from "react";
import Swal from "sweetalert2";
import { useDeleteReviewMutation, useGetSingleUserReviewsQuery, useUpdateReviewMutation } from "../../../../redux/fetchers/review/reviewApi";
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
    const { data: userReview, isLoading: reviewLoading, refetch } = useGetSingleUserReviewsQuery(undefined);
    const [deleteReview, { isLoading: deleteLoading }] = useDeleteReviewMutation();
    const [updateReview] = useUpdateReviewMutation();

    const [selectedReview, setSelectedReview] = useState<Review | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [editComment, setEditComment] = useState("");
    const [editRating, setEditRating] = useState(0);

    if (reviewLoading) {
        return <Loader />;
    }

    const reviews = userReview?.data || [];

    const handleDelete = async (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteReview(id).unwrap();
                    Swal.fire("Deleted!", "Review has been deleted.", "success");
                    refetch();
                } catch (error) {
                    Swal.fire("Error!", "There was a problem deleting the review.", "error");
                }
            }
        });
    };

    const handleEditClick = (review: Review) => {
        setSelectedReview(review);
        setEditComment(review.comment);
        setEditRating(review.ratting);
        setShowModal(true);
    };

    const handleUpdate = async () => {
        try {
            await updateReview({

                reviewInfo: {
                    reviewId: selectedReview?._id,
                    comment: editComment,
                    ratting: editRating,
                },
            }).unwrap();

            Swal.fire("Updated!", "Review has been updated.", "success");
            setShowModal(false);
        } catch (error) {
            Swal.fire("Error!", "Failed to update review.", "error");
        }
    };

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
                    {reviews.length == 0 ? (
                        <tr>
                            <td colSpan={6} className="text-center py-4 text-gray-500">
                                No reviews found.
                            </td>
                        </tr>
                    ) : (
                        reviews.map((review: Review, index: number) => (
                            <tr key={review._id} className="hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700 text-center">
                                <td className="px-4 py-2 border">{index + 1}</td>
                                <td className="px-4 py-2 border">
                                    <div className="flex items-center justify-center">
                                        <ReactStars
                                            count={5}
                                            value={review?.ratting}
                                            size={24}
                                            isHalf={true}
                                            edit={false}
                                            activeColor="#ffd700"
                                        />
                                    </div>
                                </td>
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
                                        onClick={() => handleEditClick(review)}
                                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(review?._id)}
                                        disabled={deleteLoading}
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

            {/* MODAL */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
                    <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md space-y-4">
                        <h2 className="text-xl font-bold mb-2">Edit Review</h2>

                        <label className="block text-sm font-medium">Rating</label>
                        <ReactStars
                            count={5}
                            value={editRating}
                            size={28}
                            isHalf={true}
                            activeColor="#ffd700"
                            onChange={(newValue: number) => setEditRating(newValue)}
                        />

                        <label className="block text-sm font-medium">Comment</label>
                        <textarea
                            value={editComment}
                            onChange={(e) => setEditComment(e.target.value)}
                            rows={4}
                            className="w-full border border-gray-300 p-2 rounded"
                        ></textarea>

                        <div className="flex justify-end space-x-2 mt-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdate}
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowReview;
