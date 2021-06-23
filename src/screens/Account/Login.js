import React, {Component} from "react";
import {StyleSheet, View, TextInput, Text, TouchableOpacity} from "react-native";
import axios from "axios";
import {showAlert} from "../../Utils";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styleLogin} from './styles';
class Login extends Component {
    state = {
        username: "",
        password: "",
        isAuthenticated: false
    }

            componentDidMount() {
        (async ()=>{
         let token = await AsyncStorage.getItem("id_token")
        if(token){
            await AsyncStorage.setItem("id_token",token)
            this.props.auth(true);
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

    handleLogin() {
        const payload = {username: this.state.username, password: this.state.password}
        axios.post('api/v1/token/login', payload)
            .then(response => {
                const token = response.data.auth_token;
                console.log(token);
                axios.defaults.headers.common['Authorization'] = 'Token ' + token;
                this.props.auth(true);
                // this.userInput.clear();
                this.passInput.clear();
                (async ()=>{await AsyncStorage.setItem("id_token",token)
                    this.props.navigation.navigate({name:'Draw', key:"HomeScreen"});})()

            })
            .catch(error => {
                for (const keys of Object.keys(error.response.data)){
                        showAlert(keys, error.response.data[keys].toString());
                }
                    })
                    //     console.log(response)
                    //     (error, respons);
                    //
                    // }
                    // )
                // }
            // );
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
                <TouchableOpacity>
                    <Text style={styleLogin.forgot}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styleLogin.loginBtn}>
                    <Text style={styleLogin.loginText} onPress={() => this.handleLogin()}>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styleLogin.loginText}
                          onPress={() => this.props.navigation.navigate("Register")}>Signup</Text>
                </TouchableOpacity>

            </View>
        );
    }
}







