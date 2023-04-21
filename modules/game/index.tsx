import Header from "@/modules/game/components/header"
import Help from "./components/help"
import { useSelector } from "react-redux"
import Results from "./components/results"
import Settings from "./components/settings"
import Board from "./components/board"
import { Letter } from "./lib/letter"

export default function Game() {
  const popupState = useSelector((state: any) => state.game.popupState)
  const wordList: [Letter[]] = [[]]

  return <>
    <Header></Header>
    {popupState == 'help' && <Help></Help>}
    {popupState == 'results' && <Results></Results>}
    {popupState == 'settings' && <Settings></Settings>}
    <br/>
    <br/>
    <br/>
    <Board wordLength={5} initialWords={wordList}></Board>
  </>
}