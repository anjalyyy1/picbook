import * as types from "./types";

/**
 *
 * Store/Reset/Remove data dynamically based on .
 * @param {Object} payload - API response on success/error/loading
 * @param {String} type - type for sucess/error/loading
 */

export const onPostListSuccess = (
  payload = null,
  type = types.RECEIVE_POST_LIST
) => {
  return {
    type,
    payload
  };
};

export const isPostLoading = (
  payload = null,
  type = types.REQUEST_POST_LOADING
) => {
  return {
    type,
    payload
  };
};
