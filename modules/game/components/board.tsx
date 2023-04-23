import { useEffect, useState } from "react";
import Letters from "./letters";
import { Letter } from "../../../lib/game/letter";
import { generateEmptyLetters, generateEmptyWord } from "../../../lib/game/util";
import Keyboard from "./keyboard";
import { BOARD_LETTER_TAILWIND_CLASSNAME } from "../../../lib/game/config";
import { useSelector } from "react-redux";

export default function Board({wordLength, initialWords = [[]], letterHistory = []}: {wordLength: number, initialWords: Letter[][], letterHistory: Letter[]}) {
  
  const nudgeAt = useSelector((state: any) => state.game.nudgeAt)
  const [wordList, setWordList] = useState<Letter[][]>(initialWords)
  const [nudgeList, setNudgeList] = useState<boolean[]>(Array(wordList.length).fill('').map((v,i) => false))

  useEffect(() => {
    // populate empty letters as remaining letters in last word
    const lastWord = [...initialWords[initialWords.length-1]]
    lastWord.push(...generateEmptyLetters(lastWord.length, wordLength))
    
    // populate empty words as remaining words
    const filledWordList = [...initialWords.slice(0, initialWords.length-1), lastWord]
    for (let remainingAttempts = wordLength+1 - filledWordList.length; remainingAttempts > 0; remainingAttempts--) {
      filledWordList.push(generateEmptyWord(wordLength))
    }

    // update word list
    setWordList(filledWordList)

    // reset nudge list
    setNudgeList(Array(filledWordList.length).fill('').map((v,i) => false))
  }, [initialWords])

  // nudge row on trigger
  useEffect(() => {
    const newNudgeList = Array(wordList.length).fill('').map((v,i) => i==nudgeAt)
    setNudgeList(newNudgeList)
  }, [nudgeAt])
  
  return <>
    {wordList.map((letters, index) => {
      return <>
        <Letters 
          key={index} 
          word={letters} 
          tailwindClassname={BOARD_LETTER_TAILWIND_CLASSNAME}
          nudge={nudgeList[index]}
        ></Letters>
        <br/>
      </>
    })}

    <br className="hidden md:block"/>

    <Keyboard 
      letterStates={letterHistory}
    ></Keyboard>
  </>
}