import { connect } from "react-redux";
import { LogOutBegin } from "../../store/action/credential.actions";
import { getSignInData } from "../../store/selectors/credential.selector";
import Packaging from './Packaging'

const mapStateToProps = (state : any) => {
    const signInData = getSignInData(state)
    return {
        signInData,
    }
}


const mapDispatchToProps = {
    logOut:LogOutBegin
}

export default connect(mapStateToProps,mapDispatchToProps)(Packaging)