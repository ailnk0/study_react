import { repositoryItem } from '../../repository/repositoryItem'

export class workspace implements repositoryItem {
  id: string = ''
  title: string = ''
  desc: string = ''
  created: number = Date.now()
  updated: number = Date.now()
  author: string = ''
  collections: number[] = []
}
