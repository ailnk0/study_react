export type Workspace = {
  id: number
  title: string
  collections: []
}

export interface WorkspaceRepo {
  save(ws: Workspace): void
  findById(index: number): Workspace | undefined
  findAll(): Workspace[]
  deleteById(id: number): void
  count(): number
}
