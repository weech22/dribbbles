import React, { useCallback } from "react";
import {
  Image,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { connect } from "react-redux";
import styled from "styled-components";
import ImagePicker from "react-native-image-crop-picker";
import { Input, TagBlock } from "../components";
import { img } from "../assets";
import { getAccessToken } from "../redux/auth";
import {
  getNewTag,
  getImage,
  getTags,
  getDescription,
  getTitle,
  createShot,
  setShotDescription,
  setShotImage,
  setShotTags,
  setShotTitle,
  setNewTag
} from "../redux/shots";

const Wrap = styled.View`
  flex: 1;
  background-color: #f2f2f2;
  padding: 0 27px;
  padding-top: ${Platform.OS === "ios" ? "60px" : "20px"};
`;

const FormWrap = styled.ScrollView``;

const Title = styled.Text`
  font-size: 18;
`;

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

const Header = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-height: 50;
  margin: 10px 0;
`;

const AddButton = styled.TouchableOpacity`
  max-width: 45;
  max-height: 45;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const getFileName = s => (s ? s.substr(s.lastIndexOf("/")) : "new-shot");
const keyboardMode = Platform.OS === "ios" ? "padding" : null;

const CreateShotScreen = ({
  createShot,
  setShotDescription,
  setShotImage,
  setShotTags,
  setShotTitle,
  setNewTag,
  newTag,
  title,
  description,
  tags,
  image,
  accessToken
}) => {
  /*   setShotImage({});
  setShotTags([]);
  setShotDescription("");
  setShotTitle(""); */

  const onSubmit = useCallback(() => {
    const newShot = { image, title, description, tags };

    createShot({ newShot, accessToken });
  }, [image, title, description, tags]);

  const chooseImage = useCallback(() => {
    ImagePicker.openPicker({
      width: 800,
      height: 600,
      cropping: false
    }).then(selectedImage => {
      const path = Platform.OS === "ios" ? "sourceURL" : "path";
      const name =
        Platform.OS === "ios"
          ? selectedImage.filename
          : getFileName(selectedImage.path);

      const image = {
        uri: selectedImage[path],
        name,
        type: selectedImage.mime
      };

      setShotImage(image);
    });
  }, []);

  const addTag = useCallback(
    e => {
      const newTag = e.nativeEvent.text;
      if (tags.length < 12 && tags.indexOf(newTag) === -1 && newTag !== "") {
        setShotTags([...tags, newTag]);
      }
      setNewTag("");
    },
    [newTag]
  );

  return (
    <Wrap>
      <Header>
        <Title>Create Shot</Title>
        <AddButton onPress={chooseImage}>
          <Image source={img.add} />
        </AddButton>
      </Header>
      <KeyboardAvoidingView behavior={keyboardMode} style={{ flex: 1 }}>
        <FormWrap showsVerticalScrollIndicator={false}>
          <Input label="Title" onChange={setShotTitle} />

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
            blurOnSubmit={false}
          />

          <TagBlock tags={tags} />
          <CreateButton onPress={onSubmit}>
            <Caption>Create</Caption>
          </CreateButton>
        </FormWrap>
      </KeyboardAvoidingView>
    </Wrap>
  );
};

const mapStateToProps = state => ({
  title: getTitle(state),
  description: getDescription(state),
  tags: getTags(state),
  image: getImage(state),
  accessToken: getAccessToken(state),
  newTag: getNewTag(state)
});

export default connect(
  mapStateToProps,
  {
    createShot,
    setShotDescription,
    setNewTag,
    setShotImage,
    setShotTags,
    setShotTitle
  }
)(CreateShotScreen);
