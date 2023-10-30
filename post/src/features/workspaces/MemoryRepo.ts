import { WorkspacesRepo } from './Repo'
import { Workspace } from './Workspace'

export type MemoryWorkspaces = { sequence: number; col: Workspace[] }

export class MemoryWorkspacesRepo implements WorkspacesRepo {
  data: MemoryWorkspaces = { sequence: 0, col: [] }

  findById(id: number): Workspace | undefined {
    return this.data.col.find((w: Workspace) => w.id === id)
  }
  findByName(name: string): Workspace | undefined {
    return this.data.col.find((w: Workspace) => w.name === name)
  }
  findAll(): Workspace[] {
    return this.data.col
  }
  save(workspace: Workspace): Workspace | undefined {
    workspace.id = this.data.sequence++
    this.data.col.push(workspace)
    return workspace
  }
  deleteById(id: number): number {
    const index = this.data.col.findIndex((w: Workspace) => w.id === id)
    if (index !== -1) {
      this.data.col = this.data.col.splice(index, 1)
    }
    return index
  }
  count(): number {
    return this.data.col.length
  }
}
