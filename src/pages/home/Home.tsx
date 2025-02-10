import { Banner } from "./components/Banner";
import FeaturedProducts from "./components/Featured";
import Responsive from "./components/Testimonial";

const Home = () => {
  return (
    <div>
      <Banner />
      <FeaturedProducts />
      <Responsive />
    </div>
  );
};

export default Home;
