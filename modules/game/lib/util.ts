import { Letter } from "./letter"

export const generateEmptyWord = (wordLength: number): Letter[] => {
  return Array(wordLength).fill({ value: ' ', state: 'default' })
}