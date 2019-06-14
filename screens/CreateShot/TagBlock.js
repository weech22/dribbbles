import React from "react";
import styled from "styled-components";

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

export default ({ tags }) => {
  return (
    <Wrap>
      {tags.map(tag => (
        <Tag key={tag}>{tag}</Tag>
      ))}
    </Wrap>
  );
};
