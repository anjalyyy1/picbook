// import actions
import { onPostSuccess, isPostUploading } from "./actions";
import { get } from "lodash";
import FetchUtils from "utils/FetchUtils";

const createPostHandler = (formData, postData) => async dispatch => {
  const URL = "https://api.cloudinary.com/v1_1/dme7wsobn/image/upload";

  const cloudinaryResponse = await FetchUtils.uploadToCloudinary(
    URL,
    formData,
    "post account data"
  );

  if (cloudinaryResponse.status === 200) {
    postData["imageUrl"] = get(cloudinaryResponse, `data.secure_url`);
    const uploadUrl = "createPost";
    const response = await FetchUtils.postData(
      uploadUrl,
      postData,
      "post account data"
    );
  }

  return cloudinaryResponse;
};

export { createPostHandler };
