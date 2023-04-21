import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { closePopup } from '@/store/game/slice'

export default function PopupBox({children, title, isClosable = false}: {children: React.ReactNode, title: string, isClosable: boolean}) {
  const dispatch = useDispatch()

  return (
  <div className="flex flex-col items-center justify-between p-8 z-50 shadow-lg shadow-gray-300">
    <div className="flex items-center justify-between w-full">
      <div className="font-bold text-md font-serif text-center">{title}</div>
      {!isClosable && <div onClick={() => dispatch(closePopup())}><Image src="images/close.svg" alt="" width={20} height={20} className="hover:cursor-pointer"/></div>}
    </div>
    {children}
  </div>
  )
}