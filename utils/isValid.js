export default function isWordValid(validLetters, attemptedWord, centerLetter) {
  const attemptedWordSplitted = attemptedWord.split("");
  if (
    attemptedWordSplitted.some(
      (attemptedLetter) => attemptedLetter === centerLetter
    )
  ) {
    const attemptedWordFiltered = attemptedWordSplitted.filter(
      (letter) => letter != `${centerLetter}`
    );
    // PROBLEM CODE BELOW 👇
    // UPDATE CENTER LETTER NOT IN ARRAY BEING COMPARED AND THEREFORE IS RETURNING FALSE, MUST FIND WAY TO REMOVE CENTER LETTER FORM COMPARISON OR FIND A NEW METHOD TO COMPARE THE WORDS
    if (
      attemptedWordFiltered.every(
        (attemptedLetter) => validLetters.includes(attemptedLetter) === true
      )
    ) {
      // jUST THIS CODE ABOVE ☝️
      return true;
    } else {
      return false;
    }
  }
}
