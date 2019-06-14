import React, { useEffect } from "react";
import { Image } from "react-native";
import { connect } from "react-redux";
import styled from "styled-components";
import { readToken } from "../redux/ducks/authentication";

const Wrap = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #ea4c89;
`;

const LoadingScreen = ({ readToken }) => {
  useEffect(() => {
    setTimeout(() => {
      readToken();
    }, 1500);
  }, []);

  return (
    <Wrap>
      <Image source={require("./images/logo.png")} />
    </Wrap>
  );
};

export default connect(
  null,
  { readToken }
)(LoadingScreen);
