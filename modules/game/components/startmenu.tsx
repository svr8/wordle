import Letters from "@/modules/game/components/letters"
import PopupBox from "@/modules/game/components/popupbox"
import { Letter } from "../lib/letter"
import { useDispatch } from "react-redux"
import { setWordLength, startGame } from "@/store/game/slice"

export default function StartMenu() {
  const dispatch = useDispatch()

  const example1: Letter[] = [
    {value: 'W', state: 'correct'},
    {value: 'E', state: 'default'},
    {value: 'A', state: 'partially-correct'},
    {value: 'R', state: 'incorrect'},
    {value: 'L', state: 'default'},
    {value: 'Y', state: 'default'},
  ]

  const handleWordLengthChange = (e: any) => {
    console.log(e)
    dispatch(setWordLength(parseInt(e.target.value)))
  }

  return <>
      <PopupBox title="" isClosable={false}>
      <div>
        <br/>
        <div className="font-semibold">How To Play</div>
        <div>Guess the Wordle in N+1 tries.</div>
        <div>
          <li>Each guess must be a valid N-letter word.</li>
          <li>The color of the tiles will change to show how close your guess was to the word.</li>
        </div>
        
        <br/>
        <div className="font-semibold">Examples</div>
        <br/>
        <Letters word={example1}></Letters>
        <br/>
        <div><span className="font-semibold">W</span> is in the word and in the correct spot.</div>
        <div><span className="font-semibold">A</span> is in the word but in the wrong spot.</div>
        <div><span className="font-semibold">R</span> is not in the word in any spot.</div>
        <br/>

        <hr/>
        <br/>
        <div className="flex flex-row items-center justify-center">
          <div>Enter Word Length</div>
          <input 
            className="border-b-solid border-b-2 border-black outline-none p-3 text-center"
            type="number" 
            min={3}
            defaultValue={5}
            onChange={handleWordLengthChange}
          ></input>
        </div>
        <br/>
        <div className="flex flex-row items-center justify-center">

          <button 
            className="bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-sm"
            onClick={() => dispatch(startGame())}
          >
            Start
          </button>
        </div>

      </div>
      </PopupBox>
  </>
}