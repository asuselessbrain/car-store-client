import { Outlet } from "react-router";
import NavBar from "./pages/shared/NavBar";
import { useGetAllCarsQuery } from "./redux/api/baseApi";

function App() {
  const { data, isLoading } = useGetAllCarsQuery(undefined);

  if (isLoading) return <p>Loading...</p>;

  console.log(data.data);

  return (
    <div className="max-w-[1440px] mx-auto">
      <div className="">
        <NavBar />
      </div>
      <Outlet />
    </div>
  );
}

export default App;
