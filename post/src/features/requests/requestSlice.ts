import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { memoryRepository } from '../../repository/memoryRepository'
import { RootState } from '../../app/store'
import { requestItem } from './requestItem'

const requestSlice = createSlice({
  name: 'requests',
  initialState: {
    num: 1
  },
  reducers: {
    createRequest: (state, action: PayloadAction<number>) => {
      state.num = state.num + action.payload
    }
  }
})

export const { createRequest } = requestSlice.actions

export default requestSlice.reducer
