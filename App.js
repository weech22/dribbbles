import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  WebView,
  Alert,
  Button,
  Image
} from "react-native";

styles = StyleSheet.create({
  flex: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  }
});

export default class App extends React.Component {
  state = {
    isAuthorized: false,
    clientId:
      "c932bef0687e2bf0e286d1c59491e6c44069eccb852e5a21f2b5ada934234912",
    clientSecret:
      "bc490377045ff6e62ffffdd362044f82da6f0e59b9b985362c2f17b154167095",
    accessToken: "",
    user: {}
  };

  onPress = () => {
    const { accessToken } = this.state;
    const url = `https://api.dribbble.com/v2/user?access_token=${accessToken}`;
    fetch(url)
      .then(r => r.json())
      .then(data => this.setState({ user: data }));
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
    const { isAuthorized, accessToken, clientId, user } = this.state;
    const redirectUri = "http://localhost:8081";
    const { onRedirect, onPress } = this;
    const uri = `https://dribbble.com/oauth/authorize?client_id=${clientId}`;
    console.log("user: ", this.state.user);
    console.log("AT: ", accessToken);
    if (!accessToken) {
      return (
        <WebView
          onNavigationStateChange={onRedirect}
          source={{ uri: uri, redirect_uri: redirectUri }}
        />
      );
    }
    return (
      <View style={styles.flex}>
        <Button title="Get shots" onPress={onPress} />
        <Image
          source={{ uri: user.avatar_url }}
          style={{
            width: 200,
            height: 200
          }}
        />
      </View>
    );
  }
}
