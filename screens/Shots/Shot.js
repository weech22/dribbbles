import React, { useEffect } from "react";
import { View, ImageBackground } from "react-native";
import { connect } from "react-redux";
import * as R from "ramda";
import styled from "styled-components";

const Wrap = styled.View`
  flex: 1;
  width: 100%;
  background-color: white;
  border-left-color: #ea4c89;
  border-left-width: 5;
  max-height: 175;
  margin-bottom: 20;
  padding-bottom: 10;
  padding-left: 15;
  padding-top: 15;
`;

const Body = styled.View`
  flex-direction: row;
`;

const Thumbnail = styled.Image`
  width: 120;
  height: 120;
  margin-right: 10;
  border-radius: 8;
  border-width: 1;
  border-color: #979797;
`;

const Title = styled.Text`
  margin-bottom: 10;
`;
const Description = styled.Text``;

const Shot = ({ navigation, shot }) => {
  useEffect(() => {}, []);

  return (
    <Wrap
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5
      }}
    >
      <Title>{shot.title}</Title>
      <Body>
        <Thumbnail source={{ uri: shot.images.teaser }} />
        <Description>{shot.description}</Description>
      </Body>
    </Wrap>
  );
};

const mapStateToProps = state => R.pick(["accessToken"], state);

export default connect(
  mapStateToProps,
  {}
)(Shot);
