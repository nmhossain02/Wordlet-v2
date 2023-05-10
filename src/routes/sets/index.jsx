import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Set from "../../Components/Set";
import { AppContext } from "../../util/Context";
import React, { useEffect } from "react";
import { Button } from "@chakra-ui/react";

export default function SetsPage() {
  const { sets, setSets } = React.useContext(AppContext);
  const { pathname } = useLocation();

  const [redirect, setRedirect] = React.useState(false);
  const navigate = useNavigate();

  const addHandler = () => {
    const newSet = {
      name: "New set",
      cards: [
        {
          term: "New term",
          definition: "New definition",
        },
      ],
    };
    setSets((prev) => {
      setRedirect(true);
      return [...prev, newSet];
    });
  };

  useEffect(() => {
    if (redirect) {
      setRedirect(false);
      navigate("/sets/" + (sets.length - 1));
    }
  }, [sets]);

  return pathname === "/sets" ? (
    <>
      {sets.map((set, index) => (
        <Set index={index} set={set} key={index} />
      ))}
      <Button onClick={addHandler}>Add set</Button>
    </>
  ) : (
    <>
      <Outlet />
    </>
  );
}
