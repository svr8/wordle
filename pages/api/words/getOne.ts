import { MAX_WORD_LENGTH } from "@/lib/game/config"
import { getRandomWordWithLength } from "./util"

export default function handler(req: any, res: any) {
  if (req.method != 'GET') {
    res.status(405).json({ text: 'Method Not Allowed' })
    return
  }

  let { wordLength } = req.query
  if (!wordLength) {
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

