export interface IHeader {
  title: string
  isSavable?: boolean
  onSave?: () => void
}