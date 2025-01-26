import { Outlet } from "react-router";
import NavBar from "./pages/shared/NavBar";

function App() {
  

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
