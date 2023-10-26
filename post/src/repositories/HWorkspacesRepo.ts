export type HWorkspace = {
  id: number
  name: string
  desc: string
  sequence: number
  collections: number[]
}

export type HCollection = {
  id: number
  name: string
  desc: string
  sequence: number
  requests: number[]
}

export type HRequest = {
  id: number
  url: string
  method: string
  headers: string
  body: string
  status: number
  statusText: string
}

export interface HWorkspacesRepo {
  findById(id: number): HWorkspace | undefined
  findByName(name: string): HWorkspace | undefined
  findAll(): HWorkspace[]
  save(workspace: HWorkspace): HWorkspace | undefined
  deleteById(id: number): number
  count(): number
}
