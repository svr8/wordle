import Header from "@/modules/game/components/header"
import Help from "./components/help"
import { useDispatch, useSelector } from "react-redux"
import Results from "./components/results"
import Settings from "./components/settings"
import Board from "./components/board"
import { Letter } from "./lib/letter"
import { useEffect, useState } from "react"
import StartMenu from "./components/startmenu"
import { showResults, stopGame } from "@/store/game/slice"
import { getRandomWord, isValidWord } from "@/lib/words"

export default function Game() {
  const dispatch = useDispatch()

  const popupState = useSelector((state: any) => state.game.popupState)
  const playState = useSelector((state: any) => state.game.playState)
  const previousPlayState = useSelector((state: any) => state.game.previousPlayState)
  const wordLength = useSelector((state: any) => state.game.wordLength)
  const pressedLetter = useSelector((state: any) => state.game.pressedLetter)
  const [attemptWordList, setAttemptWordList] = useState<Letter[][]>([[]])
  const [attemptCount, setAttemptCount] = useState(1)
  const [guessLetterHistory, setGuessLetterHistory] = useState<Letter[]>([])
  const [correctWord, setCorrectWord] = useState<string>('')


  useEffect(() => {
    // handle game start
    const onGameStart = async () => {
      if (playState == 'running' && previousPlayState != 'paused') {
        setAttemptWordList([[]])
        setAttemptCount(1)
        setGuessLetterHistory([])
  
        const randomWord = (await getRandomWord(wordLength)).word
        console.log('correct word', randomWord)
        setCorrectWord(randomWord)
      } 
    }

    onGameStart()
  }, [playState])

  useEffect(() => {

    const onLetterPress = async () => {
      // ignore keypress playState running
      if (['stopped', 'paused', 'finished'].includes(playState)) {
        return
      }

      // check for 'running' playState
      if ('running' == playState) {
        // handle game logic

        // handle enter key
        if(pressedLetter.value == 'Enter') {
          const currentWord = getWordFromLetterList(attemptWordList[attemptCount-1])
          
          // check word length
          if (currentWord.length != wordLength) {
            return
          }

          // check if word is valid
          if (!(await isValidWord(currentWord)).isValid) {
            return
          }

          // reveal current word status
          const revealLetters = compareAndGenerateRevealWord(currentWord, correctWord)
          const newAttemptWordList = attemptWordList.slice(attemptCount-1, attemptCount)
          newAttemptWordList.pop()
          newAttemptWordList.push(revealLetters)
          setAttemptWordList(newAttemptWordList)

          // update guessLetterHistory
          setGuessLetterHistory(compareAndGetRevealedLetters(revealLetters, guessLetterHistory))

          // increase attemptCount
          setAttemptCount(attemptCount+1)

          // end game if player wins
          if (currentWord.toUpperCase() == correctWord.toUpperCase()) {
            dispatch(stopGame())
            dispatch(showResults())
          }

          // end game if attemptCount reaches wordLimit+1
          if (attemptCount == wordLength+1) {
            dispatch(stopGame())
            dispatch(showResults())
          }
        } else if (pressedLetter.value == 'Backspace') {
          // remove last letter current word
          const newAttemptWord = attemptWordList[attemptCount-1]
          newAttemptWord.pop()

          // update current attempt word
          const newAttemptWordList = attemptWordList.slice(0, attemptCount-1)
          newAttemptWordList.push(newAttemptWord)
          setAttemptWordList(newAttemptWordList)
        } else {
          // handle letter key
          const currentWord = getWordFromLetterList(attemptWordList[attemptCount-1])

          // check word length
          if (currentWord.length >= wordLength) {
            return
          }

          // add letter to current word
          const newAttemptWord = attemptWordList[attemptCount-1]
          newAttemptWord.push({value: pressedLetter.value, state: 'incorrect'})

          // update current attempt word
          const newAttemptWordList = attemptWordList.slice(0, attemptCount-1)
          newAttemptWordList.push(newAttemptWord)
          setAttemptWordList(newAttemptWordList)
        }
      }
    }

    onLetterPress()
    
  }, [pressedLetter])

  return <>
    <Header></Header>
    {popupState == 'startmenu' && <StartMenu></StartMenu>}
    {popupState == 'help' && <Help></Help>}
    {popupState == 'results' && <Results></Results>}
    {popupState == 'settings' && <Settings></Settings>}
    <br/>
    <br/>
    <br/>
    {popupState == 'hidden' && <>
      <Board 
        wordLength={wordLength} 
        initialWords={attemptWordList}
        letterHistory={guessLetterHistory}
      ></Board>
      <br/>
      <div className="flex flex-row items-center justify-center">
        <button 
          className="bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-sm"
          onClick={() => dispatch(stopGame())}
        >
          Stop
        </button>
      </div>
    </>}
    
  </>
}

const getWordFromLetterList = (letterList: Letter[]) => {
  return (letterList.map(letter => letter.value).join('')).toUpperCase()
}

const compareAndGenerateRevealWord = (guessedWord: string, correctWord: string): Letter[] => {
  guessedWord = guessedWord.toUpperCase()
  correctWord = correctWord.toUpperCase()

  const revealLetters: Letter[] = []
  const guessedWordAlphabets: any = {}
  for (let i = 97; i < 123; i++) {
    const letter = String.fromCharCode(i)
    guessedWordAlphabets[letter] = 0
  }
  const correctWordAlphabets = getAlphabetFrequency(correctWord)

  for (let i = 0; i < correctWord.length; i++) {
    // correct letter
    if(guessedWord[i] == correctWord[i]) {
      revealLetters.push({value: guessedWord[i], state: 'correct'})
    } 
    // incorrect letter
    else if (!correctWord.includes(guessedWord[i])) {
      revealLetters.push({value: guessedWord[i], state: 'incorrect'})
    } 
    // partially correct letter (repeat letter check)
    else if (guessedWordAlphabets[guessedWord[i]] < correctWordAlphabets[guessedWord[i]]) {
      revealLetters.push({value: guessedWord[i], state: 'partially-correct'})
      guessedWordAlphabets[guessedWord[i]]++
    } else {
      revealLetters.push({value: guessedWord[i], state: 'incorrect'})
    }
  }
  return revealLetters
}

const compareAndGetRevealedLetters = (revealedLetters: Letter[], letterHistory: Letter[]) => {
  const res: Letter[] = []

  revealedLetters.map((revealedLetter) => {
    const existingLetter = letterHistory.find(letter => letter.value.toUpperCase() == revealedLetter.value.toUpperCase())
    // if letter was already guessed, check and update
    if (existingLetter) {
      // if current letter is partially correct and existing letter is incorrect,
      // update to partially correct
      if (revealedLetter.state == 'partially-correct' && existingLetter.state == 'incorrect') {
        res.push({value: revealedLetter.value.toUpperCase(), state: 'partially-correct'})
      } 
      // else if current letter is correct, update to correct
      else if (revealedLetter.state == 'correct') {
        res.push({value: revealedLetter.value.toUpperCase(), state: 'correct'})
      }
    }
    // else add new letter
    else {
      res.push(revealedLetter)
    }
  })

  // add all undetected letters
  letterHistory.map((letter) => {
    const existingLetter = res.find(revealedLetter => revealedLetter.value.toUpperCase() == letter.value.toUpperCase())
    if (!existingLetter) {
      res.push(letter)
    }
  })

  return res
}

const getAlphabetFrequency = (word: string) => {
  const res: any = {}
  for (let i = 97; i < 123; i++) {
    const letter = String.fromCharCode(i)
    res[letter] = 0
  }

  for (let i = 0; i < word.length; i++) {
    const letter = word[i].toLowerCase()
    res[letter]++
  }

  return res
}