import { styled } from 'styled-components/native';
import { useResponsive } from '../../hooks/useResponsive';
import { colors } from '../../styles';

export const Content = styled.View`
  flex: 1;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
`
export const TitleContainer = styled.View`
  width: 90%;
  margin-top: 20px;
  height: 50px;
`

export const DescriptionContainer = styled.View`
  width: 90%;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 20px;
`;

export const AudioContainer = styled.View`
  width: 90%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 20px;
`

export const Audio = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 10px;
`
export const AudioIcon = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;

`
export const AudioTitle = styled.Text`
  font-family: 'Montserrat_500Medium';
  font-size: ${useResponsive(12)};
  color: ${colors.text};
  width: 70%;
`
export const AudioDuration = styled.Text`
  font-family: 'Montserrat_300Light';
  font-size: ${useResponsive(8)};
  color: ${colors.text};

`


export const CameraRoll = styled.View``;