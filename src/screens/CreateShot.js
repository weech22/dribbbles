import React, { useCallback } from "react";
import { Image, Platform, Modal } from "react-native";
import { connect } from "react-redux";
import styled from "styled-components";
import ImagePicker from "react-native-image-crop-picker";
import ImageViewer from "react-native-image-zoom-viewer";
import { img } from "../assets";
import {
  getImage,
  createShot,
  setShotImage,
  getModalState,
  toggleModal
} from "../redux/shots";
import { Form, Thumbnail } from "../components";
import { getAccessToken } from "../redux/auth";

const Wrap = styled.View`
  flex: 1;
  background-color: #f2f2f2;
  padding: 0 27px;
  padding-top: ${Platform.OS === "ios" ? "60px" : "20px"};
`;

const Title = styled.Text`
  font-size: 18;
  flex: 1;
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

const CreateShotScreen = ({
  setShotImage,
  image,
  accessToken,
  isModalOpen,
  toggleModal
}) => {
  const chooseImage = useCallback(() => {
    ImagePicker.openPicker({
      cropping: true,
      width: 400,
      height: 300,
      compressImageMaxWidth: 400,
      compressImageMaxHeight: 300
    }).then(selectedImage => {
      console.log(selectedImage);
      const path = Platform.OS === "ios" ? "path" : "path";
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
        {image.uri && <Thumbnail uri={image.uri} />}

        <AddButton onPress={chooseImage}>
          <Image source={img.add} />
        </AddButton>
      </Header>
      <Form image={image} accessToken={accessToken} />

      {isModalOpen && (
        <Modal visible={true} transparent={true}>
          <ImageViewer
            enableSwipeDown
            renderIndicator={() => null}
            onCancel={toggleModal}
            imageUrls={[{ url: image.uri }]}
          />
        </Modal>
      )}
    </Wrap>
  );
};

const mapStateToProps = state => ({
  image: getImage(state),
  accessToken: getAccessToken(state),
  isModalOpen: getModalState(state)
});

export default connect(
  mapStateToProps,
  {
    createShot,
    setShotImage,
    toggleModal
  }
)(CreateShotScreen);
