import { TRY_AUTH } from './actionTypes';

export const tryAuth = (authData) => {
    return dispatch => {
        dispatch(authSignup(authData));
    };
};

export const authSignup = (authData) => {
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
        })
        .then(res => res.json())
        .then(parsedRes => {
            console.log(parsedRes);
        })
    }
}