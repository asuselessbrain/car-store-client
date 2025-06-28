import { Banner } from "./components/Banner";
import NewArrivals from "./components/NewArrivals";
import PopularCars from "./components/PopularCars";

const Home = () => {
  return (
    <div>
      <Banner />
      <NewArrivals />
      <PopularCars />
    </div>
  );
};

export default Home;
