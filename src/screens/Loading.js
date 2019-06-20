import React, { useEffect } from "react";
import { Image } from "react-native";
import { connect } from "react-redux";
import styled from "styled-components";
import { readToken } from "../redux/auth";
import { img } from "../assets";

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
    }, 700);
  }, []);

  return (
    <Wrap>
      <Image source={img.logo} />
    </Wrap>
  );
};

export default connect(
  null,
  { readToken }
)(LoadingScreen);
