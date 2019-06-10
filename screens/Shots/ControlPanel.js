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

const ControlPanel = ({ navigation }) => (
  <Wrap>
    <MenuButton>
      <Image source={require("./menu.png")} />
    </MenuButton>
    <MenuButton>
      <Image source={require("./bin.png")} />
    </MenuButton>
    <MenuButton onPress={() => navigation.navigate("CreateShot")}>
      <Image source={require("./new.png")} />
    </MenuButton>
    <MenuButton>
      <Image source={require("./calendar.png")} />
    </MenuButton>
    <MenuButton>
      <Image source={require("./statistics.png")} />
    </MenuButton>
  </Wrap>
);

export default withNavigation(ControlPanel);
