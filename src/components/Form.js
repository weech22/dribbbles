import React from "react";
import { connect } from "react-redux";
import { Platform, KeyboardAvoidingView, Alert } from "react-native";
import styled from "styled-components";
import { reduxForm, Field } from "redux-form";
import { createShot } from "../redux/shots";
import Input from "./Input";
import TagInput from "./TagInput";

const Wrap = styled.ScrollView``;

const CreateButton = styled.TouchableOpacity`
  margin-top: 10;
  background-color: #ea4c89;
  align-self: flex-start;
  border-radius: 3px;
  padding: 10px 17px;
  margin-bottom: 20;
`;

const Caption = styled.Text`
  color: white;
  font-size: 35;
`;

const keyboardMode = Platform.OS === "ios" ? "padding" : null;

const Form = ({ handleSubmit, createShot, image, accessToken }) => {
  // useCallback
  const postShot = ({ Title: title, Description: description, Tags: tags }) => {
    if (image.uri && title) {
      const newShot = { image, title, description, tags };

      createShot({ newShot, accessToken });
    } else {
      Alert.alert("Title and image are required");
    }
  };

  return (
    <KeyboardAvoidingView behavior={keyboardMode} style={{ flex: 1 }}>
      <Wrap>
        <Field name="Title" component={Input} />
        <Field name="Description" component={Input} multiline={true} />
        <Field name="Tags" component={TagInput} />

        <CreateButton onPress={handleSubmit(postShot)}>
          <Caption>Create</Caption>
        </CreateButton>
      </Wrap>
    </KeyboardAvoidingView>
  );
};

const ReduxForm = reduxForm({ form: "newShot" })(Form);

InitializedForm = connect(() => ({
  initialValues: { Title: "", Description: "", Tags: [] }
}))(ReduxForm);

export default connect(
  null,
  { createShot }
)(InitializedForm);
