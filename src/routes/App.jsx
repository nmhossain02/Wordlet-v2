import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Welcome from "./Welcome";
import { Box } from "@chakra-ui/react";

function App() {
  const { pathname } = useLocation();

  return (
    <>
      <Navbar />
      <Box mt={5} mr={10} ml={10}>{pathname === "/" ? <Welcome /> : <Outlet />}</Box>
    </>
  );
}

export default App;
