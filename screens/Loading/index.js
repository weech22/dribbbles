import React, { useEffect } from "react";
import { Image, Button } from "react-native";
import { connect } from "react-redux";
import * as R from "ramda";
import styled from "styled-components";
import { readToken, writeToken } from "../../redux/actions";
import { client_id, client_secret } from "../../utils/constants";

const Wrap = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #ea4c89;
`;

const Logo = styled.Image``;

const LoadingScreen = ({ navigation, readToken, accessToken, writeToken }) => {
  useEffect(() => {
    readToken();
  }, []);

  return (
    <Wrap>
      <Logo source={require("./logo.png")} />
    </Wrap>
  );
};

const mapStateToProps = state => R.pick(["accessToken"], state);

export default connect(
  mapStateToProps,
  { readToken, writeToken }
)(LoadingScreen);
