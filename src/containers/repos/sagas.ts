import { UserActionTypes } from './types';
import { put, call, takeLatest, all, fork } from "redux-saga/effects";
import * as Api from "../../services/Api";
import { unknownError } from "../../utils/api-helper";
import { Action } from 'redux';
import { reposError, reposSuccess } from './actions';

type SagaAction<T> = Action & { payload: T };

function* repos({ payload: params }: SagaAction<{ name: string }>) {
  try {
    const res = yield call(Api.userRepos,params);
    if (res.error) {
      yield put(reposError(res.error));
    } else {
      yield put(reposSuccess(res.data));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(reposError(err));
    } else {
      yield put(reposError(unknownError("An unknown error occurred")));
    }
  }
}

function* watchFetchRequest() {
  yield takeLatest(UserActionTypes.REPOS_REQUEST, repos);
  
}

export function* userReposSaga() {
  yield all([fork(watchFetchRequest)]);
}
