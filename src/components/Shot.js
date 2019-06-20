import React, { useCallback } from "react";
import styled from "styled-components";
import { Image } from "react-native";
import { connect } from "react-redux";
import { deleteShot } from "../redux/shots";
import { getAccessToken } from "../redux/auth";
import { img } from "../assets";

const Wrap = styled.View`
  flex: 1;
  width: 100%;
  background-color: white;
  border-left-color: #ea4c89;
  border-left-width: 5;
  height: 175;
  margin-bottom: 20;
  padding: 10px 15px;
  border-radius: 5;
  flex-shrink: 0;
`;

const Body = styled.View`
  flex-direction: row;
`;

const Header = styled.View`
  flex: 1;
  max-height: 16;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin: 15px 0;
  align-items: center;
`;

const DeleteButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
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
  font-size: 14;
  height: 16px;
`;

const Description = styled.Text``;

const formatDescription = s => (s ? s.substring(3, s.length - 4) : "");

const Shot = ({ shot, deleteShot, accessToken }) => {
  const onDeletePress = useCallback((shotId, accessToken) => {
    deleteShot({ shotId, accessToken });
  }, []);

  return (
    <Wrap style={shadow}>
      <Header>
        <Title>{shot.title}</Title>

        <DeleteButton onPress={() => onDeletePress(shot.id, accessToken)}>
          <Image source={img.remove} />
        </DeleteButton>
      </Header>
      <Body>
        <Thumbnail source={{ uri: shot.images.teaser }} />
        <Description>{formatDescription(shot.description)}</Description>
      </Body>
    </Wrap>
  );
};

const mapStateToProps = state => ({
  accessToken: getAccessToken(state)
});

export default connect(
  mapStateToProps,
  { deleteShot }
)(Shot);
