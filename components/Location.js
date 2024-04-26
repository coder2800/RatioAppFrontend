import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';

const LocationComponent = () => {
    const [location, setLocation] = useState(null);

    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Permission to access location was denied');
            return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
        console.log(currentLocation); // Debugging

        // Send location to your server
        storeLocation(currentLocation);
    };

    const storeLocation = async (location) => {
        // will write a function to store the location in the database.
    };

    return (
        <View style={styles.container}>
            <Text>Can we have your location for better results?</Text>
            <Text>Sharing your location allows us to help you improve your experience and meet potential matches!</Text>
            <Button title="Allow" onPress={getLocation} style={styles.buttonStyle}/>
            {location && <Text>Location: {location.coords.latitude}, {location.coords.longitude}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    buttonStyle: {
        marginTop: 50
    }
});

export default LocationComponent;
