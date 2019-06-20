import React, { useCallback } from "react";
import { Image } from "react-native";
import styled from "styled-components";
import { withNavigation } from "react-navigation";
import { img } from "../assets";

const Wrap = styled.View`
  flex: 1;
  margin-bottom: 30;
  padding-top: 10;
  flex-direction: row;
  justify-content: space-between;
  background-color: #f2f2f2;
  width: 100%;
  max-height: 45;
`;

const MenuButton = styled.TouchableOpacity`
  width: 45;
  height: 45;
  flex: 1;
  justify-content: center;
  align-items: center;
  border-color: black;
`;

const ControlPanel = ({ navigation }) => {
  const goTo = useCallback(page => {
    navigation.navigate(page);
  });

  return (
    <Wrap>
      <MenuButton>
        <Image source={img.menu} />
      </MenuButton>
      <MenuButton>
        <Image source={img.bin} />
      </MenuButton>
      <MenuButton onPress={() => goTo("createShot")}>
        <Image source={img.plus} />
      </MenuButton>
      <MenuButton>
        <Image source={img.calendar} />
      </MenuButton>
      <MenuButton>
        <Image source={img.statistics} />
      </MenuButton>
    </Wrap>
  );
};

export default withNavigation(ControlPanel);
