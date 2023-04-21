import Letters from "@/modules/game/components/letters"
import PopupBox from "@/modules/game/components/popupbox"
import { Letter } from "../lib/letter"
import { EXAMPLE_LETTER_TAILWIND_CLASSNAME } from "../lib/config"

export default function Help() {
  const example1: Letter[] = [
    {value: 'W', state: 'correct'},
    {value: 'E', state: 'default'},
    {value: 'A', state: 'default'},
    {value: 'R', state: 'default'},
    {value: 'L', state: 'default'},
    {value: 'Y', state: 'default'},
  ]

  const example2: Letter[] = [
    {value: 'P', state: 'default'},
    {value: 'I', state: 'partially-correct'},
    {value: 'L', state: 'default'},
    {value: 'L', state: 'default'},
    {value: 'S', state: 'default'},
  ]

  const example3: Letter[] = [
    {value: 'V', state: 'correct'},
    {value: 'A', state: 'default'},
    {value: 'G', state: 'default'},
    {value: 'U', state: 'incorrect'},
    {value: 'E', state: 'default'},
  ]

  return <>
      <PopupBox title="How To Play">
      <div>
        <br/>
        <div>Guess the Wordle in N+1 tries.</div>
        <div>
          <li>Each guess must be a valid N-letter word.</li>
          <li>The color of the tiles will change to show how close your guess was to the word.</li>
        </div>
        
        <br/>
        <div className="font-semibold">Examples</div>
        <br/>
        <Letters word={example1} tailwindClassname={EXAMPLE_LETTER_TAILWIND_CLASSNAME}></Letters>
        <br/>
        <div><span className="font-semibold">W</span> is in the word and in the correct spot.</div>

        <br/>
        <Letters word={example2} tailwindClassname={EXAMPLE_LETTER_TAILWIND_CLASSNAME}></Letters>
        <br/>
        <div><span className="font-semibold">I</span> is in the word but in the wrong spot.</div>

        <br/>
        <Letters word={example3} tailwindClassname={EXAMPLE_LETTER_TAILWIND_CLASSNAME}></Letters>
        <br/>
        <div><span className="font-semibold">U</span> is not in the word in any spot.</div>
      </div>
      </PopupBox>
  </>
}