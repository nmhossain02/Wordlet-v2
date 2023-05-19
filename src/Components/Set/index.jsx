import { Box, Button, Checkbox, HStack, Heading } from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";
import { useAppConsumer } from "../../util/Context";

export default function Set({ set, index }) {
  const { name = "Untitled set", cards = [], active } = { ...set };
  const len = cards.length;
  const { setSets } = useAppConsumer();

  const Card = ({ card }) => (
    <Box
      borderRadius="md"
      borderWidth="1px"
      p={4}
      shadow="md"
      minH="20vh"
      minW="15vw"
    >
      <Heading size="sm">{card.term}</Heading>
      {card.definition}
    </Box>
  );

  const removeHandlerMaker = (index) => () => {
    setSets((prev) => {
      const copy = [...prev];
      copy.splice(index, 1);
      return copy;
    });
  };

  const toggleActiveMaker = (index) => () => {
    setSets((prev) => {
      const copy = [...prev];
      copy[index].active = !copy[index].active;
      return copy;
    });
  };

  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      mb={3}
      shadow="md"
      maxW="40vw"
    >
      <Heading>{name}</Heading>
      {len + " term" + (len > 1 ? "s" : "")}
      <HStack
        mt={2}
        overflowX="auto"
        spacing={2}
        sx={{
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "lightgrey",
            borderRadius: "24px",
          },
        }}
      >
        {cards.map((card, i) => (
          <Card card={card} key={i} />
        ))}
      </HStack>
      <HStack mt={2}>
        <Checkbox onChange={toggleActiveMaker(index)} isChecked={active} />
        <Button>
          <RouteLink to={index.toString()}>Edit</RouteLink>
        </Button>
        <Button onClick={removeHandlerMaker(index)}>Remove</Button>
      </HStack>
    </Box>
  );
}
