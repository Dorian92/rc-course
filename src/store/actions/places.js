import { SET_PLACES } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';

export const addPlace = (placeName, location, image) => {
    return dispatch => {
        dispatch(uiStartLoading());
        fetch("https://us-central1-awesome-places-1526557212424.cloudfunctions.net/storeImage",{
            method: "POST",
            body: JSON.stringify({
                image: image.base64
            })
        })
        .catch(err => {
            console.log(err);
            alert("Something went wrong, plase try again!")
            dispatch(uiStopLoading());
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
    }
};

export const getPlaces = () => {
    return dispatch => {
        fetch("https://awesome-places-1526557212424.firebaseio.com/places.json")
    .catch(err => {
        alert("Something went wrong, sorry");
        console.log(err);
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
    });
    }
};

export const setPlaces = places => {
    return {
        type: SET_PLACES,
        places: places
    }
}

export const deletePlace = (key) => {
    return {
        type: DELETE_PLACE,
        placeKey: key
    };
};
