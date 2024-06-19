import { useNavigation } from '@react-navigation/native'
import { Text, TouchableOpacity } from 'react-native'
import { Container } from "../../components/Container"

export const CreateNote = () => {
  const navigation = useNavigation()
  return(
    <Container>
      <Text> Create Note</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text>Voltar para Home </Text>
      </TouchableOpacity>
    </Container>
  )
}