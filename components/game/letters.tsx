import { useState } from "react"

export default function Letters({wordLength, initialWord, initialState}: {wordLength: number, initialWord: string, initialState: string}) {
  const [word, setWord] = useState(initialWord)
  const [state, setState] = useState(initialState)
  const [letterStyles, setLetterStyles] = useState(Array.from({ length: wordLength }).map( (_,i) => getLetterStyleFromState(state[i])))

  return (
    <div className="flex flex-row items-start">
      {letterStyles.map((style, i) => {
        return <div key={i} style={style} className="w-12 h-12 font-bold border-solid border-gray-500 border-2 mx-1 text-xl text-center py-2">{word[i]}</div>
      })}
    </div>
  )
}

const getLetterStyleFromState = (state: string | undefined) => {
  switch (state) {
    case 'C':
      return { backgroundColor: '#6aa964', color: 'white' }
    case 'P':
      return { backgroundColor: '#c8b458', color: 'white' }
    case 'W':
      return { backgroundColor: '#787c7e', color: 'white' }
    default:
      return { backgroundColor: 'white', color: 'black' }
  }
}
