import * as React from "react";
import { WebView } from "react-native-webview";
import { Image } from "react-native";
import { connect } from "react-redux";
import styled from "styled-components";
import * as R from "ramda";
import { writeToken } from "../redux/actions";
import { client_id, client_secret } from "../utils/constants";

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
  top: -80;
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
  return (
    <Wrap>
      <Logo source={require("./logo.png")} />
      <AuthButton>
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
