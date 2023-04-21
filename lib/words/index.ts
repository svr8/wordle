import { sendGetRequest } from "../request"
import { GET_RANDOM_WORD, VALIDATE_WORD } from "./const"

export const getRandomWord = (wordLength: number) => {
  console.log('>', GET_RANDOM_WORD)
  return sendGetRequest(GET_RANDOM_WORD, { wordLength })
}

export const isValidWord = (word: string) => {
  return sendGetRequest(VALIDATE_WORD, { word })
}