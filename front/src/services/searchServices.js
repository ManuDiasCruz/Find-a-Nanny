import api, { createConfig } from "./api.js";

export async function SearchByUsername(username) {
  return api.get(`/search?username=${username}`, createConfig());
}
