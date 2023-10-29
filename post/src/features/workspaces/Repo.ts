import { Workspace } from './Workspace'

export interface WorkspacesRepo {
  findById(id: number): Workspace | undefined
  findByName(name: string): Workspace | undefined
  findAll(): Workspace[]
  save(workspace: Workspace): Workspace | undefined
  deleteById(id: number): number
  count(): number
}
