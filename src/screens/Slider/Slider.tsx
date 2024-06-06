import React, { useEffect } from "react";
import { storeData } from "../../services/getStorage";
import { useAtom } from "jotai";
import { isOnboardedAtom, initializeIsOnboardedAtom } from "../../store/globalStates";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../shared/navigationTypes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import takeNotes from "../../../assets/img/takeNotes.jpg";
import recAudio from "../../../assets/img/recAudio.jpg";
import takePictures from "../../../assets/img/takePictures.jpg";
import AppIntroSlider from "react-native-app-intro-slider";
import * as S from './Slider.styles'

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export const Slider = () => {
  const [, setIsOnboarded] = useAtom(isOnboardedAtom);
  const [, initializeIsOnboarded] = useAtom(initializeIsOnboardedAtom);
  const navigation = useNavigation<HomeScreenNavigationProp>();


  const slides = [
    {
      id: 1,
      title: "Pare de usar papel",
      description: `Não se preocupe mais em perder anotações feitas em papel, post-its ou papeizinhos. Tudo fica centralizado em um único lugar. `,
      image: takeNotes,
    },
    {
      id: 2,
      title: "Grave audios",
      description: "Se está sem tempo para escrever, ou se prefere gravar suas notas, grave áudios de ate 5 minutos. ",
      image: recAudio,
    },
    {
      id: 3,
      title: 'Tire fotos',
      description: 'Tire fotos para ilustrar a sua nota. Tudo fica centralizado em um único lugar. ',
      image: takePictures
    },
  ]

  const Slide = ({ item }: any) => {
    return (
      <S.Container>
        <S.DescriptionContainer>
          <S.Title>{item.title}</S.Title>
        </S.DescriptionContainer>
        <S.ImageContainer>
          <S.Image source={item.image} />
        </S.ImageContainer>
        <S.DescriptionContainer>
          <S.Description>{item.description}</S.Description>
        </S.DescriptionContainer>
      </S.Container>
    );
  };
 
  const onDone = async () => {
   await storeData("@isOnboarded", "true");
   setIsOnboarded(true);
   navigation.navigate("Home");
 };


  useEffect(() => {
    initializeIsOnboarded();
  }, [initializeIsOnboarded]);

 


  return (
    <AppIntroSlider 
      data={slides}
      renderItem={Slide}
      onDone={onDone}
      renderPrevButton={() => null}
      doneLabel="Começar"
      prevLabel="Voltar"
      nextLabel="Avançar"
      showDoneButton
    />
  );
};
