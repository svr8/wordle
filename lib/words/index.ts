import { sendGetRequest } from "../request"
import { GET_RANDOM_WORD, VALIDATE_WORD } from "./const"

export const getRandomWord = (wordLength: number) => {
  return sendGetRequest(GET_RANDOM_WORD, { wordLength })
}

export const isValidWord = (word: string) => {
  return sendGetRequest(VALIDATE_WORD, { word })
}