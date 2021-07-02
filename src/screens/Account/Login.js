import React, {Component} from "react";
import {StyleSheet, View, TextInput, Text, TouchableOpacity, BackHandler, Alert} from 'react-native';
import axios from "axios";
import {showAlert} from "../../Utils";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styleLogin} from './styles';

export default class Login extends Component {

        state = {
            username: "",
            password: "",
            focused: false,
        }
    componentDidMount() {
        this.setState({focused:true});
        (async ()=>{

            let token = await AsyncStorage.getItem("id_token")
            if(token){
                await AsyncStorage.setItem("id_token",token)
                axios.defaults.headers.common['Authorization'] = 'Token ' + token;
                this.props.navigation.navigate({name:'Draw', key:"HomeScreen"});
            }
            else return null;
        })()

    }



    onUsernameChange(text) {
        this.setState({username: text});
    }

    onPasswordChange(text) {
        this.setState({password: text});
    }

    async handleLogin() {
        const payload = {username: this.state.username, password: this.state.password}
        axios.post('api/v1/token/login', payload)
            .then(response => {
                const token = response.data.auth_token;
                axios.defaults.headers.common['Authorization'] = 'Token ' + token;
                // this.userInput.clear();
                this.passInput.clear();
                this.setState({password:''});
                (async ()=>{await AsyncStorage.setItem("id_token",token)
                    this.props.navigation.navigate({name:'Draw', key:"HomeScreen"});})()

            })
            .catch(error => {
                for (const keys of Object.keys(error.response.data)){
                        showAlert(keys, error.response.data[keys].toString());
                }
            })
    }

    render() {
        this.state.focused=true;
        return (
            <View style={styleLogin.container}>
                <Text style={styleLogin.logo}>FindPrice</Text>
                <View style={styleLogin.inputView}>
                    <TextInput
                        style={styleLogin.inputText}
                        autoCapitalize="none"
                        placeholder="Username..."
                        placeholderTextColor="#003f5c"
                        clearButtonMode="while-editing"
                        ref={input => {
                            this.userInput = input
                        }}

                        onChangeText={this.onUsernameChange.bind(this)}
                    />
                </View>
                <View style={styleLogin.inputView}>
                    <TextInput
                        secureTextEntry
                        style={styleLogin.inputText}
                        placeholder="Password..."
                        placeholderTextColor="#003f5c"
                        ref={input => {
                            this.passInput = input
                        }}
                        onChangeText={this.onPasswordChange.bind(this)}
                    />
                </View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("ResetPsw")}>
                    <Text style={styleLogin.forgot}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styleLogin.loginBtn} onPress={() => this.handleLogin()}>
                    <Text style={styleLogin.loginText} >LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Register")}>
                    <Text style={styleLogin.loginText}>Signup</Text>
                </TouchableOpacity>

            </View>
        );
    }
}







