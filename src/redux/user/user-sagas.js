import { takeLatest, put,all ,call  } from "@redux-saga/core/effects";

import  UserActionTypes from './user.types';
import { auth, googleProvider , createUserProfileDocument,getCurrentUser} from '../../firebase/firebase.utils';

import { googleSignInSuccess,googleSignInFailure,emailSignInSuccess,emailSignInFailure,signoutSuccess,signoutFailure } from "./user.action";

export function* signInWithGoogle(){
    try{

        const { user } = yield auth.signInWithPopup(googleProvider);
        const userRef =  yield call(createUserProfileDocument, user);

        const userSnapshot = yield userRef.get();
        yield put(googleSignInSuccess({id: userSnapshot.id, ...userSnapshot.data()}))

        } catch (error){
            yield put(googleSignInFailure(error));

    }
}

export function* onGoogleSignInStart(){
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START,signInWithGoogle)

}


export function* isUserAuthenticated(){
    try{
        const userAuth = yield getCurrentUser();
        if(!userAuth) return;
        const userRef =  yield call(createUserProfileDocument, userAuth);

        const userSnapshot = yield userRef.get();
        yield put(googleSignInSuccess({id: userSnapshot.id, ...userSnapshot.data()}))

    }catch(error){
        yield put(emailSignInFailure(error));

    }
}

export function* signInWithEmail({payload:{email,password}}){
    try{
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        const userRef =  yield call(createUserProfileDocument, user);

        const userSnapshot = yield userRef.get();
        yield put(emailSignInSuccess({id: userSnapshot.id, ...userSnapshot.data()}))


    }catch(error){
        yield put(emailSignInFailure(error))
    }


}

export function* emailSignInStart(){
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START,signInWithEmail)
}

export function* onCheckUserSession(){
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);

}

export function* onSignOutstart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function*  signOut() {
    try{
        yield auth.signOut();
        yield (put(signoutSuccess()))
    }catch(err){
        yield put(signoutFailure());

    }
}

export function* userSagas(){
    yield all([call(onGoogleSignInStart),call(emailSignInStart),call(onCheckUserSession),call(onSignOutstart)])
}