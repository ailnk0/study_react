import { MemoryWorkspacesRepo, MemoryWorkspaces } from '../../../src/features/workspaces/MemoryRepo'
import { Workspace } from '../../../src/features/workspaces/Workspace'

const repo = new MemoryWorkspacesRepo()

beforeEach(() => {
  const workspaces: MemoryWorkspaces = {
    sequence: 1,
    col: [
      {
        id: 0,
        name: 'Title',
        desc: 'Description',
        sequence: 0,
        collections: []
      }
    ]
  }
  repo.setWorkspaces(workspaces)
})
afterEach(() => {})

test('save', () => {
  expect(repo.count()).toBe(1)

  const workspace: Workspace = {
    id: 0,
    name: 'test',
    desc: 'test',
    sequence: 0,
    collections: []
  }
  const result = repo.save(workspace)

  expect(result?.id).toBe(1)
  expect(repo.count()).toBe(2)
})
