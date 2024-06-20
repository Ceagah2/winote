export interface INotes {
  id: number
  title: string;
  description: string;
  photos?: [
    id: number,
    uri: string
  ]
  audios?: string[]
  createdAt: string
  updatedAt: string
}