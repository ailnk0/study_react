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
      return JSON.parse(localStorage.getItem(this.KEY) ?? '{}')
    } catch (e) {
      console.log(e)
    }
  }
  setData(data: HWorkspacesData) {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(data))
    } catch (e) {
      console.log(e)
    }
  }
  findById(id: number): HWorkspace | undefined {
    return this.getData()?.workspaces?.find((w: HWorkspace) => w.id === id)
  }
  findByName(name: string): HWorkspace | undefined {
    return this.getData()?.workspaces?.find((w: HWorkspace) => w.name === name)
  }
  findAll(): HWorkspace[] {
    return this.getData()?.workspaces ?? []
  }
  save(workspace: HWorkspace): HWorkspace | undefined {
    const data = this.getData()
    if (!data) {
      return undefined
    }
    workspace.id = data.sequence++
    data.workspaces.push(workspace)
    this.setData(data)
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
      this.setData(data)
    }
    return index
  }
  count(): number {
    return this.getData()?.workspaces?.length ?? -1
  }
}
