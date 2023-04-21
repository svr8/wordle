import { Inter } from 'next/font/google'
import Game from '@/components/game'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <Game></Game>
    </main>
  )
}
