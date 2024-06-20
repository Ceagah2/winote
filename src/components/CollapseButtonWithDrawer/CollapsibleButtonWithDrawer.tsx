import { FontAwesome6 } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { Animated, TouchableOpacity } from "react-native";
import * as S from "./CollapseButton.styles";
import { ICollapseButton } from "./CollapsibleButtonWithDrawer.interface";



export const CollapsibleButtonWithDrawer: React.FC<
  ICollapseButton
> = ({
  drawerOptions,
  iconName,
  iconSize,
  iconColor,
  buttonStyle,
  height,
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const circleRef = useRef<Animated.Value>(new Animated.Value(0));
  const drawerHeight = useRef<Animated.Value>(new Animated.Value(0));

  const onColapsePress = () => {
    if (isCollapsed) {
      Animated.timing(drawerHeight.current, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(drawerHeight.current, {
        toValue: height,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }

    Animated.sequence([
      Animated.timing(circleRef.current, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(circleRef.current, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsCollapsed(!isCollapsed);
    });
  };

  return (
    <S.Footer>
      <Animated.View
        style={{ height: drawerHeight.current, overflow: "hidden" }}
      >
        {drawerOptions.map((option, index) => (
          <TouchableOpacity key={index} onPress={option.onPress}>
            <S.DrawerOption>
              <FontAwesome6 name={option.iconName} size={option.iconSize} color={iconColor} />
              <S.DrawerOptionText>{option.label}</S.DrawerOptionText>
            </S.DrawerOption>
          </TouchableOpacity>
        ))}
      </Animated.View>
      <S.CollapseButton onPress={onColapsePress} style={buttonStyle}>
        <Animated.View
          style={{
            transform: [
              {
                rotate: circleRef.current.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0deg", "360deg"],
                }),
              },
              {
                scale: circleRef.current.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.75],
                }),
              },
            ],
          }}
        >
          <FontAwesome6 name={iconName} size={iconSize} color={iconColor} />
        </Animated.View>
      </S.CollapseButton>
    </S.Footer>
  );
};
