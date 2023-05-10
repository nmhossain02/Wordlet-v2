import { Fragment, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppConsumer } from "../../util/Context";
import { Button, HStack, Heading, Input, Textarea } from "@chakra-ui/react";
import Set from "../../Components/Set";

export default function AddSetPage() {
  const { setId } = useParams();
  const { sets, setSets } = useAppConsumer();
  const badId = setId < 0 || setId >= sets.length;
  const thisSet = badId ? null : JSON.parse(JSON.stringify(sets[setId]));
  const [setCopy, setSetCopy] = useState(thisSet);
  const [dirty, setDirty] = useState(false);
  const changeHandlerMaker = (index, type) => (e) => {
    const copy = { ...setCopy };
    copy.cards[index][type] = e.target.value;
    setSetCopy(copy);
    setDirty(true);
  };
  const saveHandler = () => {
      setSets(prev => {
        const copy = [...prev];
        copy[setId] = setCopy;
        return copy;
      });
      // setSets([{name: "Dummy set", cards: [{term: "New term", definition: "New definition"}]}]);
    setDirty(false);
  };
  const addHandler = () => {
    const copy = { ...setCopy };
    copy.cards.push({ term: "New term", definition: "New definition" });
    setSetCopy(copy);
    setDirty(true);
  };
  const removeHandlerMaker = (index) => () => {
    const copy = { ...setCopy };
    copy.cards.splice(index, 1);
    setSetCopy(copy);
    setDirty(true);
  };

  return badId ? (
    "Invalid setId"
  ) : (
    <>
      <Heading size="md">{thisSet.name}</Heading>
      {setCopy.cards.map((card, index) => (
        <Fragment key={index}>
          <HStack>
            <Input
              onChange={changeHandlerMaker(index, "term")}
              type="text"
              value={card.term}
            />
            <Button onClick={removeHandlerMaker(index)}>Remove card</Button>
          </HStack>
          <Textarea
            onChange={changeHandlerMaker(index, "definition")}
            value={card.definition}
          />
        </Fragment>
      ))}
      <Button onClick={addHandler}>Add card</Button>
      <Button onClick={saveHandler} isDisabled={!dirty}>
        Save changes
      </Button>
    </>
  );
}
