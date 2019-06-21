import React, { useCallback } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { getImage, toggleModal } from "../redux/shots";

const Wrap = styled.TouchableOpacity`
  border: 1px #ea4c89;
  border-radius: 5px;
  overflow: hidden;
  z-index: 9999999;
`;
const Picture = styled.Image`
  width: 45px;
  height: 45px;
`;

const Thumbnail = ({ uri, toggleModal }) => {
  const handlePress = useCallback(() => {
    toggleModal();
  });

  return <Wrap onPress={handlePress}>{<Picture source={{ uri }} />}</Wrap>;
};

const mapStateToProps = state => ({
  uri: getImage(state).uri
});

export default connect(
  mapStateToProps,
  { toggleModal }
)(Thumbnail);
