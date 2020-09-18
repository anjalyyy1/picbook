import { get } from "lodash";
import FetchUtils from "utils/FetchUtils";

const createAccount = async postData => {
  const URL = "signup";

  const response = await FetchUtils.postData(
    URL,
    postData,
    "post account data"
  );

  if (response.success && response.data) {
    return response;
  } else {
    return response;
  }
};

export { createAccount };
