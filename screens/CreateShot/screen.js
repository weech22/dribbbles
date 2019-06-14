import React from "react";
import { Image, Alert } from "react-native";
import { connect } from "react-redux";
import * as R from "ramda";
import styled from "styled-components";
import ImagePicker from "react-native-image-crop-picker";
import Input from "./Input";
import {
  createShot,
  setShotDescription,
  setShotImage,
  setShotTags,
  setShotTitle,
  setNewTag
} from "../../redux/ducks/createShotScreen";
import TagBlock from "./TagBlock";

const Wrap = styled.View`
  flex: 1;
  background-color: #f2f2f2;
  padding-left: 27;
  padding-right: 27;
`;

const Title = styled.Text`
  font-size: 18;
`;

const CreateButton = styled.TouchableOpacity`
  margin-top: 70;
  background-color: #ea4c89;
  align-self: flex-start;
  border-radius: 3px;
  padding-left: 17;
  padding-right: 17;
  padding-top: 10;
  padding-bottom: 10;
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
  margin-bottom: 25;
  margin-top: 20;
`;

const AddButton = styled.TouchableOpacity``;
const addIcon = require("./add.png");

const CreateShot = ({
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
  const onSubmit = () => {
    const newShotData = new FormData();

    if (title && image.uri) {
      newShotData.append("image", image);
      newShotData.append("title", title);
      newShotData.append("description", description);
      newShotData.append("tags", tags);

      createShot({ data: newShotData, token: accessToken });
    } else {
      Alert.alert("Title and image are required");
    }
  };

  const chooseImage = () => {
    ImagePicker.openPicker({
      width: 800,
      height: 600,
      cropping: false
    }).then(selectedImage => {
      const image = {
        uri: selectedImage.sourceURL,
        name: selectedImage.filename,
        type: selectedImage.mime
      };
      setShotImage(image);
    });
  };

  const addTag = e => {
    if (tags.length < 12) {
      setShotTags([...tags, e.nativeEvent.text]);
    }
    setNewTag("");
  };

  return (
    <Wrap>
      <Header>
        <Title>Create Shot</Title>
        <AddButton onPress={chooseImage}>
          <Image source={addIcon} />
        </AddButton>
      </Header>
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
    </Wrap>
  );
};

const mapStateToProps = state => {
  const newShot = key => R.path(["newShot", key], state);

  return {
    title: newShot("title"),
    description: newShot("description"),
    tags: newShot("tags"),
    image: newShot("image"),
    accessToken: state.accessToken,
    newTag: newShot("newTag")
  };
};

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
)(CreateShot);
