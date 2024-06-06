import { atom } from "jotai";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const isOnboardedAtom = atom<boolean>(false);

export const initializeIsOnboardedAtom = atom(
  (get) => get(isOnboardedAtom),
  async (get, set) => {
    const storedValue = await AsyncStorage.getItem("@isOnboarded");
    set(isOnboardedAtom, storedValue === "true");
  }
);
