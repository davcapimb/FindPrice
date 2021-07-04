import React, {Component} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import axios from 'axios';
import {showAlert} from '../../Utils';
import {styleLogin, styleRegister} from './styles';

class Register extends Component {
    state = {
        email: '',
        username: '',
        password: '',
    };

    onUsernameChange(text) {
        this.setState({username: text});
    }

    onPasswordChange(text) {
        this.setState({password: text});
    }

    onEmailChange(text) {
        this.setState({email: text});
    }

    handleRegister() {
        const payload = {email: this.state.email, username: this.state.username, password: this.state.password};
        axios.post('api/v1/users/', payload)
            .then(response => {

                this.props.navigation.navigate('Login');

            })
            .catch(error => {
                    for (const keys of Object.keys(error.response.data)) {
                        showAlert(keys, error.response.data[keys].toString());
                    }
                },
            );
    }

    render() {


        return (
            <View style={styleRegister.container}>
                <Text style={styleLogin.logo}>FindPrice</Text>

                <View style={styleLogin.inputView}>
                    <TextInput
                        style={styleLogin.inputText}
                        autoCapitalize="none"
                        placeholder="Username..."
                        placeholderTextColor="#003f5c"
                        clearButtonMode="while-editing"
                        ref={input => {
                            this.userInput = input;
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
                            this.passInput = input;
                        }}
                        onChangeText={this.onPasswordChange.bind(this)}
                    />
                </View>
                <View style={styleLogin.inputView}>
                    <TextInput
                        style={styleLogin.inputText}
                        autoCapitalize="none"
                        placeholder="Email..."
                        placeholderTextColor="#003f5c"
                        clearButtonMode="while-editing"
                        ref={input => {
                            this.userInput = input;
                        }}

                        onChangeText={this.onEmailChange.bind(this)}
                    />
                </View>
                <TouchableOpacity style={styleLogin.loginBtn} onPress={() => this.handleRegister()}>
                    <Text style={styleLogin.loginText}>REGISTER</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={styleLogin.forgot}>Already have an account?</Text>
                </TouchableOpacity>

            </View>
        );
    }
}

export default Register;

