import Header from "@/modules/game/components/header"
import Help from "./components/help"
import { useSelector } from "react-redux"
import Results from "./components/results"
import Settings from "./components/settings"
import Board from "./components/board"
import { Letter } from "./lib/letter"
import { useState } from "react"

export default function Game() {
  const popupState = useSelector((state: any) => state.game.popupState)
  const playState = useSelector((state: any) => state.game.playState)
  const [attemptWordList, setAttemptWordList] = useState<Letter[][]>([])
  const [attemptCount, setAttemptCount] = useState(1)
  const [guessLetterHistory, setGuessLetterHistory] = useState<Letter[]>([])

  const onLetterPress = (letter: Letter) => {
    // ignore keypress playState running
    if (['stopped', 'paused', 'finished'].includes(playState)) {
      return
    }

    // check for 'running' playState
    if ('running' == playState) {
      // TODO handle game logic
    }
  }

  return <>
    <Header></Header>
    {popupState == 'help' && <Help></Help>}
    {popupState == 'results' && <Results></Results>}
    {popupState == 'settings' && <Settings></Settings>}
    <br/>
    <br/>
    <br/>
    <Board 
      wordLength={5} 
      initialWords={attemptWordList}
      letterHistory={guessLetterHistory}
      onLetterPress={onLetterPress}
    ></Board>
  </>
}