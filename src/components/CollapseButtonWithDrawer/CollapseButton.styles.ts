import styled from "styled-components/native";
import { colors } from "../../styles";

export const Footer = styled.View`
  width: 100%;
  padding: 16px;
  align-items: flex-end;
`;

export const CollapseButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: ${colors.background};
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  border: 2px solid ${colors.accent}
`;

export const DrawerOption = styled.View`
  background-color: ${colors.background};
  padding: 10px 20px;
  border-radius: 5px;
  margin-bottom: 5px;
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

export const DrawerOptionText = styled.Text`
  color: ${colors.text};
  font-size: 16px;
  font-weight: bold;
`;
