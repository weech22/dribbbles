import React, { useEffect } from "react";
import { Image, Platform } from "react-native";
import { connect } from "react-redux";
import { SafeAreaView } from "react-navigation";
import styled from "styled-components";
import { getUserShots, getShotList } from "../redux/shots";
import { getAccessToken, signOut } from "../redux/auth";
import { ShotsList, ControlPanel } from "../components";
import { img } from "../assets";

const Wrap = styled.View`
  flex: 1;
  padding-top: ${Platform.OS === "ios" ? "60px" : "20px"};
  justify-content: space-between;
  background-color: #f2f2f2;
`;

const Title = styled.Text`
  font-size: 18;
`;

const Caption = styled.Text`
  font-size: 16;
`;

const NoShots = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
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

const ShotsScreen = ({ getUserShots, signOut, shotList, accessToken }) => {
  useEffect(() => {
    console.log(accessToken);
    getUserShots(accessToken);
  }, []);

  return (
    <Wrap>
      <SafeAreaView />
      <Header>
        <Title>Shots</Title>
        <MenuButton onPress={signOut}>
          <Image source={img.logout} />
        </MenuButton>
      </Header>
      {shotList.length ? (
        <ShotsList shots={shotList} />
      ) : (
        <NoShots>
          <Caption>You don't have any shots</Caption>
        </NoShots>
      )}

      <ControlPanel />
    </Wrap>
  );
};

const mapStateToProps = state => ({
  accessToken: getAccessToken(state),
  shotList: getShotList(state)
});

export default connect(
  mapStateToProps,
  { getUserShots, signOut }
)(ShotsScreen);
