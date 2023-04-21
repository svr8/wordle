import PopupBox from "@/modules/game/components/popupbox"
import { showStartMenu } from "@/store/game/slice"
import { useDispatch, useSelector } from "react-redux"

export default function Results() {
  const dispatch = useDispatch()

  const results = useSelector((state: any) => state.game.results)
  const previousPlayState = useSelector((state: any) => state.game.previousPlayState)

  return <>
      <PopupBox title="Results">
        <div>
          <br/>
          {results.lastGameWon != null && previousPlayState == 'stopped' && 
          <>
          <div className="flex flex-col items-center justify-center font-normal text-2xl">
            {results.lastGameWon ? 'You won!' : 'You lost!'}
          </div>
          <br/>
          <div className="flex flex-col items-center justify-center font-normal text-md">
            Last Game Word: {results.lastGameWord}
          </div>
          <br/>
          </>
          }
            
          <br/>

          <div className="grid grid-cols-4 grid-flow-row gap-4 justify-evenly">
            <div className="grid grid-rows-2 grid-flow-col gap-2">
              <div className="text-4xl font-semibold">{results.totalPlayed}</div>
              <div className="text-xs font-normal">Played</div>
            </div>

            <div className="grid grid-rows-2 grid-flow-col gap-2">
              <div className="text-4xl font-semibold">{calculateWinPercentage(results.totalWon, results.totalPlayed)}%</div>
              <div className="text-xs font-normal">Win %</div>
            </div>

            <div className="grid grid-rows-2 grid-flow-col gap-2">
              <div className="text-4xl font-semibold">{results.winStreak}</div>
              <div className="text-xs font-normal">Current Streak</div>
            </div>

            <div className="grid grid-rows-2 grid-flow-col gap-2">
              <div className="text-4xl font-semibold">{results.maxStreak}</div>
              <div className="text-xs font-normal">Max Streak</div>
            </div>
          </div>

          {['stopped'].includes(previousPlayState) && <>
            <hr/>
            <br/>

            <div className="flex flex-row items-center justify-center">
              <button 
                className="bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-sm"
                onClick={() => dispatch(showStartMenu())}
              >
                Play Again
              </button>
            </div>
          </>
        }
        </div>
      </PopupBox>
  </>
}

const calculateWinPercentage = (totalWon: number, totalPlayed: number) => {
  if (totalPlayed == 0) {
    return 0
  }

  return totalWon / totalPlayed * 100
}