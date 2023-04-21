import { createSlice } from '@reduxjs/toolkit'

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    playState: 'stopped',
    previousPlayState: 'stopped',
    popupState: 'startmenu',
    pressedLetter: {value: '', state: ''},
    wordLength: 5,
  },
  reducers: {
    closePopup: state => {
      state.popupState = 'hidden'
      state.playState = state.previousPlayState
      state.previousPlayState = 'paused'
      
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
    setWordLength: (state, action) => {
      state.wordLength = action.payload
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
export const { pressLetter, showHelp, showResults, showSettings, closePopup, setWordLength, startGame, stopGame } = gameSlice.actions

export default gameSlice.reducer