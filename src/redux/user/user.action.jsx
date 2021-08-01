
import  UserActionTypes  from "./user.types"



export const googleSignInStart = () => ({
    type: UserActionTypes.GOOGLE_SIGN_IN_START
});

export const googleSignInSuccess = (user) => ({
    type: UserActionTypes.GOOGLE_SIGN_IN_SUCCESS,
    payload: user
});

export const googleSignInFailure = error => ({
    type: UserActionTypes.GOOGLE_SIGN_IN_FAILURE,
    payload: error
});

export const emailSignInStart = (emailandPassword) => ({
    type: UserActionTypes.EMAIL_SIGN_IN_START,
    payload: emailandPassword
});

export const emailSignInSuccess = (user) => ({
    type: UserActionTypes.EMAIL_SIGN_IN_SUCCESS,
    payload: user
});

export const emailSignInFailure = error => ({
    type: UserActionTypes.EMAIL_SIGN_IN_FAILURE,
    payload: error
});

export const checkUserSession = () => ({
    type: UserActionTypes.CHECK_USER_SESSION
});
export const signOutStart = () => ({
    type: UserActionTypes.SIGN_OUT_START
});
export const signoutSuccess = () => ({
    type: UserActionTypes.SIGN_OUT_SUCCESS
});

export const signoutFailure = (error) => ({
    type: UserActionTypes.SIGN_OUT_FAILURE,
    payload: error
});



