import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

import ListItem from './src/components/ListItem/ListItem';
import InputContainer from './src/components/InputContainer/InputCointainer';
import List from './src/components/List/List';

export default class App extends React.Component {
  state = {
    placeName: "",
    places: []
  };

  placeNameChangedHandler = (val) => {
      this.setState({
        placeName: val
      });
  };

  placeSubmitHandler = () => {
      if (this.state.placeName.trim() === "") {
        return;
      }       

      this.setState(prevState => {
        return {
            places: prevState.places.concat(prevState.placeName)
        };
      })
  }

  render() {
    return (
      <View style={styles.container}>
       <InputContainer value={this.state.placeName} changeName={this.placeNameChangedHandler} placeSubmit={this.placeSubmitHandler}/>
       <List places={this.state.places}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
});
