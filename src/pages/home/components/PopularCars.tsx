import { useGetPopularCarQuery } from "../../../redux/fetchers/cars/carApi";
import { Cars } from "../../products/Products";
import Loader from "../../shared/Loader";
import ReUsableHomePageCarsSection from "./ReUsableHomePageCarsSection";

const PopularCars = () => {
  const { data, isLoading } = useGetPopularCarQuery(undefined);

  if (isLoading) return <Loader />;

  const products = data?.data || [];




  const popularCars = products?.map((p: {_id: string, totalQuantity: number, carDetails: Cars})=>p?.carDetails)

  return (
    <>{
      popularCars?.length > 0 ? <ReUsableHomePageCarsSection carData={popularCars} header="Popular Car" /> : <p>No product found</p>
    }</>
    
  );
};

export default PopularCars;
