import React from "react";
import { Image } from "react-native";
import styled from "styled-components";
import { withNavigation } from "react-navigation";

const Wrap = styled.View`
  flex: 1;
  margin-bottom: 30;
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

// TODO: Make button into separate component?
const ControlPanel = ({ navigation }) => (
  <Wrap>
    <MenuButton>
      <Image source={require("./icons/menu.png")} />
    </MenuButton>
    <MenuButton>
      <Image source={require("./icons/bin.png")} />
    </MenuButton>
    <MenuButton onPress={() => navigation.navigate("CreateShot")}>
      <Image source={require("./icons/new.png")} />
    </MenuButton>
    <MenuButton>
      <Image source={require("./icons/calendar.png")} />
    </MenuButton>
    <MenuButton>
      <Image source={require("./icons/statistics.png")} />
    </MenuButton>
  </Wrap>
);

export default withNavigation(ControlPanel);
