import React, { useEffect } from "react";
import { Text, Button, View } from "react-native";
import { connect } from "react-redux";
import * as R from "ramda";
import styled from "styled-components";
import { SafeAreaView } from "react-navigation";
import { signOut } from "../redux/actions";

const Wrap = styled.View`
  flex: 1;
  background-color: #f2f2f2;
  justify-content: center;
  align-items: center;
`;

const HomeScreen = ({ accessToken, signOut, navigation }) => {
  console.log(accessToken);
  return (
    <Wrap>
      <SafeAreaView />
      <Button title="Profile" onPress={() => navigation.navigate("Profile")} />
      <Button title="Shots" onPress={() => navigation.navigate("Shots")} />
      <Button title="Log out" onPress={() => signOut()} />
    </Wrap>
  );
};

const mapStateToProps = state => R.pick(["accessToken"], state);

export default connect(
  mapStateToProps,
  { signOut }
)(HomeScreen);
