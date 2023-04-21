import { useEffect, useState } from "react";
import Letters from "./letters";
import { Letter } from "../lib/letter";
import { generateEmptyWord } from "../lib/util";
import Keyboard from "./keyboard";

export default function Board({wordLength, initialWords = [[]], letterHistory = []}: {wordLength: number, initialWords: Letter[][], letterHistory: Letter[]}) {
  
  const [wordList, setWordList] = useState(initialWords)

  // const onKeyPress = (event: KeyboardEvent) => {
  //   const letterMatch = letterHistory.find((letter) => letter.value.toUpperCase() == event.key.toUpperCase())
  //   if (letterMatch) {
  //     onLetterPress(letterMatch)
  //   } else if (isKeyboardEventLetter(event)) {
  //     onLetterPress({value: event.key.toUpperCase(), state: 'incorrect'})
  //   }
  //   else if (['Backspace', 'Enter'].includes(event.code)) {
  //       onLetterPress({value: event.code, state: 'incorrect'})
  //   }
    
  // }
  
  useEffect(() => {
    const filledWordList: Letter[][] = [...initialWords]
    for (let remainingAttempts = wordLength+1 - initialWords.length; remainingAttempts > 0; remainingAttempts--) {
      filledWordList.push(generateEmptyWord(wordLength))
    }
    setWordList(filledWordList)
  }, [])

  return <>
    {wordList.map((letters, index) => {
      return <>
        <Letters key={index} word={letters}></Letters>
        <br/>
      </>
    })}

    <Keyboard 
      letterStates={letterHistory}
    ></Keyboard>
  </>
}