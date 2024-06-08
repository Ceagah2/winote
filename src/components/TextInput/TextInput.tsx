import { ITextProps } from "./TextInput.interface";
import * as S from './TextInput.styles'
import { AntDesign } from "@expo/vector-icons";
export const TextInput = (props: ITextProps) => {
  return (
    <S.Container>
      {props.icon ? (
        <S.IconContainer>
          <AntDesign name={props.icon} size={24} color="black" />
        </S.IconContainer>
      ) : null}
      <S.Input {...props} />
    </S.Container>
  );
}