import React, { useEffect } from "react";
import { Image } from "react-native";
import { connect } from "react-redux";
import * as R from "ramda";
import { SafeAreaView } from "react-navigation";
import styled from "styled-components";
import { getUserShots } from "../redux/shots";
import { ShotsList, ControlPanel } from "../components";

const Wrap = styled.View`
  flex: 1;
  padding-top: 80px;
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
  padding: 0 15px;
  margin: 15px 0;
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

const settingsIcon = require("../assets/settings.png");

const ShotsScreen = ({ getUserShots, userShots, accessToken }) => {
  useEffect(() => {
    getUserShots(accessToken);
  }, []);
  console.log(userShots);
  return (
    <Wrap>
      <SafeAreaView />
      <Header>
        <Title>Shots</Title>
        <MenuButton>
          <Image source={settingsIcon} />
        </MenuButton>
      </Header>
      <ShotsList shots={userShots} />
      <ControlPanel />
    </Wrap>
  );
};

const mapStateToProps = state => {
  const userShots = R.path(["userShots", "shotList"], state);
  return {
    accessToken: state.accessToken,
    userShots
  };
};

export default connect(
  mapStateToProps,
  { getUserShots }
)(ShotsScreen);
