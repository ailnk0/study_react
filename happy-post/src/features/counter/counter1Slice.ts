import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

interface Counter1State {
  value: number
}

const initialState: Counter1State = {
  value: 0
}

export const slice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment1: (state) => {
      state.value += 1
    },
    decrement1: (state) => {
      state.value -= 1
    },
    incrementByAmount1: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    }
  }
})

export const { increment1, decrement1, incrementByAmount1 } = slice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter1.value

export default slice.reducer
