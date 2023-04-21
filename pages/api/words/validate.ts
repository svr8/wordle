import { isWordInDictionary } from "./util"

export default function handler(req: any, res: any) {
  if (req.method != 'GET') {
    res.status(405).json({ text: 'Method Not Allowed' })
    return
  }

  const { word } = req.query
  if (!word) {
    res.status(400).json({ text: 'Bad Request' })
    return
  }

  const isValid = isWordInDictionary(word)
  res.status(200).json({ isValid })
}