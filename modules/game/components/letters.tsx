import { Letter } from "../lib/letter"
import { LETTER_CORRECT_STYLE, LETTER_DEFAULT_STYLE, LETTER_INCORRECT_STYLE, LETTER_PARTIALLY_CORRECT_STYLE } from "../lib/config"
import { useDispatch } from "react-redux"
import { pressLetter } from "@/store/game/slice"

export default function Letters({word}: {word: Letter[]}) {
  const dispatch = useDispatch()

  const onLetterClick = (letter: Letter) => {
    if(letter.value == '↩') {
      dispatch(pressLetter({value: 'Enter', state: 'default'}))
    } else if (letter.value == '⌫') {
      dispatch(pressLetter({value: 'Backspace', state: 'default'}))
    } else {
      dispatch(pressLetter(letter))
    }
  }

  return (
    <div className="flex flex-row items-start">
      {word.map((letter, i) => {
        const style = getLetterStyle(letter)
        return <div 
          key={i} 
          style={style} 
          className="w-12 h-12 font-bold border-solid border-gray-500 border-2 mx-1 text-xl text-center py-2 hover:cursor-pointer"
          onClick={() => onLetterClick(letter)}
        >{letter.value}</div>
      })}
    </div>
  )
}

const getLetterStyle = (letter: Letter) => {
  switch (letter.state) {
    case 'correct':
      return LETTER_CORRECT_STYLE
    case 'partially-correct':
      return LETTER_PARTIALLY_CORRECT_STYLE
    case 'incorrect':
      return LETTER_INCORRECT_STYLE
    case 'default':
    default:
      return LETTER_DEFAULT_STYLE
  }
}