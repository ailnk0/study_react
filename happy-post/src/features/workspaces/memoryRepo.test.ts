import { expect, test } from '@jest/globals'
import { MemoryWorkspacesRepo } from './memoryRepo'

describe('MemoryWorkspacesRepo', () => {
  let repo: MemoryWorkspacesRepo

  beforeEach(() => {
    repo = new MemoryWorkspacesRepo()
    repo.data = {
      sequence: 1,
      workspaces: [{ id: 1, title: 'ws1', collections: [] }]
    }
  })

  afterEach(() => {})

  test('save', () => {
    repo.save({ id: 0, title: 'ws0', collections: [] })
    expect(repo.data.workspaces.length).toBe(2)
  })

  test('findById', () => {
    const workspace = repo.findById(1)
    expect(workspace).toEqual({ id: 1, title: 'ws1', collections: [] })
  })

  test('findAll', () => {
    const workspaces = repo.findAll()
    expect(workspaces).toEqual([{ id: 1, title: 'ws1', collections: [] }])
  })

  test('deleteById', () => {
    repo.deleteById(1)
    expect(repo.data.workspaces.length).toBe(0)
  })

  test('count', () => {
    repo.count()
    expect(repo.count()).toBe(1)
  })
})
