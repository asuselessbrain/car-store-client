import { Button } from "./components/ui/button";
import NavBar from "./pages/shared/NavBar";
import { useGetAllCarsQuery } from "./redux/api/baseApi";

function App() {
  const { data, isLoading } = useGetAllCarsQuery(undefined);

  if (isLoading) return <p>Loading...</p>;

  console.log(data.data);

  return (
    <>
      <div className="h-20 md:h-16">
        <NavBar />
      </div>
      <Button>Click me</Button>
    </>
  );
}

export default App;
