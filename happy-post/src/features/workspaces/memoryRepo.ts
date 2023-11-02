import { Workspace, WorkspaceRepo } from './repo'

export class MemoryWorkspacesRepo implements WorkspaceRepo {
  data: {
    sequence: number
    workspaces: Workspace[]
  } = { sequence: 0, workspaces: [] }

  save(ws: Workspace): void {
    ws.id = this.data.sequence++
    this.data.workspaces.push(ws)
  }
  findById(id: number): Workspace | undefined {
    return this.data.workspaces.find((ws) => ws.id === id)
  }
  findAll(): Workspace[] {
    return this.data.workspaces
  }
  deleteById(id: number): void {
    this.data.workspaces = this.data.workspaces.filter((ws) => ws.id !== id)
  }
  count(): number {
    return this.data.workspaces.length
  }
  update(ws: Workspace): Workspace | undefined {
    const index = this.data.workspaces.findIndex((w) => w.id === ws.id)
    if (index === -1) {
      return undefined
    }
    this.data.workspaces[index] = ws
    return ws
  }
}
