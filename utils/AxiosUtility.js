import React from "react";
import axios from "axios";
import { BASE_URL } from "../api/config";

const createAxios = () => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: 5000, // (ms)
    headers: {
      "Content-Type": "application/json",
    },
  });

  const get = async (endpoint) => {
    return await api
      .get(endpoint)
      .then((res) => res.data)
      .catch((e) => {
        throw new Error("GET request to " + endpoint + " failed:" + e.message);
      });
  };

  const getRequestData = async (endpoint, data) => {
    return await api
      .get(endpoint, data)
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(
          "GET request to " +
            endpoint +
            " with data: " +
            data +
            " failed: " +
            e.message,
        );
      });
  };

  const post = async (endpoint, data) => {
    return await api
      .post(endpoint, data)
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(
          "POST request to " +
            endpoint +
            " with data: " +
            data +
            " failed: " +
            e.message,
        );
      });
  };

  const put = async (endpoint, data) => {
    return await api
      .put(endpoint, data)
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(
          "PUT request to " +
            endpoint +
            " with data: " +
            data +
            " failed: " +
            e.message,
        );
      });
  };

  const remove = async (endpoint) => {
    return await api
      .delete(endpoint)
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(
          "DELETE request to " + endpoint + " failed: " + e.message,
        );
      });
  };

  const customRequest = async (method, endpoint, token) => {
    return await api
      .request({
        method: method,
        url: endpoint,
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => res.data)
      .catch((e) => {
        return e;
      });
  };

  return {
    get,
    getRequestData,
    post,
    put,
    customRequest,
  };
};

export default createAxios;
