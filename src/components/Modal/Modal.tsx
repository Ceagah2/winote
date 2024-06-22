import { Ionicons } from "@expo/vector-icons";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
import React, { useEffect, useRef } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  Modal as RNModal
} from "react-native";
import { colors } from "../../styles";
import { IModal } from "./Modal.interface";
import * as S from "./Modal.styles";

const screenHeight = Dimensions.get("window").height;

export const Modal = ({
  visible,
  onClose,
  isRecording,
  setIsRecording,
  onRecordingComplete,
}: IModal) => {
  const slideAnim = useRef(new Animated.Value(screenHeight)).current;
  const recordingRef = useRef<Audio.Recording | null>(null);

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: screenHeight * 0.7,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);

  useEffect(() => {
    Audio.requestPermissionsAsync().then(({ granted }) => {
      if (granted) {
        Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
          interruptionModeIOS: InterruptionModeIOS.DuckOthers,
          shouldDuckAndroid: true,
          interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
          playThroughEarpieceAndroid: false,
        });
      }
    });
  }, []);

  const handleRecordingStart = async () => {
    const { granted } = await Audio.getPermissionsAsync();
    if (granted) {
      try {
        const { recording } = await Audio.Recording.createAsync();
        recordingRef.current = recording;
        setIsRecording(true);
      } catch (error) {
        Alert.alert(
          "Erro ao iniciar gravação",
          "Certifique-se de que você deu acesso ao microfone."
        );
      }
    } else {
      Alert.alert(
        "Permissão negada",
        "Você precisa permitir o acesso ao microfone para gravar áudio."
      );
    }
  };

  const handleRecordingStop = async () => {
    if (recordingRef.current) {
      try {
        await recordingRef.current.stopAndUnloadAsync();
        const uri = recordingRef.current.getURI();
        const status = await recordingRef.current.getStatusAsync();
        const duration = status.durationMillis / 1000; 
        onRecordingComplete(uri, duration);
        setIsRecording(false);
      } catch (error) {
        Alert.alert(
          "Erro ao parar gravação",
          "Certifique-se de que você deu acesso ao microfone."
        );
      }
    }
  };

  return (
    <RNModal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View
        style={{
          transform: [{ translateY: slideAnim }],
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          padding: 20,
        }}
      >
        <S.ModalHeader>
          <S.CloseButton onPress={onClose}>
            <Ionicons name="close" size={26} />
          </S.CloseButton>
        </S.ModalHeader>
        <S.ModalBody>
          <S.RecordingText>
            {" "}
            Aperte e segure o botão para iniciar sua gravação.{" "}
          </S.RecordingText>
          <S.ButtonContainer>
            <S.RecordButton
              onPressIn={handleRecordingStart}
              onPressOut={handleRecordingStop}
            >
              {!isRecording ? (
                <Ionicons name="mic" size={64} color="black" />
              ) : (
                <Ionicons name="microphone" size={64} color="black" />
              )}
            </S.RecordButton>
            {isRecording && (
              <S.RecordingText color={colors.cta}>
                Seu áudio está sendo gravado...
              </S.RecordingText>
            )}
          </S.ButtonContainer>
        </S.ModalBody>
      </Animated.View>
    </RNModal>
  );
};
