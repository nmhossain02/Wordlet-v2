import { Box, Heading } from "@chakra-ui/react";

export default function Welcome() {
    return <>
        <Heading mb="3">
            Welcome to Wordlet!
        </Heading>
        <Box maxW="40vw">
            Wordlet is a mix between quizlet and wordle; instead of practicing your flashcards, you play rounds of Wordle trying to guess what the term is. This app was made using React and Chakra UI.
        </Box>
    </>
}