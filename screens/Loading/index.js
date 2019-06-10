import React, { useEffect } from "react";
import { View, Image } from "react-native";
import { connect } from "react-redux";
import * as R from "ramda";
import styled from "styled-components";
import { readToken } from "../../redux/actions";

const Wrap = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #ea4c89;
`;

const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    readToken();
  }, [readToken]);

  return (
    <Wrap>
      <Image source={require("./logo.png")} />
    </Wrap>
  );
};

const mapStateToProps = state => R.pick(["accessToken"], state);

export default connect(
  mapStateToProps,
  { readToken }
)(LoadingScreen);
