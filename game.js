// read/write a word
// check the date, pick a random word and delete the word from file
const word = 'horse'; // word of the day
var checkedGuess = '';
var finalGuessBlock = 'Wordle 1'; // final result
var guess1 = 'hoard'; // guess
let numOfGuesses = 6; // number of guesses

'use strict';
const fs = require('fs');

function chooseWord() {
    fs.readFile('words.json', (err, data) => {
        if (err) throw err;
        let words = JSON.parse(data);
        // randomly index
        let randomIndex = parseInt(Math.random() * words.length);
        console.log(words[[randomIndex]]);
    });
}

// Tests whether user input contains only alphabetic characters
function isInputValid(word) {
    const isAlphabetLetterOnly = /^[a-zA-Z]+$/;
    const userInput = word.toString();
    return isAlphabetLetterOnly.test(userInput.toLowerCase());
}

// check if letter is in word
function isLetterInWord(letter, word){ return word.indexOf(letter) !== -1 };

// convert guess into blocks
function convertToBlocks(guess) {
    var result = '';
    for (var i = 0; i < word.length; i++){
        if (guess[i] === word[i]) {
            result += '🟩';
        } else if (isLetterInWord(guess[i], word) && guess[i] !== word[i]) {
            result += '🟨';
        } else {
            result += '⬛';
        }
    }
    //finalGuessBlock += `\n${finalGuessBlock}`; // append to final exported answer
    return result;
}

// checks if guess matches final word
function isCorrect(userGuess) {
    let guessBlocks = convertToBlocks(userGuess);
    /* if (guessBlocks === '🟩🟩🟩🟩🟩') {
        // end game
    } else {
        numOfGuesses--; // reduce # of guesses
    } */
    //return (guessBlocks === '🟩🟩🟩🟩🟩') ? userGuess : userGuess + "\n" + guessBlocks;
    return "\n " + userGuess.split('').join(' ') + "\n" + guessBlocks;
}

module.exports = { isCorrect, convertToBlocks, isLetterInWord, numOfGuesses, chooseWord, isInputValid };