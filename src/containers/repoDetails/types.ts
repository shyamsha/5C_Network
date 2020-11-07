export interface UserFlowers {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}


export enum RepoActionTypes {

  GET_FLOWERS_REQUEST = "@@repos/feed/GET_FLOWERS_REQUEST",
  GET_FLOWERS_SUCCESS = "@@repos/feed/GET_FLOWERS_SUCCESS",
  GET_FLOWERS_ERROR = "@@repos/feed/GET_FLOWERS_ERROR",

}

export interface UserFlowersState {
  readonly loading: boolean;
  readonly flowers:UserFlowers[] | null;
  readonly errors: {
    flowers?: string;
  };
}
