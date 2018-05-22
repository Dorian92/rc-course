import { TRY_AUTH, AUTH_SET_TOKEN } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';
import startMainTabs from '../../screens/MainTabs/startMainTabs';

export const tryAuth = (authData, authMode) => {
    return dispatch => {
        dispatch(uiStartLoading());
        const apiKey = "AIzaSyCO_QYDaVlh6s4UlB9_ur1Zp4ctKoF2l8Y"
        let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" + apiKey;
        if (authMode === 'signup') {
            url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" + apiKey;
        }
        fetch(url,{
            method: "POST",
            body: JSON.stringify({
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .catch(err => {
            console.log(err);
            alert("Authentication faild, please try again");
            dispatch(uiStopLoading());
        })
        .then(res => res.json())
        .then(parsedRes => {
            dispatch(uiStopLoading());
            console.log(parsedRes);
            if(!parsedRes.idToken){
                alert("Authentication faild, please try again");
            } else {
                dispatch(authSetToken(parsedRes.idToken))
                startMainTabs();
            }
        });
    };
};

export const authSignup = (authData) => {
    return dispatch => {
        dispatch(uiStartLoading());

    };
};

export const authSignin = authData => {
    return dispatch => {
        
        fetch("https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCO_QYDaVlh6s4UlB9_ur1Zp4ctKoF2l8Y",{
            method: "POST",
            body: JSON.stringify({
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .catch(err => {
            console.log(err);
            alert("Authentication faild, please try again");
            dispatch(uiStopLoading());
        })
        .then(res => res.json())
        .then(parsedRes => {
            dispatch(uiStopLoading());
            if(parsedRes.error){
                alert("Authentication faild, please try again");
            } else {
                startMainTabs();
            }
        });
    };
};

export const authSetToken = token => {
    return {
        type: AUTH_SET_TOKEN,
        token: token
    }
};

export const authGetToken = () => {
    return (dispatch, getState) => {
        const promise = new Promise((resolve, reject) => {
            const token = getState().auth.token;
            if (!token) {
                reject();
            } else {
                resolve(token);
            }
        });
        return promise;
    };
};