import { ModalProps } from "react-native";

export interface IModal extends ModalProps {
  visible: boolean;
  isRecording: boolean;
  setIsRecording: (value: boolean) => void;
  onClose: () => void;
  onRecordingComplete: (uri: string, duration: number) => void; 
}