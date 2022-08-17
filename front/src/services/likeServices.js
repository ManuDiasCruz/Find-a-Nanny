import api, { createConfig } from "./api.js";

export async function getLikeInfo(postId) {
  return api.get(`likes/${postId}`, createConfig());
}

export async function createLike(postId) {
  return api.post(`likes/${postId}`, null, createConfig());
}

export async function deleteLike(postId) {
  return api.delete(`likes/${postId}`, createConfig());
}
