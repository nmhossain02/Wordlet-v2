import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AppContext = createContext({ sets: [], setSets: () => {} });

export { AppContext };

const dummyData = [
  {
    name: "Set 1",
    cards: [
      {
        term: "Plant",
        definition: "A tree, flower; something that grows in the ground",
      },
      {
        term: "Hands",
        definition: "Something on your arms",
      },
      {
        term: "Hints",
        definition: "Something like a clue that helps you guess",
      },
      {
        term: "Card4",
        definition: "Definition 4",
      },
    ],
    active: false,
  },
  {
    name: "Set 2",
    cards: [
      {
        term: "Card1",
        definition: "Definition 1",
      },
      {
        term: "Card2",
        definition: "Definition 2",
      },
      {
        term: "Card3",
        definition: "Definition 3",
      },
    ],
    active: false,
  },
];

const useAppProvider =
  () =>
  ({ children }) => {
    const storageKey = "bruhbruhbruhsets"
    const [sets, setSets] = useState(
      localStorage.getItem(storageKey)
        ? JSON.parse(localStorage.getItem(storageKey))
        : dummyData
    );
    const value = { sets, setSets };

    useEffect(() => {
      localStorage.setItem(storageKey, JSON.stringify(sets));
    }, [sets]);

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
  };

export { useAppProvider };

const useAppConsumer = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppConsumer must be used within an AppProvider");
  }
  return context;
};
export { useAppConsumer };
