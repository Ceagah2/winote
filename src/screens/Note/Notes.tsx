import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Container } from "../../components/Container/Container";
import { INoteProps } from "./types";

export const Note = ({route}: INoteProps) => {
  const navigation = useNavigation();
  const {note} = route.params.note
  return (
    <Container>
      <Container>
        <Text> {note.title} </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text>Voltar para Home </Text>
        </TouchableOpacity>
      </Container>
    </Container>
  );
}