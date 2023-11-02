import { expect, test } from '@jest/globals'
import { MemoryWorkspacesRepo } from './memoryRepo'
import { DEFAULT_WORKSPACE } from './repo'

describe('MemoryWorkspacesRepo', () => {
  let repo: MemoryWorkspacesRepo

  beforeEach(() => {
    repo = new MemoryWorkspacesRepo()
    repo.data.sequence = 1
    repo.data.workspaces.push(Object.assign({}, DEFAULT_WORKSPACE))
  })

  afterEach(() => {})

  test('save', () => {
    expect(repo.data.workspaces.length).toBe(1)
    expect(repo.data.workspaces[0].id).toBe(0)

    repo.save(Object.assign({}, DEFAULT_WORKSPACE))
    expect(repo.data.workspaces.length).toBe(2)
    expect(repo.data.workspaces[1].id).toBe(1)

    repo.save(Object.assign({}, DEFAULT_WORKSPACE))
    expect(repo.data.workspaces.length).toBe(3)
    expect(repo.data.workspaces[2].id).toBe(2)
  })

  test('findById', () => {
    const workspace = repo.findById(0)
    expect(workspace).toEqual(DEFAULT_WORKSPACE)
  })

  test('findAll', () => {
    const workspaces = repo.findAll()
    expect(workspaces).toEqual([DEFAULT_WORKSPACE])
  })

  test('deleteById', () => {
    repo.deleteById(0)
    expect(repo.data.workspaces.length).toBe(0)
  })

  test('count', () => {
    repo.count()
    expect(repo.count()).toBe(1)
  })
})
