import React from "react";
import { View } from "react-native";
import styled from "styled-components";

const Edit = styled.TextInput`
  border: 1px #ea4c89;
  border-radius: 6px;
  padding: 16px 22px;
  height: ${props => (props.multiline ? 130 : "auto")};
  text-align-vertical: ${props => (props.multiline ? "top" : "center")};
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
  input,
  multiline,
  onSubmitEditing,
  blurOnSubmit,
  autoCorrect,
  onTagChange,
  value,
  tagInput
}) => {
  const { name, onChange } = input;

  return (
    <View>
      <Label>{name}</Label>
      <Edit
        input={input}
        value={value}
        name={name}
        type="text"
        onChangeText={tagInput ? onTagChange : onChange}
        multiline={multiline}
        onSubmitEditing={onSubmitEditing}
        blurOnSubmit={blurOnSubmit}
        autoCorrect={autoCorrect}
      />
    </View>
  );
};

export default Input;
