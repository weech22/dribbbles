import React, { useEffect } from "react";
import { Text, Image, Alert } from "react-native";
import { connect } from "react-redux";
import * as R from "ramda";
import styled from "styled-components";
import { createShotSaga } from "../../redux/sagas/createShot";

const Wrap = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  max-height: 38;
`;

const Tag = styled.Text`
  background-color: #ea4c89;
  padding-left: 8;
  padding-top: 4;
  padding-bottom: 4;
  padding-right: 8;
  line-height: 14;
  color: white;
  font-size: 12;
  align-self: flex-start;
  border-radius: 5px;
  margin-top: 16;
  margin-right: 7;
  overflow: hidden;
`;

const TagBlock = ({ tags }) => {
  return (
    <Wrap>
      {tags.map(tag => (
        <Tag key={tag}>{tag}</Tag>
      ))}
    </Wrap>
  );
};

export default TagBlock;
