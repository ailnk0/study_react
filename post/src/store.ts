import { configureStore } from '@reduxjs/toolkit'
import workspaceSlice from './features/workspaces/workspaceSlice'

export const store = configureStore({
  reducer: {
    workspaces: workspaceSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
