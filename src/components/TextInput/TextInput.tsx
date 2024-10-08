import { AntDesign } from "@expo/vector-icons";
import { ITextProps } from "./TextInput.interface";
import * as S from './TextInput.styles';
export const TextInput = (props: ITextProps) => {
  return (
    <S.Container {...props}>
      {props.label ? <S.Label>{props.label}</S.Label> : null}
      <S.Content>
        {props.icon ? (
          <S.IconContainer>
            <AntDesign name={props.icon} size={24} color="black" />
          </S.IconContainer>
        ) : null}
        <S.Input {...props} />
      </S.Content>
    </S.Container>
  );
}