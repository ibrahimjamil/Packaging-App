import { all ,takeEvery, put, retry} from '@redux-saga/core/effects';
import { ACTIONS } from '../app.constants';
import {credentialActions} from '../action'
import { API } from '../services/services';

type signInActionType={
    type:string;
    data:any;
}
type signUpActionType={
    type:string;
    data:any;
}


function* signInHandler(action:signInActionType){
    try{
        yield put(credentialActions.SignIn.pending())
        const response : {id:string,token:string} = yield retry(
            2,
            2000,
            API.getSignIn,
            action.data
        )
        console.log(response.id)
        yield put(credentialActions.SignIn.success(response.id))
        !!response && localStorage.setItem('token', response.token);
    }catch(error){
        yield put(credentialActions.SignIn.error("there is an error"))
    }
}

function* signUpHandler(action:signUpActionType){
    try{
        yield put(credentialActions.SignUp.pending())
        const response : string = yield retry(
            2,
            2000,
            API.getSignUp,
            action.data
        )
        yield put(credentialActions.SignUp.success(response))
    }catch(error){
        yield put(credentialActions.SignIn.error("there is an error"))
    }
}

function* logOutHandler(){
    try{
        yield put(credentialActions.SignIn.success(''))
    }catch(error){
        yield put(credentialActions.LogOut.error("there is an error"))
    }
}

function* tokenHandler(){
    try{
        const token = localStorage.getItem('token')
        const response : string = yield retry(
            2,
            2000,
            API.getTokenVerify,
            token
        )
        yield put(credentialActions.getToken.success(response))
    }catch(error){
        yield put(credentialActions.getToken.error("there is an error getting token"))
    }
}

export default function* rootSaga(){
    yield all([
        takeEvery(ACTIONS.GET_SIGNIN_BEGIN,signInHandler),
        takeEvery(ACTIONS.GET_SIGNUP_BEGIN,signUpHandler),
        takeEvery(ACTIONS.GET_LOGOUT_BEGIN,logOutHandler),
        takeEvery(ACTIONS.GET_TOKEN_BEGIN,tokenHandler)
    ])
}