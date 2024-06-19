import styled from 'styled-components/native'
import { useResponsive } from '../../hooks/useResponsive'
import { colors } from '../../styles'

export const Container = styled.TouchableOpacity`
  width: 100%;
  height: 100px;
  background-color: ${colors.background};
  border-radius: 16px;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid ${colors.text};
  flex-direction: row;
`
export const IconContainer = styled.View`
  width: 75px;
  height: 100%;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
`
export const TextContainer = styled.View`
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
`
export const Title = styled.Text`
  font-family: 'OpenSans_700Bold';
  font-size: ${useResponsive(14)};
  color: ${colors.accent};
`

export const MoreDetails = styled.Text`
  font-family: 'OpenSans_400Regular';
  font-size: ${useResponsive(12)};
  color: ${colors.cta};
`

export const DetailsIconContainer = styled.View`
  width: 75%;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  flex-direction: row;
`;