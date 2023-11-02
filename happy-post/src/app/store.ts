import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import counter1Slice from '../features/counter/counter1Slice'
import counter2Slice from '../features/counter/counter2Slice'

const persistedCounter1 = persistReducer(
  {
    key: 'counter1',
    storage
  },
  counter1Slice
)

const persistedCounter2 = persistReducer(
  {
    key: 'counter2',
    storage
  },
  counter2Slice
)

export const store = configureStore({
  reducer: {
    counter1: persistedCounter1,
    counter2: persistedCounter2
  }
})
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
