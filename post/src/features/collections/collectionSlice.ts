import { PayloadAction, createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { memoryRepository } from '../../repository/memoryRepository'
import { RootState } from '../../app/store'
import { collectionItem } from './collectionItem'

const repo = new memoryRepository()

const createWorkspace = createAction('workspaces/createWorkspace')

const collectionSlice = createSlice({
  name: 'collections',
  initialState: {
    data: repo._data
  },
  reducers: {
    createCollection: (state, action: PayloadAction<collectionItem>) => {
      repo.data(state.data).save(action.payload)
    },
    updateCollection: (state, action: PayloadAction<collectionItem>) => {
      repo.data(state.data).save(action.payload)
    },
    deleteCollectionById: (state, action: PayloadAction<string>) => {
      repo.data(state.data).deleteById(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createWorkspace, (_state, action) => {
      console.log('createWorkspace is called', action.payload)
    })
  }
})

export const { createCollection, updateCollection, deleteCollectionById } = collectionSlice.actions

export const selectAllCollections = (state: RootState) =>
  repo.data(state.collections.data).findAll() as collectionItem[]
export const selectCollectionById = (state: RootState, id: string) =>
  repo.data(state.collections.data).findById(id) as collectionItem

export default collectionSlice.reducer
