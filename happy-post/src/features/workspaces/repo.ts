export type Workspace = {
  id: number
  title: string
  desc: string
  collections: []
}

export const DEFAULT_WORKSPACE: Workspace = {
  id: 0,
  title: '',
  desc: '',
  collections: []
}

export interface WorkspaceRepo {
  save(ws: Workspace): void
  findById(index: number): Workspace | undefined
  findAll(): Workspace[]
  deleteById(id: number): void
  count(): number
  update(ws: Workspace): Workspace | undefined
}
