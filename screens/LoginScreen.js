import React, { useEffect } from "react";
import { Text, Button } from "react-native";
import { WebView } from "react-native-webview";
import { connect } from "react-redux";
import * as R from "ramda";
import styled from "styled-components";
import { client_id, client_secret } from "../utils/constants";
import { writeToken } from "../redux/actions";
import { requestToken, getCode } from "../utils/helper";

const Wrap = styled.View`
  flex: 1;
  background-color: #f2f2f2;
  justify-content: center;
  align-items: center;
`;

const LoginScreen = ({ accessToken, writeToken, navigation }) => {
  onRedirect = webViewState => {
    const url = webViewState.url;
    if (url.includes("code")) {
      const code = getCode(url);
      requestToken(writeToken, code, client_id, client_secret);
    }
  };

  const uri = `https://dribbble.com/oauth/authorize?client_id=${client_id}&scope=public%20upload`;
  return <WebView source={{ uri }} onNavigationStateChange={onRedirect} />;
};

const mapStateToProps = state => R.pick(["accessToken"], state);

export default connect(
  mapStateToProps,
  { writeToken }
)(LoginScreen);
