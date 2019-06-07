import React, { useEffect } from "react";
import { Text, Button } from "react-native";
import { connect } from "react-redux";
import * as R from "ramda";
import styled from "styled-components";
import { readToken, writeToken } from "../redux/actions";

const Wrap = styled.View`
  flex: 1;
  background-color: papayawhip;
  justify-content: center;
  align-items: center;
`;

const ProfileScreen = ({ navigation }) => {
  useEffect(() => {}, []);
  return (
    <Wrap>
      <Text>ProfileScreen</Text>
    </Wrap>
  );
};

const mapStateToProps = state => R.pick(["accessToken"], state);

export default connect(
  mapStateToProps,
  { readToken }
)(ProfileScreen);
