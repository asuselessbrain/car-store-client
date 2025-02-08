import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useGetAllReviewsQuery } from "../../../redux/fetchers/review/reviewApi";
import Loader from "../../shared/Loader";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";

function Responsive() {
  const { data, isLoading } = useGetAllReviewsQuery(undefined);

  if (isLoading) {
    return <Loader />;
  }

  const reviews = data?.data;
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 3000,
        },
      },
    ],
  };

  type User = {
    _id: string;
    email: string;
    name: string;
    role: string;
  };

  return (
    <div className="slider-container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl md:text-center">
        <h2 className="font-display text-xl md:text3xl lg:text-4xl tracking-tight text-slate-900 dark:text-white font-semibold font-cinzel my-8">
          What Our Customers Are Saying
        </h2>
      </div>
      <Slider {...settings}>
        {reviews.map(
          (
            slide: {
              _id: string;
              ratting: number;
              userId: User;
              comment: string;
            },
            index: number
          ) => (
            <div key={index}>
              <div className="dark:bg-gray-900 bg-gray-200 dark:text-white p-4 rounded-lg h-[200px] mx-2">
                {/* Star Ratings */}
                <Rating style={{ maxWidth: 100 }} value={slide?.ratting} readOnly />
                {/* Title */}
                <div className="mt-4">
                  <p className="font-bold text-rose-600 dark:text-rose-400 sm:text-2xl">
                    {slide?.userId?.name}
                  </p>
                  {/* Description */}
                  <p className="mt-4 leading-relaxed text-gray-700 dark:text-gray-300">
                    {slide?.comment}
                  </p>
                </div>
              </div>
            </div>
          )
        )}
      </Slider>
    </div>
  );
}

export default Responsive;
