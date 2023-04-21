import { useEffect, useState } from "react";
import Letters from "./letters";
import { Letter } from "../lib/letter";
import { generateEmptyLetters, generateEmptyWord } from "../lib/util";
import Keyboard from "./keyboard";

export default function Board({wordLength, initialWords = [[]], letterHistory = []}: {wordLength: number, initialWords: Letter[][], letterHistory: Letter[]}) {
  
  const [wordList, setWordList] = useState<Letter[][]>(initialWords)

  useEffect(() => {
    // const filledWordList: Letter[][] = [...initialWords]
    
    // populate remaining letters in last word as empty letters
    const lastWord = [...initialWords[initialWords.length-1]]
    lastWord.push(...generateEmptyLetters(lastWord.length, wordLength))
    const filledWordList = [...initialWords.slice(0, initialWords.length-1), lastWord]

    // populate remaining words as empty words
    const extraFlag = filledWordList[filledWordList.length-1].length == 0 ? 1 : 0
    for (let remainingAttempts = wordLength+extraFlag - filledWordList.length; remainingAttempts > 0; remainingAttempts--) {
      filledWordList.push(generateEmptyWord(wordLength))
    }
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