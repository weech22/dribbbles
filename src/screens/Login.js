import React, { useCallback } from "react";
import { WebView } from "react-native-webview";
import { connect } from "react-redux";
import { AUTH_URL, CLIENT_ID, CLIENT_SECRET } from "../utils/constants";
import { getCode } from "../utils/helper";
import { writeToken } from "../redux/auth";

const LoginScreen = ({ writeToken }) => {
  const onRedirect = useCallback(webViewState => {
    const url = webViewState.url;
    if (url.includes("code")) {
      const code = getCode(url);
      writeToken({ code, clientId: CLIENT_ID, clientSecret: CLIENT_SECRET });
    }
  }, []);

  return (
    <WebView source={{ uri: AUTH_URL }} onNavigationStateChange={onRedirect} />
  );
};

export default connect(
  null,
  { writeToken }
)(LoginScreen);
