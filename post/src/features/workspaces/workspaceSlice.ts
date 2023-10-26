import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { DEFAULT_WORKSPACES, HLocalWorkspacesRepo } from '../../repositories/HLocalWorkspacesRepo'
import { HWorkspace } from '../../repositories/HWorkspacesRepo'

const workspacesRepo: HLocalWorkspacesRepo = new HLocalWorkspacesRepo()

const workspaceSlice = createSlice({
  name: 'workspaces',
  initialState: { repo: workspacesRepo.getData() ?? DEFAULT_WORKSPACES },
  reducers: {
    save: (state, action: PayloadAction<HWorkspace>) => {
      workspacesRepo.save(action.payload)
      state.repo = workspacesRepo.getData() ?? DEFAULT_WORKSPACES
    },
    delete: (state, action: PayloadAction<number>) => {
      workspacesRepo.deleteById(action.payload)
      state.repo = workspacesRepo.getData() ?? DEFAULT_WORKSPACES
    }
  }
})

export const { save } = workspaceSlice.actions
export default workspaceSlice.reducer
