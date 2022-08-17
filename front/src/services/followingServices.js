import api, { createConfig } from "./api.js";

export async function isFollowing(id) {
  return api.get(`/following/${id}`, createConfig());
}

export async function follow(id) {
  return api.post(`/following/${id}`, null, createConfig());
}

export async function unfollow(id) {
  return api.delete(`/following/${id}`, createConfig());
}
