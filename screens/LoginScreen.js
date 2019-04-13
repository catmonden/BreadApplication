import React, {Component} from 'react';
import {Alert, Button, StyleSheet, Text, TextInput, TouchableHighlight, View, Image} from "react-native";
import { createStackNavigator } from "react-navigation";
import RegisterScreen from './RegisterScreen';
import {getAdminData, getUserData} from "../db/firebase";
//import {AdminNavigator} from "./AdminLanding"
import adminLandingScreen from "./AdminLanding"
import AdminAdd from './AdminAdd';
import AdminReview from './AdminReview';
import AdminRemove from './AdminRemove';
import AdminBusinesses from "./AdminBusinesses";

class LoginScreen extends Component {
    constructor (props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }
    render() {
        var logo = require('../assets/images/logos/texthoriz.png');
        let self = this;

        return (
            <View style = {{flex: 1}}>
                <View style = {styles.imageView}>
                    
                </View>
                <View style = {{flex : 1}}>
                    <TextInput
                        style={styles.loginField}
                        placeholder = "email"
                        ref='user'
                        onChangeText = {(text) => self.setState({email: text})}
                        value = {self.state.email}
                    />
                    <TextInput
                        secureTextEntry={true}
                        style={styles.loginField}
                        placeholder = "password"
                        ref='pass'
                        onChangeText = {(text) => self.setState({password: text})}
                        value = {self.state.password}
                    />
                    <View style = {styles.loginButton}>
                        <Button
                            onPress={() => {
                                getAdminData(self.state.email).then(admin => {
                                    if (admin !== undefined) {
                                        this.props.navigation.navigate('AdminLanding')
                                    }
                                });

                                getUserData(self.state.email).then(user => {
                                    if (user !== undefined) {
                                        //TODO: Change from AdminNavigator
                                        this.props.navigation.navigate('AdminNavigator')
                                    } else {
                                        Aler.alert("Email or Password is incorrect")
                                    }
                                })

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
                        onPress = {() => {this.props.navigation.navigate('Register')}}
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
        Register:{screen: RegisterScreen},
        //AdminNavigator: {screen: AdminNavigator},
        AdminLanding: {screen: adminLandingScreen},
        AdminBusinesses: {screen: AdminBusinesses},
        AdminRemove: {screen: AdminRemove},
        AdminAdd: {screen: AdminAdd},
        AdminReview: {screen: AdminReview},
},
{
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});