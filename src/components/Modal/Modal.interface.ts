import { ModalProps } from "react-native"

export interface IModal extends ModalProps {
  visible: boolean
  children: React.ReactNode
  onClose: () => void
}