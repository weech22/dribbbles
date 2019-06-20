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

/* name = "lastName"
component = "input"
type = "text"
placeholder = "Last Name"

  < Input label = "Title" onChange = { setShotTitle } />

    <Input
      label="Description"
      multiline={true}
      onChange={setShotDescription}
    />

    <Input
      label="Tag"
      onSubmitEditing={addTag}
      value={newTag}
      onChange={setNewTag}
      autoCorrect={false}
      
    />

    <TagBlock tags={tags} />
    <CreateButton onPress={onSubmit}>
      <Caption>Create</Caption>
    </CreateButton> */

const Input = ({
  input: { onChange, name },
  placeholder,
  multiline,
  autoCorrect,
  blurOnSubmit
}) => {
  return (
    <View>
      <Label>{name}</Label>
      <Edit
        name={name}
        type="text"
        onChangeText={onChange}
        placeholder={placeholder}
        multiline={multiline}
        autoCorrect={autoCorrect}
        blurOnSubmit={blurOnSubmit}
      />
    </View>
  );
};

export default Input;

/* 
value = { value }
placeholder = { placeholder }
multiline = { multiline }
onChangeText = { onChange }
onSubmitEditing = { onSubmitEditing }
autoCorrect = { autoCorrect }
blurOnSubmit = { blurOnSubmit } */

/* multiline,
  onChange,
  onSubmitEditing,
  value,
  autoCorrect,
  blurOnSubmit */
