import React from "react";
import { WebView } from "react-native-webview";
import { connect } from "react-redux";
import { client_id, client_secret } from "../utils/constants";
import { writeToken } from "../redux/actions";
import { requestToken, getCode } from "../utils";

const LoginScreen = ({ writeToken }) => {
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

export default connect(
  null,
  { writeToken }
)(LoginScreen);
