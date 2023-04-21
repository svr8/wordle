import { createSlice } from '@reduxjs/toolkit'

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    playState: 'stopped',
    previousPlayState: 'stopped',
    popupState: 'startmenu',
    pressedLetter: {value: '', state: ''},
    wordLength: 5,
    results: {
      totalPlayed: 0,
      totalWon: 0,
      winStreak: 0,
      maxStreak: 0,
      lastGameWon: null,
    }
  },
  reducers: {
    closePopup: state => {
      state.popupState = 'hidden'
      state.playState = state.previousPlayState
      
      if (state.playState == 'stopped') {
        state.popupState = 'startmenu'
      }
    },
    pressLetter: (state, action) => {
      state.pressedLetter = action.payload
    },
    showHelp: state => {
      state.popupState = 'help'
      state.previousPlayState = state.playState
      state.playState = 'paused'
    },
    showResults: state => {
      state.popupState = 'results'
      state.previousPlayState = state.playState
      state.playState = 'paused'
    },
    showSettings: state => {
      state.popupState = 'settings'
      state.previousPlayState = state.playState
      state.playState = 'paused'
    },
    showStartMenu: state => {
      state.popupState = 'startmenu'
      state.playState = 'stopped'
      state.previousPlayState = 'stopped'
    },
    setWordLength: (state, action) => {
      state.wordLength = action.payload
    },
    setResults: (state, action) => {
      state.results = action.payload
    },
    startGame: state => {
      state.playState = 'running'
      state.popupState = 'hidden'
    },
    stopGame: state => {
      state.playState = 'stopped'
      state.popupState = 'startmenu'
    }
  }
})

// Action creators are generated for each case reducer function
export const { pressLetter, showHelp, showResults, showSettings, closePopup, setWordLength, setResults, startGame, stopGame, showStartMenu } = gameSlice.actions

export default gameSlice.reducer