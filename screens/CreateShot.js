import React, { useEffect } from "react";
import { Text } from "react-native";
import { connect } from "react-redux";
import * as R from "ramda";
import styled from "styled-components";

const Wrap = styled.View`
  flex: 1;
  background-color: #f2f2f2;
`;

const Title = styled.Text``;

const Input = styled.TextInput``;
const Label = styled.Text``;

const CreateShot = ({ navigation }) => {
  useEffect(() => {}, []);

  return (
    <Wrap>
      <Text>Create Shot</Text>
      <Input />
    </Wrap>
  );
};

const mapStateToProps = state => R.pick(["accessToken"], state);

export default connect(
  mapStateToProps,
  {}
)(CreateShot);
