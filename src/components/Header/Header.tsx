import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { colors } from '../../styles';
import { IHeader } from "./Header.interface";
import * as S from "./Header.styles";
export const Header = ({ title, isSavable, onSave }: IHeader) => {
  const navigate = useNavigation()
  return (
    <S.Container>
      <S.BackContainer>
        <S.Button onPress={() => navigate.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.cta} />
        </S.Button>
      </S.BackContainer>
      <S.Title>{title}</S.Title>
      {isSavable ? (
        <S.SaveContainer>
          <S.Button onPress={onSave}>
            <FontAwesome6 name="save" size={24} color={colors.cta} /></S.Button>
        </S.SaveContainer>
      ) : null}
    </S.Container>
  );
}