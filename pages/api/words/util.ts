const fs = require("fs")

export const isWordInDictionary = (word: string) => {
  const wordList = getAllWordsWithLength(word.length)
  return wordList.filter((wordInList: string) => wordInList.toUpperCase() === word.toUpperCase()).length > 0
}

export const getRandomWordWithLength = (length: number) => {
  const wordList = getAllWordsWithLength(length)
  const randomIndex = randomNumberInRange(1, wordList.length - 1)
  return wordList[randomIndex]
}

const randomNumberInRange = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const getAllWordsWithLength = (length: number) => {
  const content = fs.readFileSync("public/data/wordlist.txt").toString()
  const wordList = content.split('\n')
  return wordList.filter((word: string) => word.length === length)
}