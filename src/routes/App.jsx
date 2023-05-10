import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Welcome from "./Welcome";

function App() {
  const { pathname } = useLocation();

  return (
    <>
      <Navbar />
      {pathname === "/" ? <Welcome /> : <Outlet />}
    </>
  );
}

export default App;
