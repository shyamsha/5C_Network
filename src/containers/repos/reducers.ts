import { UserReposState, UserActionTypes } from "./types";
import { Reducer } from "redux";

const initialState: UserReposState = {
  loading: false,
  repos: null,
  repo: null,
  errors: {
    repos: undefined,
    repo: undefined,
  },
};

type A<T = string, U = any> = { type: T; payload: U };

const reducer: Reducer<UserReposState, A> = (
  state: UserReposState = initialState,
  action: A
) => {
  switch (action.type) {
    case UserActionTypes.REPOS_REQUEST:
      return {
        ...state,
        loading: true,
        errors: { ...state.errors, repos: undefined },
      };
    case UserActionTypes.REPOS_SUCCESS:
      return { ...state, loading: false, repos: action.payload };
    case UserActionTypes.REPOS_ERROR:
      return {
        ...state,
        loading: false,
        errors: { ...state.errors, repos: action.payload },
      };
   
    default:
      return state;
  }
};

export { initialState as userReposInitialState, reducer as userReposReducer };
