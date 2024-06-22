import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";
import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { CollapsibleButtonWithDrawer } from "../../components/CollapseButtonWithDrawer";
import { Container } from "../../components/Container";
import { Header } from "../../components/Header";
import { Modal } from "../../components/Modal";
import { TextInput } from "../../components/TextInput";
import { storeData } from "../../hooks/useStorage";
import { INotes } from "../../shared/Notes.interface";
import { colors } from "../../styles";
import * as S from "./CreateNote.styles";

interface IAudioItem {
  uri: string;
  name: string;
  duration: string;
}

export const CreateNote = (props: INotes) => {
  const [data, setData] = useState<INotes>({});
  const [audios, setAudios] = useState<IAudioItem[]>([]);
  const [playingAudioId, setPlayingAudioId] = useState<number | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [position, setPosition] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isSliding, setIsSliding] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isMicOpen, setIsMicOpen] = useState<boolean>(false);

  const handlePlayPause = async (audio: IAudioItem, index: number) => {
    if (playingAudioId === index) {
      if (sound) {
        await sound.pauseAsync();
        setPlayingAudioId(null);
      }
    } else {
      if (sound) {
        await sound.unloadAsync();
      }
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audio.uri },
        { shouldPlay: true }
      );
      setSound(newSound);
      setPlayingAudioId(index);

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

  const handleDelete = (index: number) => {
    Alert.alert("Excluir", "Tem certeza que deseja excluir esta nota?", [
      {
        text: "Nao quero deletar",
        style: "cancel",
      },
      {
        text: "Tenho certeza",
        style: "destructive",
        onPress: () => {
          setAudios(audios.filter((_, i) => i !== index));
          if (playingAudioId === index && sound) {
            sound.unloadAsync();
            setPlayingAudioId(null);
          }
        },
      },
    ])
  };

  const handleSaveNote = () => {
    storeData(`@Nota${data.id}`, JSON.stringify(data));
  };

  const formatDuration = (durationMillis: number): string => {
    const totalSeconds = Math.floor(durationMillis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleRecordingComplete = async (uri: string) => {
    const { sound } = await Audio.Sound.createAsync({ uri });
    const status = await sound.getStatusAsync();
    const duration = formatDuration(status.durationMillis);
    const newAudio = {
      uri,
      name: `Audio-Nota-${audios.length + 1}`,
      duration,
    };
    setAudios([...audios, newAudio]);
    setIsMicOpen(false);
    setIsRecording(false);
    sound.unloadAsync(); 
  };

  const handleNewAudio = () => {
    setIsMicOpen(true);
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
          {audios.map((audio, index) => (
            <S.Audio key={index}>
              <S.AudioIcon onPress={() => handlePlayPause(audio, index)}>
                {playingAudioId === index ? (
                  <Ionicons name="pause" size={20} color={colors.cta} />
                ) : (
                  <Ionicons name="play" size={20} color={colors.cta} />
                )}
              </S.AudioIcon>
              <S.AudioTitle>{audio.name}</S.AudioTitle>
              <View style={{ width: 180 }}>
                {playingAudioId === index && (
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
              <S.AudioIcon onPress={() => handleDelete(index)}>
                <Ionicons name="trash" size={20} color={colors.cta} />
              </S.AudioIcon>
            </S.Audio>
          ))}
        </S.AudioContainer>
        <Modal
          visible={isMicOpen}
          onClose={() => setIsMicOpen(false)}
          isRecording={isRecording}
          setIsRecording={setIsRecording}
          onRecordingComplete={handleRecordingComplete}
        />
      </S.Content>
      <CollapsibleButtonWithDrawer
        drawerOptions={[
          {
            label: "Novo áudio",
            onPress: handleNewAudio,
            iconName: "microphone",
            iconSize: 20,
          },
          {
            label: "Nova foto",
            onPress: () => console.log("Nova Foto"),
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
