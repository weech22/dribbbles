import * as React from "react";
import { WebView } from "react-native-webview";
import { connect } from "react-redux";
import * as R from "ramda";
import { writeToken } from "../redux/actions";
import { client_id, client_secret } from "../utils/constants";

const AuthScreen = ({ writeToken, accessToken, navigation }) => {
  onRedirect = webViewState => {
    const url = webViewState.url;

    if (url.includes("code")) {
      const code = url.substring(url.indexOf("code=") + 5, url.length);
      const params = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          client_id,
          client_secret,
          code
        })
      };

      fetch("https://dribbble.com/oauth/token", params)
        .then(r => r.json())
        .then(data => {
          if (data.access_token) {
            writeToken(data.access_token);
          }
        });
    }
  };

  const uri = `https://dribbble.com/oauth/authorize?client_id=${client_id}`;
  return <WebView source={{ uri }} onNavigationStateChange={onRedirect} />;
};

const mapStateToProps = state => R.pick(["accessToken"], state);

export default connect(
  mapStateToProps,
  { writeToken }
)(AuthScreen);
