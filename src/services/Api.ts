import config from "../config/app";
// import requestConfig from "../config/request";
import * as API from "../utils/api-helper";

const isProd: boolean = config.isProd;

const API_ENDPOINT = isProd
  ? config.production.api_endpoint
  : config.staging.api_endpoint;

export const userRepos = (params: { name: string }) => {
  const url = `${API_ENDPOINT}/users/${params.name}/repos`;
  return API.get(url);
};

export const userFlowers = (params: { name: string }) => {
  const url = `${API_ENDPOINT}/users/${params.name}/followers`;
  return API.get(url);
};
