import { Box, Center, Link } from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom"

export default function Navbar() {
  const NavbarItem = ({ text, route }) => (
    <Box m={4} p={1} borderBottom="1px solid black">
      <Link as={RouteLink} to={route} >{text}</Link>
    </Box>
  );
  return (
    <Center w="100%" display="fixed">
      <NavbarItem text="Welcome" route="/" />
      <NavbarItem text="Sets" route="/sets" />
      <NavbarItem text="Play" route="/play" />
    </Center>
  );
}
