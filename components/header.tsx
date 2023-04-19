import Image from 'next/image'

export default function Header() {
  return (
  <header className="flex justify-between top-0 w-full z-50 border-b-2 border-solid border-black">
    <div className="font-bold py-3 px-5 text-2xl font-serif">Wordle</div>
    <div className="flex justify-end">
      <div><Image src="images/question-mark.svg" alt="" width={35} height={35} className="hover:cursor-pointer m-2"/></div>
      <div><Image src="images/ranking.svg" alt="" width={35} height={35} className="hover:cursor-pointer m-2"/></div>
      <div><Image src="images/setting.svg" alt="" width={35} height={35} className="hover:cursor-pointer m-2"/></div>
    </div>
  </header>
  )
}