import React from "react";
import styled from "styled-components";
import Shot from "./Shot";

const Wrap = styled.FlatList`
  background-color: #f2f2f2;
  flex: 1;
  padding: 0 25px;
`;

const Shots = ({ shots }) => (
  <Wrap
    data={shots}
    renderItem={({ item }) => <Shot shot={item} />}
    keyExtractor={(_, index) => index.toString()}
  />
);

export default Shots;
