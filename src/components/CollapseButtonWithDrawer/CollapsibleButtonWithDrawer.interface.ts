import { ViewStyle } from "react-native";

export interface ICollapseButton {
  drawerOptions: { label: string; onPress: () => void, iconName: string, iconSize: number }[];
  iconName: string;
  iconSize: number;
  iconColor: string;
  buttonStyle?: ViewStyle;
  height: number;
}