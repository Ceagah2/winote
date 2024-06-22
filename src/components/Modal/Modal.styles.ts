import styled from "styled-components/native";
import { useResponsive } from "../../hooks/useResponsive";

type RecordText = {
  color ?: string;
}

export const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;


export const ModalHeader = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
`;

export const CloseButton = styled.TouchableOpacity``;

export const ModalBody = styled.View`
  flex: 1;
  width: 100%;
  height: 100px;
  justify-content: flex-start;
  align-items: center;
`;
export const ButtonContainer = styled.View`
  flex: 1;
  width: 100%;
  height: 100px;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
`

export const RecordButton = styled.Pressable`
  border-radius: 50%;
  width: 100px;
  height: 100px;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.1);
`

export const RecordingText = styled.Text<RecordText>`
  margin-top: 20px;
  text-align: center;
  font-size: ${useResponsive(12)};
`;
