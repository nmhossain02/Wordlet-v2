import { Box, Button, Checkbox, HStack, Heading } from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";
import { useAppConsumer } from "../../util/Context";

export default function Set({ set, index }) {
  const { name = "Untitled set", cards = [], active } = { ...set };
  const len = cards.length;
  const { setSets } = useAppConsumer();

  const Card = ({ card }) => (
    <Box>
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
  }

  return (
    <Box>
      <Heading>{name}</Heading>
      {len + " term" + (len > 1 ? "s" : "")}
      <HStack>
        {cards.map((card, i) => (
          <Card card={card} key={i} />
        ))}
        <Button>
          <RouteLink to={index.toString()}>Edit</RouteLink>
        </Button>
        <Button onClick={removeHandlerMaker(index)}>Remove</Button>
      </HStack>
      <Checkbox onChange={toggleActiveMaker(index)} isChecked={active} />
    </Box>
  );
}
