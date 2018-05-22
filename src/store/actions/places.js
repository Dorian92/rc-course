import { SET_PLACES, REMOVE_PLACE } from './actionTypes';
import { uiStartLoading, uiStopLoading, authGetToken } from './index';

export const addPlace = (placeName, location, image) => {
    return dispatch => {
        dispatch(uiStartLoading());
        fetch("https://us-central1-awesome-places-1526557212424.cloudfunctions.net/storeImage",{
            method: "POST",
            body: JSON.stringify({
                image: image.base64
            })
        })
        .then(res => res.json())
        .then(parsedRes => {
            const placeData = {
                name: placeName,
                location: location,
                image: parsedRes.imageUrl
            };
            return fetch("https://awesome-places-1526557212424.firebaseio.com/places.json", {
                method: "POST",
                body: JSON.stringify(placeData)
            })
        })
        .catch(err => {
            console.log(err);
            dispatch(uiStopLoading());
        })
        .then(res => res.json())
        .then(parsedRes => {
            console.log(parsedRes);
            dispatch(uiStopLoading());
        })
        .catch(err => {
            console.log(err);
            alert("Something went wrong, plase try again!")
            dispatch(uiStopLoading());
        })
    }
};

export const getPlaces = () => {
    return dispatch => {
    dispatch(authGetToken())
        .then(token => {
            return fetch("https://awesome-places-1526557212424.firebaseio.com/places.json?auth=" + token)
        })
        .catch(() => {
            alert("No valid token found!");
        })
        .then(res => res.json())
        .then(parsedRes => {
            const places = [];
            for (let key in parsedRes) {
                places.push({
                    ...parsedRes[key],
                    image: {
                        uri: parsedRes[key].image
                    },
                    key: key
                });
            }
            dispatch(setPlaces(places));
        })
        .catch(err => {
            alert("Something went wrong, sorry");
            console.log(err);
        })
    }
};

export const setPlaces = places => {
    return {
        type: SET_PLACES,
        places: places
    }
}

export const deletePlace = (key) => {
    return dispatch => {
        dispatch(removePlace(key));
        fetch("https://awesome-places-1526557212424.firebaseio.com/places/" + key + ".json",{
            method: "DELETE"
        })
        .then(res => res.json())
        .then(parsedRes => {
            console.log('Done!');
        })
        .catch(err => {
            alert("Something went wrong, sorry ;/");
            console.log(err)
        })
    };
};

export const removePlace = key => {
    return {
        type: REMOVE_PLACE,
        key: key
    }
}
