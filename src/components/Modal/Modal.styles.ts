import { Dimensions } from "react-native";
import styled from "styled-components/native";

const screenHeight = Dimensions.get("window").height;

export const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.View`
  height: ${screenHeight * 0.3}px;
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 20px;
  align-items: center;
`;

export const ModalHeader = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
`;

export const CloseButton = styled.TouchableOpacity``;

export const ModalBody = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const RecordingText = styled.Text`
  margin-top: 20px;
  font-size: 16px;
  color: red;
`;
