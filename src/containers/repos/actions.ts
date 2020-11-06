import { UserActionTypes, UserInfo,  } from "./types";
import { action } from "typesafe-actions";

export const reposRequest = (params: { name: string }) => 
action(UserActionTypes.REPOS_REQUEST,params);
export const reposSuccess = (res: UserInfo[]) =>
action(UserActionTypes.REPOS_SUCCESS, res);
export const reposError = (message: Error) =>
action(UserActionTypes.REPOS_ERROR, message);

