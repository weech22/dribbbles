import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as R from "ramda";
import styled from "styled-components";
import { getUserInfo } from "../redux/actions";

const Wrap = styled.View`
  flex: 1;
  background-color: papayawhip;
  justify-content: center;
  align-items: center;
`;

const Avatar = styled.Image`
  width: 100;
  height: 100;
`;

const Name = styled.Text`
  font-size: 20;
  color: palevioletred;
`;

const ProfileScreen = ({ accessToken, userInfo, getUserInfo }) => {
  useEffect(() => {
    getUserInfo(accessToken);
  }, []);

  return (
    <Wrap>
      <Avatar source={{ uri: userInfo.avatar_url }} />
      <Name>{userInfo.name}</Name>
    </Wrap>
  );
};

const mapStateToProps = state => R.pick(["accessToken", "userInfo"], state);

export default connect(
  mapStateToProps,
  { getUserInfo }
)(ProfileScreen);
