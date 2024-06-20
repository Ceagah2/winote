import styled from 'styled-components/native'
import { useResponsive } from '../../hooks/useResponsive'
import { colors } from '../../styles'

export const Container = styled.TouchableOpacity`
  width: 100%;
  height: 100px;
  padding: 10px;
  flex-direction: row;
  border-radius: 16px;
  margin-bottom: 20px;
  border: 2px solid ${colors.cta};
  background-color: ${colors.background};
`
export const IconContainer = styled.View`
  width: 50px;
  height: 100%;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
`
export const TextContainer = styled.View`
  width: 100%;
  flex-direction: column;
  padding-top: 8px;
  gap: 8px;
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