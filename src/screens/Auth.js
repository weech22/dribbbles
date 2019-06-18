import * as React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { signIn } from "../redux/auth";
import { Logo } from "../components";

const Wrap = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #ea4c89;
  padding: 0 15px;
`;

const Caption = styled.Text`
  color: white;
  text-align: center;
`;

const AuthButton = styled.TouchableOpacity`
  background: #ffd053;
  border-radius: 3px;
  width: 100%;
  padding: 16px 0;
`;

const AuthScreen = ({ signIn }) => (
  <Wrap>
    <Logo />
    <AuthButton onPress={signIn}>
      <Caption>Authorization</Caption>
    </AuthButton>
  </Wrap>
);

export default connect(
  null,
  { signIn }
)(AuthScreen);
