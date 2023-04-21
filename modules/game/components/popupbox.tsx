import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { closePopup } from '@/store/game/slice'
import { animated, useSpring } from '@react-spring/web'
import { useEffect } from 'react'

export default function PopupBox({children, title, isClosable = true}: {children: React.ReactNode, title: string, isClosable?: boolean}) {
  const dispatch = useDispatch()
  const popupState = useSelector((state: any) => state.game.popupState)

  const [popUpAnimatedStyle, popUpAnimatedStyleAPI] = useSpring(() => ({
    from: { 
      y: -50,
      opacity: 0,
    },
    to: { 
      y: 0,
      opacity: 1,
    },
  }))

  useEffect(() => {
    if (popupState == 'hidden') {
      popUpAnimatedStyleAPI.start({
        from: { 
          y: 0,
          opacity: 1,
        },
        to: { 
          y: -50,
          opacity: 0,
        },
      })
    }
  }, [popupState])


  return (
  <animated.div 
    className="flex flex-col items-center justify-between m-5 p-8 z-50 shadow-lg shadow-gray-300"
    style={{
      ...popUpAnimatedStyle,
    }}
  >
    <div className="flex items-center justify-between w-full">
      <div className="font-bold text-md font-serif text-center">{title}</div>
      {isClosable && <div onClick={() => dispatch(closePopup())}><Image src="images/close.svg" alt="" width={20} height={20} className="hover:cursor-pointer"/></div>}
    </div>
    {children}
  </animated.div>
  )
}