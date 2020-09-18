// import actions
import { onPostListSuccess, isPostLoading } from "./actions";
import { get } from "lodash";
import FetchUtils from "utils/FetchUtils";

const getAllPosts = (formData, postData) => async dispatch => {
  const URL = "posts";

  dispatch(
    isPostLoading({
      isPostLoading: true
    })
  );

  const response = await FetchUtils.getData(URL, "get account data");

  dispatch(
    isPostLoading({
      isPostLoading: false
    })
  );

  console.log(response, "jj");

  if (response.status === 200) {
    dispatch(
      onPostListSuccess({
        postsList: get(response, `data.data`)
      })
    );
  }

  return response;
};

const postReactionHandler = (reaction, postId) => async dispatch => {
  const URL = reaction;

  dispatch(
    isPostLoading({
      isPostLoading: true
    })
  );

  const response = await FetchUtils.patchData(
    URL,
    { postId },
    "get account data"
  );
  console.log(response);
  dispatch(
    isPostLoading({
      isPostLoading: false
    })
  );

  // if (response.status === 200) {
  //   dispatch(
  //     onPostListSuccess({
  //       postsList: get(response, `data.data`)
  //     })
  //   );
  // }

  return response;
};

const postCommentHandler = patchData => async dispatch => {
  const URL = `comment`;

  dispatch(
    isPostLoading({
      isPostLoading: true
    })
  );

  const response = await FetchUtils.patchData(
    URL,
    patchData,
    "get account data"
  );
  console.log(response);
  dispatch(
    isPostLoading({
      isPostLoading: false
    })
  );

  // if (response.status === 200) {
  //   dispatch(
  //     onPostListSuccess({
  //       postsList: get(response, `data.data`)
  //     })
  //   );
  // }

  return response;
};

export { getAllPosts, postReactionHandler, postCommentHandler };
