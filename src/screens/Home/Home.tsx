import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import { Container } from "../../components/Container/Container.styles";
import { NoteCard } from '../../components/NoteCard';
import { INoteCardProps } from '../../components/NoteCard/NoteCard.interface';
import { TextInput } from "../../components/TextInput";
import { MockedNote } from "../../mock/note";
import { colors } from '../../styles';
import * as S from './Home.styles';

export const Home = () => {
  const [search, setSearch] = useState<string>('');
  const navigation = useNavigation()
  const [MockedNotes, setMockedNotes] = useState<INoteCardProps[]>([])
  const [searchError,setSearchError] = useState<boolean>(false)

  const handleSearch = (search: string) => {
    if (search) {
      const filteredNotes = MockedNote.filter((note) => {
        if (note.title.toLowerCase().includes(search.toLowerCase())) {
          return true;
        }
        return false;
      });
      setMockedNotes(filteredNotes);
      setSearchError(
        filteredNotes.length === 0 ? true : false
      );

    } else {
      setMockedNotes(MockedNote);
    }
  };

  useEffect(() => {
    setMockedNotes(MockedNote);
  },[])

  useEffect(() => {
    setSearchError(false)
    handleSearch(search);
  }, [search]);
  
  return (
    <Container>
      <S.Content>
        <S.Header>
          <MaterialCommunityIcons
            name="bottle-wine"
            size={24}
            color={colors.accent}
          />
          <S.Title>Suas notas</S.Title>
          <MaterialCommunityIcons
            name="glass-wine"
            size={24}
            color={colors.cta}
          />
        </S.Header>

        <S.SearchContainer>
          <TextInput
            placeholder="Pesquise sua nota"
            icon="search1"
            value={search}
            onChangeText={setSearch}
          />
        </S.SearchContainer>

        <S.NoteContainer>
          {MockedNotes &&
            MockedNotes.length > 0 &&
            MockedNotes.map(
              (note: JSX.IntrinsicAttributes & INoteCardProps) => (
                <NoteCard
                  key={note.id}
                  title={note.title}
                  id={note.id}
                  onPress={() => {
                    navigation.navigate("Note", { note });
                  }}
                />
              )
            )}

          {!MockedNotes ||
            (MockedNotes.length === 0 && searchError === false && (
              <NoteCard
                title={"Nenhuma nota encontrada"}
                onPress={() => navigation.navigate("CreateNote")}
              />
            ))}

          {searchError && (
            <S.Note444>
              <MaterialIcons name="error" size={24} color={colors.error} />
              <S.Error>Nota não encontrada, verifique o termo pesquisado e tente novamente.</S.Error>
            </S.Note444>
          )}
        </S.NoteContainer>
      </S.Content>
    </Container>
  );
}