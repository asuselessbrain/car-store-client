import { Banner } from "./components/Banner";
import NewArrivals from "./components/NewArrivals";
import PopularCars from "./components/PopularCars";

const Home = () => {
  return (
    <div>
      <Banner />
      <NewArrivals />
      <div className="mt-12">
        <img className="rounded-md" src="https://i.ibb.co/ycqw3NhM/auauto-deals-affordable-prices-great-deals-best-experience-order-now-www-reallygreatsite-com-qualiti.png" alt="offer image" />
      </div>
      <PopularCars />
    </div>
  );
};

export default Home;
