import { HWorkspace, HWorkspacesRepo } from './HWorkspacesRepo'

export type HWorkspacesData = {
  sequence: number
  workspaces: HWorkspace[]
}

export class HLocalWorkspacesRepo implements HWorkspacesRepo {
  readonly KEY = 'h-workspace'

  getData() {
    return JSON.parse(localStorage.getItem(this.KEY) || '')
  }
  setData(data: HWorkspacesData) {
    localStorage.setItem(this.KEY, JSON.stringify(data))
  }
  findById(id: number): HWorkspace | undefined {
    const data = this.getData()
    return data.workspaces.find((w: HWorkspace) => w.id === id)
  }
  findByName(name: string): HWorkspace | undefined {
    const data = this.getData()
    return data.workspaces.find((w: HWorkspace) => w.name === name)
  }
  findAll(): HWorkspace[] {
    const data = this.getData()
    return data.workspaces
  }
  save(workspace: HWorkspace): HWorkspace | undefined {
    const data = this.getData()
    data.workspaces.push(workspace)
    data.sequence++
    try {
      localStorage.setItem(this.KEY, JSON.stringify(data))
      return workspace
    } catch {
      return undefined
    }
  }
  deleteById(id: number): number {
    const data = this.getData()
    const index = data.workspaces.findIndex((w: HWorkspace) => w.id === id)
    if (index !== -1) {
      data.workspaces = data.workspaces.splice(index, 1)
      localStorage.setItem(this.KEY, JSON.stringify(data))
    }
    return index
  }
  count(): number {
    const data = this.getData()
    return data.workspaces.length
  }
}
