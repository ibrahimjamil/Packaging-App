import { combineReducers } from "redux";
import credentialReducer from './credential.reducer'
import packagingReducer from './packaging.reducer'

const rootReducer = combineReducers({
    credentials: credentialReducer,
    packaging: packagingReducer
})

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer