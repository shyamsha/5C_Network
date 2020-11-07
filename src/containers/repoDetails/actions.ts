import { RepoActionTypes, UserFlowers,  } from "./types";
import { action } from "typesafe-actions";

export const flowersRequest = (params: { name: string }) => 
action(RepoActionTypes.GET_FLOWERS_REQUEST,params);
export const flowersSuccess = (res: UserFlowers[]) =>
action(RepoActionTypes.GET_FLOWERS_SUCCESS, res);
export const flowersError = (message: Error) =>
action(RepoActionTypes.GET_FLOWERS_ERROR, message);

