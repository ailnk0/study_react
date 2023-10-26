import { createSlice } from '@reduxjs/toolkit'
import { HWorkspacesData } from '../../repositories/HLocalWorkspacesRepo'

const defaultWorkspaces: HWorkspacesData = {
  sequence: 3,
  workspaces: [
    {
      id: 1,
      name: 'Default',
      desc: 'Default Workspace',
      sequence: 1,
      collections: [1, 2]
    },
    {
      id: 2,
      name: 'Sample',
      desc: 'Sample Workspace',
      sequence: 3,
      collections: [3, 4]
    }
  ]
}

export const workspaceSlice = createSlice({
  name: 'workspaceSlice',
  initialState: defaultWorkspaces,
  reducers: {}
})
