import React from 'react';
import {StyleSheet, Text, View, TextInput, Button } from 'react-native';

const inputCointainer = (props) => (
    <View style={styles.inputContainer}>
        <TextInput
            placeholder="An awesome place"
            value={props.value} 
            onChangeText={props.changeName}
            style={styles.placeInput}/>
        <Button title="Add" 
            style={styles.placeButton}
            onPress={props.placeSubmit}/>
    </View>
);

const styles = StyleSheet.create({
    inputContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
      },
      placeInput: {
        width: "70%"
      },
      placeButton: {
        width: "30%"
      }
})


export default inputCointainer;