// import actions
import { isUserLoading, onUserLoginSuccess } from "./actions";

import { get } from "lodash";
import FetchUtils from "utils/FetchUtils";

const loginHandler = postData => async dispatch => {
  const URL = "signin";

  dispatch(
    isUserLoading({
      isUserLoading: true
    })
  );

  const response = await FetchUtils.postData(
    URL,
    postData,
    "post account data"
  );

  dispatch(
    isUserLoading({
      isUserLoading: false
    })
  );

  if (response.status === 200) {
    dispatch(
      onUserLoginSuccess({
        userDetails: response.data
      })
    );
  }

  return response;
};

export { loginHandler };
