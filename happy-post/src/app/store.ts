import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import workspacesSlice from '../features/workspaces/workspacesSlice'

const persistedWorkspacesReducer = persistReducer(
  {
    key: 'workspaces',
    storage
  },
  workspacesSlice
)

export const store = configureStore({
  reducer: {
    workspace: persistedWorkspacesReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
