import isWordValid from "./isValid.js";
import wordlist from "wordlist-english";
const wordList = wordlist["english"];

export default function wordFinder(letters, centerLetter) {
  let arr = [];
  wordList.forEach((word) => {
    if (word.length > 3) {
      if (isWordValid(letters, word, centerLetter) === true) {
        arr.push(word);
      }
    }
  });
  return arr;
}
