import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { colors } from '../../styles';
import { INoteCardProps, } from './NoteCard.interface';
import * as S from './NoteCard.styles';

export const NoteCard = ({title, id, onPress}: INoteCardProps) => {

  return (
    <S.Container onPress={onPress} id={id}>
      <S.IconContainer>
        <MaterialCommunityIcons
          name="note-outline"
          size={36}
          color={colors.accent}
        />
      </S.IconContainer>
      <S.TextContainer>
        <S.Title>{title}</S.Title>

        {title === "Nenhuma nota encontrada" ? (
          <S.DetailsIconContainer>
            <S.MoreDetails>Crie uma nota agora</S.MoreDetails>
            <MaterialCommunityIcons
              name="book-plus-outline"
              size={24}
              color={colors.accent}
            />
          </S.DetailsIconContainer>
        ) : (
          <S.DetailsIconContainer>
            <S.MoreDetails>Veja mais</S.MoreDetails>
            <MaterialIcons
              name="chevron-right"
              size={28}
              color={colors.cta}
            />
          </S.DetailsIconContainer>
        )}
      </S.TextContainer>
    </S.Container>
  );

}