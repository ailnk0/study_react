import { repositoryItem } from '../../repository/repositoryItem'

export class requestItem implements repositoryItem {
  id: string = ''
  created: number = Date.now()
  updated: number = Date.now()
  author: string = ''
  parent: string = ''
  method: string = ''
  url: string = ''
  params: string = ''
  headers: string = ''
  body: string = ''
}
