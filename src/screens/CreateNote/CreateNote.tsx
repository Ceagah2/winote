import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import React, { useState } from "react";
import { CollapsibleButtonWithDrawer } from "../../components/CollapseButtonWithDrawer";
import { Container } from "../../components/Container";
import { Header } from "../../components/Header";
import { TextInput } from "../../components/TextInput";
import { INotes } from "../../shared/Notes.interface";
import { colors } from "../../styles";
import * as S from "./CreateNote.styles";


export const CreateNote = () => {
  const [data, setData] = useState<INotes>({});
  const [audios, setAudios] = useState([]);
  const [playingAudioId, setPlayingAudioId] = useState<number | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const handlePlayPause = async (audio: (typeof MockedAudios)[0]) => {
    if (playingAudioId === audio.id) {
      if (sound) {
        await sound.pauseAsync();
        setPlayingAudioId(null);
      }
    } else {
      if (sound) {
        await sound.unloadAsync();
      }
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audio.url },
        { shouldPlay: true }
      );
      setSound(newSound);
      setPlayingAudioId(audio.id);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setPlayingAudioId(null);
        }
      });
    }
  };

  const handleDelete = (audioId: number) => {
    setAudios(audios.filter((audio) => audio.id !== audioId));
    if (playingAudioId === audioId && sound) {
      sound.unloadAsync();
      setPlayingAudioId(null);
    }
  };

  return (
    <Container>
      <S.Content>
        <Header
          title="Nova nota"
          isSavable
          onSave={() => console.log("Salvando")}
        />
        <S.TitleContainer>
          <TextInput
            placeholder="Insira um bom título para a sua nota"
            value={data.title}
            onChangeText={(value) => setData({ ...data, title: value })}
          />
        </S.TitleContainer>
        <S.DescriptionContainer>
          <TextInput
            placeholder="Anote tudo o que desejar aqui"
            multiline
            textAlignVertical="top"
            textAlign="left"
            style={{ height: 400, width: "100%", marginTop: 10 }}
            value={data.description}
            onChangeText={(value) => setData({ ...data, description: value })}
          />
        </S.DescriptionContainer>
        <S.AudioContainer>
          {audios &&
            audios.length > 0 &&
            audios.map((audio) => (
              <S.Audio key={audio.id}>
                <S.AudioIcon onPress={() => handlePlayPause(audio)}>
                  {playingAudioId === audio.id ? (
                    <Ionicons name="pause" size={20} color={colors.cta} />
                  ) : (
                    <Ionicons name="play" size={20} color={colors.cta} />
                  )}
                </S.AudioIcon>
                <S.AudioTitle>{audio.name}</S.AudioTitle>
                <S.AudioDuration>{audio.duration}</S.AudioDuration>
                <S.AudioIcon onPress={() => handleDelete(audio.id)}>
                  <Ionicons name="trash" size={20} color={colors.cta} />
                </S.AudioIcon>
              </S.Audio>
            ))}
        </S.AudioContainer>
      </S.Content>
      <CollapsibleButtonWithDrawer
        drawerOptions={[
          {
            label: "Novo áudio",
            onPress: () => console.log("Novo áudio"),
            iconName: "microphone",
            iconSize: 20,
          },
          {
            label: "Nova foto",
            onPress: () => console.log("Nova foto"),
            iconName: "camera",
            iconSize: 20,
          },
        ]}
        iconName={"plus"}
        iconSize={20}
        iconColor={colors.accent}
        height={100}
      />
    </Container>
  );
};
