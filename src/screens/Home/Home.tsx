import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAtom } from 'jotai';
import React, { useEffect, useState } from "react";
import { CollapsibleButtonWithDrawer } from '../../components/CollapseButtonWithDrawer';
import { Container } from "../../components/Container/Container.styles";
import { NoteCard } from '../../components/NoteCard';
import { INoteCardProps } from '../../components/NoteCard/NoteCard.interface';
import { TextInput } from "../../components/TextInput";
import { storedUserNotesAtom } from '../../store/globalStates';
import { colors } from '../../styles';
import * as S from './Home.styles';

export const Home = () => {
  const navigation = useNavigation()
  const [search, setSearch] = useState<string>('');
  const [userNotes, setUserNotes] = useState<INoteCardProps[]>([])
  const [storedNotes] = useAtom(storedUserNotesAtom)
  const [searchError,setSearchError] = useState<boolean>(false)
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
 

  const handleSearch = (search: string) => {
    if (search) {
      const filteredNotes = userNotes.filter((note) => {
        if (note.title.toLowerCase().includes(search.toLowerCase())) {
          return true;
        }
        return false;
      });
      setUserNotes(filteredNotes);
      setSearchError(
        filteredNotes.length === 0 ? true : false
      );

    } else {
      setUserNotes(storedNotes);
    }
  };

  useEffect(() => {
    if (storedNotes) {
      setUserNotes(storedNotes);
    } else {
      setUserNotes([]);
    }
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
          {userNotes &&
            userNotes.length > 0 &&
            userNotes.map((note: JSX.IntrinsicAttributes & INoteCardProps) => (
              <NoteCard
                key={note.id}
                title={note.title}
                id={note.id}
                onPress={() => {
                  navigation.navigate("Note", { note });
                }}
              />
            ))}

          {!userNotes ||
            (userNotes.length === 0 && searchError === false && (
              <NoteCard
                title={"Nenhuma nota encontrada"}
                onPress={() => navigation.navigate("CreateNote")}
              />
            ))}

          {searchError && (
            <S.Note404>
              <MaterialIcons name="error" size={24} color={colors.error} />
              <S.Error>
                Nota não encontrada, verifique o termo pesquisado e tente
                novamente.
              </S.Error>
            </S.Note404>
          )}
        </S.NoteContainer>
        <CollapsibleButtonWithDrawer
          drawerOptions={[
            {
              label: "Nova nota",
              onPress: () => navigation.navigate("CreateNote"),
              iconName: "plus",
              iconSize: 20,
            },
          ]}
          iconName="plus"
          iconSize={26}
          iconColor={colors.accent}
          height={50}
        />
      </S.Content>
    </Container>
  );
}