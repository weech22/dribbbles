import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { readToken } from "../redux/actions";

const Wrap = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #ea4c89;
`;

//TODO: Implement React Native animation
const Logo = styled.Image``;

const LoadingScreen = ({ readToken }) => {
  useEffect(() => {
    readToken();
  }, []);

  return (
    <Wrap>
      <Logo source={require("./images/logo.png")} />
    </Wrap>
  );
};

export default connect(
  null,
  { readToken }
)(LoadingScreen);
