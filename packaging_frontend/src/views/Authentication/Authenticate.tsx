import React,{createContext, FunctionComponent, useEffect} from 'react'

type AuthenticationContextValue = {
    signUp: Function;
    signIn: Function;
    signInData: Boolean;
    signUpData: Boolean;
    isAuthenticated:Boolean;
    getToken:Function;
}


export const AuthenticateContext = createContext<AuthenticationContextValue | undefined>(undefined)
const  Authenticate:FunctionComponent<AuthenticationContextValue> = (props) => {
    const {
        signUp,
        signIn,
        signInData,
        signUpData,
        getToken,
        isAuthenticated
    } = props

    useEffect(() => {
        getToken()
    }, [])
    return (
        <AuthenticateContext.Provider 
            value= {{
                signUp,
                signIn,
                signInData,
                signUpData,
                isAuthenticated,
                getToken
            }}
        >
            {props.children}
        </AuthenticateContext.Provider>
    )
}

export default Authenticate
