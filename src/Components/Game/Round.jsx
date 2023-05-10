import { Box, HStack, VStack } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import WordleRound from "../../util/WordleRound";

function Round({ gameState, target }) {
  const Guess = ({ guess }) => {
    const Letter = ({ letter, color }) => {
      const colorMap = {
        green: "green.500",
        gray: "gray.500",
        yellow: "yellow.500",
      };
      return (
        <Box bgColor={colorMap[color]} color="white">
          {letter}
        </Box>
      );
    };
    return (
      <HStack>
        {guess.map((l, index) => (
          <Letter {...l} key={index} />
        ))}
      </HStack>
    );
  };

  const round = useRef(new WordleRound(target));

  useEffect(() => {
    round.current = new WordleRound(target);
  }, [target])

  const emptyGuess = Array(target.length).fill({ letter: "-", color: "gray" });
  const [currentGuess, setCurrentGuess] = useState(emptyGuess);
  const currentIndex = useRef(0);
  const currentGuessString = useRef("");

  useEffect(() => {
    currentGuessString.current = currentGuess.map((l) => l.letter).join("");
  }, [currentGuess])

  const keyDownHandler = (event) => {
    if (round.current.getGameWon()) {
      return;
    }
    const isAlnum = (x) =>
      (x >= 48 && x <= 57) || (x >= 65 && x <= 90) || (x >= 97 && x <= 122); // from https://stackoverflow.com/questions/34687895/determine-if-a-letter-or-a-number-was-pressed-javascript
    
    let newGuess = {};
    let newIndex = null;
    if (isAlnum(event.keyCode) && currentIndex.current < target.length) {
      newGuess = {
        letter: event.key.toUpperCase(),
        color: "gray",
      };
      newIndex = currentIndex.current;
      currentIndex.current++;
    } else if (event.key === "Backspace") {
      currentIndex.current--;
      if (currentIndex.current < 0) {
        currentIndex.current = 0;
      }
      newGuess = { letter: "-", color: "gray" };
      newIndex = currentIndex.current;
    } else if (event.key === "Enter") {
      if (currentIndex.current === target.length) {
        round.current.enterGuess(currentGuessString.current);
        currentIndex.current = 0;
        setCurrentGuess(emptyGuess);
      }
    }
    if (newIndex !== null) {
      setCurrentGuess((prev) => {
        const newGuessArray = [...prev];
        newGuessArray[newIndex] = newGuess;
        return newGuessArray;
      });
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  return (
    <VStack>
      {round.current.getGuesses().map((g, index) => (
        <Guess guess={g} key={index} />
      ))}
      {!round.current.getGameWon() && <Guess guess={currentGuess} />}
      <Box>{round.current.getGameWon() && "Correcly guessed!"}</Box>
    </VStack>
  );
}

export { Round };
