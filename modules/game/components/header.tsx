import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { showHelp, showResults } from '@/store/game/slice'

export default function Header() {
  const dispatch = useDispatch()

  return (
  <header className="flex justify-between top-0 w-full z-50 border-b-2 border-solid border-black">
    <div className="font-bold py-3 px-5 text-2xl font-serif">Wordle</div>
    <div className="flex justify-end">
      <div onClick={() => dispatch(showHelp())}><Image src="images/question-mark.svg" alt="" width={35} height={35} className="hover:cursor-pointer m-2"/></div>
      <div onClick={() => dispatch(showResults())}><Image src="images/ranking.svg" alt="" width={35} height={35} className="hover:cursor-pointer m-2"/></div>
    </div>
  </header>
  )
}