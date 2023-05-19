/**
 * Represents a single round of a wordle game.
 * @param {} guesses Holds an array of `{letter, color}` objects representing guesses
 * @param {string} target The word to guess; used to initialize
 */
export default class WordleRound {
    guesses = [];
    target;
    targetDict = {};
    guessed = new Set();
    gameWon = false;
    constructor(target) {
        this.target = target.toUpperCase();
        for (let c of this.target) {
            if (c in this.targetDict) {
                this.targetDict[c]++;
            } else {
                this.targetDict[c] = 1;
            }
        }
    }
    // enterGuess: function that updates the guesses array using
    // a given guess string. Throws error when there is length mis-match
    enterGuess(guess) {
        if (typeof guess !== "string") {
            throw new Error("Guess is not a string");
        }
        if (guess.length !== this.target.length) {
            throw new Error("Incorrect length guessed");
        }
        let correctGuesses = 0;
        const result = [];
        const dictCopy = {... this.targetDict};
        for (let i = 0; i < this.target.length; i++) {
            const c = guess[i];
            this.guessed.add(c);
            if (this.target[i] === c) {
                result.push({letter: c, color: "green"});
                dictCopy[c]--;
                correctGuesses++;
            } else {
                result.push({letter: c, color: "gray"});
            }
        }
        for (let i = 0; i < this.target.length; i++) {
            const c = guess[i];
            if (c in dictCopy && dictCopy[c] > 0 && result[i].color !== "green") {
                result[i] = {letter: c, color: "yellow"};
                dictCopy[c]--;
            }
        }
        this.guesses.push(result);
        this.gameWon = correctGuesses === this.target.length;
        return this.gameWon;
    }
    getGuesses() { return this.guesses; }
    getGameWon() { return this.gameWon; }
    getTarget() { return this.target; } 
}