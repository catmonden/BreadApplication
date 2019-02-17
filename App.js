import React, {Component} from 'react';
import * as firebase from 'firebase';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Button,
  Alert,
} from 'react-native';

export default class BreadApp extends Component {
  render() {
    return (
      <View style = {{top: '0%', height: '100%'}}>
        {/*<Image
          source={require('./assets/images/logos/texthoriz.png')}
          style= {{position: 'absolute', width: '100%', top: 0}}
        />*/}
        <View style = {{flex : 1}}></View>
        <View style = {{flex: 1}}>
          <TextInput
            style={styles.loginField}
            placeholder = "email or phone number"
            onChangeText = {(text) => this.setState({text})}
          ></TextInput>
          <TextInput
            style={styles.loginField}
            placeholder = "password"
            onChangeText = {(text) => this.setState({text})}
          ></TextInput>
          <View style = {styles.loginButton}>
            <Button
              onPress={() => {
                Alert.alert('user is in database!');
              }}
              title="Login"
            />
          </View>
        </View>
        <View style = {{flex: 2}}>
          <View style = {{top: 10, height: 1, topBorderWidth: 1, left: '10%', width: '80%', backgroundColor: 'black'}}></View>
          <View style = {styles.thirdPartyButton}>
          </View>
          <View style = {styles.thirdPartyButton}></View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create ({  
  loginField: {
    left: '15%',
    width: '70%',
    borderBottomWidth: 1,
    margin: 10,
    flex: 1
  },
  loginButton: {
    left: '30%',
    width: '40%',
    margin: 10,
    flex: 1
  },
  thirdPartyButton: {
    left: '20%',
    width: '60%'
  },
  facebookButton: {

  }
});

const firebaseConfig = {
  apiKey: "AIzaSyAoG-0V4r7eJsauSsOhfU-Gx0cduMTfQZc",
  authDomain: "juniordesign-afa7c.firebaseapp.com",
  databaseURL: "https://juniordesign-afa7c.firebaseio.com",
  projectId: "juniordesign-afa7c",
  storageBucket: "juniordesign-afa7c.appspot.com",
  messagingSenderId: "199705549356"
};

firebase.initializeApp(firebaseConfig);