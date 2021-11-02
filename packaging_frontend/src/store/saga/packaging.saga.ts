import { all ,takeEvery, put, retry} from '@redux-saga/core/effects';
import { ACTIONS } from '../app.constants';
import {packagingActions} from '../action'
import { API } from '../services/services';


function* getClientHandler(){
    try{
        yield put(packagingActions.clientInfo.pending())
        const response : object[] = yield retry(
            2,
            2000,
            API.getClientInfo
        )
        yield put(packagingActions.clientInfo.success(response))
    }catch(error){
        yield put(packagingActions.clientInfo.error("there is an error"))
    }
}


export default function* rootSaga(){
    yield all([
        takeEvery(ACTIONS.GET_CLIENTS_INFO_BEGIN,getClientHandler),
    ])
}