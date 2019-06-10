import React, { useEffect } from "react";
import { View, ImageBackground } from "react-native";
import { connect } from "react-redux";
import * as R from "ramda";
import styled from "styled-components";
import Shot from "./Shot";

const Wrap = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  background-color: #f2f2f2;
  width: 100%;
  padding-left: 25;
  padding-right: 25;
  padding-top: 35;
`;

const Title = styled.Text``;

const ShotsList = ({ navigation, shots }) => {
  useEffect(() => {}, []);

  return <Wrap>{shots && shots.map(shot => <Shot shot={shot} />)}</Wrap>;
};

const mapStateToProps = state => R.pick(["accessToken"], state);

export default connect(
  mapStateToProps,
  {}
)(ShotsList);
