// import actions
import { onPostListSuccess, isPostLoading } from "./actions";
import { get } from "lodash";
import FetchUtils from "utils/FetchUtils";

const getUserPosts = (formData, postData) => async dispatch => {
  const URL = "myposts";

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

  if (response.status === 200) {
    dispatch(
      onPostListSuccess({
        userPosts: get(response, `data.data`)
      })
    );
  }

  return response;
};

export { getUserPosts };
