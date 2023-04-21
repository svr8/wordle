const fs = require("fs")

const MAX_WORD_LENGTH = 15

export default function handler(req: any, res: any) {
  if (req.method != 'GET') {
    res.status(405).json({ text: 'Method Not Allowed' })
    return
  }

  let { wordLength } = req.query
  console.log('wordLength', wordLength)
  if (!wordLength || isNaN(wordLength)) {
    res.status(400).json({ text: 'Bad Request' })
    return
  }
  wordLength = parseInt(wordLength)
  if (wordLength > MAX_WORD_LENGTH) {
    res.status(400).json({ text: `Maximum word length is ${MAX_WORD_LENGTH}` })
    return
  }

  const randomWord = getRandomWordWithLength(wordLength)

  res.status(200).json({ word: randomWord })
}


const getRandomWordWithLength = (length: number) => {
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