import { styled } from 'styled-components/native';
import { useResponsive } from '../../hooks/useResponsive';
import { colors } from '../../styles';

export const Content = styled.View`
  flex: 1;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  background-color: ${colors.background};
  padding: 20px;
`
export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

export const Title = styled.Text`
  font-family: 'OpenSans_700Bold';
  font-size: ${useResponsive(20)};
  color: ${colors.text};
`
export const Error = styled.Text`
  font-family: "OpenSans_700Bold";
  font-size: ${useResponsive(12)};
  color: ${colors.error};
`;

export const SearchContainer = styled.View`
  width: 400px;
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${colors.background};
`

export const NoteContainer = styled.ScrollView`
  width: 100%;
`
export const Note444 = styled.View`
  width: 100%;
  height: 100px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.background};
  border-radius: 16px;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid ${colors.text};
  flex-direction: row;
  gap: 12px;
`
export const NoteList = styled.FlatList``;