import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { CollapsibleButtonWithDrawer } from "../../components/CollapseButtonWithDrawer";
import { Container } from "../../components/Container";
import { Header } from "../../components/Header";
import { Modal } from "../../components/Modal";
import { TextInput } from "../../components/TextInput";
import { storeData } from "../../hooks/useStorage";
import { INotes } from "../../shared/Notes.interface";
import { colors } from "../../styles";
import * as S from "./CreateNote.styles";



export const CreateNote = () => {
  const [data, setData] = useState<INotes>({});
  const [audios, setAudios] = useState([]);
  const [playingAudioId, setPlayingAudioId] = useState<number | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [position, setPosition] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isSliding, setIsSliding] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
  const [isMicOpen, setIsMicOpen] = useState<boolean>(false);

  const handlePlayPause = async (audio: (typeof audios)[0]) => {
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
        if (status.isLoaded) {
          setPosition(status.positionMillis);
          setDuration(status.durationMillis || 0);
          if (status.didJustFinish) {
            setPlayingAudioId(null);
          }
        }
      });
    }
  };

  const handleSliderValueChange = (value: number) => {
    setPosition(value);
  };

  const handleSlidingComplete = async (value: number) => {
    if (sound) {
      await sound.setPositionAsync(value);
    }
    setIsSliding(false);
  };

  const handleDelete = (audioId: number) => {
    setAudios(audios.filter((audio) => audio.id !== audioId));
    if (playingAudioId === audioId && sound) {
      sound.unloadAsync();
      setPlayingAudioId(null);
    }
  };
  const handleSaveNote = () => {
    console.log(`Salvando dados : ${JSON.stringify(data)}`);
    storeData(`${data.id}`)
  }

  const handleNewAudio = () => {
    setIsMicOpen(!isMicOpen);
    console.log('abriu o mic pra gravar')
  }

   const handleNewPhoto = () => {
     console.log("Nova Foto");
   };

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  return (
    <Container>
      <S.Content>
        <Header title="Nova nota" isSavable onSave={handleSaveNote} />
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
                <View style={{ width: 200 }}>
                  {playingAudioId === audio.id && (
                    <Slider
                      style={{ width: 200, height: 40 }}
                      minimumValue={0}
                      maximumValue={duration}
                      value={position}
                      onValueChange={handleSliderValueChange}
                      onSlidingStart={() => setIsSliding(true)}
                      onSlidingComplete={handleSlidingComplete}
                    />
                  )}
                </View>
                <S.AudioDuration>{audio.duration}</S.AudioDuration>

                <S.AudioIcon onPress={() => handleDelete(audio.id)}>
                  <Ionicons name="trash" size={20} color={colors.cta} />
                </S.AudioIcon>
              </S.Audio>
            ))}
        </S.AudioContainer>
          <Modal visible={isMicOpen} onClose={() => setIsMicOpen(false)} >
            <S.AudioTitle> Modal esta aberto</S.AudioTitle>
          </Modal>
          
      </S.Content>
      <CollapsibleButtonWithDrawer
        drawerOptions={[
          {
            label: "Novo áudio",
            onPress: () => handleNewAudio(),
            iconName: "microphone",
            iconSize: 20,
          },
          {
            label: "Nova foto",
            onPress: () => handleNewPhoto(),
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
