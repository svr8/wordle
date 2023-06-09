import { Letter } from "../../../lib/game/letter"
import { BACKSPACE_KEY_CHAR, ENTER_KEY_CHAR, LETTER_CORRECT_STYLE, LETTER_DEFAULT_STYLE, LETTER_INCORRECT_STYLE, LETTER_KEYBOARD_DEFAULT_STYLE, LETTER_PARTIALLY_CORRECT_STYLE } from "../../../lib/game/config"
import { useDispatch } from "react-redux"
import { pressLetter } from "@/store/game/slice"
import { animated, useChain, useSpring, useSpringRef, useTransition } from "@react-spring/web"
import { useEffect } from "react"
import { nudgeAnimation } from "@/lib/animation/nudge"

export default function Letters({word, tailwindClassname, nudge = false}: {word: Letter[], tailwindClassname: String, nudge?: boolean}) {
  const dispatch = useDispatch()

  const [leftNudgeStyle, leftNudgeStyleAPI] = useSpring(() => (nudgeAnimation.defaultStyle))

  const onLetterClick = (letter: Letter) => {
    if(letter.value == ENTER_KEY_CHAR) {
      dispatch(pressLetter({value: 'Enter', state: 'default'}))
    } else if (letter.value == BACKSPACE_KEY_CHAR) {
      dispatch(pressLetter({value: 'Backspace', state: 'default'}))
    } else {
      dispatch(pressLetter({...letter}))
    }
  }

  useEffect(() => {
    if (nudge) {
      nudgeAnimation.frames.keyframes.map((timestamp, index) => {
        setTimeout(() => {
          leftNudgeStyleAPI.start(nudgeAnimation.frames.styles[index])
        }, timestamp)
      })
    }
  }, [nudge])

  return (

    <animated.div className="relative flex flex-row items-start" style={leftNudgeStyle}>
      {word.map((letter, i) => {
        const style = getLetterStyle(letter)
        return <div 
          key={i} 
          style={style} 
          className={`font-bold text-center rounded-sm ${tailwindClassname}`}
          onClick={() => onLetterClick(letter)}
        >{letter.value}</div>
      })}
    </animated.div>

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
    case 'keyboard-default':
      return LETTER_KEYBOARD_DEFAULT_STYLE
    case 'default':
    default:
      return LETTER_DEFAULT_STYLE
  }
}