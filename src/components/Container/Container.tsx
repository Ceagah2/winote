import * as S from './Container.styles';
import { IContainerProps } from "./Container.types";

export const Container = (props: IContainerProps) => {
  return(
    <S.Container>
      {props.children}
    </S.Container>
  )
}