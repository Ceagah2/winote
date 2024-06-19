import { Text, View } from "react-native";
import { Container } from "../../components/Container/Container";
import { INoteProps } from "./types";

export const Note = ({route}: INoteProps) => {
  console.log(route?.params);
  return(
    <Container>
      <View>
        <Text>Nota</Text>
      </View>
    </Container>
  )
}