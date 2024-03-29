import { repositoryItem } from '../../repository/repositoryItem'

export class workspaceItem implements repositoryItem {
  id: string = ''
  title: string = ''
  desc: string = ''
  created: number = Date.now()
  updated: number = Date.now()
  author: string = ''
  collections: string[] = []
}
