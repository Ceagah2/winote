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
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { CreateNote } from './src/screens/CreateNote';
import { Home } from './src/screens/Home';
import { Note } from './src/screens/Note';
import { Slider } from './src/screens/Slider';
import { getData } from './src/services/getStorage';
import { RootStackParamList } from './src/shared/navigationTypes';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [isOnboarded, setIsOnboarded] = useState<string | null>(null);

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

  useEffect(() => {
    const checkOnboarding = async () => {
      const onboarded = await getData('@isOnboarded');
      setIsOnboarded(onboarded ? onboarded.toString() : 'false');
    };

    checkOnboarding();
  }, []);

  if (!fontsLoaded || isOnboarded === null) {
    return <ActivityIndicator />;
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
          <Stack.Screen name="Note" component={Note} />
          <Stack.Screen name="CreateNote" component={CreateNote} />
          <Stack.Screen name="Onboarding" component={Slider} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
