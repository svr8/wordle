import { useEffect, useState } from "react";
import { Letter } from "../../../lib/game/letter";
import Letters from "./letters";
import { isKeyboardEventLetter } from "../../../lib/game/util";
import { pressLetter } from "@/store/game/slice"
import { useDispatch } from "react-redux";
import { BACKSPACE_KEY_CHAR, ENTER_KEY_CHAR, KEYBOARD_LETTER_TAILWIND_CLASSNAME } from "../../../lib/game/config";

export default function Keyboard({letterStates}: {letterStates: Letter[]}) {
  const dispatch = useDispatch()
  const [row1, setRow1] = useState<Letter[]>(getLettersFromString('QWERTYUIOP', letterStates))
  const [row2, setRow2] = useState<Letter[]>(getLettersFromString('ASDFGHJKL', letterStates))
  const [row3, setRow3] = useState<Letter[]>(getLettersFromString(`${ENTER_KEY_CHAR}ZXCVBNM${BACKSPACE_KEY_CHAR}`, letterStates))

  const onKeyPress = (event: KeyboardEvent) => {
    const letterMatch = letterStates.find((letter) => letter.value.toUpperCase() == event.key.toUpperCase())
    if (letterMatch) {
      dispatch(pressLetter({...letterMatch}))
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

  useEffect(() => {
    setRow1(getLettersFromString('QWERTYUIOP', letterStates))
    setRow2(getLettersFromString('ASDFGHJKL', letterStates))
    setRow3(getLettersFromString(`${ENTER_KEY_CHAR}ZXCVBNM${BACKSPACE_KEY_CHAR}`, letterStates))
  }, [letterStates])

  return <>
    <Letters word={row1} tailwindClassname={KEYBOARD_LETTER_TAILWIND_CLASSNAME}></Letters>
    <br/>
    <Letters word={row2} tailwindClassname={KEYBOARD_LETTER_TAILWIND_CLASSNAME}></Letters>
    <br/>
    <Letters word={row3} tailwindClassname={KEYBOARD_LETTER_TAILWIND_CLASSNAME}></Letters>
  </>
}

const getLettersFromString = (str: string, letterStates: Letter[]): Letter[] => {
  const letterList: Letter[] = []
  
  for (let i = 0; i < str.length; i++) {
    const existingLetter = letterStates.find((letter) => letter.value == str[i])
    const letterState = existingLetter ? existingLetter.state : 'keyboard-default'
    letterList.push({value: str[i], state: letterState})
  }

  return letterList
}