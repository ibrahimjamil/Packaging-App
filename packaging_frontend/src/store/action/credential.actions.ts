import ACTIONS from '../app.constants'


export const SignUp = {
    pending:()=>({
        type: ACTIONS.GET_SIGNUP.PENDING,
    }),
    success: (data: any) => ({
        type: ACTIONS.GET_SIGNUP.SUCCESS,
        data
    }),
    error: (error: any) => ({
        type: ACTIONS.GET_SIGNUP.ERROR,
        error,
    }),
}

export const SignIn = {
    pending:()=>({
        type: ACTIONS.GET_SIGNIN.PENDING,
    }),
    success: (data: any) => ({
        type: ACTIONS.GET_SIGNIN.SUCCESS,
        data
    }),
    error: (error: any) => ({
        type: ACTIONS.GET_SIGNIN.ERROR,
        error,
    }),

}

export const LogOut = {
    pending:()=>({
        type: ACTIONS.GET_LOGOUT.PENDING,
    }),
    success: (data: any) => ({
        type: ACTIONS.GET_LOGOUT.SUCCESS,
        data
    }),
    error: (error: any) => ({
        type: ACTIONS.GET_LOGOUT.ERROR,
        error,
    }),



}

export const getToken = {
    pending:()=>({
        type: ACTIONS.GET_TOKEN.PENDING,
    }),
    success: (data: any) => ({
        type: ACTIONS.GET_TOKEN.SUCCESS,
        data
    }),
    error: (error: any) => ({
        type: ACTIONS.GET_TOKEN.ERROR,
        error,
    }),



}


export const LogOutBegin = () =>{
    return {
        type:ACTIONS.GET_LOGOUT_BEGIN
    }
}


export const SignUpBegin = (data:any) =>{
    return {
        type:ACTIONS.GET_SIGNUP_BEGIN,
        data
    }
}

export const SignInBegin = (data:any) =>{
    return {
        type:ACTIONS.GET_SIGNIN_BEGIN,
        data
    }
}


export const getTokenBegin = () =>{
    return {
        type:ACTIONS.GET_TOKEN_BEGIN,
    }
}