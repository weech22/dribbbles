import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import * as R from "ramda";
import styled from "styled-components";
import { readToken } from "../redux/actions";

const Wrap = styled.View`
  flex: 1;
  background-color: papayawhip;
  justify-content: center;
  align-items: center;
`;

const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    readToken();
  }, [readToken]);

  return (
    <Wrap>
      <ActivityIndicator />
    </Wrap>
  );
};

const mapStateToProps = state => R.pick(["accessToken"], state);

export default connect(
  mapStateToProps,
  { readToken }
)(LoadingScreen);
