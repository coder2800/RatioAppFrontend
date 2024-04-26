import React from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
    Platform,
    Alert,
    ScrollView
  } from "react-native";

const WelcomeScreen = ({navigation}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Welcome aboard!</Text>
      <Text style={styles.description}>
        Our app is designed for three things:
      </Text>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Safe Environment</Text>
        <Text style={styles.text}>
          Provide a safe dating experience with no tolerance against our community guidelines.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>No subscription!</Text>
        <Text style={styles.text}>
          An accessible dating app that will never charge you to see who likes you, rewinds, and any other basic functions that should already be free!
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Tailored to your taste</Text>
        <Text style={styles.text}>
          A curated dating experience that is unique for each user.
        </Text>
      </View>

      <Button
          style={styles.footer}
          title="Finish your Profile"
          onPress={() => {
            navigation.navigate('Location');
          }}
        />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
  footer: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: 'white',
    backgroundColor: 'black'
  },
});

export default WelcomeScreen;