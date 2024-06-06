import styled from 'styled-components/native';
import { colors } from '../../styles';
import { useResponsive } from '../../hooks/useResponsive';


export const Container = styled.View`
  flex: 1;
  justify-content: space-evenly;
  align-items: center;
  padding: 100px;
  background-color: ${colors.background};
`
export const Title = styled.Text`
  font-family: 'OpenSans_700Bold';
  font-size: ${useResponsive(22)};
  color: ${colors.text};
  text-align: center;
`
export const DescriptionContainer = styled.View`
  width: 350px;
`
export const Description = styled.Text`
  font-family: 'OpenSans_400Regular';
  font-size: ${useResponsive(14)};
  color: ${colors.text};
  text-align: center;
`
export const ImageContainer = styled.View`
  padding: 20px;
  width: 400px;
  height: 400px;
  border-radius: 10px;
  background-color: ${colors.background};
  margin: 10px;
`
export const Image = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`