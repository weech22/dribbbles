import React, { useCallback } from "react";
import { Image, Platform } from "react-native";
import { connect } from "react-redux";
import styled from "styled-components";
import ImagePicker from "react-native-image-crop-picker";
import { img } from "../assets";

import { getImage, createShot, setShotImage } from "../redux/shots";
import { Form } from "../components";
import { getAccessToken } from "../redux/auth";

const Wrap = styled.View`
  flex: 1;
  background-color: #f2f2f2;
  padding: 0 27px;
  padding-top: ${Platform.OS === "ios" ? "60px" : "20px"};
`;

const Title = styled.Text`
  font-size: 18;
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

const CreateShotScreen = ({ setShotImage, image, accessToken }) => {
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

  return (
    <Wrap>
      <Header>
        <Title>Create Shot</Title>
        {/* <Thumbnail /> */}
        <AddButton onPress={chooseImage}>
          <Image source={img.add} />
        </AddButton>
      </Header>
      <Form image={image} accessToken={accessToken} />
    </Wrap>
  );
};

const mapStateToProps = state => ({
  image: getImage(state),
  accessToken: getAccessToken(state)
});

export default connect(
  mapStateToProps,
  {
    createShot,
    setShotImage
  }
)(CreateShotScreen);
