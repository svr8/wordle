import { useEffect } from "react";
import { Letter } from "../lib/letter";
import Letters from "./letters";

export default function Keyboard({letterStates, onKeyPress}: {letterStates: Letter[], onKeyPress: (event: KeyboardEvent) => void}) {
  const row1 = getLettersFromString('QWERTYUIOP', letterStates)
  const row2 = getLettersFromString('ASDFGHJKL', letterStates)
  const row3 = getLettersFromString('↩ZXCVBNM⌫', letterStates)

  useEffect(() => {
    document.addEventListener('keydown', onKeyPress)
    return () => {
      document.removeEventListener('keydown', onKeyPress)
    }
  }, [])

  return <>
    <Letters word={row1}></Letters>
    <br/>
    <Letters word={row2}></Letters>
    <br/>
    <Letters word={row3}></Letters>
  </>
}

const getLettersFromString = (str: string, letterStates: Letter[]): Letter[] => {
  const letterList: Letter[] = []
  
  for (let i = 0; i < str.length; i++) {
    const existingLetter = letterStates.find((letter) => letter.value == str[i])
    const letterState = existingLetter ? existingLetter.state : 'incorrect'
    letterList.push({value: str[i], state: letterState})
  }

  return letterList
}