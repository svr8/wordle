import { useEffect, useState } from "react";
import Letters from "./letters";
import { Letter } from "../lib/letter";
import { generateEmptyWord } from "../lib/util";
import Keyboard from "./keyboard";

export default function Board({wordLength, initialWords = [[]]}: {wordLength: number, initialWords: [Letter[]]}) {
  
  const [wordList, setWordList] = useState(initialWords)
  
  useEffect(() => {
    const filledWordList: [Letter[]] = [...initialWords]
    for (let remainingAttempts = wordLength+1 - initialWords.length; remainingAttempts > 0; remainingAttempts--) {
      filledWordList.push(generateEmptyWord(wordLength))
    }
    setWordList(filledWordList)
  })

  return <>
    {wordList.map((letters, index) => {
      return <>
        <Letters key={index} word={letters}></Letters>
        <br/>
      </>
    })}

    <Keyboard letterStates={[]}></Keyboard>
  </>
}