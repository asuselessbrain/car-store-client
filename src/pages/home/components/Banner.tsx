import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import image1 from "../../../assets/bannerImage/image1.png";
import image2 from "../../../assets/bannerImage/image3.png";
import image3 from "../../../assets/bannerImage/image2.png";
import image4 from "../../../assets/bannerImage/image4.png";

const images = [
    {
        src: image1,
        alt: "Image 1"
    },
    {
        src: image2,
        alt: "Image 1"
    },
    {
        src: image3,
        alt: "Image 1"
    },
    {
        src: image4,
        alt: "Image 1"
    }
];

export const Banner = () => {
  return (
    <Carousel>
      {images.map((image) => (
        <div key={image.src}>
          <img src={image.src} alt={image.alt} />
        </div>
      ))}
    </Carousel>
  );
};
