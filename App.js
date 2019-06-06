import * as React from "react";
import { Text, View, StyleSheet, WebView, Alert, Button } from "react-native";

export default class App extends React.Component {
  state = {
    isAuthorized: false,
    clientId:
      "c932bef0687e2bf0e286d1c59491e6c44069eccb852e5a21f2b5ada934234912",
    clientSecret:
      "bc490377045ff6e62ffffdd362044f82da6f0e59b9b985362c2f17b154167095",
    accessToken: "",
    shots: {}
  };

  onPress = () => {
    const { accessToken } = this.state;
    const url = `https://api.dribbble.com/v2/user?access_token=${accessToken}`;
    console.log(accessToken);
    fetch(url)
      .then(r => r.json())
      .then(data => console.log("data: ", data));
  };

  onRedirect = webViewState => {
    const url = webViewState.url;
    const { clientId, clientSecret } = this.state;
    if (url.includes("code=")) {
      const code = url.substring(url.indexOf("code=") + 5, url.length);
      fetch("https://dribbble.com/oauth/token", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code: code
        })
      })
        .then(r => r.json())
        .then(data => this.setState({ accessToken: data.access_token }));
    }
  };

  render() {
    const { isAuthorized, accessToken, clientId } = this.state;
    const redirectUri = "https://snack.expo.io/@weech22/spunky-watermelon";
    const { onRedirect, onPress } = this;
    const uri = `https://dribbble.com/oauth/authorize?client_id=${clientId}`;
    console.log("shots: ", this.state.shots);
    console.log("AT: ", accessToken);
    if (accessToken === "") {
      return (
        <WebView
          onNavigationStateChange={onRedirect}
          source={{ uri: uri, redirect_uri: redirectUri }}
        />
      );
    } else {
      return (
        <View>
          <Button title="Get shots" onPress={onPress} />
        </View>
      );
    }
  }
}
