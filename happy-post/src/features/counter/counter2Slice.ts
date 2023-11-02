import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

interface Counter2State {
  value: number
}

const initialState: Counter2State = {
  value: 0
}

export const slice = createSlice({
  name: 'counter2',
  initialState,
  reducers: {
    increment2: (state) => {
      state.value += 1
    },
    decrement2: (state) => {
      state.value -= 1
    },
    incrementByAmount2: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    }
  }
})

export const { increment2, decrement2, incrementByAmount2 } = slice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount2 = (state: RootState) => state.counter.value

export default slice.reducer
