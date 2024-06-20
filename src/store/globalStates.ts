import AsyncStorage from "@react-native-async-storage/async-storage";
import { atom } from "jotai";
import { INotes } from "../shared/Notes.interface";

export const isOnboardedAtom = atom<boolean>(false);

export const initializeIsOnboardedAtom = atom(
  (get) => get(isOnboardedAtom),
  async (get, set) => {
    const storedValue = await AsyncStorage.getItem("@isOnboarded");
    set(isOnboardedAtom, storedValue === "true");
  }
);

export const storedUserNotesAtom = atom<INotes[]>([]);

export const initializedStoredUserNotesAtom = atom(
  (get) => get(storedUserNotesAtom),
  async (get, set) => {
    const storedValue = await AsyncStorage.getItem("@userNotes");
    set(storedUserNotesAtom, storedValue ? JSON.parse(storedValue) : []);
  }
)