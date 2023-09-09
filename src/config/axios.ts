import axios from "axios";

export const BFFServiceInstance = axios.create({
  baseURL: "https://biroperjalanan.datacakra.com",
  timeout: 120000,
});
