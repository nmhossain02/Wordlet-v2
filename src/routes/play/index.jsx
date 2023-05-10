import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppConsumer } from "../../util/Context";
import { Box, Button, HStack } from "@chakra-ui/react";
import { Round } from "../../Components/Game/Round";

export default function PlayPage() {
  const { sets } = useAppConsumer();
  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const mod = (n, r) => ((n % r) + r) % r;

  useEffect(() => {
    setCards(
      sets
        .filter((set) => set.active)
        .reduce((acc, set) => acc.concat(set.cards), [])
    );
  }, [sets, currentCardIndex]);

  useEffect(() => {
    setCurrentCardIndex((prev) =>
      cards.length == 0 ? 0 : mod(prev, cards.length)
    );
  }, [cards]);

  const roundElement = useRef();

  const indexChanger = (direction) => (event) => {
    setCurrentCardIndex(mod((currentCardIndex + direction), cards.length));
    event.target.blur(); // https://stackoverflow.com/questions/38044463/react-how-to-i-get-a-react-component-button-to-lose-focus
  };

  return cards.length > 0 ? (
    <>
      Number of terms in play: {cards.length}
      <HStack>
        <Button onClick={indexChanger(-1)}> prev </Button>
        <Button onClick={indexChanger(+1)}> next </Button>
      </HStack>
      Definition: {cards[currentCardIndex].definition}
      <Round ref={roundElement} target={cards[currentCardIndex].term} gameState={""}/>
    </>
  ) : (
    "no sets are active"
  );
}
