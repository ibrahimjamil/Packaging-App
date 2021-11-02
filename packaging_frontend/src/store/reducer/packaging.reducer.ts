import { fromJS } from 'immutable';
import { ACTIONS } from '../app.constants';


export default function packaging (state = fromJS({
    packaging:{}
}),action:any){
    switch(action.type){
        case ACTIONS.GET_CLIENTS_INFO.PENDING:{
            return state.setIn(["packaging","client","loading"],true)
        }
        case ACTIONS.GET_CLIENTS_INFO.SUCCESS:{
            return state.setIn(["packaging","client","loading"],false)
                        .setIn(["packaging","client","data"],true)
        }
        case ACTIONS.GET_CLIENTS_INFO.ERROR:{
            return state.setIn(["packaging","client","loading"],true)
                   .setIn(["packaging","client","data"],)
        }
    }
    return state;
}