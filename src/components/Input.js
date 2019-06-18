import React from "react";
import { View } from "react-native";
import styled from "styled-components";

const Edit = styled.TextInput`
  border: 1px #ea4c89;
  border-radius: 6px;
  padding: 16px 22px;
  height: ${props => (props.multiline ? 130 : "auto")};
`;

const Label = styled.Text`
  align-self: flex-start;
  color: #ea4c89;
  background-color: #f2f2f2;
  padding: 5px 10px;
  margin-left: 15;
  position: relative;
  top: 13;
  z-index: 10;
`;

const Input = ({
  label,
  placeholder,
  multiline,
  onChange,
  onSubmitEditing,
  value,
  autoCorrect,
  blurOnSubmit
}) => (
  <View>
    <Label>{label}</Label>
    <Edit
      value={value}
      placeholder={placeholder}
      multiline={multiline}
      onChangeText={onChange}
      onSubmitEditing={onSubmitEditing}
      autoCorrect={autoCorrect}
      blurOnSubmit={blurOnSubmit}
    />
  </View>
);

export default Input;
