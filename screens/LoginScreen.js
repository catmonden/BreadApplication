import React, {Component} from 'react';
import {Alert, Button, StyleSheet, Text, TextInput, TouchableHighlight, View, Image} from "react-native";
import {navigate} from 'react-navigation';
import RegisterScreen from './RegisterScreen';
//import {registerUser} from "../db/firebase";
import { createStackNavigator } from 'react-navigation';

class LoginScreen extends Component {
    constructor (props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }
    render() {
        var logo = require('../assets/images/logos/texthoriz.png');
        const { navigate } = LoginStack;

        return (
            <View style = {{flex: 1}}>
                <View style = {styles.imageView}>
                    <Image
                        source={logo}
                        style={styles.breadLogo}
                    />
                </View>
                <View style = {{flex : 1}}>
                    <TextInput
                        style={styles.loginField}
                        placeholder = "email or phone number"
                        ref='user'
                        onChangeText = {(text) => this.setState({username: text})}
                        value = {this.state.username}
                    />
                    <TextInput
                        style={styles.loginField}
                        placeholder = "password"
                        ref='pass'
                        onChangeText = {(text) => this.setState({password: text})}
                        value = {this.state.password}
                    />
                    <View style = {styles.loginButton}>
                        <Button
                            onPress={() => {
                                Alert.alert(this.state.username + '\nadded to database');
                                registerUser(this.state.username, this.state.password);
                            }}
                            title="Login"
                        />
                    </View>
                </View>
                <View style = {{flex: 1}}>
                    <View style = {{top: 10, height: 1, topBorderWidth: 1, left: '10%', width: '80%', backgroundColor: 'black'}}/>
                    <View style = {[styles.thirdPartyButton, styles.googleButton]}>
                        <Button
                            onPress = { () => {}}
                            title = "Login with Google"
                            color = "#db3236"
                        />
                    </View>
                    <View style = {[styles.thirdPartyButton, styles.facebookButton]}>
                        <Button
                            onPress = { () => {}}
                            title = "Login with Facebook"
                            color = "#3C5A99"
                        />
                    </View>
                </View>
                <View style = {{flex: 1}}>
                    <Text style = {{left: '10%', top: 30}}>Don't have an account?</Text>
                </View>
                <View style = {styles.registerButton}>
                    <Button
                        onPress = { () => {this.props.navigation.navigate('Register')}}
                        title = "Register"
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create ({
    imageView: {
        height: '15%',
        width: '100%',
        flex: 1,
    },
    breadLogo: {
        position: 'absolute',
        width: '100%',
        height: '100%',

    },
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
        left: '10%',
        width: '80%'
    },
    googleButton: {
        top: 30,
    },
    facebookButton: {
        top: 60,
    },
    registerButton: {
        position: 'absolute',
        top: '78%',
        left: '55%',
        width: '40%'
    },
});

export const LoginStack = createStackNavigator({
    Login: {screen: LoginScreen},
    Register: RegisterScreen,
},
{
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});