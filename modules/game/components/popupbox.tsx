import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { closePopup } from '@/store/game/slice'
import { animated, useSpring } from '@react-spring/web'
import { useEffect } from 'react'
import { execAnimationKeyframes } from '@/lib/animation'
import { floatUpFadeOut } from '@/lib/animation/floatUpFadeOut'
import { floatDownFadeIn } from '@/lib/animation/floatDownFadeIn'

export default function PopupBox({children, title, isClosable = true}: {children: React.ReactNode, title: string, isClosable?: boolean}) {
  const dispatch = useDispatch()
  const popupState = useSelector((state: any) => state.game.popupState)

  const [popUpEntryStyle, popUpEntryStyleAPI] = useSpring(() => (floatDownFadeIn.default))
  const [popUpExitStyle, popUpExitStyleAPI] = useSpring(() => (floatUpFadeOut.default))

  // start entry animation
  useEffect(() => {
    execAnimationKeyframes(floatDownFadeIn, popUpEntryStyleAPI)
  }, [])

  useEffect(() => {
    if (popupState == 'hidden') {
      // start exit animation
      execAnimationKeyframes(floatUpFadeOut, popUpExitStyleAPI)
    }
  }, [popupState])


  return (
    <animated.span style={popUpExitStyle}>
      <animated.div 
        className="flex flex-col items-center justify-between m-5 p-8 z-50 shadow-lg shadow-gray-300"
        style={popUpEntryStyle}
      >
        <div className="flex items-center justify-between w-full">
          <div className="font-bold text-md font-serif text-center">{title}</div>
          {isClosable && <div onClick={() => dispatch(closePopup())}><Image src="images/close.svg" alt="" width={20} height={20} className="hover:cursor-pointer"/></div>}
        </div>
        {children}
      </animated.div>
    </animated.span>
  )
}