import { Outlet } from "react-router";
import NavBar from "./pages/shared/NavBar";
import Footer from "./pages/shared/Footer";

function App() {
  return (
    <div className="max-w-[1440px] mx-auto">
      <NavBar />
      <div className="pt-20">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
