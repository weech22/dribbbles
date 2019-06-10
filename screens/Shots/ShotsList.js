import React from "react";
import * as R from "ramda";
import styled from "styled-components";
import Shot from "./Shot";

const Wrap = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  background-color: #f2f2f2;
  width: 100%;
  padding-left: 25;
  padding-right: 25;
  padding-top: 35;
`;

const ShotsList = ({ shots }) => (
  <Wrap>{shots && shots.map(shot => <Shot key={shot.id} shot={shot} />)}</Wrap>
);

export default ShotsList;
