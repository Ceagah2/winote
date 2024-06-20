import styled from "styled-components/native";
import { useResponsive } from "../../hooks/useResponsive";
import { colors } from "../../styles";

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`
export const Title = styled.Text`
  font-size: ${useResponsive(16)};
  color: ${colors.accent};
  font-family: 'OpenSans_700Bold';
  margin-left: 20px;
  text-align: center;
`
export const Button = styled.TouchableOpacity``
export const BackContainer = styled.View`
  width: 140px;
  padding-left: 20px;
`
export const SaveContainer = styled.View`
  width: 140px;
  align-items: flex-end;
  padding-right: 20px;
`;
