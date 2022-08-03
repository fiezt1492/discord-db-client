import axios from "axios";

export function getUserDetails() {
  return axios.get("http://localhost:3001/api/auth", {
    withCredentials: true,
  });
}

export function getGuilds() {
  return axios.get("http://localhost:3001/api/discord/guilds", {
    withCredentials: true,
  });
}

export function getBotUser() {
  return axios.get("http://localhost:3001/api/discord/bot", {
    withCredentials: true,
  });
}

export function logout() {
  return axios.get("http://localhost:3001/api/logout", {
    withCredentials: true,
  });
}
