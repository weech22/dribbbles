import React from "react";
import styled from "styled-components";
import Shot from "./Shot";

const Wrap = styled.FlatList`
  background-color: #f2f2f2;
  flex: 1;
  padding-left: 25;
  padding-right: 25;
`;

export default ({ shots }) => (
  <Wrap
    data={shots}
    renderItem={({ item }) => <Shot shot={item} />}
    keyExtractor={(item, index) => index.toString()}
  />
);
