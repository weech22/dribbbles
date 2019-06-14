import React from "react";
import { Button } from "react-native";
import { connect } from "react-redux";
import styled from "styled-components";
import { SafeAreaView } from "react-navigation";
import { signOut } from "../redux/ducks/signOut";

const Wrap = styled.View`
  flex: 1;
  background-color: #f2f2f2;
  justify-content: center;
  align-items: center;
`;

const HomeScreen = ({ signOut, navigation }) => {
  return (
    <Wrap>
      <SafeAreaView />
      <Button title="Profile" onPress={() => navigation.navigate("Profile")} />
      <Button title="Shots" onPress={() => navigation.navigate("Shots")} />
      {<Button title="Log out" onPress={() => signOut()} />}
    </Wrap>
  );
};

export default connect(
  null,
  { signOut }
)(HomeScreen);
