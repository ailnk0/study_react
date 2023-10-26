import { HWorkspace, HWorkspacesRepo } from './HWorkspacesRepo'

export type HWorkspacesData = {
  sequence: number
  workspaces: HWorkspace[]
}
export const DEFAULT_WORKSPACES: HWorkspacesData = { sequence: 0, workspaces: [] }

export class HLocalWorkspacesRepo implements HWorkspacesRepo {
  public readonly KEY = 'h-workspace'

  getData(): HWorkspacesData | undefined {
    try {
      const data = localStorage.getItem(this.KEY)
      if (data) {
        return JSON.parse(data)
      }
    } catch {
      /* empty */
    }
    try {
      localStorage.setItem(this.KEY, JSON.stringify(DEFAULT_WORKSPACES))
    } catch {
      /* empty */
    }
    return DEFAULT_WORKSPACES
  }
  setData(data: HWorkspacesData) {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(data))
    } catch {
      /* empty */
    }
  }
  findById(id: number): HWorkspace | undefined {
    const data = this.getData() as HWorkspacesData
    if (!data) {
      return undefined
    }
    return data.workspaces.find((w: HWorkspace) => w.id === id)
  }
  findByName(name: string): HWorkspace | undefined {
    const data = this.getData() as HWorkspacesData
    if (!data) {
      return undefined
    }
    return data.workspaces.find((w: HWorkspace) => w.name === name)
  }
  findAll(): HWorkspace[] {
    const data = this.getData() as HWorkspacesData
    if (!data) {
      return []
    }
    return data.workspaces
  }
  save(workspace: HWorkspace): HWorkspace | undefined {
    console.log('save', workspace)
    const data = this.getData()
    if (!data) {
      return undefined
    }
    workspace.id = data.sequence++
    data.workspaces.push(workspace)
    try {
      localStorage.setItem(this.KEY, JSON.stringify(data))
    } catch {
      return undefined
    }
    return workspace
  }
  deleteById(id: number): number {
    const data = this.getData()
    if (!data) {
      return -1
    }
    const index = data.workspaces.findIndex((w: HWorkspace) => w.id === id)
    if (index !== -1) {
      data.workspaces = data.workspaces.splice(index, 1)
      localStorage.setItem(this.KEY, JSON.stringify(data))
    }
    return index
  }
  count(): number {
    const data = this.getData()
    if (!data) {
      return -1
    }
    return data.workspaces.length
  }
}
