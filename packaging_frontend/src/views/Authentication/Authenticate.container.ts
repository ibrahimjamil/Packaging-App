import { connect } from "react-redux";
import { getTokenBegin, SignInBegin, SignUpBegin } from "../../store/action/credential.actions";
import { getSignInData, getSignUpData, getTokenData } from "../../store/selectors/credential.selector";
import Authenticate from './Authenticate'


const mapStateToProps = (state : any) => {

    const signInData = getSignInData(state)
    const signUpData = getSignUpData(state)
    const isAuthenticated = getTokenData(state)
    return {
        signInData,
        signUpData,
        isAuthenticated
    }
}


const mapDispatchToProps = {
    signUp: SignUpBegin,
    signIn: SignInBegin,
    getToken: getTokenBegin
}

export default connect(mapStateToProps,mapDispatchToProps)(Authenticate)