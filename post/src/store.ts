import { configureStore } from '@reduxjs/toolkit'
import { workspaceSlice } from './features/workspaces/workspaceSlice'

export const store = configureStore({
  reducer: {
    workspaces: workspaceSlice.reducer
  }
})
