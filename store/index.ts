import { configureStore } from '@reduxjs/toolkit'
import gameReducer from '@/store/game/slice'

export default configureStore({
  reducer: {
    popup: gameReducer
  }
})