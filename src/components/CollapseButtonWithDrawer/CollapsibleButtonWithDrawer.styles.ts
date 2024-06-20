import styled from "styled-components/native";
import { colors } from "../../styles";

export const Footer = styled.View`
  padding: 16px;
  align-items: center;
`;

export const CollapseButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: ${colors.background};
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`;

export const DrawerOption = styled.View`
  background-color: ${colors.background};
  padding: 10px 20px;

  
  border-radius: 5px;
  margin-bottom: 5px;
`;

export const DrawerOptionText = styled.Text`
  color: ${colors.background};
  font-size: 16px;
  font-weight: bold;
`;
