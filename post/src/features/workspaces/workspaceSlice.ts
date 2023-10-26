import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { DEFAULT_WORKSPACES } from '../../repositories/HLocalWorkspacesRepo'
import { HWorkspace } from '../../repositories/HWorkspacesRepo'

const workspaceSlice = createSlice({
  name: 'workspaces',
  initialState: { repo: DEFAULT_WORKSPACES },
  reducers: {
    save: (state, action: PayloadAction<HWorkspace>) => {
      action.payload.id = state.repo.sequence++
      state.repo.workspaces.push(action.payload)
    },
    delete: (state, action: PayloadAction<number>) => {
      const index = state.repo.workspaces.findIndex((w: HWorkspace) => w.id === action.payload)
      if (index !== -1) {
        state.repo.workspaces = state.repo.workspaces.splice(index, 1)
      }
    }
  }
})

export const { save } = workspaceSlice.actions
export default workspaceSlice.reducer
