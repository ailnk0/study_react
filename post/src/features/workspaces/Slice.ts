import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { MemoryWorkspacesRepo } from './MemoryRepo'
import { Workspace } from './Workspace'

const repo = new MemoryWorkspacesRepo()

const workspaceSlice = createSlice({
  name: 'workspaces',
  initialState: repo.getWorkspaces(),
  reducers: {
    save: (state, action: PayloadAction<Workspace>) => {
      repo.setWorkspaces(state)
      repo.save(action.payload)
    }
  }
})

export const { save } = workspaceSlice.actions
export default workspaceSlice.reducer
