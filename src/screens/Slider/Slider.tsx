import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import AppIntroSlider from "react-native-app-intro-slider";
import recAudio from "../../../assets/img/recAudio.jpg";
import takeNotes from "../../../assets/img/takeNotes.jpg";
import takePictures from "../../../assets/img/takePictures.jpg";
import { storeData } from "../../hooks/useStorage";
import { RootStackParamList } from "../../shared/navigationTypes";
import { initializeIsOnboardedAtom, isOnboardedAtom } from "../../store/globalStates";
import * as S from './Slider.styles';

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

 const button = (text: string) => {
   return <S.Description>{text}</S.Description>;
 };

  useEffect(() => {
    initializeIsOnboarded();
  }, [initializeIsOnboarded]);

  return (
    <AppIntroSlider
      data={slides}
      renderItem={Slide}
      onDone={onDone}
      doneLabel={button("Começar")}
      nextLabel={button("Próximo")}
      showDoneButton
    />
  );
};
