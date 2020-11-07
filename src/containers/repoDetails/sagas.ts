import { RepoActionTypes } from './types';
import { put, call, takeLatest, all, fork } from "redux-saga/effects";
import * as Api from "../../services/Api";
import { unknownError } from "../../utils/api-helper";
import { Action } from 'redux';
import { flowersError, flowersSuccess  } from './actions';

type SagaAction<T> = Action & { payload: T };

function* flowers({ payload: params }: SagaAction<{ name: string }>) {
  try {
    const res = yield call(Api.userFlowers,params);
    if (res.error) {
      yield put(flowersError(res.error));
    } else {
      yield put(flowersSuccess(res.data));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(flowersError(err));
    } else {
      yield put(flowersError(unknownError("An unknown error occurred")));
    }
  }
}

function* watchFetchRequest() {
  yield takeLatest(RepoActionTypes.GET_FLOWERS_REQUEST, flowers);
  
}

export function* userFlowersSaga() {
  yield all([fork(watchFetchRequest)]);
}
