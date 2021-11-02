
export const getSignInLoading = (state : any) => {
    const {credentials} = state
    return credentials.getIn(['credential','signIn','loading']);
};

export const getSignInData = (state : any) => {
    const {credentials} = state
    return credentials.getIn(['credential','signIn','data']);
};

export const getSignUpLoading = (state : any) => {
    const {credentials} = state
    return credentials.getIn(['credential','signUp','loading']);
};

export const getSignUpData = (state : any) => {
    const {credentials} = state
    return credentials.getIn(['credential','signUp','data']);
};

export const getTokenData = (state : any) => {
    const {credentials} = state
    return credentials.getIn(['credential','getTokenData','data']);
};