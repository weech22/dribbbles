import React from "react";
import { Text, Image } from "react-native";
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
} from "../../redux/ducks/createShot";
import TagBlock from "./TagBlock";

const Wrap = styled.View`
  flex: 1;
  background-color: #f2f2f2;
  padding-left: 27;
  padding-right: 27;
`;

const Title = styled.Text``;

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
  navigation,
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
    const formdata = new FormData();

    // TODO: Validate form

    formdata.append("image", image);
    formdata.append("title", "10");
    formdata.append("description", "232");
    formdata.append("tags", ["d", "ww"]);

    createShot({ data: formdata, token: accessToken });
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
    setShotTags([...tags, e.nativeEvent.text]);
    setNewTag("");
  };

  // TODO: Make inputs controlled
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

//TODO: Implement Ramda selectors
const mapStateToProps = state => ({
  title: state.newShot.title,
  description: state.newShot.description,
  tags: state.newShot.tags,
  image: state.newShot.image,
  accessToken: state.accessToken,
  newTag: state.newShot.newTag
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
)(CreateShot);
