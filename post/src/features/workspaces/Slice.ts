import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { MemoryWorkspacesRepo } from './MemoryRepo'
import { Workspace } from './Workspace'

const repo = new MemoryWorkspacesRepo()
const workspaceSlice = createSlice({
  name: 'workspaces',
  initialState: {
    displayed: repo.data,
    selected: 0,
    isCreate: false
  },
  reducers: {
    save: (state, action: PayloadAction<Workspace>) => {
      repo.data = state.displayed
      repo.save(action.payload)
    },
    showCreate: (state, action: PayloadAction<boolean>) => {
      state.isCreate = action.payload
    }
  }
})

export const { save, showCreate } = workspaceSlice.actions
export default workspaceSlice.reducer
