import axios from "axios";
import { get } from "lodash";

/**  API Calling methods integrated with axios */

class FetchUtils {
  constructor() {
    this.baseUrl = `${process.env.REACT_APP_BASE_URL}`;
  }

  // set headers with authentication token
  setHeaders(headersValue = {}, responseType = {}) {
    const accessToken = localStorage.getItem("token");

    const config = {
      ...responseType,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...headersValue
      }
    };

    return (accessToken && config) || "";
  }

  postData = async (url, body, log) => {
    try {
      const headers = this.setHeaders();
      const apiUrl = this.baseUrl + url;
      const response = await axios.post(apiUrl, body, headers);
      return response;
    } catch (error) {
      return error;
    }
  };

  uploadToCloudinary = async (url, body, log) => {
    try {
      // const headers = this.setHeaders();
      const apiUrl = url;
      const response = await axios.post(apiUrl, body);
      return response;
    } catch (error) {
      return error;
    }
  };

  putData = async (url, body, log) => {
    try {
      const headers = this.setHeaders();
      const apiUrl = this.baseUrl + url;
      const response = await axios.put(apiUrl, body, headers);

      return response;
    } catch (error) {
      return error;
    }
  };

  patchData = async (url, body, log) => {
    try {
      const headers = this.setHeaders();
      const apiUrl = this.baseUrl + url;
      const response = await axios.patch(apiUrl, body, headers);
      return response;
    } catch (error) {
      return error;
    }
  };

  deleteData = async (url, log) => {
    try {
      const headers = this.setHeaders();
      const apiUrl = this.baseUrl + url;
      const response = await axios.delete(apiUrl, headers);
      return response;
    } catch (error) {
      return error;
    }
  };

  getData = async (url, log) => {
    const apiUrl = this.baseUrl + url;
    try {
      const headers = this.setHeaders();

      const response = await axios.get(apiUrl, headers);
      return response;
    } catch (error) {
      return error;
    }
  };
}

export default new FetchUtils();
