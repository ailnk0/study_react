import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import workspaceSlice from '../features/workspaces/workspaceSlice'
import collectionSlice from '../features/collections/collectionSlice'
import requestSlice from '../features/requests/requestSlice'

const persistedWorkspaceReducer = persistReducer(
  {
    key: 'workspaces',
    storage
  },
  workspaceSlice
)

const persistedCollectionReducer = persistReducer(
  {
    key: 'collections',
    storage
  },
  collectionSlice
)

const persistedRequestReducer = persistReducer(
  {
    key: 'requests',
    storage
  },
  requestSlice
)

export const store = configureStore({
  reducer: {
    workspaces: persistedWorkspaceReducer,
    collections: persistedCollectionReducer,
    requests: persistedRequestReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
