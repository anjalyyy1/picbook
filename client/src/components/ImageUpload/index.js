import React, { useState, useEffect } from "react";
import styled from "styled-components";

import ValidationUtils from "utils/ValidationUtils";
import AppImages from "assets";

const ImageUpload = props => {
  const { handleInputChange, fieldIndex, imageDetail, error } = props;
  const [imagePreviewUrl, setImagePreviewUrl] = useState(imageDetail);

  useEffect(() => {
    setImagePreviewUrl(
      typeof imageDetail !== "object" ? imageDetail : imagePreviewUrl
    );
  }, [imageDetail]);

  const handleImageChange = e => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    if (!ValidationUtils.validateImageFile(file)) {
      return;
    }

    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
      handleInputChange(file, fieldIndex, "image");
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
      <ImageUploadWrapper className="image-upload">
        <ImageInput
          type="file"
          accept="image/*"
          id="upload"
          onChange={handleImageChange}
        />

        <ImagePreviewWrapper>
          {imagePreviewUrl ? (
            <ImagePreview src={imagePreviewUrl} />
          ) : (
            <DefaultImageWrapper>
              <DefaultImage src={AppImages.SignUpUserImage} />
            </DefaultImageWrapper>
          )}
          <EditImage
            onClick={() => document.querySelector("#upload").click()}
            src={AppImages.Edit}
          />
        </ImagePreviewWrapper>
        <ErrorMessage>{error}</ErrorMessage>
      </ImageUploadWrapper>
    </>
  );
};

const ImageUploadWrapper = styled.div`
  margin-bottom: 28px;
`;

const ImageInput = styled.input`
  visibility: hidden;
`;

const ImagePreview = styled.img`
  width: 100%;
  height: auto;
  display: block;
  max-width: 200px;
  max-height: 150px;
  border: 6px solid #1398c4;
`;

const ImagePreviewWrapper = styled.div`
  width: 150px;
  height: 150px;
  position: relative;
`;

const DefaultImageWrapper = styled.div``;

const DefaultImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  border-radius: 50%;
`;

const EditImage = styled.img`
  width: 27px;
  height: 27px;
  position: absolute;
  bottom: 9px;
  right: 7px;
  border-radius: 50%;
  background-color: ${props => props.theme.COLOR.WHITE};
  cursor: pointer;
`;

const ErrorMessage = styled.span`
  font-size: 12px;
  position: absolute;
  margin-top: 5px;
  left: 0;
  margin-left: 49px;
  color: ${props => props.theme.COLOR.ERROR};
`;

export default ImageUpload;
