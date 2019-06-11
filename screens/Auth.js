import * as React from "react";
import { WebView } from "react-native-webview";
import { Image } from "react-native";
import { connect } from "react-redux";
import styled from "styled-components";
import * as R from "ramda";
import { writeToken } from "../redux/actions";
import { client_id, client_secret } from "../utils/constants";
import { requestToken, getCode } from "../utils/helper";

const Wrap = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #ea4c89;
  padding-left: 15;
  padding-right: 15;
`;
const Logo = styled.Image`
  position: relative;
  top: -100;
`;

const Caption = styled.Text`
  color: white;
  text-align: center;
`;

const AuthButton = styled.TouchableOpacity`
  background: #ffd053;
  border-radius: 3px;

  width: 100%;
  padding-top: 16;
  padding-bottom: 16;
`;

const AuthScreen = ({ writeToken, accessToken, navigation }) => {
  const onPress = () => {
    fetch(`https://dribbble.com/oauth/authorize?client_id=${client_id}`).then(
      response => {
        const url = response.url;
        if (url.includes("code")) {
          const code = getCode(url);
          requestToken(writeToken, code, client_id, client_secret);
        } else {
          navigation.navigate("Login");
        }
      }
    );
  };

  return (
    <Wrap>
      <Logo source={require("./logo.png")} />
      <AuthButton onPress={onPress}>
        <Caption>Authorization</Caption>
      </AuthButton>
    </Wrap>
  );
};

const mapStateToProps = state => R.pick(["accessToken"], state);

export default connect(
  mapStateToProps,
  { writeToken }
)(AuthScreen);
