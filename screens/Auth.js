import * as React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { writeToken } from "../redux/ducks/authentication";
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

const AuthScreen = ({ writeToken, navigation }) => {
  const onPress = () => {
    fetch(
      `https://dribbble.com/oauth/authorize?client_id=${client_id}&scope=public%20upload`
    ).then(response => {
      const url = response.url;
      if (url.includes("code")) {
        const code = getCode(url);
        requestToken(writeToken, code, client_id, client_secret);
      } else {
        navigation.navigate("Login");
      }
    });
  };

  return (
    <Wrap>
      <Logo source={require("./images/logo.png")} />
      <AuthButton onPress={onPress}>
        <Caption>Authorization</Caption>
      </AuthButton>
    </Wrap>
  );
};

export default connect(
  null,
  { writeToken }
)(AuthScreen);
