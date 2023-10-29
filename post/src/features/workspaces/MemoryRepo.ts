import { WorkspacesRepo } from './Repo'
import { Workspace } from './Workspace'

export type MemoryWorkspaces = { sequence: number; col: Workspace[] }

export class MemoryWorkspacesRepo implements WorkspacesRepo {
  private workspaces: MemoryWorkspaces = { sequence: 0, col: [] }

  setWorkspaces(workspaces: MemoryWorkspaces) {
    this.workspaces = workspaces
  }
  getWorkspaces() {
    return this.workspaces
  }
  findById(id: number): Workspace | undefined {
    return this.workspaces.col.find((w: Workspace) => w.id === id)
  }
  findByName(name: string): Workspace | undefined {
    return this.workspaces.col.find((w: Workspace) => w.name === name)
  }
  findAll(): Workspace[] {
    return this.workspaces.col
  }
  save(workspace: Workspace): Workspace | undefined {
    workspace.id = this.workspaces.sequence++
    this.workspaces.col.push(workspace)
    return workspace
  }
  deleteById(id: number): number {
    const index = this.workspaces.col.findIndex((w: Workspace) => w.id === id)
    if (index !== -1) {
      this.workspaces.col = this.workspaces.col.splice(index, 1)
    }
    return index
  }
  count(): number {
    return this.workspaces.col.length
  }
}
