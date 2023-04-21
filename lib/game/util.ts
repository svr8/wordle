import { Letter } from "./letter"

export const generateEmptyWord = (wordLength: number): Letter[] => {
  return Array(wordLength).fill({ value: ' ', state: 'default' })
}

export const generateEmptyLetters = (currentWordLength: number, requiredWordLength: number): Letter[] => {
  return generateEmptyWord(requiredWordLength - currentWordLength)
}

export const isKeyboardEventLetter = (event: KeyboardEvent) => {     
  if (event.key.length == 1 && event.key.match(/[a-z]|[A-Z]/i)) {       
    return true;     
  }     
  return false;   
}