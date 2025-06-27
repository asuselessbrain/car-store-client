import { useNavigate } from "react-router-dom";
import ProductCard from "../../products/components/ProductCard";
import { Cars } from "../../products/Products";
import { useGetAllCarsQuery } from "../../../redux/fetchers/cars/carApi";
import Loader from "../../shared/Loader";
import { Button } from "../../../components/ui/button";

const NewArrivals = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllCarsQuery(undefined);

  if (isLoading) return <Loader />;

  const products = data?.data?.result || [];

  const newArrivals = products?.slice(0, 8) || [];

  return (
    <div className="p-6">
      <h2 className="font-display text-xl md:text3xl lg:text-4xl tracking-tight text-slate-900 dark:text-white font-semibold font-cinzel my-8 text-center">
        New Arrivals
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {newArrivals.map((product: Cars) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <div className="flex items-center justify-center w-full mt-8">
        <Button
          onClick={() => navigate("/products")}
        >
          Show More
        </Button>
      </div>
    </div>
  );
};

export default NewArrivals;
