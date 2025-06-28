import { useGetAllCarsQuery } from "../../../redux/fetchers/cars/carApi";
import Loader from "../../shared/Loader";
import ReUsableHomePageCarsSection from "./ReUsableHomePageCarsSection";

const NewArrivals = () => {
  const { data, isLoading } = useGetAllCarsQuery(undefined);

  if (isLoading) return <Loader />;

  const products = data?.data?.result || [];

  const newArrivals = products?.slice(0, 8) || [];

  return (
    <ReUsableHomePageCarsSection carData={newArrivals} header="New Arrivals" />
  );
};

export default NewArrivals;
