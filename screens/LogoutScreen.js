import React, { useEffect } from "react";
import { Text, Button, WebView } from "react-native";
import { connect } from "react-redux";
import * as R from "ramda";
import styled from "styled-components";

const Wrap = styled.View`
  flex: 1;
  background-color: #f2f2f2;
  justify-content: center;
  align-items: center;
`;

const LogoutScreen = ({ accessToken, navigation }) => {
  return <WebView source={{ uri: "https://google.com" }} />;
};

const mapStateToProps = state => R.pick(["accessToken"], state);

export default connect(mapStateToProps)(LogoutScreen);
