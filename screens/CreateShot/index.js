import React, { useEffect } from "react";
import { Text, Image } from "react-native";
import { connect } from "react-redux";
import * as R from "ramda";
import styled from "styled-components";
import ImagePicker from "react-native-image-picker";
import Input from "./Input";
import {
  createShot,
  setShotDescription,
  setShotImage,
  setShotTags,
  setShotTitle
} from "../../redux/actions";

const Wrap = styled.View`
  flex: 1;
  background-color: #f2f2f2;
  padding-left: 27;
  padding-right: 27;
`;

const Title = styled.Text``;

const Tag = styled.Text`
  background-color: #ea4c89;
  padding-left: 8;
  padding-top: 4;
  padding-bottom: 4;
  padding-right: 8;
  line-height: 14;
  color: white;
  font-size: 12;
  align-self: flex-start;
  border-radius: 5px;
  margin-top: 16;
  margin-right: 7;
  overflow: hidden;
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

const TagBlock = styled.View`
  flex: 1;
  flex-direction: row;

  max-height: 38;
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

const CreateShot = ({
  navigation,
  createShot,
  setShotDescription,
  setShotImage,
  setShotTags,
  setShotTitle,
  title,
  description,
  tags
}) => {
  useEffect(() => {}, []);

  const onSubmit = () => {
    // form data
    // use data from state
    createShot();
  };

  const chooseImage = () => {
    const options = {
      title: "Select Avatar",
      customButtons: [{ name: "fb", title: "Choose Photo from Facebook" }],
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };

    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info in the API Reference)
     */
    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source
        });
      }
    });
  };

  return (
    <Wrap>
      <Header>
        <Title>Create Shot</Title>
        <AddButton onPress={chooseImage}>
          <Image source={require("./add.png")} />
        </AddButton>
      </Header>
      <Input label="Title" onChange={setShotTitle} />
      <Input
        label="Description"
        multiline={true}
        onChange={setShotDescription}
      />
      <Input label="Tag" onChange={setShotTags} />
      <TagBlock>
        <Tag>Middleware</Tag>
        <Tag>react-native</Tag>
        <Tag>js</Tag>
      </TagBlock>
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
  tags: state.newShot.tags
});

export default connect(
  mapStateToProps,
  { createShot, setShotDescription, setShotImage, setShotTags, setShotTitle }
)(CreateShot);
