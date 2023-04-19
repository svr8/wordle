import Image from 'next/image'

export default function PopupBox({children, title, onClose}: {children: React.ReactNode, title: string, onClose: () => void}) {
  return (
  <div className="flex flex-col items-center justify-between p-8 z-50 shadow-lg shadow-gray-300">
    <div className="flex items-center justify-between w-full">
      <div className="font-bold text-md font-serif text-center">{title}</div>
      <div><Image src="images/close.svg" alt="" width={20} height={20} className="hover:cursor-pointer"/></div>
    </div>
    {children}
  </div>
  )
}