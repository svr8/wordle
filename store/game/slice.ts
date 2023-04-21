import { createSlice } from '@reduxjs/toolkit'

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    playState: 'stopped',
    previousPlayState: 'stopped',
    popupState: 'hidden',
  },
  reducers: {
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
    closePopup: state => {
      state.popupState = 'hidden'
    }
  }
})

// Action creators are generated for each case reducer function
export const { showHelp, showResults, showSettings, closePopup } = gameSlice.actions

export default gameSlice.reducer