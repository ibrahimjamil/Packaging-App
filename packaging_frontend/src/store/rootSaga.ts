import { all,spawn } from "@redux-saga/core/effects";
import caseManagementSagas from './saga'

export default function* root() {
    yield all([spawn(caseManagementSagas)]);
}