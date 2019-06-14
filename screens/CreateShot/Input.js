import React from "react";
import { View } from "react-native";
import styled from "styled-components";

const Edit = styled.TextInput`
  border-width: 1;
  border-color: #ea4c89;
  border-radius: 6px;
  padding-left: 22;
  padding-top: 16;
  padding-bottom: 16;
  padding-right: 22;

  height: ${props => (props.multiline ? 130 : "auto")};
`;

const Label = styled.Text`
  align-self: flex-start;
  color: #ea4c89;
  background-color: #f2f2f2;
  padding-left: 10;
  padding-right: 10;
  padding-top: 5;
  padding-bottom: 5;
  margin-left: 15;
  position: relative;
  top: 13;
  z-index: 10;
`;

export default ({
  label,
  placeholder,
  multiline,
  onChange,
  onSubmitEditing,
  value,
  autoCorrect,
  blurOnSubmit
}) => {
  return (
    <View>
      <Label>{label}</Label>
      <Edit
        value={value}
        placeholder={placeholder}
        multiline={multiline}
        onChangeText={e => onChange(e)}
        onSubmitEditing={onSubmitEditing}
        autoCorrect={autoCorrect}
        blurOnSubmit={blurOnSubmit}
      />
    </View>
  );
};
