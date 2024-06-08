import { styled } from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  height: 50px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-radius: 5px;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #cecece;
`
export const Input = styled.TextInput`
  flex:1;
`;

export const IconContainer = styled.View`
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
`