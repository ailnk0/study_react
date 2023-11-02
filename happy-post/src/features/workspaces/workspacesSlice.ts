import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { MemoryWorkspacesRepo } from './memoryRepo'
import { Workspace } from './repo'

const repo = new MemoryWorkspacesRepo()

const workspacesSlice = createSlice({
  name: 'workspaces',
  initialState: {
    data: repo.data
  },
  reducers: {
    create: (state, action: PayloadAction<Workspace>) => {
      repo.data = state.data
      repo.save(action.payload)
    },
    update: (state, action: PayloadAction<Workspace>) => {
      repo.data = state.data
      repo.update(action.payload)
    }
  }
})

export const { create, update } = workspacesSlice.actions

export const selectAllWorkspace = (state: RootState) => {
  repo.data = state.workspace.data
  return repo.findAll()
}

export const selectWorkspaceById = (state: RootState, id: number) => {
  repo.data = state.workspace.data
  return repo.findById(id)
}

export default workspacesSlice.reducer
