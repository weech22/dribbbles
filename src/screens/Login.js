import React from "react";
import { WebView } from "react-native-webview";
import { connect } from "react-redux";
import { AUTH_URL, CLIENT_ID, CLIENT_SECRET } from "../utils/constants";
import { requestToken, getCode } from "../utils/helper";
import { writeToken } from "../redux/auth";

const LoginScreen = ({ writeToken }) => {
  onRedirect = webViewState => {
    const url = webViewState.url;
    if (url.includes("code")) {
      const code = getCode(url);
      requestToken(writeToken, code, CLIENT_ID, CLIENT_SECRET);
    }
  };

  const uri = AUTH_URL;
  return <WebView source={{ uri }} onNavigationStateChange={onRedirect} />;
};

export default connect(
  null,
  { writeToken }
)(LoginScreen);
