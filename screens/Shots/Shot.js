import React from "react";
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
  border-radius: 5;
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

const shadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5
};

const Title = styled.Text`
  margin-bottom: 10;
`;

// TODO: Style component
const Description = styled.Text``;

const formatDescription = s => (s ? s.substring(3, s.length - 4) : "");

export default ({ shot }) => {
  return (
    <Wrap style={shadow}>
      <Title>{shot.title}</Title>
      <Body>
        <Thumbnail source={{ uri: shot.images.teaser }} />
        <Description>{formatDescription(shot.description)}</Description>
      </Body>
    </Wrap>
  );
};
