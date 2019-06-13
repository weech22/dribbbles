import React, { useEffect } from "react";
import { Image, StatusBar, View, Text } from "react-native";
import { connect } from "react-redux";
import * as R from "ramda";
import { SafeAreaView } from "react-navigation";
import styled from "styled-components";
import { getUserShots } from "../../redux/actions";
import ShotsList from "./ShotsList";
import ControlPanel from "./ControlPanel";

const Wrap = styled.View`
  flex: 1;
  justify-content: space-between;
  background-color: #f2f2f2;
`;

const Title = styled.Text`
  font-size: 18;
`;

const Header = styled.View`
  flex: 1;
  max-height: 45;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 15;
  padding-right: 15;
  margin-top: 15;
  align-items: center;
`;

const MenuButton = styled.TouchableOpacity`
  max-width: 45;
  max-height: 45;
  flex: 1;
  justify-content: center;
  align-items: center;
  border-color: black;
`;

const ShotsScreen = ({ navigation, getUserShots, userShots, accessToken }) => {
  useEffect(() => {
    fetch(`https://api.dribbble.com/v2/user/shots?access_token=${accessToken}`)
      .then(response => response.json())
      .then(data => {
        getUserShots(data);
      });
  }, []);

  return (
    <Wrap>
      <SafeAreaView />
      <Header>
        <Title>Shots</Title>
        <MenuButton>
          <Image source={require("./settings.png")} />
        </MenuButton>
      </Header>
      <ShotsList shots={userShots} />
      <ControlPanel />
    </Wrap>
  );
};

const mapStateToProps = state => R.pick(["accessToken", "userShots"], state);

export default connect(
  mapStateToProps,
  { getUserShots }
)(ShotsScreen);
