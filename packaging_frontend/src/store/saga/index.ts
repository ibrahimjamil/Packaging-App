import { all, spawn } from '@redux-saga/core/effects';
import credentialSagas from './credentialSagas.saga'
import packagingSagas from './packaging.saga'
export default function* rootSaga() {
    yield all([
        spawn(credentialSagas),
        spawn(packagingSagas)
    ]);
}
