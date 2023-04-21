import Header from "@/modules/game/components/header"
import Help from "./components/help"
import { useDispatch, useSelector } from "react-redux"
import Results from "./components/results"
import Settings from "./components/settings"
import Board from "./components/board"
import { Letter } from "./lib/letter"
import { useEffect, useState } from "react"
import StartMenu from "./components/startmenu"
import { stopGame } from "@/store/game/slice"

export default function Game() {
  const dispatch = useDispatch()

  const popupState = useSelector((state: any) => state.game.popupState)
  const playState = useSelector((state: any) => state.game.playState)
  const wordLength = useSelector((state: any) => state.game.wordLength)
  const pressedLetter = useSelector((state: any) => state.game.pressedLetter)
  const [attemptWordList, setAttemptWordList] = useState<Letter[][]>([])
  const [attemptCount, setAttemptCount] = useState(1)
  const [guessLetterHistory, setGuessLetterHistory] = useState<Letter[]>([])

  useEffect(() => {
    // ignore keypress playState running
    if (['stopped', 'paused', 'finished'].includes(playState)) {
      return
    }

    // check for 'running' playState
    if ('running' == playState) {
      // TODO handle game logic
      console.log('letter pressed', pressedLetter)

      if(pressedLetter.value == 'Enter') {
        // TODO handle enter key
        // check word length
        // check if word is valid

        // if all checks passed
          // reveal current word status
          // update guessLetterHistory
          // add word to attemptWordList
          // increase attemptCount
      } else if (pressedLetter.value == 'Backspace') {
        // TODO handle backspace key
        // remove last letter current word
      } else {
        // TODO handle letter key
        // check word length
        // add letter to current word
      }
    }
  }, [pressedLetter])

  return <>
    <Header></Header>
    {popupState == 'startmenu' && <StartMenu></StartMenu>}
    {popupState == 'help' && <Help></Help>}
    {popupState == 'results' && <Results></Results>}
    {popupState == 'settings' && <Settings></Settings>}
    <br/>
    <br/>
    <br/>
    {popupState == 'hidden' && <>
      <Board 
        wordLength={wordLength} 
        initialWords={attemptWordList}
        letterHistory={guessLetterHistory}
      ></Board>
      <br/>
      <div className="flex flex-row items-center justify-center">
        <button 
          className="bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-sm"
          onClick={() => dispatch(stopGame())}
        >
          Stop
        </button>
      </div>
    </>}
    
  </>
}