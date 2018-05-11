import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import PlaceList from '../../components/PlaceList/PlaceList';

class FindPlaceScreen extends Component {
    itemSelectedHandler = key => {
        const slePlace = this.props.places.find(places => {
            return places.key === key;
        });

        this.props.navigator.push({
            screen: "awesome-places.PlaceDetailScreen",
            title: slePlace.name,
            passProps: {
                selectedPlace: slePlace
            }
        });
    }

    render() {
        return (
            <View>
                <PlaceList places={this.props.places} onItemSelected={this.itemSelectedHandler} />
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        places: state.places.places
    };
};

export default connect(mapStateToProps)(FindPlaceScreen);