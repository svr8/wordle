import { useEffect, useState } from "react";
import Letters from "./letters";
import { Letter } from "../lib/letter";
import { generateEmptyLetters, generateEmptyWord } from "../lib/util";
import Keyboard from "./keyboard";

export default function Board({wordLength, initialWords = [[]], letterHistory = []}: {wordLength: number, initialWords: Letter[][], letterHistory: Letter[]}) {
  
  const [wordList, setWordList] = useState<Letter[][]>(initialWords)

  useEffect(() => {
    // populate empty letters as remaining letters in last word
    const lastWord = [...initialWords[initialWords.length-1]]
    lastWord.push(...generateEmptyLetters(lastWord.length, wordLength))
    const filledWordList = [...initialWords.slice(0, initialWords.length-1), lastWord]

    // populate empty words as remaining words
    const extraFlag = filledWordList[filledWordList.length-1].length == 0 ? 1 : 0
    for (let remainingAttempts = wordLength+extraFlag - filledWordList.length; remainingAttempts > 0; remainingAttempts--) {
      filledWordList.push(generateEmptyWord(wordLength))
    }

    // update word list
    setWordList(filledWordList)
  }, [initialWords])

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