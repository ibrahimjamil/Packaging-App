 export const realBussinessActionTypes = (key:string)=>({
    PENDING:`${key} - Pending`,
    SUCCESS: `${key} - Success`,
    ERROR: `${key} - Error`,
})
export const ACTIONS = {
    GET_SIGNIN:realBussinessActionTypes("GET_SIGNIN"),
    GET_SIGNIN_BEGIN:"GET_SIGNIN_BEGIN",
    GET_SIGNUP:realBussinessActionTypes("GET_SIGNUP"),
    GET_SIGNUP_BEGIN:"GET_SIGNUP_BEGIN",
    GET_LOGOUT:realBussinessActionTypes("GET_LOGOUT"),
    GET_LOGOUT_BEGIN:"GET_LOGOUT_BEGIN",
    GET_TOKEN: realBussinessActionTypes("GET_TOKEN"),
    GET_TOKEN_BEGIN:"GET_TOKEN_BEGIN",
    GET_CLIENTS_INFO: realBussinessActionTypes("GET_CLIENTS_INFO"),
    GET_CLIENTS_INFO_BEGIN:"GET_CLIENT_INFO_BEGIN"
}

export default {
    ...ACTIONS
}