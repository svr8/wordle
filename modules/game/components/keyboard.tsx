import { useEffect } from "react";
import { Letter } from "../lib/letter";
import Letters from "./letters";
import { isKeyboardEventLetter } from "../lib/util";
import { pressLetter } from "@/store/game/slice"
import { useDispatch } from "react-redux";

export default function Keyboard({letterStates}: {letterStates: Letter[]}) {
  const dispatch = useDispatch()
  
  const row1 = getLettersFromString('QWERTYUIOP', letterStates)
  const row2 = getLettersFromString('ASDFGHJKL', letterStates)
  const row3 = getLettersFromString('↩ZXCVBNM⌫', letterStates)

  const onKeyPress = (event: KeyboardEvent) => {
    const letterMatch = letterStates.find((letter) => letter.value.toUpperCase() == event.key.toUpperCase())
    if (letterMatch) {
      dispatch(pressLetter(letterMatch))
    } else if (isKeyboardEventLetter(event)) {
      dispatch(pressLetter({value: event.key.toUpperCase(), state: 'incorrect'}))
    }
    else if (['Backspace', 'Enter'].includes(event.code)) {
      dispatch(pressLetter({value: event.code, state: 'incorrect'}))
    }
  }

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