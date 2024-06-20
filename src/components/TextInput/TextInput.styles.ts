import { styled } from "styled-components/native";
import { useResponsive } from "../../hooks/useResponsive";

export const Container = styled.View`
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-radius: 5px;
  margin-bottom: 20px;
`
export const Input = styled.TextInput`
  flex:1;
`;
export const Content = styled.View`
  width: 100%;
  height: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-radius: 5px;
  padding: 10px;
  border: 1px solid #cecece;
`;

export const IconContainer = styled.View`
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;  
  margin-right: 5px;
`
export const Label = styled.Text`
  font-family: 'OpenSans_300Light';
  font-size: ${useResponsive(12)};
  margin-bottom: 5px;
`