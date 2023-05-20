import { Box, Center, HStack, VStack } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import WordleRound from "../../util/WordleRound";
import { motion, animate } from "framer-motion";

function Round({ gameState, target }) {
  const lastEntered = useRef(null);
  const lastDeleted = useRef(null);
  const lastGuessed = useRef(null);
  const lastInput = useRef(null);
  const Guess = ({ guess, index, ...rest }) => {
    const { current = false } = { ...rest };
    const Letter = ({ letter, color, index }) => {
      const colorMap = {
        green: "green.500",
        gray: "gray.500",
        yellow: "yellow.500",
      };
      const anmLetter = current && index === currentIndex.current - 1;
      const anmBackspace = current && index === currentIndex.current;
      return (
        <Center
          as={motion.div}
          w={10}
          h={10}
          bgColor={colorMap[color]}
          color="white"
          ref={anmLetter ? lastEntered : anmBackspace ? lastDeleted : null}
        >
          {letter}
        </Center>
      );
    };
    const isLastGuessed = index === round.current.getGuesses().length - 1;

    return (
      <HStack
        as={motion.div}
        ref={isLastGuessed ? lastGuessed : null}
      >
        {guess.map((l, index) => (
          <Letter {...l} index={index} key={index} />
        ))}
      </HStack>
    );
  };

  const round = useRef(new WordleRound(target));

  useEffect(() => {
    if (target !== round.current.getTarget()) {
      round.current = new WordleRound(target);
      setCurrentGuess(emptyGuess());
      currentIndex.current = 0;
      currentGuessString.current = "";
    }
  }, [target]);

  // https://medium.com/geographit/accessing-react-state-in-event-listeners-with-usestate-and-useref-hooks-8cceee73c559
  const emptyGuess = () =>
    Array(round.current.getTarget().length).fill({ letter: "", color: "gray" });
  const [currentGuess, setCurrentGuess] = useState(emptyGuess());
  const currentIndex = useRef(0);
  const currentGuessString = useRef("");

  useEffect(() => {
    currentGuessString.current = currentGuess.map((l) => l.letter).join("");
    if (lastEntered.current && lastInput.current !== "Backspace") {
      animate(lastEntered.current, { scale: [0.5, 1.0] }, { duration: 0.25 });
    }
    else if (lastDeleted.current && lastInput.current === "Backspace") {
      animate(lastDeleted.current, { opacity: [0.5, 1.0] }, { duration: 0.25 });
    }
    // else if (lastGuessed.current && lastInput.current === "Enter") {
    //   animate(lastGuessed.current, { y: [0, -10, 0], opacity: [0.5, 0.5, 1.0] }, { duration: 0.25 });
    // }
  }, [currentGuess]);

  const keyDownHandler = (event) => {
    if (round.current.getGameWon()) {
      return;
    }
    lastInput.current = event.key;
    const isAlnum = (x) =>
      (x >= 48 && x <= 57) || (x >= 65 && x <= 90) || (x >= 97 && x <= 122); // from https://stackoverflow.com/questions/34687895/determine-if-a-letter-or-a-number-was-pressed-javascript

    let newGuess = {};
    let newIndex = null;
    let maxLength = round.current.getTarget().length;
    if (isAlnum(event.keyCode) && currentIndex.current < maxLength) {
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
      newGuess = { letter: "", color: "gray" };
      newIndex = currentIndex.current;
    } else if (event.key === "Enter") {
      if (currentIndex.current === maxLength) {
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
        <Guess guess={g} key={index} index={index} />
      ))}
      {!round.current.getGameWon() && <Guess guess={currentGuess} current />}
      <Box>{round.current.getGameWon() && "Correcly guessed!"}</Box>
    </VStack>
  );
}

export { Round };
