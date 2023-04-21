import { Letter } from "../lib/letter";
import Letters from "./letters";

export default function Keyboard({letterStates}: {letterStates: Letter[]}) {
  const row1: Letter[] = []
  const row1String = 'QWERTYUIOP'
  for (let i = 0; i < row1String.length; i++) {
    const existingLetter = letterStates.find((letter) => letter.value == row1String[i])
    const existingLetterState = existingLetter ? existingLetter.state : 'incorrect'
    row1.push({value: row1String[i], state: existingLetterState})
  }

  const row2: Letter[] = []
  const row2String = 'ASDFGHJKL'.toLocaleUpperCase()
  for (let i = 0; i < row2String.length; i++) {
    const existingLetter = letterStates.find((letter) => letter.value == row1String[i])
    const existingLetterState = existingLetter ? existingLetter.state : 'incorrect'
    row2.push({value: row2String[i], state: existingLetterState})
  }

  const row3: Letter[] = []
  const row3String = '↩ZXCVBNM⌫'.toLocaleUpperCase()
  for (let i = 0; i < row3String.length; i++) {
    const existingLetter = letterStates.find((letter) => letter.value == row1String[i])
    const existingLetterState = existingLetter ? existingLetter.state : 'incorrect'
    row3.push({value: row3String[i], state: existingLetterState})
  }

  return <>
    <Letters word={row1}></Letters>
    <br/>
    <Letters word={row2}></Letters>
    <br/>
    <Letters word={row3}></Letters>
  </>
}