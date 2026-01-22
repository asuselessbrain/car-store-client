import { Banner } from "./components/Banner";
import NewArrivals from "./components/NewArrivals";
import PopularCars from "./components/PopularCars";
import WhyChooseUs from "./components/WhyChooseUs";

const Home = () => {
  return (
    <div>
      <Banner />
      <NewArrivals />
      <WhyChooseUs />
      <PopularCars />
    </div>
  );
};

export default Home;
