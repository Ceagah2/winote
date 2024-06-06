import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import {
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';
import {
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
} from '@expo-google-fonts/open-sans';
import { getData } from './src/services/getStorage';
import { Home } from './src/screens/Home';
import { Slider } from './src/screens/Slider';
import { RootStackParamList } from './src/shared/navigationTypes';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [isOnboarded, setIsOnboarded] = useState<string | null>(null);

  // Carregamento das fontes
  const [fontsLoaded] = useFonts({
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
  });

  // Verificação do estado de onboarding
  useEffect(() => {
    const checkOnboarding = async () => {
      const onboarded = await getData('@isOnboarded');
      setIsOnboarded(onboarded ? onboarded.toString() : 'false');
    };

    checkOnboarding();
  }, []);

  // Exibir AppLoading enquanto as fontes ou estado de onboarding não estão carregados
  if (!fontsLoaded || isOnboarded === null) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={isOnboarded === 'true' ? 'Home' : 'Onboarding'}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Onboarding" component={Slider} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
