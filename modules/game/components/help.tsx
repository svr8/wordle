import Letters from "@/components/game/letters"
import PopupBox from "@/components/popupbox"

export default function Help() {
  return <>
      <PopupBox title="How To Play" onClose={() => {}}>
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
        <Letters wordLength={6} initialState="C*****" initialWord='WEARLY'></Letters>
        <br/>
        <div><span className="font-semibold">W</span> is in the word and in the correct spot.</div>

        <br/>
        <Letters wordLength={5} initialState="*P***" initialWord='PILLS'></Letters>
        <br/>
        <div><span className="font-semibold">I</span> is in the word but in the wrong spot.</div>

        <br/>
        <Letters wordLength={5} initialState="***W*" initialWord='VAGUE'></Letters>
        <br/>
        <div><span className="font-semibold">U</span> is not in the word in any spot.</div>
      </div>
      </PopupBox>
  </>
}