import {
  DEFAULT_WORKSPACES,
  HLocalWorkspacesRepo,
  HWorkspacesData
} from '../../src/repositories/HLocalWorkspacesRepo'
import { HWorkspace } from '../../src/repositories/HWorkspacesRepo'

class HLocalWorkspacesRepoTest extends HLocalWorkspacesRepo {
  _data: string = JSON.stringify(DEFAULT_WORKSPACES)
  reset() {
    this._data = JSON.stringify(DEFAULT_WORKSPACES)
    return DEFAULT_WORKSPACES
  }
  getData(): HWorkspacesData | undefined {
    try {
      return JSON.parse(this._data)
    } catch (e) {
      console.log(e)
      return this.reset()
    }
  }
  setData(data: HWorkspacesData) {
    try {
      this._data = JSON.stringify(data)
    } catch (e) {
      console.log(e)
    }
  }
}
const repo = new HLocalWorkspacesRepoTest()

beforeEach(() => {
  repo.setData({
    sequence: 1,
    workspaces: [
      {
        id: 0,
        name: 'test',
        desc: 'test',
        sequence: 0,
        collections: []
      }
    ]
  })
})
afterEach(() => {
  repo.reset()
})

test('save', () => {
  expect(repo.count()).toBe(1)

  const workspace: HWorkspace = {
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
