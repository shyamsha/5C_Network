import { RepoActionTypes, UserFlowersState } from "./types";
import { Reducer } from "redux";

const initialState: UserFlowersState = {
  loading: false,
  flowers: null,
  errors: {
    flowers: undefined,
  },
};

type A<T = string, U = any> = { type: T; payload: U };

const reducer: Reducer<UserFlowersState, A> = (
  state: UserFlowersState = initialState,
  action: A
) => {
  switch (action.type) {
    case RepoActionTypes.GET_FLOWERS_REQUEST:
      return {
        ...state,
        loading: true,
        errors: { ...state.errors, flowers: undefined },
      };
    case RepoActionTypes.GET_FLOWERS_SUCCESS:
      return { ...state, loading: false, flowers: action.payload };
    case RepoActionTypes.GET_FLOWERS_ERROR:
      return {
        ...state,
        loading: false,
        errors: { ...state.errors, flowers: action.payload },
      };
   
    default:
      return state;
  }
};

export { initialState as userFlowersInitialState, reducer as userFlowersReducer };
