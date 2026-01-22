import { Banner } from "./components/Banner";
import HowItWorks from "./components/HowItWorks";
import NewArrivals from "./components/NewArrivals";
import PopularCars from "./components/PopularCars";
import WhyChooseUs from "./components/WhyChooseUs";

const Home = () => {
  return (
    <div>
      <Banner />
      <HowItWorks />
      <NewArrivals />
      <WhyChooseUs />
      <PopularCars />
    </div>
  );
};

export default Home;
