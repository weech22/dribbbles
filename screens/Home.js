import React, { useEffect } from "react";
import { Text, Button } from "react-native";
import { connect } from "react-redux";
import * as R from "ramda";
import styled from "styled-components";
import { signOut } from "../redux/actions";

const Wrap = styled.View`
  flex: 1;
  background-color: papayawhip;
  justify-content: center;
  align-items: center;
`;

const HomeScreen = ({ accessToken, signOut, navigation }) => {
  return (
    <Wrap>
      <Text>HomeScreen</Text>

      <Button title="Profile" onPress={() => navigation.navigate("Profile")} />
      <Button title="Log out" onPress={() => signOut()} />
    </Wrap>
  );
};

const mapStateToProps = state => R.pick(["accessToken"], state);

export default connect(
  mapStateToProps,
  { signOut }
)(HomeScreen);
