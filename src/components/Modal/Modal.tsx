import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Modal as RNModal,
  TouchableWithoutFeedback,
} from "react-native";
import { IModal } from "./Modal.interface";
import * as S from "./Modal.styles";

const screenHeight = Dimensions.get("window").height;

export const Modal = ({ visible, onClose, isRecording, children }: IModal) => {
  const slideAnim = useRef(new Animated.Value(screenHeight)).current;

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

  return (
    <RNModal
      transparent={true}
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <S.Container>
          <TouchableWithoutFeedback>
            <Animated.View style={{ transform: [{ translateY: slideAnim }] }}>
              <S.ModalContent>
                <S.ModalHeader>
                  <S.CloseButton onPress={onClose}>
                    <Ionicons name="close" size={26} />
                  </S.CloseButton>
                </S.ModalHeader>
                <S.ModalBody>
                  {isRecording && (
                    <S.RecordingText>Recording...</S.RecordingText>
                  )}
                </S.ModalBody>
              </S.ModalContent>
            </Animated.View>
          </TouchableWithoutFeedback>
        </S.Container>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};
