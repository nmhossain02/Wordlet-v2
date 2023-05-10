import { useState } from "react";
import { Round } from "./Round";

export default function Game({ sets }) {
  const allCards = [].concat(...sets);
  const [gameState, setGameState] = useState("not started");
  const [currentCard, setCurrentCard] = useState(
    allCards.length > 0 ? allCards[0] : {}
  );
  return <>
    "Game Object"
    <Round gameState={gameState} target={currentCard.term} />
  </>
}
