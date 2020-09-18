import * as types from "./types";

/**
 *
 * Store/Reset/Remove data dynamically based on .
 * @param {Object} payload - API response on success/error/loading
 * @param {String} type - type for sucess/error/loading
 */

export const onPostSuccess = (payload = null, type = types.RECEIVE_POST) => {
  return {
    type,
    payload
  };
};

export const isPostUploading = (
  payload = null,
  type = types.REQUEST_POST_LOADING
) => {
  return {
    type,
    payload
  };
};
