import { useEffect, useState } from "react";
import Letters from "./letters";
import { Letter } from "../../../lib/game/letter";
import { generateEmptyLetters, generateEmptyWord } from "../../../lib/game/util";
import Keyboard from "./keyboard";
import { BOARD_LETTER_TAILWIND_CLASSNAME } from "../../../lib/game/config";

export default function Board({wordLength, initialWords = [[]], letterHistory = []}: {wordLength: number, initialWords: Letter[][], letterHistory: Letter[]}) {
  
  const [wordList, setWordList] = useState<Letter[][]>(initialWords)

  useEffect(() => {
    // populate empty letters as remaining letters in last word
    const lastWord = [...initialWords[initialWords.length-1]]
    lastWord.push(...generateEmptyLetters(lastWord.length, wordLength))
    const filledWordList = [...initialWords.slice(0, initialWords.length-1), lastWord]

    // populate empty words as remaining words
    for (let remainingAttempts = wordLength+1 - filledWordList.length; remainingAttempts > 0; remainingAttempts--) {
      filledWordList.push(generateEmptyWord(wordLength))
    }

    // update word list
    setWordList(filledWordList)
  }, [initialWords])

  return <>
    {wordList.map((letters, index) => {
      return <>
        <Letters key={index} word={letters} tailwindClassname={BOARD_LETTER_TAILWIND_CLASSNAME}></Letters>
        <br/>
      </>
    })}

    <br/>
    <br/>

    <Keyboard 
      letterStates={letterHistory}
    ></Keyboard>
  </>
}