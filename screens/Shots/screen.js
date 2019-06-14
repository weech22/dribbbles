import React, { useEffect } from "react";
import { Image } from "react-native";
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

const settingsIcon = require("./icons/settings.png");

const ShotsScreen = ({ getUserShots, userShots, accessToken }) => {
  useEffect(() => {
    getUserShots(accessToken);
  }, []);

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

const mapStateToProps = state => R.pick(["accessToken", "userShots"], state);

export default connect(
  mapStateToProps,
  { getUserShots }
)(ShotsScreen);
