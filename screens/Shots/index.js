import React, { useEffect } from "react";
import { View, ImageBackground } from "react-native";
import { connect } from "react-redux";
import * as R from "ramda";
import styled from "styled-components";
import { getUserShots } from "../../redux/actions";
import ShotsList from "./ShotsList";

const Wrap = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
`;

const Title = styled.Text`
  font-size: 18;
`;

const ShotsScreen = ({ navigation, getUserShots, userShots }) => {
  useEffect(() => {
    console.log("toki: ", accessToken);
    const accessToken =
      "c0c11be3b37f76967f2380d65465834aa5cb7bb9549d991ff7ad34a53c41a8e0";
    fetch(`https://api.dribbble.com/v2/user/shots?access_token=${accessToken}`)
      .then(response => response.json())
      .then(data => {
        console.log("shotss: ", data);
        getUserShots(data);
      });
  }, []);

  return (
    <Wrap>
      <Title>Shots</Title>
      <ShotsList shots={userShots} />
    </Wrap>
  );
};

const mapStateToProps = state => R.pick(["accessToken", "userShots"], state);

export default connect(
  mapStateToProps,
  { getUserShots }
)(ShotsScreen);
