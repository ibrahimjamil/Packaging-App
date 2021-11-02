import { fromJS } from 'immutable';
import { ACTIONS } from '../app.constants';


export default function credential (state = fromJS({
    credential:{}
}),action:any){
    switch(action.type){
        case ACTIONS.GET_SIGNIN.PENDING:{
            return state.setIn(["credential","signIn","loading"],true)
        }
        case ACTIONS.GET_SIGNIN.SUCCESS:{
            return state
                    .setIn(["credential","signIn","data"],action.data)
                    .setIn(["credential","signIn","loading"],false)
        }
        case ACTIONS.GET_SIGNIN.ERROR:{
            return state
                    .setIn(["credential","signIn","error"],action.data)
                    .setIn(["credential","signIn","loading"],false)
        }
        case ACTIONS.GET_SIGNUP.PENDING:{
            return state.setIn(["credential","signUp","loading"],true)
        }
        case ACTIONS.GET_SIGNUP.SUCCESS:{
            return state
                    .setIn(["credential","signUp","data"],action.data)
                    .setIn(["credential","signIn","loading"],false)
        }
        case ACTIONS.GET_SIGNUP.ERROR:{
            return state
                    .setIn(["credential","signUp","error"],action.data)
                    .setIn(["credential","signUn","loading"],false)
        }
        case ACTIONS.GET_TOKEN.PENDING:{
            return state.setIn(["credential","getTokenData","loading"],true)
        }
        case ACTIONS.GET_TOKEN.SUCCESS:{
            return state
                    .setIn(["credential","getTokenData","data"],action.data)
                    .setIn(["credential","getTokenData","loading"],false)
        }
        case ACTIONS.GET_TOKEN.ERROR:{
            return state
                    .setIn(["credential","getTokenData","error"],action.data)
                    .setIn(["credential","getTokenData","loading"],false)
        }
    }
    return state;
}